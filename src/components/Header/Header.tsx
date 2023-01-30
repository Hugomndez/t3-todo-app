import dynamic from 'next/dynamic';
import Link from 'next/link';
import styles from './Header.module.css';

const ToggleThemeMode = dynamic(
  () => import('components/ToggleThemeMode/ToggleThemeMode'),
  {
    ssr: false,
  }
);

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Link href="/">Todo</Link>
      </h1>
      <ToggleThemeMode />
    </header>
  );
};

export default Header;
