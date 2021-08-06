import { combineReducers } from "redux";
import { movieReducer } from "./movie.reducer";
import { theaterReducer } from "./theater.reducer";

export const rootReducer = combineReducers({
  movie: movieReducer,
  theater: theaterReducer,
});
