import { combineReducers } from "redux";
import { bookingReducer } from "./booking.reducer";
import { movieReducer } from "./movie.reducer";
import { profileReducer } from "./profile.reducer";
import { searchReducer } from "./search.reducer";
import { theaterReducer } from "./theater.reducer";

export const rootReducer = combineReducers({
  movie: movieReducer,
  theater: theaterReducer,
  search: searchReducer,
  booking: bookingReducer,
  profile: profileReducer,
});
