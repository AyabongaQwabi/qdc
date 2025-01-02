'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';

export default function AchievementList() {
  const [achievements, setAchievements] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/achievements')
      .then((response) => response.json())
      .then((data) => setAchievements(data))
      .catch((err) => setError('Failed to load achievements'));
  }, []);

  if (error) {
    return (
      <Alert>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className='space-y-4'>
      {achievements.map((achievement) => (
        <Card key={achievement.id}>
          <CardHeader>
            <CardTitle>{achievement.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{achievement.description}</p>
            <p className='font-bold'>Achiever: {achievement.achiever}</p>
            <p>Date: {new Date(achievement.date).toLocaleDateString()}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
