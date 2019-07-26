import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/layouts/header/Header'
import Footer from './components/layouts/footer/Footer'
import Homepage from './components/homepage/Homepage'
import { Provider } from 'react-redux'
import store from './store'
import PlaceDetail from './components/place detail/PlaceDetail';
import Profilepage from './components/profile/Profilepage';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={Homepage}/>
          <Route path="/places/:id" component={PlaceDetail} />
          <Route path="/users/:id" component={Profilepage} />
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
