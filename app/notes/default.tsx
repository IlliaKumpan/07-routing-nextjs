'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import styles from './NotesPage.module.css'; 

export default function NotesDefault() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes'],
    queryFn: () => fetchNotes({ page: 1, perPage: 10 }),
  });

  if (isLoading) return <div className={styles.centered}>Завантаження...</div>;
  if (isError) return <div className={styles.centered}>Помилка завантаження.</div>;

  return (
    <div className={styles.container}>
      {data?.notes && <NoteList notes={data.notes} />}
    </div>
  );
}