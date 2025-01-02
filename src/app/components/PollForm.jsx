'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';

export default function PollForm() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [message, setMessage] = useState('');

  const handleOptionChange = (index, valueg) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/polls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, options }),
      });
      if (response.ok) {
        setMessage('Poll created successfully!');
      } else {
        throw new Error('Failed to create poll');
      }
    } catch (error) {
      setMessage('Failed to create poll. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <Label htmlFor='question'>Poll Question</Label>
        <Input
          id='question'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
      </div>
      {options.map((option, index) => (
        <div key={index}>
          <Label htmlFor={`option-${index}`}>Option {index + 1}</Label>
          <Input
            id={`option-${index}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            required
          />
        </div>
      ))}
      <Button type='button' onClick={addOption} variant='outline'>
        Add Option
      </Button>
      <Button type='submit'>Create Poll</Button>
      {message && (
        <Alert>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}
