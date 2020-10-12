import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interfaces

interface SetSelectedUserPayload {
  selectedUserId: string;
}

type AppState = SetSelectedUserPayload;

// Initial State

const initialState: AppState = {
  selectedUserId: "",
};

// Reducer

const rosterSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSelectedUser: (
      state,
      { payload }: PayloadAction<SetSelectedUserPayload>
    ) => {
      state.selectedUserId = payload.selectedUserId;
    },
    clearSelectedUser: (state) => {
      state.selectedUserId = "";
    },
  },
});

export const { setSelectedUser, clearSelectedUser } = rosterSlice.actions;

export default rosterSlice.reducer;
