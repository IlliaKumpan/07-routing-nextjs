import css from '@/components/NoteDetails/NoteDetails.module.css';

interface Note {
  id: string;
  title: string;
  text?: string;
  tag?: string;
}

interface Props {
  params: {
    tag?: string[];
  };
}
async function getNotes(tag?: string): Promise<Note[]> {
  const queryParam = tag && tag !== 'all' ? `?tag=${tag}` : '';
  
  const res = await fetch(`https://your-api.com/notes${queryParam}`, {
    cache: 'no-store',
  });
  
  if (!res.ok) throw new Error('Failed to fetch notes');
  
  return res.json();
}

export default async function FilteredNotesPage({ params }: Props) {
  // Витягуємо сегмент тегу з масиву
  const currentTag = params.tag?.[0];
  const notes = await getNotes(currentTag);

  return (
    <div className={css.container}>
      <h2 className={css.pageTitle}>
        Notes: {currentTag && currentTag !== 'all' ? currentTag : 'All'}
      </h2>
      
      <ul className={css.notesList}>
        {notes.map((note) => (
          // Тепер TypeScript знає, що у note є id та title
          <li key={note.id} className={css.noteItem}>
            {note.title}
          </li>
        ))}
      </ul>
    </div>
  );
}