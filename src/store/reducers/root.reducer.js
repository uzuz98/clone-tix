import { combineReducers } from "redux";
import { movieReducer } from "./movie.reducer";
import { searchReducer } from "./search.reducer";
import { theaterReducer } from "./theater.reducer";

export const rootReducer = combineReducers({
  movie: movieReducer,
  theater: theaterReducer,
  search: searchReducer,
});
