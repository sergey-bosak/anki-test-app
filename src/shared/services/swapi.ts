import {ISwapiService} from '../types/swapi';
import axios from 'axios';

export class SwapiService implements ISwapiService {
  getPeople: ISwapiService['getPeople'] = async pageNumber => {
    const {data} = await axios.get(
      `https://swapi.dev/api/people/?page=${pageNumber}`,
    );
    return data;
  };
}
