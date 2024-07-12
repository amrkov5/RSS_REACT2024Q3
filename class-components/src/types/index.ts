import { Dispatch, ReactNode, SetStateAction } from 'react';

type HeaderProps = {
  throwFetchError: Dispatch<SetStateAction<boolean>>;
  wholeAppError: Dispatch<SetStateAction<boolean>>;
  updateText: (text: string) => void | undefined;
  updateType: (type: string) => void | undefined;
};

type SelectorAndInputProps = {
  onChange: Dispatch<SetStateAction<string>>;
};

type MainProps = {
  dataToPaint: APIResponse | null;
  fetchError: null | boolean;
  setLink: (nextLink: string) => void;
  setPage: (nextPage: number) => void;
  page: number;
};

type Movies = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  species: string[];
  starships: string[];
  vehicles: string[];
  characters: string[];
  planets: string[];
  url: string;
  created: string;
  edited: string;
};

type People = {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string[];
  skin_color: string;
  homeworld: string;
  films: string[];
  species: string[];
  starships: string[];
  vehicles: string[];
  url: string;
  created: string;
  edited: string;
};

type Starships = {
  name: string;
  model: string;
  starship_class: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  films: string[];
  pilots: string[];
  url: string;
  created: string;
  edited: string;
};

type Vehicles = {
  name: string;
  model: string;
  vehicle_class: string;
  manufacturer: string;
  length: string;
  cost_in_credits: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  cargo_capacity: string;
  consumables: string;
  films: string[];
  pilots: string[];
  url: string;
  created: string;
  edited: string;
};

type Species = {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  average_lifespan: string;
  eye_colors: string;
  skin_colors: string;
  language: string;
  homeworld: string;
  people: string[];
  films: string[];
  url: string;
  created: string;
  edited: string;
};

type Planets = {
  name: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  residents: string[];
  films: string[];
  url: string;
  created: string;
  edited: string;
};

interface APIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  resource: keyof FieldsToShow;
  results:
    | Movies[]
    | People[]
    | Starships[]
    | Species[]
    | Vehicles[]
    | Planets[];
}

type Data = Movies | People | Starships | Species | Vehicles | Planets;
type APIResults = {
  data: Data;
  resource: keyof FieldsToShow;
};

type FieldsToShow = {
  films: string[];
  people: string[];
  planets: string[];
  vehicles: string[];
  species: string[];
  starships: string[];
};

type ErrorBoundaryProps = {
  msg: string;
  tryAgain?: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
};

type ErrorBoundaryState = {
  error: boolean;
};

type ButtonBlockProps = {
  prev: string;
  next: string;
  setLink: (nextLink: string) => void;
  setPage: (nextPage: number) => void;
  page: number;
};

type LayoutProps = HeaderProps & {
  setLink: (nextLink: string) => void;
  setPage: (nextPage: number) => void;
};

export type {
  APIResponse,
  SelectorAndInputProps,
  HeaderProps,
  MainProps,
  APIResults,
  FieldsToShow,
  Data,
  ErrorBoundaryProps,
  ErrorBoundaryState,
  ButtonBlockProps,
  LayoutProps,
};
