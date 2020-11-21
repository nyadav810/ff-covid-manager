import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/rootReducer";

export const selectedUserSelector = createSelector(
  ({ app, teams }: RootState) => ({
    users: teams.users,
    userId: app.selectedUserId,
  }),
  ({ users, userId }) => users.find((user) => user?.user_id === userId)
);
