import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { fetchPlayers } from "api/players";
import Player from "types/Player";

export const fetchAllPlayers = createAsyncThunk(
  "players/fetchAllPlayers",
  async (playerIds: string[]) => {
    const response: Player[] = await fetchPlayers(playerIds);

    return response;
  }
);

// Interfaces

interface FetchPlayersPayload {
  players: Player[];
}

type PlayersState = {
  loading: boolean;
  error: SerializedError | null;
} & FetchPlayersPayload;

// Initial State

const initialState: PlayersState = {
  players: [],
  error: null,
  loading: false,
};

// Reducer

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Roster

    // pending
    builder.addCase(fetchAllPlayers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    // fulfilled
    builder.addCase(fetchAllPlayers.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.players = payload;
    });

    // rejected
    builder.addCase(fetchAllPlayers.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error;
    });
  },
});

export default playersSlice.reducer;
