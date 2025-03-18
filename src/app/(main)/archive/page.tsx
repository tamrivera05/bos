'use server';

import DocumentRequestForm from './document-request-form';

import React from 'react';

const DocumentRequest = () => {
  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="mb-2 text-center text-3xl font-extrabold text-[#1F2937] md:text-4xl">
        Document Request Form
      </h1>
      <p className="mb-8 text-center text-muted-foreground">
        Fill out this form to request official documents from the barangay
        office.
      </p>

      <DocumentRequestForm />
    </div>
  );
};

export default DocumentRequest;
