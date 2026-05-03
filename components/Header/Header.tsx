import Link from 'next/link';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          NoteHub
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/" className={styles.navLink}>Notes</Link>
        </nav>
      </div>
    </header>
  );
};