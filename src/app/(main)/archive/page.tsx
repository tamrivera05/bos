"use client"

import DocumentRequestForm from "./document-request-form"

export default function DocumentRequest () {
    return (
        <div className="container mx-auto py-10 px-6">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-center text-[#1F2937]">Document Request Form</h1>
            <p className="text-muted-foreground text-center mb-8">Fill out this form to request official documents from the barangay office.</p>

            <DocumentRequestForm />
        </div>
    )
}