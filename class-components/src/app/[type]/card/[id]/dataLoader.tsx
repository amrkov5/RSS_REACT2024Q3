import SingleCard from '../../../../components/SingleCard';

const fetchData = async (pathParams: { type: string; id: string }) => {
  const linkToFetch = `https://swapi.dev/api/${pathParams.type}/${pathParams.id}`;
  const res = await fetch(linkToFetch);
  const results = await res.json();
  results.resource = pathParams || 'people';
  const info = await results;

  return info;
};

export default async function SingleCardLoader({
  params,
}: {
  params: { type: string; id: string };
}) {
  const info = await fetchData(params);
  return <SingleCard singleCard={info} />;
}
