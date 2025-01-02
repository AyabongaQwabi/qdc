'use client';

import { useState } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';

export default function ContactListUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleCSVUpload = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'v2f3pxl6');

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dhrndsuey/raw/upload',
        {
          method: 'POST',
          body: data,
        }
      );

      if (response.ok) {
        const result = await response.json();
        const fileData = {
          url: result.secure_url,
          type: 'csv',
          filename: result.original_filename,
          use: 'contact-list',
        };

        await axios.post(
          `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/add-file`,
          fileData
        );
        setMessage('Contact list uploaded successfully!');
      } else {
        throw new Error('Failed to upload file to Cloudinary');
      }
    } catch (error) {
      setMessage('Failed to upload contact list. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className='mb-8'>
      <h2 className='text-2xl font-semibold mb-2'>Upload Contact List CSV</h2>
      <p className='mb-4'>
        We are collecting contact lists to create a central contact list
        database to be shared between all family members.
      </p>
      <div className='flex items-center space-x-4 mb-4'>
        <Input type='file' onChange={handleFileChange} />
        <Button onClick={handleCSVUpload}>Upload</Button>
      </div>
      {message && (
        <Alert>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
