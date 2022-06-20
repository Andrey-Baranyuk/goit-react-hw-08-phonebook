import { configureStore } from "@reduxjs/toolkit";
import { phonebookApi } from './phonebook/phonebookSlice';
import { filter } from "./phonebook/phonebook-reducers";

export const store = configureStore({
  reducer: {
    filter,
    [phonebookApi.reducerPath]: phonebookApi.reducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    phonebookApi.middleware
  ],
  devTools: process.env.NODE_ENV === 'development',
});