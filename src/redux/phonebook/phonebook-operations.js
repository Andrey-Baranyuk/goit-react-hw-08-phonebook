import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
         "https://61e42cd7fbee6800175eb21d.mockapi.io/contacts"
      );
      return data
    }
    catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addContact = createAsyncThunk(
  'contact/addContact',

  async (name, phone, rejectWithValue) => {
    try {
      const { data } = await axios
        .post("https://61e42cd7fbee6800175eb21d.mockapi.io/contacts",
          name, phone)
      return data
    }
    catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contact/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`https://61e42cd7fbee6800175eb21d.mockapi.io/contacts/${id}`);
      return data.id
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);