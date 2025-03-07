import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedGist } from '../store/gistsSlice';
import { useNavigate } from 'react-router-dom';
import type { RootState, AppDispatch } from '../store';
import { Gist } from '../types/gist';
import {TableDisplay} from '../ui/TableDisplay'
import '../styles.css';

const GistLister = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { data: gists, loading, error, selectedGist } = useSelector((state: RootState) => state.gists);

  const handleGistClick = useCallback(
    (gist: Gist) => (e: React.MouseEvent<HTMLTableRowElement>) => {
      e.preventDefault();
      dispatch(setSelectedGist(gist));
      navigate(`/gist/${gist.id}`, { state: gist });
    },
    [dispatch, navigate]
  );

  return (
    <>
      <div className="container">
        {loading && <p>Loading...</p>}
        {!loading && error && <p>{error}</p>}
        {gists.length > 0 && (
          <TableDisplay<Gist>
            rows={gists}
            selectedRow={selectedGist}
            onClick={(row) =>handleGistClick(row)}
            displayFields={['description','created']}
            keyField={'id'}
          />
        )}
      </div>
    </>
  );
};

export default GistLister;
