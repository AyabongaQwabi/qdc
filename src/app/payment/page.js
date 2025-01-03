'use client';

import Header from '../components/Header';
import Component from '../components/PaymentForm';
export default function Home() {
  return (
    <div className='min-h-screen py-8 bg-amber-100 text-gray-800'>
      <div className='container mx-auto px-4'>
        <div className='max-w-3xl mx-auto'>
          <Header />
          <Component />
        </div>
      </div>
    </div>
  );
}
