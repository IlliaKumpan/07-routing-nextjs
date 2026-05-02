interface Note {
  id: string;
  title: string;
  text: string;
  tag: string;
}

interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

async function getNotes(tag?: string): Promise<Note[]> {
  const queryParam = tag && tag !== 'all' ? `?tag=${tag}` : '';
  const res = await fetch(`https://your-api-domain.com/notes${queryParam}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = await params; // Розпаковуємо slug
  const currentTag = slug[0];    // Беремо перший сегмент як наш тег

  const notes = await getNotes(currentTag);

  return (
    <div>
      <h2>Notes: {currentTag === 'all' ? 'All' : currentTag}</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.tag}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}