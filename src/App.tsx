import React from 'react';
import './App.css';
import Header from './components/layouts/Header'
import {BrowserRouter as Router} from 'react-router-dom'

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header/>
      </div>
    </Router>
  );
}

export default App;
