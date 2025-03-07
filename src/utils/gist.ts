import { Gist } from '../types/gist';

export const validateGists = (gists: unknown[]): unknown[] => {
  if (!Array.isArray(gists)) {
    throw new Error('gists is not a valid array');
  } else if (gists.length === 0) {
    throw new Error('No results were found. Please enter a different user name.');
  }
  return gists;
};

export const validateGist = (gist: unknown): Gist | null => {
  const gistObj = gist as { description?: unknown; id?: unknown; created_at?: unknown };

  if (
    gistObj.description &&
    gistObj.id &&
    gistObj.created_at &&
    typeof gistObj.description === 'string' &&
    typeof gistObj.id === 'string' &&
    new Date(gistObj.created_at as string) instanceof Date &&
    gistObj.description.length > 0 &&
    gistObj.id.length > 0
  ) {
    return {
      id: gistObj.id,
      description: gistObj.description,
      created: new Date(gistObj.created_at as string).toLocaleString(),
    };
  } else {
    return null;
  }
};
