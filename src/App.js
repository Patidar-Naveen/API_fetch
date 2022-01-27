import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Product from './components/Product';
import Course from './components/Course';
import Navigation from './components/Navigation';
import Enquiry from './components/Enquiry';

function App() {
  return (
    <div>
      <Router>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Product/>}/>
        <Route path="/course" element={<Course/>}/>
        <Route path="/enquiry" element={<Enquiry/>}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
