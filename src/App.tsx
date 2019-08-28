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
import Experiences from "./components/experiences/Experiences";
import ExperiencePlace from './components/experience-place/experiencePlace';
import Profilepage from './components/profile/Profilepage';
import Global from "./components/layouts/Global";
import Wishlist from "./components/wishlist/Wishlist";
import WishlistDetail from "./components/wishlist/WishlistDetail";
import Chat from "./components/chat/Chat";
import ChatDetail from "./components/chat/ChatDetail";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import BookingPage from "./components/booking/BookingPage";
import BookingHistory from "./components/booking/BookingHistory";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Global />
          <Route exact path="/" component={Homepage}/>
          <Route exact path="/places" component={Places}/>
          <Route exact path="/experiences" component={Experiences}/>
          <Route path="/experiences/:id" component={ExperiencePlace} />
          <Route path="/places/:id" component={PlaceDetail} />
          <Route path="/users/:id/" component={Profilepage} />
          <Route path="/register/:auth/:firstname/:lastname/:email" component={RegisterForm} />
          <ProtectedRoute exact path="/wishlist" component={Wishlist} />
          <ProtectedRoute path="/wishlist/:id" component={WishlistDetail} />  
          <ProtectedRoute exact path="/chat" component={Chat} />   
          <ProtectedRoute exact path="/chat/detail" component={ChatDetail} />
          <ProtectedRoute exact path="/booking" component={BookingHistory} />
          <ProtectedRoute path="/booking/new" component={BookingPage} />
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App
