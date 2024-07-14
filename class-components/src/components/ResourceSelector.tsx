import { ReactNode, useEffect } from 'react';
import { SelectorAndInputProps } from '../types';
import useDataFromLS from '../hooks/useDataFromLS';

function ResourceSelector({ onChange }: SelectorAndInputProps): ReactNode {
  const [type, setType] = useDataFromLS('type');
  useEffect(() => {
    onChange(type);
  }, [type]);

  return (
    <label htmlFor="resources" className="resource-label">
      Choose search type:
      <select
        id="resources"
        onChange={(e) => {
          setType(e.target.value);
        }}
        value={type || 'people'}
        className="resource-selector"
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
