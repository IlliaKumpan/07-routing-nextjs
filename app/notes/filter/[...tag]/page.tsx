interface Note {
  id: string;
  title: string;
  text: string;
  tag: string;
}

interface Props {
  params: {
    tag: string[]; 
  };
}
async function getNotes(tag?: string): Promise<Note[]> {
  const queryParam = tag && tag !== 'all' ? `?tag=${tag}` : '';
  
  const res = await fetch(`https://notehub-public.goit.study/api/notes${queryParam}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch notes');
  }

  return res.json();
}

export default async function FilteredNotesPage({ 
  params 
}: { 
  params: Promise<{ tag: string[] }> 
}) {
  const { tag } = await params;
  const currentTag = tag[0];
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