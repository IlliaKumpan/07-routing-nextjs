'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { Modal } from '@/components/Modal/Modal';
import styles from '@/components/NotePreview/NotePreview.module.css'; 

interface NotePreviewProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewProps) {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) return <div className={styles.status}>Завантаження...</div>;
  if (isError || !note) return <div className={styles.error}>Помилка завантаження.</div>;

  return (
    <Modal onClose={handleClose}>
      <article className={styles.previewCard}>
        <header className={styles.header}>
          <h1 className={styles.title}>{note.title}</h1>
          <button onClick={handleClose} className={styles.closeBtn}>&times;</button>
        </header>

        <div className={styles.body}>
          <span className={styles.tag}>#{note.tag}</span>
          <p className={styles.text}>{note.text}</p>
        </div>

        <footer className={styles.footer}>
          <time className={styles.date}>
            Створено: {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : '—'}
          </time>
          <span className={styles.noteId}>ID: {note.id}</span>
        </footer>
      </article>
    </Modal>
  );
}