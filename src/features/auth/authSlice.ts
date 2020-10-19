import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { login, signup, verifyEmail } from "api/amplify";

interface LoginInfo {
  username: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userInfo: LoginInfo) => {
    const { username, password } = userInfo;
    const response = await login(username, password);

    return response;
  }
);

type SignupInfo = {
  email: string;
} & LoginInfo;

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (userInfo: SignupInfo) => {
    const { username, password, email } = userInfo;
    const response = await signup(username, password, email);

    return response;
  }
);

interface VerificationInfo {
  username: string;
  code: string;
}

export const verifyEmailForUser = createAsyncThunk(
  "auth/verify",
  async (verificationInfo: VerificationInfo) => {
    const { username, code } = verificationInfo;
    const response = await verifyEmail(username, code);

    return response;
  }
);

// Interfaces

interface LoginUserPayload {
  username: string | null;
}

interface VerificationPayload {
  verificationResponse: string | null;
}

type AuthState = {
  loading: boolean;
  error: SerializedError | null;
} & LoginUserPayload &
  VerificationPayload;

// Initial State

const initialState: AuthState = {
  username: null,
  loading: false,
  error: null,
  verificationResponse: null,
};

// Reducer

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login

    // pending
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    // fulfilled
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.username = payload;
    });

    // rejected
    builder.addCase(loginUser.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error;
    });

    // Sign Up

    // pending
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    // fulfilled
    builder.addCase(signupUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.username = payload;
    });

    // rejected
    builder.addCase(signupUser.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error;
    });

    // Verification

    // pending
    builder.addCase(verifyEmailForUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    // fulfilled
    builder.addCase(verifyEmailForUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.verificationResponse = payload;
    });

    // rejected
    builder.addCase(verifyEmailForUser.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error;
    });
  },
});

export default authSlice.reducer;
