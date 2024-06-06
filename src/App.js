import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import BookShelfPage from './pages/BookShelfPage';
import BookSearchPage from './pages/BookSearchPage';
import { AnimatePresence } from 'framer-motion';

function App() {
  const location = useLocation();
  return (
    <>
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<BookSearchPage/>}></Route>
        <Route path='/bookshelf' element={<BookShelfPage/>}></Route>
      </Routes>
    </AnimatePresence>
    </>
  );
}

export default App;
