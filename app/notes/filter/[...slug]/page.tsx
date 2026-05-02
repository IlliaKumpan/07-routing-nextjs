import NotesClient from './Notes.client';
interface FilteredNotesPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

async function getNotes(slug: string[]) {
  const baseUrl = 'https://notehub-public.goit.study/api/notes';
  
  const currentTag = slug?.[0] || 'all';
  const url = (currentTag !== 'all') 
    ? `${baseUrl}?tag=${encodeURIComponent(currentTag)}` 
    : baseUrl;

  const res = await fetch(url, { 
    cache: 'no-store',
    headers: {
      'Accept': 'application/json'
    }
  });
  
  if (!res.ok) {
    console.error(`Fetch failed: ${res.status} for URL: ${url}`);
    throw new Error('Не вдалося завантажити нотатки');
  }

  return res.json();
}

export default async function FilteredNotesPage({ params }: FilteredNotesPageProps) {
  const { slug } = await params;
  
  const notes = await getNotes(slug);

  return (
    <section className="notes-filter-section">
      <header className="mb-6 px-4">
        <h2 className="text-xl font-bold uppercase">
          Тег: {slug[0] || 'all'}
        </h2>
      </header>

      <NotesClient notes={notes} />
    </section>
  );
}