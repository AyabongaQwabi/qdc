'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Alert, AlertDescription } from './ui/alert';

export default function DocumentUpload() {
  const [documentType, setDocumentType] = useState('');
  const [fileTitle, setFileTitle] = useState('');
  const [year, setYear] = useState('');
  const [grade, setGrade] = useState('');
  const [department, setDepartment] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (selectedFile) {
      handleFileUpload();
    }
  }, [selectedFile]);

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('use', documentType);
    formData.append('type', 'document');
    formData.append('fileTitle', fileTitle);
    formData.append('year', year);
    formData.append('grade', grade);
    formData.append('department', department);

    try {
      await axios.post('/api/add-file', formData);

      const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dhrndsuey/upload';
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append('file', selectedFile);
      cloudinaryFormData.append('upload_preset', 'v2f3pxl6');

      await axios.post(cloudinaryUrl, cloudinaryFormData);

      setMessage('Document uploaded successfully!');
    } catch (error) {
      setMessage('Failed to upload document. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className='mb-8'>
      <h2 className='text-2xl font-semibold mb-2'>
        Share a Document with the Family
      </h2>
      <p className='mb-4'>
        You can upload an important file you wish to share with the family.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFileUpload();
        }}
        className='space-y-4'
      >
        <div className='space-y-2'>
          <Label htmlFor='documentType'>Document Type</Label>
          <Select onValueChange={(value) => setDocumentType(value)}>
            <SelectTrigger id='documentType'>
              <SelectValue placeholder='Select Document Type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='business'>Business</SelectItem>
              <SelectItem value='government'>Government</SelectItem>
              <SelectItem value='work'>Work</SelectItem>
              <SelectItem value='study'>Study</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {documentType && (
          <>
            <div className='space-y-2'>
              <Label htmlFor='fileTitle'>File Title</Label>
              <Input
                id='fileTitle'
                value={fileTitle}
                onChange={(e) => setFileTitle(e.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='year'>Year</Label>
              <Input
                id='year'
                type='number'
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            {documentType === 'study' && (
              <div className='space-y-2'>
                <Label htmlFor='grade'>Grade</Label>
                <Input
                  id='grade'
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                />
              </div>
            )}
            {documentType === 'work' && (
              <div className='space-y-2'>
                <Label htmlFor='department'>Department</Label>
                <Input
                  id='department'
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>
            )}
          </>
        )}
        <div className='space-y-2'>
          <Label htmlFor='file'>File</Label>
          <Input
            id='file'
            type='file'
            onChange={(e) =>
              setSelectedFile(e.target.files ? e.target.files[0] : null)
            }
          />
        </div>
        <Button type='submit'>Upload File</Button>
      </form>
      {message && (
        <Alert className='mt-4'>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
