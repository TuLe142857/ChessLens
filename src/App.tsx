import { Route, Routes } from 'react-router';

import Layout from './layout/Layout.tsx';
import HomePage from './pages/HomePage.tsx';
import PlayerPage from './pages/PlayerPage/PlayerPage.tsx';
import RecapPage from './pages/RecapPage/RecapPage.tsx';

import PageNotFound from './components/errors/PageNotFound.tsx';
const App = () => {
  return (
    <Routes>
      <Route index={true} element={<HomePage />} />

      <Route path={'recap/:year/:username'} element={<RecapPage />} />

      <Route element={<Layout />}>
        <Route path={'player/:username'} element={<PlayerPage />} />
      </Route>
      <Route path={'*'} element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
