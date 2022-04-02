import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
} from 'react-router-dom';

// Import Page Data
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          {/* Homepage that renders the SearchBooks page */}
          <Route 
            path='/' 
            element={<SearchBooks />} 
          />
          {/* /saved path renders SavedBooks page */}
          <Route 
            path='/saved' 
            element={<SavedBooks />} 
          />
          {/* Any other page, display a Wrong Page header */}
          <Route 
            path='*'
            element={<h1 className='display-2'>Wrong page!</h1>}
          />
        </Routes>
      </>
    </Router>
  );
}

export default App;
