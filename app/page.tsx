'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import styles from './page.module.css'; 

export default function HomePage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes'],
    queryFn: () => fetchNotes({ page: 1, perPage: 12 }),
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>NoteHub</h1>
      
      {isLoading && <p className={styles.loader}>Завантаження нотаток...</p>}
      
      {isError && <p className={styles.error}>Помилка завантаження даних</p>}

      {data?.notes && (
        <section className={styles.notesSection}>
          <NoteList notes={data.notes} />
        </section>
      )}
    </div>
  );
}