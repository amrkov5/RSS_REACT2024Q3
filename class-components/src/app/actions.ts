'use server';

import { useSearchParams } from 'next/navigation';
import { Data } from '../types';

async function fetchData() {
  const searchParams = useSearchParams();
  const type = searchParams?.get('type');
  const search = searchParams?.get('search');
  const page = searchParams?.get('page');
  const linkToFetch = `https://swapi.dev/api/${type || 'people'}/?search=${search || ''}${Number(page) > 1 ? `&page=${page}` : ''}`;
  const res = await fetch(linkToFetch);
  const results = await res.json();
  results.resource = type || 'people';
  const info = await results;
  if (!info.detail) {
    info.results.forEach((el: Data) => {
      const elWithid = el;
      elWithid.id = String(Date.parse(el.created));
      return elWithid;
    });
  }

  return info;
}
