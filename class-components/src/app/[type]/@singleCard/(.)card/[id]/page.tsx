import { Suspense } from 'react';
import SingleCardLoader from './dataLoader';
import Loader from '../../../../../components/Loader';

export default async function CardListPage({
  params,
}: {
  params: { type: string; id: string };
}) {
  return (
    <Suspense fallback={<Loader />}>
      <SingleCardLoader params={params} />
    </Suspense>
  );
}
