'use client';

import { useState } from 'react';
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

export default function PaymentForm() {
  const [amount, setAmount] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, paymentType }),
      });
      if (response.ok) {
        setMessage('Payment submitted successfully!');
      } else {
        throw new Error('Payment submission failed');
      }
    } catch (error) {
      setMessage('Failed to submit payment. Please try again.');
    }
  };

  return (
    <div className='space-y-4'>
      <div>
        <Label htmlFor='amount'>Amount</Label>
        <Input
          id='amount'
          type='number'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor='paymentType'>Payment Type</Label>
        <Select onValueChange={setPaymentType} required>
          <SelectTrigger>
            <SelectValue placeholder='Select payment type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='trust'>Family Trust</SelectItem>
            <SelectItem value='project'>Project</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleSubmit}>Submit Payment</Button>
      {message && (
        <Alert>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
