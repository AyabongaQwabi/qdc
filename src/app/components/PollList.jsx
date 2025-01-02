'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';

export default function PollList() {
  const [polls, setPolls] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/polls')
      .then((response) => response.json())
      .then((data) => setPolls(data))
      .catch((err) => setError('Failed to load polls'));
  }, []);

  const handleVote = async (pollId, optionIndex) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/polls/${pollId}/vote`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ optionIndex }),
        }
      );
      if (response.ok) {
        // Refresh polls after voting
        const updatedPolls = await fetch(
          'http://localhost:3000/api/polls'
        ).then((res) => res.json());
        setPolls(updatedPolls);
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
        <Card key={poll.id}>
          <CardHeader>
            <CardTitle>{poll.question}</CardTitle>
          </CardHeader>
          <CardContent>
            {poll.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleVote(poll.id, index)}
                className='mr-2 mb-2'
              >
                {option}
              </Button>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
