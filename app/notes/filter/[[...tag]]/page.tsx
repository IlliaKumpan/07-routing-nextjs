interface Note {
  id: string;
  title: string;
}

async function getNotes(tag?: string): Promise<Note[]> {
  const queryParam = tag && tag !== 'all' ? `?tag=${tag}` : '';
  const res = await fetch(`https://api.example.com/notes${queryParam}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed');
  return res.json();
}

export default async function FilteredNotesPage({ params }: { params: { tag: string } }) {
  const notes = await getNotes(params.tag);

  return (
    <div>
      <h2>Notes: {params.tag === 'all' ? 'All' : params.tag}</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  );
}