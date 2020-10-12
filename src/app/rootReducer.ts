import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import playersReducer from "features/players/playersSlice";
import rosterReducer from "features/roster/rosterSlice";
import teamsReducer from "features/teams/teamsSlice";

const rootReducer = combineReducers({
  app: appReducer,
  roster: rosterReducer,
  players: playersReducer,
  teams: teamsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
