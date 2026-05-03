'use client';

import React from 'react';
import Link from 'next/link';

interface Note {
  id: string;
  title: string;
  text: string;
  tag: string;
}

interface NotesClientProps {
  notes: Note[];
}

export default function NotesClient({ notes }: NotesClientProps) {
  if (notes.length === 0) {
    return (
      <div className="">
        <p className="">Нотаток за цим фільтром не знайдено.</p>
      </div>
    );
  }

  return (
    <div className="">
      {notes.map((note) => (
        <Link 
          key={note.id} 
          href={`/notes/${note.id}`}
          className=""
        >
          <article>
            <h3 className="">{note.title}</h3>
            <p className="">
              {note.text}
            </p>
            <span className="">
              #{note.tag}
            </span>
          </article>
        </Link>
      ))}
    </div>
  );
}