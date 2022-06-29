import { createReducer, combineReducers } from "@reduxjs/toolkit";
import { changeFilter } from "./phonebook-actions";
import {
  fetchContacts,
  addContact,
  deleteContact,
} from "./phonebook-operations";

const filter = createReducer("", {
  [changeFilter]: (_, { payload }) => payload,
});


const contacts = createReducer([], {
  [fetchContacts.fulfilled]: (_, { payload }) => payload,
  [addContact.fulfilled]: (state, { payload }) => [payload, ...state],
  [deleteContact.fulfilled]: (state, { payload }) =>
    state.filter((contact) => contact.id !== payload),
});

const loading = createReducer(false, {
  [fetchContacts.pending]: () => true,
  [fetchContacts.fulfilled]: () => false,
  [fetchContacts.rejected]: () => false,
  [addContact.pending]: () => true,
  [addContact.fulfilled]: () => false,
  [addContact.rejected]: () => false,
  [deleteContact.pending]: () => true,
  [deleteContact.fulfilled]: () => false,
  [deleteContact.rejected]: () => false,
});

export default combineReducers({
  contacts,
  filter,
  loading,
});