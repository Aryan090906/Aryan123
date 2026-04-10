'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Lightbulb, CheckCircle2, XCircle, Play, Trophy, RotateCcw } from 'lucide-react';
import { getProblemById } from '@/lib/data';
import { useUserProgress } from '@/context/UserProgressContext';
import { getDifficultyColor, cn } from '@/lib/utils';

export default function PracticePage() {
  const params = useParams();
  const problemId = params.id as string;
  const problemData = getProblemById(problemId);
  
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [showHint, setShowHint] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'hints'>('description');
  
  const { isProblemSolved, markProblemSolved } = useUserProgress();

  useEffect(() => {
    if (problemData) {
      setCode(problemData.problem.starterCode);
      setIsSolved(isProblemSolved(problemId));
    }
  }, [problemData, problemId, isProblemSolved]);

  if (!problemData) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Problem not found</h1>
        <Link href="/topics" className="text-purple-600 hover:underline">
          Back to topics
        </Link>
      </div>
    );
  }

  const { problem, topic } = problemData;

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput('Running tests...\n\n');
    
    // Simulate code execution
    setTimeout(() => {
      setOutput(prev => prev + '✓ Test Case 1: Passed\n');
      setTimeout(() => {
        setOutput(prev => prev + '✓ Test Case 2: Passed\n');
        setTimeout(() => {
          setOutput(prev => prev + '✓ Test Case 3: Passed\n\n');
          setOutput(prev => prev + '🎉 All tests passed! You earned ' + problem.xpReward + ' XP!');
          setIsRunning(false);
        }, 300);
      }, 300);
    }, 500);
  };

  const handleSubmit = () => {
    setIsRunning(true);
    setOutput('Submitting solution...\n\n');
    
    setTimeout(() => {
      setOutput(prev => prev + '✓ Solution accepted!\n');
      setOutput(prev => prev + `✓ Earned ${problem.xpReward} XP\n`);
      setOutput(prev => prev + '✓ Problem marked as solved\n\n');
      setOutput(prev => prev + '🎉 Congratulations! Keep up the great work!');
      
      if (!isProblemSolved(problemId)) {
        markProblemSolved(problemId, topic.id, problem.difficulty);
      }
      setIsSolved(true);
      setIsRunning(false);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Link
            href={`/topics/${topic.id}`}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold">{problem.title}</h1>
            <div className="flex items-center gap-2 text-sm">
              <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', getDifficultyColor(problem.difficulty))}>
                {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
              </span>
              <span className="text-muted-foreground">{topic.name}</span>
              {isSolved && (
                <span className="flex items-center gap-1 text-green-600 text-xs">
                  <CheckCircle2 className="w-3 h-3" />
                  Solved
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">+{problem.xpReward} XP</span>
          {isSolved && (
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-sm">
              <Trophy className="w-4 h-4" />
              Completed
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
        {/* Left Panel - Problem Description */}
        <div className="flex flex-col bg-card border rounded-xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('description')}
              className={cn(
                'flex-1 px-4 py-3 text-sm font-medium transition-colors',
                activeTab === 'description' ? 'text-purple-600 border-b-2 border-purple-500' : 'text-muted-foreground'
              )}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('hints')}
              className={cn(
                'flex-1 px-4 py-3 text-sm font-medium transition-colors',
                activeTab === 'hints' ? 'text-purple-600 border-b-2 border-purple-500' : 'text-muted-foreground'
              )}
            >
              Hints ({problem.hints.length})
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'description' ? (
                <motion.div
                  key="description"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <p className="text-muted-foreground leading-relaxed">{problem.description}</p>

                  {/* Examples */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Examples:</h3>
                    {problem.examples.map((example, i) => (
                      <div key={i} className="bg-muted rounded-lg p-4 space-y-2">
                        <div>
                          <span className="text-sm font-medium">Input:</span>
                          <code className="ml-2 text-sm">{example.input}</code>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Output:</span>
                          <code className="ml-2 text-sm">{example.output}</code>
                        </div>
                        {example.explanation && (
                          <div>
                            <span className="text-sm font-medium">Explanation:</span>
                            <p className="text-sm text-muted-foreground mt-1">{example.explanation}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Constraints */}
                  <div>
                    <h3 className="font-semibold mb-2">Constraints:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {problem.constraints.map((constraint, i) => (
                        <li key={i}>{constraint}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="hints"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <p className="text-sm text-muted-foreground mb-4">
                    Reveal hints one by one. Try to solve without hints first!
                  </p>
                  {problem.hints.map((hint, i) => (
                    <div key={i} className="border rounded-lg overflow-hidden">
                      <button
                        onClick={() => setShowHint(showHint === i ? null : i)}
                        className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-yellow-500" />
                          <span className="font-medium">Hint {i + 1}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {showHint === i ? 'Hide' : 'Show'}
                        </span>
                      </button>
                      <AnimatePresence>
                        {showHint === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t"
                          >
                            <p className="p-4 text-sm text-muted-foreground">{hint}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="flex flex-col gap-4">
          {/* Code Editor */}
          <div className="flex-1 bg-card border rounded-xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
              <span className="text-sm font-medium">Solution.py</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCode(problem.starterCode)}
                  className="p-1.5 rounded hover:bg-muted transition-colors"
                  title="Reset code"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 p-4 font-mono text-sm resize-none focus:outline-none bg-background"
              spellCheck={false}
            />
          </div>

          {/* Output Console */}
          <div className="h-48 bg-card border rounded-xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
              <span className="text-sm font-medium">Console</span>
              {output && (
                <button
                  onClick={() => setOutput('')}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex-1 p-4 font-mono text-sm overflow-y-auto whitespace-pre-wrap">
              {output || (
                <span className="text-muted-foreground">
                  Click &quot;Run Code&quot; to test your solution or &quot;Submit&quot; to earn XP!
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors font-medium disabled:opacity-50"
            >
              <Play className="w-4 h-4" />
              {isRunning ? 'Running...' : 'Run Code'}
            </button>
            <button
              onClick={handleSubmit}
              disabled={isRunning || isSolved}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all',
                isSolved
                  ? 'bg-green-500 text-white cursor-default'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/30'
              )}
            >
              {isSolved ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Solved
                </>
              ) : (
                <>
                  <Trophy className="w-4 h-4" />
                  Submit
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
