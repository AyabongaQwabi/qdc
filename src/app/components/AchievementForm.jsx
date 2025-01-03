'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription } from './ui/alert';

export default function AchievementForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [achiever, setAchiever] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/achievement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, achiever, date }),
      });
      if (response.ok) {
        setMessage('Achievement added successfully!');
      } else {
        throw new Error('Failed to add achievement');
      }
    } catch (error) {
      setMessage('Failed to add achievement. Please try again.');
    }
  };

  return (
    <div className='space-y-4'>
      <div>
        <Label htmlFor='title'>Achievement Title</Label>
        <Input
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor='description'>Description</Label>
        <Textarea
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor='achiever'>Achiever</Label>
        <Input
          id='achiever'
          value={achiever}
          onChange={(e) => setAchiever(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor='date'>Date</Label>
        <Input
          id='date'
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <Button onClick={handleSubmit}>Add Achievement</Button>
      {message && (
        <Alert>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
