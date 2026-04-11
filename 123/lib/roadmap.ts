import { UserProgress, LearningRoadmap, RoadmapNode, Topic, ProblemAttempt } from '@/types';
import { topics } from './data';

/**
 * Analyzes user progress to identify weak topics based on:
 * - Accuracy rate (problems solved correctly)
 * - Time taken to solve problems
 * - Topics with lowest completion rates
 */
export function analyzeWeakTopics(userProgress: UserProgress): string[] {
  const topicStats: Record<string, {
    totalAttempts: number;
    correctAttempts: number;
    totalTime: number;
    avgTime: number;
  }> = {};

  // Initialize stats for all topics
  topics.forEach(topic => {
    topicStats[topic.id] = {
      totalAttempts: 0,
      correctAttempts: 0,
      totalTime: 0,
      avgTime: 0,
    };
  });

  // Analyze problem attempts
  userProgress.problemAttempts?.forEach(attempt => {
    // Find which topic this problem belongs to
    for (const topic of topics) {
      const problem = topic.problems.find(p => p.id === attempt.problemId);
      if (problem) {
        const stats = topicStats[topic.id];
        stats.totalAttempts++;
        if (attempt.passed) {
          stats.correctAttempts++;
        }
        stats.totalTime += attempt.timeTaken;
        break;
      }
    }
  });

  // Calculate average time and accuracy for each topic
  const weakTopics: string[] = [];
  const topicScores: { topicId: string; score: number }[] = [];

  Object.entries(topicStats).forEach(([topicId, stats]) => {
    if (stats.totalAttempts > 0) {
      const accuracy = stats.correctAttempts / stats.totalAttempts;
      const avgTime = stats.totalTime / stats.totalAttempts;
      
      // Score: lower accuracy and higher time = weaker topic
      // Normalize: accuracy (0-1), time (assume max 300 seconds)
      const normalizedTime = Math.min(avgTime / 300, 1);
      const weaknessScore = (1 - accuracy) * 0.7 + normalizedTime * 0.3;
      
      topicScores.push({ topicId, score: weaknessScore });
    }
  });

  // Sort by weakness score (highest first) and return top weak topics
  topicScores.sort((a, b) => b.score - a.score);
  
  // Return topics with score > 0.4 (significantly weak) or top 3
  const significantWeakTopics = topicScores.filter(t => t.score > 0.4).map(t => t.topicId);
  if (significantWeakTopics.length > 0) {
    return significantWeakTopics.slice(0, 5);
  }
  
  // If no significant weak topics, return top 3 weakest
  return topicScores.slice(0, 3).map(t => t.topicId);
}

/**
 * Calculates the priority level for a topic based on user performance
 */
function calculatePriority(
  topic: Topic,
  attempts: ProblemAttempt[],
  isWeakTopic: boolean
): 'high' | 'medium' | 'low' {
  const topicAttempts = attempts.filter(a => 
    topic.problems.some(p => p.id === a.problemId)
  );

  if (topicAttempts.length === 0) {
    return isWeakTopic ? 'high' : 'medium';
  }

  const accuracy = topicAttempts.filter(a => a.passed).length / topicAttempts.length;
  const avgTime = topicAttempts.reduce((sum, a) => sum + a.timeTaken, 0) / topicAttempts.length;

  if (accuracy < 0.5 || avgTime > 180 || isWeakTopic) {
    return 'high';
  } else if (accuracy < 0.8 || avgTime > 120) {
    return 'medium';
  }
  return 'low';
}

/**
 * Estimates time needed to complete a topic based on difficulty and user performance
 */
function estimateTimeForTopic(
  topic: Topic,
  attempts: ProblemAttempt[]
): number {
  const baseTime = {
    easy: 15,
    medium: 30,
    hard: 60,
    boss: 120,
  };

  const topicAttempts = attempts.filter(a =>
    topic.problems.some(p => p.id === a.problemId)
  );

  const avgTime = topicAttempts.length > 0
    ? topicAttempts.reduce((sum, a) => sum + a.timeTaken, 0) / topicAttempts.length
    : 0;

  // Calculate estimated time based on remaining problems
  const solvedProblems = new Set(topicAttempts.filter(a => a.passed).map(a => a.problemId));
  const remainingProblems = topic.problems.filter(p => !solvedProblems.has(p.id));

  let estimatedMinutes = 0;
  remainingProblems.forEach(problem => {
    const timePerProblem = avgTime > 0 ? avgTime / 60 : baseTime[problem.difficulty];
    estimatedMinutes += timePerProblem;
  });

  // Add time for quizzes
  const unsolvedQuizzes = topic.quizzes.length - (solvedProblems.size > 0 ? Math.floor(solvedProblems.size / 3) : 0);
  estimatedMinutes += unsolvedQuizzes * 5;

  return Math.round(estimatedMinutes);
}

/**
 * Generates a personalized learning roadmap based on user progress
 */
