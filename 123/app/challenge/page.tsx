'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Users, 
  Clock, 
  Plus, 
  ArrowRight, 
  Code2,
  Zap,
  Copy,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createChallenge, generateInviteMessage } from '@/lib/challenge';

export default function ChallengePage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCreateChallenge = () => {
    setShowCreateModal(true);
  };

  const handleJoinChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteCode.trim()) {
      window.location.href = `/challenge/join?code=${inviteCode.trim().toUpperCase()}`;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 mb-6">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Real-Time Coding Challenges</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Compete with friends in real-time coding battles. Solve problems, earn points, and climb the leaderboard!
          </p>
        </motion.div>

        {/* Main Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Create Challenge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border rounded-2xl p-8 hover:border-purple-500/50 transition-colors"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-6">
              <Plus className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Create Challenge</h2>
            <p className="text-muted-foreground mb-6">
              Host your own coding challenge. Invite friends via a shareable link and compete in real-time.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Choose difficulty and problem count</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Invite via link or code</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Live leaderboard tracking</span>
              </li>
            </ul>
            <Button 
              onClick={handleCreateChallenge}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              Create Challenge
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          {/* Join Challenge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border rounded-2xl p-8 hover:border-purple-500/50 transition-colors"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Join Challenge</h2>
            <p className="text-muted-foreground mb-6">
              Have an invite code? Enter it below to join an existing challenge and compete with others.
            </p>
            <form onSubmit={handleJoinChallenge} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Invite Code</label>
                <input
                  type="text"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                  placeholder="Enter 6-digit code (e.g., ABC123)"
                  className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-purple-500 uppercase tracking-widest text-center font-mono"
                  maxLength={6}
                />
              </div>
              <Button 
                type="submit"
                disabled={inviteCode.length !== 6}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                Join Challenge
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <div className="bg-muted/50 rounded-xl p-6 text-center">
            <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Real-Time Competition</h3>
            <p className="text-sm text-muted-foreground">
              See your opponents progress live as you solve problems
            </p>
          </div>
          <div className="bg-muted/50 rounded-xl p-6 text-center">
            <Code2 className="w-8 h-8 text-purple-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Curated Problems</h3>
            <p className="text-sm text-muted-foreground">
              Hand-picked problems from various difficulty levels
            </p>
          </div>
          <div className="bg-muted/50 rounded-xl p-6 text-center">
            <Clock className="w-8 h-8 text-red-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Timed Challenges</h3>
            <p className="text-sm text-muted-foreground">
              Race against the clock to solve problems faster
            </p>
          </div>
        </motion.div>

        {/* Create Challenge Modal */}
        {showCreateModal && (
          <CreateChallengeModal onClose={() => setShowCreateModal(false)} />
        )}
      </div>
    </div>
  );
}

function CreateChallengeModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [settings, setSettings] = useState({
    problemCount: 3,
    difficulty: 'mixed' as const,
    timeLimit: 30,
  });
  const [challenge, setChallenge] = useState<ReturnType<typeof createChallenge> | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCreate = () => {
    const newChallenge = createChallenge(
      'host-user',
      'Host',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Host',
      settings
    );
    setChallenge(newChallenge);
    setStep(2);
  };

  const copyInviteLink = () => {
    if (challenge) {
      navigator.clipboard.writeText(challenge.inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const copyInviteCode = () => {
    if (challenge) {
      navigator.clipboard.writeText(challenge.inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareChallenge = async () => {
    if (challenge && navigator.share) {
      try {
        await navigator.share({
          title: 'CodeQuest Challenge',
          text: generateInviteMessage(challenge, 'Host'),
          url: challenge.inviteLink,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border rounded-2xl p-8 max-w-md w-full"
      >
        {step === 1 ? (
          <>
            <h2 className="text-2xl font-bold mb-6">Challenge Settings</h2>
            
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Number of Problems</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 5].map(count => (
                    <button
                      key={count}
                      onClick={() => setSettings(s => ({ ...s, problemCount: count }))}
                      className={`flex-1 py-2 rounded-lg border transition-colors ${
                        settings.problemCount === count
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Difficulty</label>
                <div className="grid grid-cols-2 gap-2">
                  {['mixed', 'easy', 'medium', 'hard'].map(diff => (
                    <button
                      key={diff}
                      onClick={() => setSettings(s => ({ ...s, difficulty: diff as any }))}
                      className={`py-2 rounded-lg border capitalize transition-colors ${
                        settings.difficulty === diff
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Time Limit (minutes)</label>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="5"
                  value={settings.timeLimit}
                  onChange={(e) => setSettings(s => ({ ...s, timeLimit: parseInt(e.target.value) }))}
                  className="w-full"
                />
                <div className="text-center mt-2 font-mono">{settings.timeLimit} min</div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleCreate} className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600">
                Create
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold">Challenge Created!</h2>
              <p className="text-muted-foreground">Share this with your friends</p>
            </div>

            {challenge && (
              <div className="space-y-4">
                <div className="bg-muted rounded-xl p-4">
                  <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Invite Code</label>
                  <div className="flex items-center gap-2">
                    <code className="text-2xl font-bold tracking-widest flex-1">{challenge.inviteCode}</code>
                    <button
                      onClick={copyInviteCode}
                      className="p-2 hover:bg-background rounded-lg transition-colors"
                    >
                      {copied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="bg-muted rounded-xl p-4">
                  <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Invite Link</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={challenge.inviteLink}
                      readOnly
                      className="flex-1 bg-transparent text-sm truncate"
                    />
                    <button
                      onClick={copyInviteLink}
                      className="p-2 hover:bg-background rounded-lg transition-colors"
                    >
                      {copied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button 
                  onClick={shareChallenge}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Challenge
                </Button>

                <Link href={`/challenge/room?id=${challenge.id}`} className="block">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                    Go to Challenge Room
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}
