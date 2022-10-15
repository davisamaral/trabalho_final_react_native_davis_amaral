import { createSlice } from "@reduxjs/toolkit";
import IUser from "../../Interfaces/IUser";

import type { RootState } from "../store";
import { ISetUserPayload, UserState } from "./LoginSliceTypes";

// Define the initial state using that type
const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: ISetUserPayload) => {
      let user: IUser | null = action.payload?.user ?? null;
      state.user = user;
    },
    cleanUser: (state) => {
      console.log("é pra sair")
      state.user = null;
    },
  },
});

// this is for dispatch
export const { setUser, cleanUser } = userSlice.actions;

// this is for configureStore
export default userSlice.reducer;
