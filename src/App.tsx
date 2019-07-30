import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/layouts/header/Header'
import Footer from './components/layouts/footer/Footer'
import Homepage from './components/homepage/Homepage'
import { Provider } from 'react-redux'
import store from './store'
import PlaceDetail from './components/place detail/PlaceDetail';
import RegisterForm from "./components/layouts/RegisterForm";
import Places from "./components/places/Places";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={Homepage}/>
          <Route exact path="/places" component={Places}/>
          <Route path="/places/:id" component={PlaceDetail} />
          <Route path="/register/:auth/:firstName/:lastName/:email" component={RegisterForm} />
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
