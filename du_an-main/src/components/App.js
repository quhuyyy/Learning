import { Route, Routes } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';

import { publicRoutes } from '../routes';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component
          return <Route key={index} path={route.path} element={<Page />} />
          })}
      </Routes >
    </>
  );
}

export default App;
