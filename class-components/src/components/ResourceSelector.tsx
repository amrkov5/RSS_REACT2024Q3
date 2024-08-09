'use client';

import { ReactNode } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { clearList } from '../slices/selectedItemsSlice';
import { updateIsLoading, updateShowLoader } from '../slices/headerSlice';
import useDataFromLS from '../hooks/useDataFromLS';

function ResourceSelector(): ReactNode {
  const dispatch = useDispatch();
  const router = useRouter();
  const [typeFromLS, setTypeFromLS] = useDataFromLS('type');
  const searchParams = useSearchParams();

  const onSetType = (value: string) => {
    const newQuery = `/${value}${searchParams.get('search') ? `?search=${searchParams.get('search')}` : ''}`;
    dispatch(clearList());
    dispatch(updateShowLoader(true));
    dispatch(updateIsLoading(true));
    setTypeFromLS(value);
    router.push(newQuery);
  };

  return (
    <label htmlFor="resources" className="resource-label">
      Choose search type:
      <select
        id="resources"
        onChange={(e) => {
          onSetType(e.target.value);
        }}
        value={typeFromLS || 'people'}
        className="resource-selector"
        data-testid="type-selector"
      >
        <option value="people">People</option>
        <option value="films">Movies</option>
        <option value="vehicles">Vehicles</option>
        <option value="planets">Planets</option>
        <option value="species">Species</option>
        <option value="starships">Starships</option>
      </select>
    </label>
  );
}

export default ResourceSelector;
