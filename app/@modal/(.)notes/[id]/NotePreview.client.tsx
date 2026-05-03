'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { Modal } from '@/components/Modal/Modal';

interface NotePreviewProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewProps) {
  const router = useRouter();

  // Отримуємо дані через React Query (використовує префетч із сервера)
  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  // Обробка стану закриття модалки
  const handleClose = () => {
    router.back();
  };

  if (isLoading) return <p className="status">Завантаження...</p>;
  if (isError || !note) return <p className="status-error">Помилка завантаження нотатки.</p>;

  return (
    <Modal onClose={handleClose}>
      <article className="preview-container">
        <header className="preview-header">
          <h1 className="preview-title">{note.title}</h1>
          <button onClick={handleClose} className="btn-close" aria-label="Close">
            &times;
          </button>
        </header>

        <div className="preview-meta">
          <span className="tag">#{note.tag}</span>
          <time className="date">
            {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : 'Дата не вказана'}
          </time>
        </div>

        <div className="preview-content">
          <p className="text">{note.text}</p>
        </div>

        <footer className="footer">
          <p className="note-id">ID: {note.id}</p>
        </footer>
      </article>
    </Modal>
  );
}