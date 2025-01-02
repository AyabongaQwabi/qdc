'use client';

import { useState } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';

export default function AdditionalActions() {
  const [message, setMessage] = useState('');

  const sendStatsMessage = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/stats`, {});
      setMessage('Stats sent successfully!');
    } catch (error) {
      setMessage('Failed to send stats. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className='mb-8'>
      <h2 className='text-2xl font-semibold mb-4'>
        More things you can do on this website
      </h2>
      <ul className='list-disc list-inside space-y-2 mb-4'>
        <li>
          <a href='/deceased' className='text-blue-600 hover:underline'>
            Provide deceased person details
          </a>
        </li>
        <li>
          <a href='/medical-info' className='text-blue-600 hover:underline'>
            Provide medical information
          </a>
        </li>
        <li>
          <a href='/education-info' className='text-blue-600 hover:underline'>
            Provide Education and Occupational information
          </a>
        </li>
        <li>
          <Button
            variant='link'
            className='p-0 h-auto text-blue-600 hover:underline'
            onClick={sendStatsMessage}
          >
            Send Stats to Family WhatsApp Group
          </Button>
        </li>
      </ul>
      {message && (
        <Alert>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
