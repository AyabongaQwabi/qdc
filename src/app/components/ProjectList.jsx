'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/project')
      .then((response) => response.json())
      .then((data) => setProjects(data.data))
      .catch((err) => setError('Failed to load projects'));
  }, []);

  if (error) {
    return (
      <Alert>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  console.log('Projects:', projects);
  return (
    <div className='space-y-4'>
      {projects.map((project) => (
        <Card key={project.id}>
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{project.description}</p>
            <p className='font-bold'>Funding Goal: ${project.goal}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
