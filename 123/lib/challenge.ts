import { RealTimeChallenge, ChallengeParticipant, UserProgress } from '@/types';
import { getAllProblems } from './data';

/**
 * Generates a unique invite code for a challenge
 */
export function generateInviteCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Generates an invite link for a challenge
 */
export function generateInviteLink(inviteCode: string, baseUrl?: string): string {
  const url = baseUrl || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
  return `${url}/challenge/join?code=${inviteCode}`;
}

/**
 * Creates a new real-time coding challenge
 */
export function createChallenge(
  hostId: string,
  hostName: string,
  hostAvatar: string,
  options: {
    problemCount?: number;
    difficulty?: 'easy' | 'medium' | 'hard' | 'mixed';
    timeLimit?: number;
  } = {}
): RealTimeChallenge {
  const {
    problemCount = 3,
    difficulty = 'mixed',
    timeLimit = 30,
  } = options;

  const inviteCode = generateInviteCode();
  const allProblems = getAllProblems();
  
  // Filter problems by difficulty if specified
  let filteredProblems = allProblems;
  if (difficulty !== 'mixed') {
    filteredProblems = allProblems.filter(p => p.difficulty === difficulty);
  }
  
  // Randomly select problems
  const selectedProblems: string[] = [];
  const usedIndices = new Set<number>();
  
  while (selectedProblems.length < problemCount && usedIndices.size < filteredProblems.length) {
    const index = Math.floor(Math.random() * filteredProblems.length);
    if (!usedIndices.has(index)) {
      usedIndices.add(index);
      selectedProblems.push(filteredProblems[index].id);
    }
  }

  const challenge: RealTimeChallenge = {
    id: `challenge-${Date.now()}`,
    hostId,
    inviteCode,
    inviteLink: generateInviteLink(inviteCode),
    problemIds: selectedProblems,
    participants: [
      {
        userId: hostId,
        name: hostName,
        avatar: hostAvatar,
        progress: 0,
        score: 0,
        completedProblems: [],
        isReady: false,
      },
    ],
    status: 'waiting',
    timeLimit: timeLimit * 60, // Convert to seconds
  };

  return challenge;
}

/**
 * Joins a challenge using an invite code
 */
export function joinChallenge(
  challenge: RealTimeChallenge,
  userId: string,
  userName: string,
  userAvatar: string
): RealTimeChallenge | null {
  // Check if challenge is still waiting
  if (challenge.status !== 'waiting') {
    return null;
  }

  // Check if user is already in the challenge
  if (challenge.participants.some(p => p.userId === userId)) {
    return challenge;
  }

  const updatedParticipants = [
    ...challenge.participants,
    {
      userId,
      name: userName,
      avatar: userAvatar,
      progress: 0,
      score: 0,
      completedProblems: [],
      isReady: false,
    },
  ];

  return {
    ...challenge,
    participants: updatedParticipants,
  };
}

/**
 * Sets a participant's ready status
 */
export function setParticipantReady(
  challenge: RealTimeChallenge,
  userId: string,
  isReady: boolean
): RealTimeChallenge {
  const updatedParticipants = challenge.participants.map(p =>
    p.userId === userId ? { ...p, isReady } : p
  );

  return {
    ...challenge,
    participants: updatedParticipants,
  };
}

/**
 * Starts the challenge if all participants are ready
 */
export function startChallenge(challenge: RealTimeChallenge): RealTimeChallenge | null {
  // Check if all participants are ready
  const allReady = challenge.participants.every(p => p.isReady);
  
  if (!allReady || challenge.participants.length < 1) {
    return null;
  }

  return {
    ...challenge,
    status: 'in-progress',
    startTime: new Date().toISOString(),
  };
}

/**
 * Updates a participant's progress
 */
