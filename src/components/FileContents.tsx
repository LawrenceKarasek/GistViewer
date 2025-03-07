import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { File } from '../types/file';
import { fetchFileContents } from '../store/filesSlice';
import type { AppDispatch,RootState} from '../store';
import Favorites from './Favorites';

const FileContents = () => {
  const selectedFile: File | undefined = useSelector((state: RootState) => state.files.selectedFile);
  const dispatch = useDispatch<AppDispatch>();

  const loadFileContents = useCallback(
    (file: File) => {
      dispatch(fetchFileContents(file));
    },
    [dispatch]
  );

  useEffect(() => {
    if (selectedFile) {
      loadFileContents(selectedFile);
    }
  }, [selectedFile, loadFileContents]);

  return (
    <div className="file-contents">
      <Favorites />
      {selectedFile ? (
        <>
          <h3>{selectedFile.filename}</h3>
          <pre>{selectedFile.content || 'Loading content...'}</pre>
        </>
      ) : (
        <p>No file is selected.</p>
      )}
    </div>
  );
};

export default FileContents;
