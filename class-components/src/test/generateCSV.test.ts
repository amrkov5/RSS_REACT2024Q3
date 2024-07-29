import generateCSV from '../service/generateCSV';
import { mockAPIResponse } from './mockdata';

describe('CSV generator', () => {
  const expectedResult =
    'id,average_height,average_lifespan,classification,created,designation,edited,eye_colors,films,hair_colors,homeworld,language,name,people,skin_colors,url\n123456,180,120,mammal,2014-12-10T13:52:11.567100Z,sentient,2014-12-20T21:36:42.136000Z,brown; blue; green; hazel; grey; amber,https://swapi.dev/api/films/1/ https://swapi.dev/api/films/2/ https://swapi.dev/api/films/3/ https://swapi.dev/api/films/4/ https://swapi.dev/api/films/5/ https://swapi.dev/api/films/6/,blonde; brown; black; red,https://swapi.dev/api/planets/9/,Galactic Basic,Human,https://swapi.dev/api/people/66/ https://swapi.dev/api/people/67/ https://swapi.dev/api/people/68/ https://swapi.dev/api/people/74/,caucasian; black; asian; hispanic,https://swapi.dev/api/species/1/';
  it('data for CSV are generated', () => {
    expect(generateCSV([mockAPIResponse.results[0]])).toEqual(expectedResult);
  });
});
