import { FieldsToShow } from './types';

const BASE = 'https://swapi.dev/api/';

// const RESOURCES = [
//   'films',
//   'people',
//   'planets',
//   'species',
//   'starships',
//   'vehicles',
// ];

const FIELDS_TO_SHOW: FieldsToShow = {
  films: ['title', 'director', 'release_date', 'opening_crawl'],
  people: ['name', 'gender', 'height', 'birth_year', 'eye_color'],
  planets: ['name', 'gravity', 'terrain', 'gravity', 'climate'],
  vehicles: ['name', 'model', 'crew', 'passengers', 'cargo_capacity'],
  species: [
    'name',
    'classification',
    'language',
    'average_height',
    'average_lifespan',
  ],
  starships: ['name', 'model', 'crew', 'passengers', 'length'],
};

export { BASE, FIELDS_TO_SHOW };
