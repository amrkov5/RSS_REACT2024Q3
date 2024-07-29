import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { clearList } from '../slices/selectedItemsSlice';
import { updateIsLoading, updateShowLoader } from '../slices/headerSlice';

function ResourceSelector(): ReactNode {
  const dispatch = useDispatch();
  const router = useRouter();

  const onSetType = (value: string) => {
    const newQuery = { ...router.query, type: value, page: 1 };
    dispatch(clearList());
    dispatch(updateShowLoader(true));
    dispatch(updateIsLoading(true));

    router.push({ query: newQuery });
  };

  return (
    <label htmlFor="resources" className="resource-label">
      Choose search type:
      <select
        id="resources"
        onChange={(e) => {
          onSetType(e.target.value);
        }}
        value={router.query.type || 'people'}
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
