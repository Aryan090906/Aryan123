'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

// Generate static params for all topics
export function generateStaticParams() {
  return [
    { id: 'arrays' },
    { id: 'strings' },
    { id: 'linked-list' },
    { id: 'stack' },
  ];
}
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, XCircle, Trophy, RotateCcw, HelpCircle } from 'lucide-react';
import { getTopicById } from '@/lib/data';
import { useUserProgress } from '@/context/UserProgressContext';
import { cn } from '@/lib/utils';

export default function QuizPage() {
  const params = useParams();
  const topicId = params.id as string;
  const topic = getTopicById(topicId);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [quizComplete, setQuizComplete] = useState(false);
  
  const { updateQuizScore, progress } = useUserProgress();

  if (!topic) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Topic not found</h1>
        <Link href="/topics" className="text-purple-600 hover:underline">
          Back to topics
        </Link>
      </div>
    );
  }

  const quiz = topic.quizzes[currentQuestion];
  const isLastQuestion = currentQuestion === topic.quizzes.length - 1;

  const handleSelectAnswer = (index: number) => {
    if (showResult || answeredQuestions.has(currentQuestion)) return;
    setSelectedAnswer(index);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;
    
    const correct = selectedAnswer === quiz.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct && !answeredQuestions.has(currentQuestion)) {
      setScore(prev => prev + 1);
    }
    
    setAnsweredQuestions(prev => new Set(prev).add(currentQuestion));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setQuizComplete(true);
      updateQuizScore(topicId, score + (isCorrect && !answeredQuestions.has(currentQuestion) ? 1 : 0));
    } else {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    setScore(0);
    setAnsweredQuestions(new Set());
    setQuizComplete(false);
  };

  if (quizComplete) {
    const percentage = Math.round((score / topic.quizzes.length) * 100);
    const xpEarned = score * 5;
    
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card border rounded-2xl p-8 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Quiz Complete!</h1>
          <p className="text-muted-foreground mb-6">
            You completed the {topic.name} quiz
          </p>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-muted rounded-xl p-4">
              <div className="text-3xl font-bold text-purple-600">{score}</div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
            <div className="bg-muted rounded-xl p-4">
              <div className="text-3xl font-bold">{percentage}%</div>
              <div className="text-sm text-muted-foreground">Score</div>
            </div>
            <div className="bg-muted rounded-xl p-4">
              <div className="text-3xl font-bold text-yellow-600">+{xpEarned}</div>
              <div className="text-sm text-muted-foreground">XP Earned</div>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors font-medium"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>
            <Link
              href={`/topics/${topicId}`}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-700 hover:to-indigo-700 transition-all"
            >
              Back to Topic
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href={`/topics/${topicId}`}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold">{topic.name} Quiz</h1>
            <p className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {topic.quizzes.length}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Score: <span className="font-bold text-purple-600">{score}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all"
          style={{ width: `${((currentQuestion + 1) / topic.quizzes.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-card border rounded-2xl p-8"
      >
        <div className="flex items-start gap-3 mb-6">
          <HelpCircle className="w-6 h-6 text-purple-500 mt-0.5" />
          <h2 className="text-xl font-medium">{quiz.question}</h2>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {quiz.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isAnswered = answeredQuestions.has(currentQuestion);
            const isCorrectAnswer = index === quiz.correctAnswer;
            
            let buttonClass = 'border hover:border-purple-500/50';
            if (showResult || isAnswered) {
              if (isCorrectAnswer) {
                buttonClass = 'border-green-500 bg-green-500/10';
              } else if (isSelected && !isCorrectAnswer) {
                buttonClass = 'border-red-500 bg-red-500/10';
              } else {
                buttonClass = 'border-muted opacity-60';
              }
            } else if (isSelected) {
              buttonClass = 'border-purple-500 bg-purple-500/10';
            }

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={showResult || isAnswered}
                className={cn(
                  'w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all',
                  buttonClass
                )}
              >
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                  isSelected && !showResult && !isAnswered ? 'bg-purple-500 text-white' : 'bg-muted'
                )}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="flex-1">{option}</span>
                {(showResult || isAnswered) && isCorrectAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                )}
                {(showResult || isAnswered) && isSelected && !isCorrectAnswer && (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-6"
            >
              <div className={cn(
                'p-4 rounded-xl',
                isCorrect ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'
              )}>
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="font-medium text-green-700">Correct!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-500" />
                      <span className="font-medium text-red-700">Incorrect</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{quiz.explanation}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex justify-end">
          {!showResult && !answeredQuestions.has(currentQuestion) ? (
            <button
              onClick={handleCheckAnswer}
              disabled={selectedAnswer === null}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-700 hover:to-indigo-700 transition-all"
            >
              {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
