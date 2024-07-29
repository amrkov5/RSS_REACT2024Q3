import { ReactNode } from 'react';

function NotFoundBlock(): ReactNode {
  return (
    <h3 data-testid="nothing" className="not-found-block">
      Nothing was found...
    </h3>
  );
}

export default NotFoundBlock;
