import { 
  dehydrate, 
  HydrationBoundary, 
  QueryClient 
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api'; 
import NotesClient from './Notes.client';

interface FilteredNotesPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function FilteredNotesPage({ params }: FilteredNotesPageProps) {
  const { slug } = await params;
  const currentTag = slug?.[0] || 'all';
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', { tag: currentTag }],
    queryFn: () => fetchNotes({ tag: currentTag }),
  });

  return (
    <section className="notes-filter-section">
      <header className="mb-6 px-4">
        <h2 className="text-xl font-bold uppercase">
          Тег: {currentTag}
        </h2>
      </header>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient tag={currentTag} />
      </HydrationBoundary>
    </section>
  );
}