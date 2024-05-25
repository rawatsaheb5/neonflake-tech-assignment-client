import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Navbar from './Navbar';
import Footer from './Footer';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Page1 />} />
        <Route path='/thumbnail' element={<Page2 />} />
        <Route path='/video/:id' element={<Page3 />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
