import Link from 'next/link';
import styles from './NoteList.module.css';
import { type Note } from '@/types/note';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  return (
    <ul className={styles.list}>
      {notes.map((note) => (
        <li key={note.id} className={styles.listItem}>
          <h3 className={styles.title}>{note.title}</h3>
          <p className={styles.content}>{note.text}</p>
          <div className={styles.footer}>
            <span className={styles.tag}>#{note.tag}</span>
            <Link href={`/notes/${note.id}`} className={styles.link}>
              Детальніше
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}