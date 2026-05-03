'use client';

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { type Note } from '@/types/note'; // Імпортуємо правильний тип
import Link from 'next/link';

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', { tag, page, search: debouncedSearch }],
    queryFn: () => fetchNotes({ tag, page, search: debouncedSearch }),
  });

  if (isError) return <p className="">Сталася помилка при завантаженні нотаток.</p>;

  const notes = data?.notes || [];

  return (
    <div className="">
      <div className="px-4 mb-4">
        <input
          type="text"
          placeholder="Пошук нотаток..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="" 
        />
      </div>

      {isLoading ? (
        <p className="">Завантаження...</p>
      ) : notes.length === 0 ? (
        <p className="px-4">Нотаток не знайдено.</p>
      ) : (
        <div className="">
          {notes.map((note: Note) => (
            <Link 
              key={note.id} 
              href={`/notes/${note.id}`}
              className=""
            >
              <article>
                <h3 className="">{note.title}</h3>
                {/* Змінено з note.text на note.content згідно з типами GoIT API */}
                <p className="">{note.content}</p>
                <span className="">#{note.tag}</span>
              </article>
            </Link>
          ))}
        </div>
      )}

      {data && data.totalPages > 1 && (
        <div className="flex gap-2 px-4 mt-4">
          {Array.from({ length: data.totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              disabled={page === i + 1}
              className="" 
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}