'use client'; 
import React from 'react';
interface Note {
  id: string;
  title: string;
  text: string;
  tag: string;
}

interface NotePreviewClientProps {
  note: Note;
}

export default function NotePreviewClient({ note }: NotePreviewClientProps) {
  return (
    <article className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <header className="mb-4 border-b pb-2">
        <h1 className="text-3xl font-bold text-gray-900">{note.title}</h1>
        <div className="mt-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            #{note.tag}
          </span>
        </div>
      </header>
      
      <div className="prose prose-blue max-w-none">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {note.text}
        </p>
      </div>

      <footer className="mt-8 pt-4 border-t text-sm text-gray-500">
        ID нотатки: {note.id}
      </footer>
    </article>
  );
}