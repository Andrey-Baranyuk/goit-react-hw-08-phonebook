import { createSelector } from "@reduxjs/toolkit";
import { selectContactsResult } from "./phonebookSlice";

export const getFilter = state => state.filter;

export const selectAllContacts = createSelector(
  [selectContactsResult],
  contactsResult => {
    console.log(contactsResult.data);
    return contactsResult?.data ?? [];
  }
);