export function updateParticipantProgress(
  challenge: RealTimeChallenge,
  userId: string,
  problemId: string,
  score: number
): RealTimeChallenge {
  const updatedParticipants = challenge.participants.map(p => {
    if (p.userId !== userId) return p;

    const completedProblems = p.completedProblems.includes(problemId)
      ? p.completedProblems
      : [...p.completedProblems, problemId];

    const progress = Math.round((completedProblems.length / challenge.problemIds.length) * 100);

    return {
      ...p,
      completedProblems,
      progress,
      score: p.score + score,
    };
  });

  return {
    ...challenge,
    participants: updatedParticipants,
  };
}

/**
 * Completes the challenge and determines the winner
 */
export function completeChallenge(challenge: RealTimeChallenge): RealTimeChallenge {
  // Find the winner (highest score, or most problems solved if tied)
  const winner = challenge.participants.reduce((best, current) => {
    if (current.score > best.score) return current;
    if (current.score === best.score && current.completedProblems.length > best.completedProblems.length) {
      return current;
    }
    return best;
  });

  return {
    ...challenge,
    status: 'completed',
    endTime: new Date().toISOString(),
    winnerId: winner.userId,
  };
}

/**
 * Checks if the challenge time has expired
 */
export function isChallengeExpired(challenge: RealTimeChallenge): boolean {
  if (!challenge.startTime || challenge.status !== 'in-progress') {
    return false;
  }

  const startTime = new Date(challenge.startTime).getTime();
  const currentTime = Date.now();
  const elapsedSeconds = (currentTime - startTime) / 1000;

  return elapsedSeconds >= challenge.timeLimit;
}

/**
 * Gets the remaining time in seconds
 */
export function getRemainingTime(challenge: RealTimeChallenge): number {
  if (!challenge.startTime || challenge.status !== 'in-progress') {
    return challenge.timeLimit;
  }

  const startTime = new Date(challenge.startTime).getTime();
  const currentTime = Date.now();
  const elapsedSeconds = (currentTime - startTime) / 1000;
  const remaining = challenge.timeLimit - elapsedSeconds;

  return Math.max(0, Math.round(remaining));
}

/**
 * Gets the leaderboard for the challenge
 */
export function getChallengeLeaderboard(challenge: RealTimeChallenge): ChallengeParticipant[] {
  return [...challenge.participants].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return b.completedProblems.length - a.completedProblems.length;
  });
}

/**
 * Formats time remaining as MM:SS
 */
export function formatTimeRemaining(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Validates an invite code format
 */
export function isValidInviteCode(code: string): boolean {
  return /^[A-Z0-9]{6}$/.test(code);
}

/**
 * Generates a shareable message for inviting friends
 */
export function generateInviteMessage(challenge: RealTimeChallenge, hostName: string): string {
  return `🚀 ${hostName} invited you to a coding challenge on CodeQuest!

Join with code: ${challenge.inviteCode}
Or click: ${challenge.inviteLink}

⏱️ Time limit: ${Math.floor(challenge.timeLimit / 60)} minutes
📝 Problems: ${challenge.problemIds.length}

Ready to compete? 💪`;
}

// Mock storage for challenges (in a real app, this would be a database)
const challengeStore: Map<string, RealTimeChallenge> = new Map();

/**
 * Saves a challenge to the store
 */
export function saveChallenge(challenge: RealTimeChallenge): void {
  challengeStore.set(challenge.id, challenge);
}

/**
 * Gets a challenge by ID
 */
export function getChallengeById(id: string): RealTimeChallenge | undefined {
  return challengeStore.get(id);
}

/**
 * Gets a challenge by invite code
 */
export function getChallengeByInviteCode(code: string): RealTimeChallenge | undefined {
  return Array.from(challengeStore.values()).find(c => c.inviteCode === code);
}

/**
 * Removes a challenge from the store
 */
export function removeChallenge(id: string): void {
  challengeStore.delete(id);
}

/**
 * Gets all active challenges
 */
export function getActiveChallenges(): RealTimeChallenge[] {
  return Array.from(challengeStore.values()).filter(
    c => c.status === 'waiting' || c.status === 'in-progress'
  );
}
