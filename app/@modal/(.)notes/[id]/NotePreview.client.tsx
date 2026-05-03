'use client'; 

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { type Note } from '@/types/note'; // Глобальний тип
import { useRouter } from 'next/navigation';

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();
  
  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p className="">Завантаження нотатки...</p>;
  if (isError || !note) return <p className="">Помилка завантаження.</p>;

  return (
    <article className="">
      <button 
        onClick={() => router.back()} 
        className="" 
      >
        Закрити
      </button>
      
      <header className="">
        <h1 className="">{note.title}</h1>
        <div className="">
          <span className="">#{note.tag}</span>
        </div>
      </header>
      
      <div className="">
        {/* Змінено з note.text на note.content */}
        <p className="">{note.content}</p>
      </div>

      <footer className="">
        <div>ID: {note.id}</div>
        {/* createdAt тепер доступний з глобального типу Note */}
        {note.createdAt && (
          <div>Створено: {new Date(note.createdAt).toLocaleDateString()}</div>
        )}
      </footer>
    </article>
  );
}