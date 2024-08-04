import { ReactNode, useContext } from 'react';
import Link from 'next/link';
import { ThemeContext } from '../components/ThemeContext';

function NotFound(): ReactNode {
  // const theme = useContext(ThemeContext);
  return (
    <>
      <div className="not-found">
        <h1>Oops. Not found...</h1>
      </div>
      <Link href="/?type=people&page=1">Return to main</Link>
    </>
  );
}

export default NotFound;
