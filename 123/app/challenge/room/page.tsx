'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Users, 
  Clock, 
  Play, 
  CheckCircle2, 
  Trophy,
  ArrowRight,
  Loader2,
  Crown,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  getChallengeById, 
  setParticipantReady, 
  startChallenge, 
  saveChallenge,
  getRemainingTime,
  formatTimeRemaining,
  getChallengeLeaderboard,
  completeChallenge
} from '@/lib/challenge';
import { getProblemById } from '@/lib/data';

function ChallengeRoomContent() {
  const searchParams = useSearchParams();
  const challengeId = searchParams.get('id');
  
  const [isLoading, setIsLoading] = useState(true);
  const [challenge, setChallenge] = useState<ReturnType<typeof getChallengeById>>(null);
  const [currentUserId] = useState('host-user'); // In real app, get from auth
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (challengeId) {
      const found = getChallengeById(challengeId);
      if (found) {
        setChallenge(found);
      }
      setIsLoading(false);
    }
  }, [challengeId]);

  // Timer effect
  useEffect(() => {
    if (challenge?.status === 'in-progress') {
      const interval = setInterval(() => {
        const remaining = getRemainingTime(challenge);
        setCountdown(remaining);
        
        if (remaining <= 0) {
          const completed = completeChallenge(challenge);
          saveChallenge(completed);
          setChallenge(completed);
          clearInterval(interval);
        }
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [challenge]);

  const handleReady = () => {
    if (!challenge) return;
    
    const isReady = challenge.participants.find(p => p.userId === currentUserId)?.isReady;
    const updated = setParticipantReady(challenge, currentUserId, !isReady);
    saveChallenge(updated);
    setChallenge(updated);
  };

  const handleStart = () => {
    if (!challenge) return;
    
    const updated = startChallenge(challenge);
    if (updated) {
      saveChallenge(updated);
      setChallenge(updated);
      setCountdown(updated.timeLimit);
    }
  };

  const isHost = challenge?.hostId === currentUserId;
  const allReady = challenge?.participants.every(p => p.isReady);
  const canStart = isHost && allReady && challenge && challenge.participants.length >= 1;

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Challenge Not Found</h1>
          <Link href="/challenge">
            <Button>Back to Challenges</Button>
          </Link>
        </div>
      </div>
    );
  }

  const leaderboard = getChallengeLeaderboard(challenge);

  return (
    <div className="min-h-[calc(100vh-8rem)] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border rounded-2xl p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">Challenge Room</h1>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  challenge.status === 'waiting' ? 'bg-yellow-100 text-yellow-700' :
                  challenge.status === 'in-progress' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {challenge.status === 'waiting' ? 'Waiting' : 
                   challenge.status === 'in-progress' ? 'In Progress' : 'Completed'}
                </span>
              </div>
              <p className="text-muted-foreground">Code: <span className="font-mono font-bold">{challenge.inviteCode}</span></p>
            </div>
            
            {challenge.status === 'in-progress' && (
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <Clock className="w-5 h-5 mx-auto mb-1 text-orange-500" />
                  <div className="text-2xl font-mono font-bold">{formatTimeRemaining(countdown)}</div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Problems */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Problems ({challenge.problemIds.length})
              </h2>
              <div className="space-y-3">
                {challenge.problemIds.map((problemId, index) => {
                  const problem = getProblemById(problemId);
                  const isCompleted = challenge.participants
                    .find(p => p.userId === currentUserId)
                    ?.completedProblems.includes(problemId);
                  
                  return (
                    <div 
                      key={problemId}
                      className={`p-4 rounded-xl border transition-colors ${
                        isCompleted ? 'bg-green-50 border-green-200' : 'bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                            {index + 1}
                          </span>
                          <div>
                            <h3 className="font-medium">{problem?.problem.title || 'Loading...'}</h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              problem?.problem.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                              problem?.problem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              problem?.problem.difficulty === 'hard' ? 'bg-orange-100 text-orange-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {problem?.problem.difficulty}
                            </span>
                          </div>
                        </div>
                        {challenge.status === 'in-progress' && (
                          <Link href={`/challenge/solve?challenge=${challenge.id}&problem=${problemId}`}>
                            <Button size="sm" variant={isCompleted ? "outline" : "default"}>
                              {isCompleted ? 'Review' : 'Solve'}
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Leaderboard */}
            {challenge.status !== 'waiting' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card border rounded-2xl p-6"
              >
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Leaderboard
                </h2>
                <div className="space-y-3">
                  {leaderboard.map((participant, index) => (
                    <div 
                      key={participant.userId}
                      className={`flex items-center gap-4 p-4 rounded-xl ${
                        index === 0 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' : 'bg-muted/50'
                      }`}
                    >
                      <div className="w-8 text-center font-bold text-lg">
                        {index === 0 ? <Crown className="w-6 h-6 text-yellow-500 mx-auto" /> : `#${index + 1}`}
                      </div>
                      <img src={participant.avatar} alt={participant.name} className="w-10 h-10 rounded-full" />
                      <div className="flex-1">
                        <div className="font-medium">{participant.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {participant.completedProblems.length}/{challenge.problemIds.length} solved
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-xl">{participant.score}</div>
                        <div className="text-xs text-muted-foreground">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Participants */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Participants ({challenge.participants.length})
              </h2>
              <div className="space-y-3">
                {challenge.participants.map((p) => (
                  <div key={p.userId} className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                    <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <div className="font-medium">{p.name}</div>
                      {p.userId === challenge.hostId && (
                        <span className="text-xs text-purple-600">Host</span>
                      )}
                    </div>
                    {p.isReady ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Actions */}
            {challenge.status === 'waiting' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card border rounded-2xl p-6"
              >
                <h2 className="text-xl font-bold mb-4">Ready Up!</h2>
                <p className="text-muted-foreground text-sm mb-4">
                  Click ready when you&apos;re prepared to start the challenge.
                </p>
                <Button 
                  onClick={handleReady}
                  variant={challenge.participants.find(p => p.userId === currentUserId)?.isReady ? "outline" : "default"}
                  className="w-full mb-3"
                >
                  {challenge.participants.find(p => p.userId === currentUserId)?.isReady ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Ready!
                    </>
                  ) : (
                    'I\'m Ready'
                  )}
                </Button>
                
                {isHost && (
                  <Button 
                    onClick={handleStart}
                    disabled={!canStart}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Challenge
                  </Button>
                )}
                
                {!allReady && isHost && (
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    Waiting for all players to be ready...
                  </p>
                )}
              </motion.div>
            )}

            {/* Results */}
            {challenge.status === 'completed' && challenge.winnerId && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-yellow-100 to-orange-100 border border-yellow-300 rounded-2xl p-6 text-center"
              >
                <Trophy className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Challenge Complete!</h2>
                <p className="text-muted-foreground mb-4">
                  Winner: {challenge.participants.find(p => p.userId === challenge.winnerId)?.name}
                </p>
                <Link href="/challenge">
                  <Button className="w-full">
                    New Challenge
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChallengeRoomPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    }>
      <ChallengeRoomContent />
    </Suspense>
  );
}
