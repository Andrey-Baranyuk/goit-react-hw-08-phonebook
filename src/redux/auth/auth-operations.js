import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "https://connections-api.herokuapp.com/users/signup",
        credentials
      );
      token.set(data.token);

      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "https://connections-api.herokuapp.com/users/login",
        credentials
      );
      token.set(data.token);
      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async () => {
  try {
    await axios.post("https://connections-api.herokuapp.com/users/logout");
    token.unset();
  } catch (error) {}
});

export const fetchCurrentUser = createAsyncThunk(
  "auth/refresh",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();

    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return rejectWithValue();
    }

    token.set(persistedToken);
    try {
      const { data } = await axios.get(
        "https://connections-api.herokuapp.com/users/current"
      );
      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

