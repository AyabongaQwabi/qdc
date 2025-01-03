'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription } from './ui/alert';

export default function JobPostForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, company, location, salary }),
      });
      if (response.ok) {
        setMessage('Job post added successfully!');
      } else {
        throw new Error('Failed to add job post');
      }
    } catch (error) {
      setMessage('Failed to add job post. Please try again.');
    }
  };

  return (
    <div className='space-y-4'>
      <div>
        <Label htmlFor='title'>Job Title</Label>
        <Input
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor='description'>Job Description</Label>
        <Textarea
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor='company'>Company</Label>
        <Input
          id='company'
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor='location'>Location</Label>
        <Input
          id='location'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor='salary'>Salary</Label>
        <Input
          id='salary'
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />
      </div>
      <Button onClick={handleSubmit}>Add Job Post</Button>
      {message && (
        <Alert>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
