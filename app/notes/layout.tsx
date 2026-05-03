export default function NotesLayout({
  children,
  sidebar 
}: {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}) {
  return (
    <div className="notes-container">
      <aside>{sidebar}</aside> 
      
      <section className="notes-list">
        {children}
      </section>
    </div>
  );
}