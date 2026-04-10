import { topics as initialTopics, badges, mockLeaderboard, getTopicById, getProblemById, getAllProblems, getDailyChallenges } from './topics';
import { moreTopics } from './more-topics';

// Combine all topics
export const topics = [...initialTopics, ...moreTopics];

export { badges, mockLeaderboard, getTopicById, getProblemById, getAllProblems, getDailyChallenges };

// Helper to get all problems count by difficulty
export function getProblemsCountByDifficulty() {
  const allProblems = topics.flatMap(t => t.problems);
  return {
    easy: allProblems.filter(p => p.difficulty === 'easy').length,
    medium: allProblems.filter(p => p.difficulty === 'medium').length,
    hard: allProblems.filter(p => p.difficulty === 'hard').length,
    boss: allProblems.filter(p => p.difficulty === 'boss').length,
  };
}

// Get topic progress stats
export function getTopicStats(topicId: string) {
  const topic = topics.find(t => t.id === topicId);
  if (!topic) return null;
  
  return {
    totalProblems: topic.problems.length,
    easy: topic.problems.filter(p => p.difficulty === 'easy').length,
    medium: topic.problems.filter(p => p.difficulty === 'medium').length,
    hard: topic.problems.filter(p => p.difficulty === 'hard').length,
    boss: topic.problems.filter(p => p.difficulty === 'boss').length,
    totalQuizzes: topic.quizzes.length,
  };
}
