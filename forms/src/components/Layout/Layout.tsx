import { Link, NavLink, Outlet } from 'react-router-dom';
import styles from './layout.module.css';

export default function Layout() {
  return (
    <>
      <header className={styles.header}>
        <Link to="/">RSS React Forms</Link>
        <nav className={styles.navigation}>
          <NavLink to={'/uncontrolled-form'}>Uncontrolled Form</NavLink>
          <NavLink to={'/controlled-form'}>Controlled Form</NavLink>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
}
