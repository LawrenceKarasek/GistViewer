import { File } from '../types/file';

export const validateFiles = (gist: unknown): unknown[] => {
  if (typeof gist !== 'object' || gist === null) {
    throw new Error('gist is not an object');
  }

  const gistWithFiles = gist as { files?: unknown };

  if (!gistWithFiles.files) {
    throw new Error('gist.files is null');
  }

  if (typeof gistWithFiles.files !== 'object' || gistWithFiles.files === null) {
    throw new Error('gist.files is not a valid object');
  }

  const fileValues = Object.values(gistWithFiles.files);

  if (!Array.isArray(fileValues)) {
    throw new Error('gist.files is not a valid array');
  }

  if (fileValues.length === 0) {
    throw new Error('gist.files is an empty array');
  }

  return fileValues;
};

export const validateFile = (file: unknown): File | null => {
  const fileObj = file as { filename?: unknown; content?: unknown };

  if (
    fileObj.filename &&
    fileObj.content &&
    typeof fileObj.filename === 'string' &&
    typeof fileObj.content === 'string' &&
    fileObj.filename.length > 0 &&
    fileObj.content.length > 0
  ) {
    return {
      filename: fileObj.filename,
      content: fileObj.content,
    };
  }

  return null;
};
