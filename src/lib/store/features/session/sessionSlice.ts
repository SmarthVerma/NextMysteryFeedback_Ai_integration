import { Message, User } from '@/models/user.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SessionState } from "./type";


const initialState: SessionState = {
  isAuthenticated: false,
  user: null,
};

// Create the session slice
const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<any| undefined| null>) => {
      state.isAuthenticated = action.payload ? true : false;
      state.user = action.payload
    },
  },
});

// Export actions
export const { setSession } = sessionSlice.actions;

// Export the reducer
export default sessionSlice.reducer;