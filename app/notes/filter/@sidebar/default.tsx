import Link from 'next/link';
const TAGS = ['all', 'work', 'personal', 'ideas', 'todo'];

export default function SidebarNavigation() {
  return (
    <nav className="sidebar-nav">
      <h2 className="sidebar-title">Categories</h2>
      <ul className="tag-list">
        {TAGS.map((tag) => (
          <li key={tag} className="tag-item">
            <Link 
              href={`/notes/filter/${tag}`}
              className="tag-link"
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}