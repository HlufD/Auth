import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  id: number;
  email: string;
}
const initialState: UserState = {
  id: -1,
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    logout: (state) => {
      state.email = "";
      state.id = -1;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
