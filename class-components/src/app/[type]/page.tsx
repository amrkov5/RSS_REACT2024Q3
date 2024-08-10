import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import CardList from './dataLoader';
import Loader from '../../components/Loader';
import ErrorBoundary from '../../components/Error';

export default async function CardListPage({
  params,
  searchParams,
}: {
  params: { type: string };
  searchParams: { search: string; page: string; id: string };
}) {
  const typeArr = [
    'people',
    'films',
    'vehicles',
    'species',
    'starships',
    'planets',
  ];
  if (!typeArr.find((el) => el === params.type)) {
    notFound();
  }

  return (
    <ErrorBoundary fetchError msg="Failed to fetch data">
      <Suspense
        key={searchParams.search + searchParams.page}
        fallback={<Loader />}
      >
        <CardList path={params} search={searchParams} />
      </Suspense>
    </ErrorBoundary>
  );
}
