import FilteredNotesPage from './[...tag]/page';

export default async function DefaultFilterPage() {
  return <FilteredNotesPage params={Promise.resolve({ tag: ['all'] })} />;
}