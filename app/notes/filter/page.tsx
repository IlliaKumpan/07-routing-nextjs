import FilteredNotesPage from './[...tag]/page';

export default async function DefaultFilterPage() {
  // Викликаємо ту саму логіку, передаючи 'all' як значення за замовчуванням
  return <FilteredNotesPage params={{ tag: ['all'] }} />;
}