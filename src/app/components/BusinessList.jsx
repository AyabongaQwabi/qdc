'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';

export default function BusinessList() {
  const [businesses, setBusinesses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/businesses')
      .then((response) => response.json())
      .then((data) => setBusinesses(data))
      .catch((err) => setError('Failed to load businesses'));
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
      {businesses.map((business) => (
        <Card key={business.id}>
          <CardHeader>
            <CardTitle>{business.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{business.description}</p>
            <p className='font-bold'>Owner: {business.owner}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
