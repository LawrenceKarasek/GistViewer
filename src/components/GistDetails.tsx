import React, { Suspense, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchFiles, setSelectedFile } from '../store/filesSlice';
import { File } from '../types/file';
import type { RootState, AppDispatch } from '../store';
import FileContents from './FileContents';
import TopNav from '../ui/TopNav';
import {TableDisplay} from '../ui/TableDisplay'


const GistDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { data: files, loading, error, selectedFile } = useSelector((state: RootState) => state.files);
  const { selectedGist } = useSelector((state: RootState) => state.gists);

  const loadFileData = useCallback(
    (id: string) => {
      const gistId = id;
      dispatch(fetchFiles(gistId));
      dispatch(setSelectedFile(undefined));
    },
    [dispatch]
  );

  const handleFileClick = useCallback(
    (file: File) => (e: React.MouseEvent<HTMLTableRowElement>) => {
      e.preventDefault();
      dispatch(setSelectedFile(file));
    },
    [dispatch]
  );

  useEffect(() => {
    if (id) {
      loadFileData(id);
    }
  }, [id, loadFileData]);

  if (loading) return <p>Loading files...</p>;

  return (
    <>
      <TopNav />
      <div className="gist-details-container">
        <div className="files-list">
          {loading && <p>Loading...</p>}
          {error && <p className="error">Error: {error}</p>}
          {!loading && files.length === 0 && <p>No results were found.</p>}
          {selectedGist && <p>{selectedGist.description}</p>}
          <Suspense>
            <TableDisplay<File>
              rows={files}
              selectedRow={selectedFile}
              onClick={(row) =>handleFileClick(row)}
              displayFields={['filename']}
              keyField={'filename'}
            />
          </Suspense>
        </div>
        <FileContents />
      </div>
    </>
  );
};

export default GistDetails;
