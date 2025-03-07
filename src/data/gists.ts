import { Gist } from '../types/gist';
import { validateGist, validateGists } from '../utils/gist';
import axios from 'axios';

const API_URL = process.env.REACT_APP_ROOT_API_URL;

export const getGists = async (userName: string): Promise<Gist[]> => {
  try {
    if (!API_URL) {
      throw new Error('API_URL not found in config');
    }
    const response = await axios.get(`${API_URL}users/${userName}/gists`);

    const gists = await response.data;

    const validGists = validateGists(gists);

    return validGists.reduce((acc: Gist[], gist: unknown, index: number) => {
      const gistObj = validateGist(gist);
      if (gistObj) {
        acc.push(gistObj);
      } else {
        console.log(`Invalid gist at index ${index}:`, gist);
      }
      return acc;
    }, []);
  } catch (error) {


   const errMessage =  String(error)
    if(errMessage.includes('Network Error')){
      console.log(`getGists error: ${errMessage} url: ${API_URL}`)
      throw new Error('An error occurred fetching data from the remote server.')
    }


    return Promise.reject(error);
  }
};
