import { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDataFromLS from '../hooks/useDataFromLS';
import { selectType, updatePage, updateType } from '../slices/headerSlice';
import { clearList } from '../slices/selectedItemsSlice';

function ResourceSelector(): ReactNode {
  const dispatch = useDispatch();
  const typeFromLS = useSelector(selectType);
  const [, setType] = useDataFromLS('type');

  const onSetType = (value: string) => {
    setType(value);
    dispatch(updateType({ type: value }));
    dispatch(updatePage({ page: 1 }));
    dispatch(clearList());
  };

  return (
    <label htmlFor="resources" className="resource-label">
      Choose search type:
      <select
        id="resources"
        onChange={(e) => {
          onSetType(e.target.value);
        }}
        value={typeFromLS}
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
