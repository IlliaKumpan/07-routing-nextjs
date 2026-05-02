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
    <article className="">
      <header className="">
        <h1 className="">{note.title}</h1>
        <div className="">
          <span className="">
            #{note.tag}
          </span>
        </div>
      </header>
      
      <div className="">
        <p className="">
          {note.text}
        </p>
      </div>

      <footer className="">
        ID нотатки: {note.id}
      </footer>
    </article>
  );
}