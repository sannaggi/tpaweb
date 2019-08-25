import { combineReducers } from "redux";
import bookingReducer from "./bookingReducer.js";
import placeReducer from "./placeReducer.ts";
import experienceReducer from "./experienceReducer.ts";
import guestCountReducer from "./guestCountReducer.ts";
import currencyReducer from "./currencyReducer";
import LocationReducer from "./locationReducer";
import UserReducer from "./userReducer";
import WishlistReducer from "./wishlistReducer";
import ChatReducer from "./chatReducer";

export default combineReducers({
  bookings: bookingReducer,
  places: placeReducer,
  experiences: experienceReducer,
  guestCount: guestCountReducer,
  currency: currencyReducer,
  location: LocationReducer,
  user: UserReducer,
  wishlist: WishlistReducer,
  chat: ChatReducer
});
