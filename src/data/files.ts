import { File } from '../types/file';
import { validateFile, validateFiles } from '../utils/file';
import axios from 'axios';

const API_URL = process.env.REACT_APP_ROOT_API_URL;

export const getFiles = async (gistId: string): Promise<File[]> => {
  try {
    if (!API_URL) {
      throw new Error('API_URL not found in config');
    }

    const response = await axios.get(`${API_URL}gists/${gistId}`);

    const gist: unknown = await response.data;
    const files = validateFiles(gist);

    return files.reduce((acc: File[], file: unknown, index: number) => {
      const fileObj = validateFile(file);
      if (fileObj) {
        acc.push(fileObj);
      } else {
        console.log(`Invalid file at index ${index}:`, file);
      }
      return acc;
    }, []);
  } catch (error) {
    return Promise.reject(error);
  }
};
