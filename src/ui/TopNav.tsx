import React from 'react';
import { Link, useParams } from 'react-router-dom';

const TopNav = () => {
  const { id } = useParams();
  return (
    <nav className="top-nav">
      {id && <Link to="/">Home</Link>}
      <span className="top-nav-title">Gist Viewer</span>
    </nav>
  );
};

export default TopNav;
