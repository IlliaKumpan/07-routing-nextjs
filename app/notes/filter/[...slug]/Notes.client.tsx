'use client';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import Link from 'next/link';

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  // Запит даних через useQuery
  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', { tag, page, search: debouncedSearch }],
    queryFn: () => fetchNotes({ 
      tag: tag === 'all' ? undefined : tag, 
      page, 
      search: debouncedSearch 
    }),
  });

  if (isError) return <p className="">Помилка завантаження даних.</p>;

  const notes = data?.notes || [];

  return (
    <div className="container">
      <div className="">
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=""
        />
        <button className="">Add Note</button>
      </div>

      {isLoading ? (
        <p className="">Завантаження...</p>
      ) : notes.length === 0 ? (
        <p className="">Нотаток не знайдено.</p>
      ) : (
        <div className="">
          {notes.map((note) => (
            <Link key={note.id} href={`/notes/${note.id}`} className="note-card">
              <article>
                <h3 className="">{note.title}</h3>
                <p className="">
                  {note.content || note.text}
                </p>
                <span className="">#{note.tag}</span>
              </article>
            </Link>
          ))}
        </div>
      )}

      {data?.totalPages && data.totalPages > 1 && (
        <div className="pagination">
          <button 
            disabled={page <= 1} 
            onClick={() => setPage(p => p - 1)}
            className="p-btn"
          >
            Prev
          </button>
          <span className="">Page {page} of {data.totalPages}</span>
          <button 
            disabled={page >= data.totalPages} 
            onClick={() => setPage(p => p + 1)}
            className=""
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}