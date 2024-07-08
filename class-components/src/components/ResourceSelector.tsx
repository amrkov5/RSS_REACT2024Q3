import { Component, ReactNode } from 'react';
import { ResourceSelectorProps } from '../types';

class ResourceSelector extends Component<
  ResourceSelectorProps,
  { type: string | null }
> {
  componentDidMount(): void {
    const { onTypeChange } = this.props;
    const typeFromLS: string | null = localStorage.getItem('type');
    if (typeFromLS) {
      onTypeChange(typeFromLS);
    } else {
      onTypeChange('people');
    }
  }

  handleChange(type: string) {
    const { onTypeChange } = this.props;
    localStorage.setItem('type', type);
    onTypeChange(type);
  }

  render(): ReactNode {
    const { curType } = this.props;
    return (
      <label htmlFor="resources" className="resource-label">
        Choose search type:
        <select
          id="resources"
          onChange={(e) => {
            this.handleChange(e.target.value);
          }}
          value={curType || 'people'}
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
}

export default ResourceSelector;
