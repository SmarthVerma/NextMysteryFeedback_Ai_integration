// reducers/index.ts
import { combineReducers } from "redux";
import sessionReducer from "./features/session/sessionSlice"; // Adjust to your actual slice imports

const rootReducer = combineReducers({
  session: sessionReducer, // Add your session slice
  // Add other reducers here
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
