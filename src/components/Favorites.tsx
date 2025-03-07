import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite, getFavorite } from '../store/favoritesSlice';
import { useUserContext } from '../context/UserContext';
import { RootState } from '../store';
import addToFavoritesIcon from '../assets/add-to-favorites.png';
import favoriteIcon from '../assets/favorite.png';

const Favorites = () => {
  const dispatch = useDispatch();
  const { userNameContext } = useUserContext();
  const selectedFile = useSelector((state: RootState) => state.files.selectedFile);
  const selectedFavorite = useSelector((state: RootState) => state.favorites.selectedFavorite);

  useEffect(() => {
    if (userNameContext && selectedFile) {
      dispatch(getFavorite({ userName: userNameContext, filename: selectedFile.filename }));
    }
  }, [dispatch, userNameContext, selectedFile]);

  const toggleFavorite = () => {
    if (userNameContext && selectedFile) {
      if (selectedFavorite) {
        dispatch(removeFavorite({ userName: userNameContext, filename: selectedFile.filename }));
      } else {
        dispatch(addFavorite({ userName: userNameContext, filename: selectedFile.filename }));
      }
    }
  };

  return (
    <div className="favorites-header">
      {selectedFile && (
        <button onClick={toggleFavorite} className="favorite-button" aria-label="Toggle Favorite">
          <img
            src={selectedFavorite ? favoriteIcon : addToFavoritesIcon}
            title={selectedFavorite ? 'Favorite' : 'Add to Favorites'}
            alt={selectedFavorite ? 'Favorite' : 'Add to Favorites'}
            className="favorite-icon"
          />
        </button>
      )}
    </div>
  );
};

export default Favorites;
