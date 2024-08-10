import React from 'react';
import Main from '../../components/Main';
import { Data } from '../../types';

const fetchData = async (pathParams: string, search: string, page: string) => {
  const linkToFetch = `https://swapi.dev/api/${pathParams || '/people'}/?search=${search || ''}${Number(page) > 1 ? `&page=${page}` : ''}`;
  const res = await fetch(linkToFetch);
  const results = await res.json();
  results.resource = pathParams || 'people';
  const info = await results;
  if (!info.detail) {
    info.results.forEach((el: Data) => {
      const elWithid = el;
      elWithid.id = String(Date.parse(el.created));
      return elWithid;
    });
  }
  return info;
};

async function CardList({
  path,
  search,
}: {
  path: { type: string };
  search: { search: string; page: string; id: string };
}) {
  const info = await fetchData(path.type, search.search, search.page);
  return <Main info={info} />;
}

export default CardList;
