import React from 'react';
import './App.css';
import Header from './components/layouts/header/Header'
import Footer from './components/layouts/footer/Footer'
import {BrowserRouter as Router} from 'react-router-dom'

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
