'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';

export default function PollList() {
  const [polls, setPolls] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/poll')
      .then((response) => response.json())
      .then((data) => setPolls(data.data))
      .catch((err) => setError('Failed to load polls'));
  }, []);

  const handleVote = async (pollId, optionIndex) => {
    try {
      const response = await fetch(`http://localhost:3000/api/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ optionIndex, pollId }),
      });
      if (response.ok) {
        // Refresh polls after voting
        const updatedPolls = await fetch('http://localhost:3000/api/poll')
          .then((res) => res.json())
          .then((data) => setPolls(data.data));
      } else {
        throw new Error('Failed to vote');
      }
    } catch (error) {
      setError('Failed to vote. Please try again.');
    }
  };

  if (error) {
    return (
      <Alert>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className='space-y-4'>
      {polls.map((poll) => (
        <Card key={poll._id}>
          <CardHeader>
            <CardTitle>{poll.question}</CardTitle>
          </CardHeader>
          <CardContent>
            {poll.options.map((option, index) => (
              <div
                key={index}
                className='flex items-center justify-between mb-2'
              >
                <Button
                  onClick={() => handleVote(poll._id, index)}
                  className='mr-2'
                >
                  {option}
                </Button>
                <span className='text-sm text-gray-600'>
                  Votes: {poll.votes ? poll.votes[index] : 0}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
