'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';

export default function JobPostList() {
  const [jobPosts, setJobPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/job')
      .then((response) => response.json())
      .then((data) => setJobPosts(data.data))
      .catch((err) => setError('Failed to load job posts'));
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
      {jobPosts.map((job) => (
        <Card key={job.id}>
          <CardHeader>
            <CardTitle>{job.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{job.description}</p>
            <p className='font-bold'>Company: {job.company}</p>
            <p>Location: {job.location}</p>
            <p>Salary: {job.salary}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
