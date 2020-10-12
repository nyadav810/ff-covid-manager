import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { fetchRostersByLeague } from "api/sleeper";
import Roster from "types/Roster";

export const fetchAllRosters = createAsyncThunk(
  "roster/fetchAllRosters",
  async () => {
    const response: Roster[] = await fetchRostersByLeague();

    return response;
  }
);

// Interfaces

interface FetchRostersPayload {
  rosters: Roster[];
}

type RosterState = {
  loading: boolean;
  error: SerializedError | null;
} & FetchRostersPayload;

// Initial State

const initialState: RosterState = {
  rosters: [],
  error: null,
  loading: false,
};

// Reducer

const rosterSlice = createSlice({
  name: "roster",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Roster

    // pending
    builder.addCase(fetchAllRosters.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    // fulfilled
    builder.addCase(fetchAllRosters.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.rosters = payload;
    });

    // rejected
    builder.addCase(fetchAllRosters.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error;
    });
  },
});

export default rosterSlice.reducer;
