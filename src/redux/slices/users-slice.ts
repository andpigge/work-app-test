import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  userId: number | null;
  authorizing: boolean;
  users: { id: number } | null
};

const initialState: UserState = {
  users: null,
  userId: null,
  authorizing: false,
};

export const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setAuthorizing: (state, action: PayloadAction<boolean>) => {
      state.authorizing = action.payload;
    },
    saveUserId: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
    },
    setUsers: (state, action: PayloadAction<{ id: number } | null>) => {
      state.users = action.payload;
    },
  },
});

export const { saveUserId, setAuthorizing, setUsers } = userSlice.actions;

export const userReducer = userSlice.reducer;
