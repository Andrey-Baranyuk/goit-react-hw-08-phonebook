export const getLoading = state => state.phonebook.loading;
export const getFilter = state => state.phonebook.filter
export const getContacts = state => state.phonebook.contacts;

export const getVisibleContacts = (state) => {
  const contacts = getContacts(state);
  const filter = getFilter(state);

  const normalizedFilter = filter.toLowerCase();

  return contacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter)
  );
};