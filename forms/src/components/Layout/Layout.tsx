import { NavLink, Outlet } from 'react-router-dom';
import styles from './layout.module.css';

export default function Layout() {
  return (
    <>
      <header className={styles.header}>
        <h2> RSS React Forms</h2>
        <nav>
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
