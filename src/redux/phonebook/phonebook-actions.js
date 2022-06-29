/* eslint-disable import/no-anonymous-default-export */
import { createAction } from '@reduxjs/toolkit';

const changeFilter = createAction('phonebook/changeFilter');

export default { changeFilter };
