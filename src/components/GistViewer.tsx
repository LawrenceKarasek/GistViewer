import React, { useState, useEffect, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';
import { fetchGists, clearGists } from '../store/gistsSlice';
import type { AppDispatch } from '../store';
import { useUserContext } from '../context/UserContext';
import TopNav from '../ui/TopNav';
import GistLister from './GistLister';
import '../styles.css';

const GistViewer = () => {
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const { setUserNameContext } = useUserContext();
  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = useDebouncedCallback((userName: string) => {
    if (userName.length > 2 && userName.length < 30) {
      setUserNameContext(userName);
      setError('');
      dispatch(fetchGists(userName));
    } else if (userName.length <= 1) {
      setError('');
    } else {
      setError('User name must be between 3 and 30 characters');
    }
  }, 1000);

  const clearUserData = () => {
    setUserName('');
    dispatch(clearGists(''));
  };

  useEffect(() => {
    if (userName) handleInputChange(userName);
  }, [userName, handleInputChange]);

  return (
    <>
      <TopNav />
      <div className="container">
        {error && <p className="error">{error}</p>}
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter GitHub username"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
          {userName && (
            <button className="clear-button" onClick={() => clearUserData()}>
              x
            </button>
          )}
        </div>
      </div>
      <Suspense>
        <GistLister />
      </Suspense>
    </>
  );
};

export default GistViewer;
