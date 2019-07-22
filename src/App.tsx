import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/layouts/header/Header'
import Footer from './components/layouts/footer/Footer'
import Homepage from './components/homepage/Homepage'

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route exact path="/" component={Homepage}/>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
