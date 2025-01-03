'use client';

import Header from './components/Header';
import ActionButtons from './components/ActionButtons';
import AdditionalActions from './components/AdditionalActions';
import ContactListUpload from './components/ContactListUpload';
import DocumentUpload from './components/DocumentUpload';

export default function Home() {
  return (
    <div className='min-h-screen py-8 bg-amber-100 text-gray-800'>
      <div className='container mx-auto px-4'>
        <div className='max-w-3xl mx-auto'>
          <Header />
          <p className='mb-8 text-lg'>
            Welcome to the Qwabi Family website. Here you can manage family
            information, contribute to projects, and participate in family
            activities.
          </p>
          <ActionButtons />
          <AdditionalActions />
          <ContactListUpload />
          <DocumentUpload />
        </div>
      </div>
    </div>
  );
}
