import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { UserProvider } from './context/UserContext';

const GistDetails = React.lazy(() => import('./components/GistDetails'));
const GistViewer = React.lazy(() => import('./components/GistViewer'));
const App = () => {
  return (
    <UserProvider>
      <Provider store={store}>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<GistViewer />} />
              <Route path="/gist/:id" element={<GistDetails />} />
            </Routes>
          </Suspense>
        </Router>
      </Provider>
    </UserProvider>
  );
};

export default App;
