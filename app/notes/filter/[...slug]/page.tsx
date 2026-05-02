import NotesClient from './Notes.client';

interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

async function getNotes(tag?: string) {
  const baseUrl = 'https://notehub-public.goit.study/api/notes';
  const url = tag && tag !== 'all' ? `${baseUrl}?tag=${tag}` : baseUrl;

  const res = await fetch(url, { cache: 'no-store' });
  
  if (!res.ok) {
    throw new Error('Не вдалося завантажити нотатки');
  }

  return res.json();
}

export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = await params;
  const currentTag = slug[0];

  const notes = await getNotes(currentTag);

  return (
    <section>
      <header className="px-4 py-2 border-b">
        <h2 className="text-xl font-bold uppercase">Тег: {currentTag}</h2>
      </header>
      <NotesClient notes={notes} />
    </section>
  );
}