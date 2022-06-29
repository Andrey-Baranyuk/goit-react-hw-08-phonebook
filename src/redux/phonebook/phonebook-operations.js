import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchContacts = createAsyncThunk(
  "contact/fetchContacts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "https://connections-api.herokuapp.com/contacts"
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contact/addContact",

  async (contact, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "https://connections-api.herokuapp.com/contacts",
        contact
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contact/deleteContact",

  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `https://connections-api.herokuapp.com/contacts/${id}`
      );

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);