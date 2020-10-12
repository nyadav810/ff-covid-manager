import { fetchUsersByLeague } from "api/sleeper";
import User from "types/User";
import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";

export const fetchAllUsers = createAsyncThunk(
  "teams/fetchAllUsers",
  async () => {
    const response: User[] = await fetchUsersByLeague();

    return response;
  }
);

// Interfaces

interface FetchUsersPayload {
  users: User[];
}

type TeamsState = {
  loading: boolean;
  error: SerializedError | null;
} & FetchUsersPayload;

// Initial State

const initialState: TeamsState = {
  users: [],
  loading: false,
  error: null,
};

// Reducer

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // pending
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    // fulfilled
    builder.addCase(fetchAllUsers.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.users = payload;
    });

    // rejected
    builder.addCase(fetchAllUsers.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error;
    });
  },
});

export default teamsSlice.reducer;
