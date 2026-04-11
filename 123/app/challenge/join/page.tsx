'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Clock, Code2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getChallengeByInviteCode, joinChallenge, saveChallenge } from '@/lib/challenge';

function JoinChallengeContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [challenge, setChallenge] = useState<ReturnType<typeof getChallengeByInviteCode>>(null);
  const [playerName, setPlayerName] = useState('');
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    if (code) {
      // In a real app, fetch from API
      const found = getChallengeByInviteCode(code);
      if (found) {
        setChallenge(found);
      } else {
        setError('Invalid invite code. Please check and try again.');
      }
      setIsLoading(false);
    } else {
      setError('No invite code provided.');
      setIsLoading(false);
    }
  }, [code]);

  const handleJoin = () => {
    if (!challenge || !playerName.trim()) return;
    
    const updated = joinChallenge(
      challenge,
      `player-${Date.now()}`,
      playerName,
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${playerName}`
    );
    
    if (updated) {
      saveChallenge(updated);
      setHasJoined(true);
      setChallenge(updated);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold mb-2">Oops!</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Link href="/challenge">
            <Button>Go Back</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (!challenge) return null;

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border rounded-2xl p-8"
        >
          {!hasJoined ? (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Join Challenge</h1>
                <p className="text-muted-foreground">
                  You&apos;ve been invited to a coding challenge!
                </p>
              </div>

              <div className="bg-muted rounded-xl p-6 mb-8">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <Code2 className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                    <div className="text-2xl font-bold">{challenge.problemIds.length}</div>
                    <div className="text-xs text-muted-foreground">Problems</div>
                  </div>
                  <div>
                    <Clock className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                    <div className="text-2xl font-bold">{Math.floor(challenge.timeLimit / 60)}</div>
                    <div className="text-xs text-muted-foreground">Minutes</div>
                  </div>
                  <div>
                    <Users className="w-6 h-6 mx-auto mb-2 text-green-500" />
                    <div className="text-2xl font-bold">{challenge.participants.length}</div>
                    <div className="text-xs text-muted-foreground">Players</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Your Name</label>
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-purple-500"
                    maxLength={20}
                  />
                </div>
                <Button 
                  onClick={handleJoin}
                  disabled={!playerName.trim()}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
                >
                  Join Challenge
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold mb-2">You&apos;re In!</h1>
                <p className="text-muted-foreground">
                  Waiting for the host to start the challenge...
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <h3 className="font-semibold">Participants ({challenge.participants.length})</h3>
                {challenge.participants.map((p) => (
                  <div key={p.userId} className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                    <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-full" />
                    <span className="font-medium">{p.name}</span>
                    {p.userId === challenge.hostId && (
                      <span className="ml-auto text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        Host
                      </span>
                    )}
                    {p.isReady && (
                      <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Ready
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <Link href={`/challenge/room?id=${challenge.id}`}>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                  Go to Challenge Room
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function JoinChallengePage() {
  return (
    <Suspense fallback={
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    }>
      <JoinChallengeContent />
    </Suspense>
  );
}