export function generateLearningRoadmap(userProgress: UserProgress): LearningRoadmap {
  const weakTopics = analyzeWeakTopics(userProgress);
  const nodes: RoadmapNode[] = [];
  let nodeId = 0;

  // Create nodes for weak topics first (high priority)
  weakTopics.forEach(topicId => {
    const topic = topics.find(t => t.id === topicId);
    if (topic) {
      const priority = calculatePriority(topic, userProgress.problemAttempts || [], true);
      const estimatedTime = estimateTimeForTopic(topic, userProgress.problemAttempts || []);

      nodes.push({
        id: `node-${nodeId++}`,
        topicId: topic.id,
        title: `Master ${topic.name}`,
        description: `Focus on ${topic.name} - identified as a weak area based on your performance.`,
        priority,
        estimatedTime,
        completed: false,
        dependsOn: [],
      });
    }
  });

  // Add nodes for incomplete topics
  topics.forEach(topic => {
    if (!weakTopics.includes(topic.id)) {
      const topicProgress = userProgress.topicProgress[topic.id];
      const isCompleted = topicProgress && 
        topicProgress.easySolved + topicProgress.mediumSolved + topicProgress.hardSolved + topicProgress.bossSolved >= 
        topicProgress.totalEasy + topicProgress.totalMedium + topicProgress.totalHard + topicProgress.totalBoss;

      if (!isCompleted) {
        const priority = calculatePriority(topic, userProgress.problemAttempts || [], false);
        const estimatedTime = estimateTimeForTopic(topic, userProgress.problemAttempts || []);

        // Find dependencies (topics that should be completed before this one)
        const dependsOn: string[] = [];
        // Basic topics like arrays, strings are prerequisites for advanced ones
        if (['linked-list', 'stack', 'queue'].includes(topic.id)) {
          dependsOn.push('arrays');
        }
        if (['trees', 'graphs'].includes(topic.id)) {
          dependsOn.push('linked-list');
        }

        nodes.push({
          id: `node-${nodeId++}`,
          topicId: topic.id,
          title: `Complete ${topic.name}`,
          description: topic.description,
          priority,
          estimatedTime,
          completed: false,
          dependsOn: dependsOn.filter(dep => nodes.some(n => n.topicId === dep)),
        });
      }
    }
  });

  // Sort nodes: high priority first, then by estimated time
  nodes.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return a.estimatedTime - b.estimatedTime;
  });

  // Calculate overall progress
  const completedNodes = nodes.filter(n => n.completed).length;
  const overallProgress = nodes.length > 0 ? (completedNodes / nodes.length) * 100 : 0;

  return {
    id: `roadmap-${Date.now()}`,
    userId: 'current-user',
    createdAt: new Date().toISOString(),
    nodes,
    overallProgress: Math.round(overallProgress),
  };
}

/**
 * Updates the roadmap when a node is completed
 */
export function completeRoadmapNode(
  roadmap: LearningRoadmap,
  nodeId: string
): LearningRoadmap {
  const updatedNodes = roadmap.nodes.map(node =>
    node.id === nodeId ? { ...node, completed: true } : node
  );

  const completedNodes = updatedNodes.filter(n => n.completed).length;
  const overallProgress = updatedNodes.length > 0 
    ? Math.round((completedNodes / updatedNodes.length) * 100) 
    : 0;

  return {
    ...roadmap,
    nodes: updatedNodes,
    overallProgress,
  };
}

/**
 * Gets recommended next steps based on the roadmap
 */
export function getRecommendedNextSteps(roadmap: LearningRoadmap): RoadmapNode[] {
  // Return uncompleted nodes that have no uncompleted dependencies
  return roadmap.nodes
    .filter(node => {
      if (node.completed) return false;
      // Check if all dependencies are completed
      return node.dependsOn.every(depId => 
        roadmap.nodes.find(n => n.topicId === depId)?.completed ?? true
      );
    })
    .slice(0, 3); // Top 3 recommendations
}

/**
 * Generates a summary of user's learning analytics
 */
export function generateLearningAnalytics(userProgress: UserProgress) {
  const attempts = userProgress.problemAttempts || [];
  
  // Overall accuracy
  const totalAttempts = attempts.length;
  const correctAttempts = attempts.filter(a => a.passed).length;
  const overallAccuracy = totalAttempts > 0 ? (correctAttempts / totalAttempts) * 100 : 0;

  // Average time per problem
  const avgTime = totalAttempts > 0
    ? attempts.reduce((sum, a) => sum + a.timeTaken, 0) / totalAttempts
    : 0;

  // Topics breakdown
  const topicBreakdown: Record<string, { accuracy: number; avgTime: number; total: number }> = {};
  topics.forEach(topic => {
    const topicAttempts = attempts.filter(a =>
      topic.problems.some(p => p.id === a.problemId)
    );
    if (topicAttempts.length > 0) {
      const correct = topicAttempts.filter(a => a.passed).length;
      const time = topicAttempts.reduce((sum, a) => sum + a.timeTaken, 0) / topicAttempts.length;
      topicBreakdown[topic.name] = {
        accuracy: (correct / topicAttempts.length) * 100,
        avgTime: time,
        total: topicAttempts.length,
      };
    }
  });

  // Weak areas (accuracy < 60%)
  const weakAreas = Object.entries(topicBreakdown)
    .filter(([_, stats]) => stats.accuracy < 60)
    .map(([name, _]) => name);

  // Strong areas (accuracy > 85%)
  const strongAreas = Object.entries(topicBreakdown)
    .filter(([_, stats]) => stats.accuracy > 85)
    .map(([name, _]) => name);

  return {
    overallAccuracy: Math.round(overallAccuracy),
    averageTimePerProblem: Math.round(avgTime),
    totalProblemsAttempted: totalAttempts,
    totalProblemsSolved: correctAttempts,
    topicBreakdown,
    weakAreas,
    strongAreas,
    streak: userProgress.streak,
    currentLevel: userProgress.level,
  };
}
