import { FieldsToShow } from './types';

// const BASE = 'https://swapi.dev/api/';

const FIELDS_TO_SHOW: FieldsToShow = {
  films: [
    'title',
    'director',
    'release_date',
    'opening_crawl',
    'producer',
    'episode_id',
  ],
  people: [
    'name',
    'gender',
    'height',
    'birth_year',
    'eye_color',
    'hair_color',
    'mass',
    'skin_color',
  ],
  planets: [
    'name',
    'gravity',
    'terrain',
    'gravity',
    'climate',
    'orbital_period',
    'population',
  ],
  vehicles: [
    'name',
    'model',
    'crew',
    'passengers',
    'cargo_capacity',
    'manufacturer',
    'max_atmosphering_speed',
  ],
  species: [
    'name',
    'classification',
    'language',
    'average_height',
    'average_lifespan',
    'designation',
    'hair_colors',
    'skin_colors',
  ],
  starships: ['name', 'model', 'crew', 'passengers', 'length'],
};

export default FIELDS_TO_SHOW;
