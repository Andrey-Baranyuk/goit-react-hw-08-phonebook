import { useSelector } from "react-redux";
import { getFilter } from "redux/phonebook/phonebook-selectors";
import { useGetContactsQuery, useDeleteContactMutation } from "redux/phonebook/phonebookSlice";
//import { selectAllContacts } from "redux/phonebook/phonebook-selectors"; 
//import { deleteContact } from "redux/phonebook/phonebook-actions";
import { Oval } from "react-loader-spinner";
import s from "./Contacts.module.css";


const Contacts = () => {
  const { data, isFetching } = useGetContactsQuery('');
  const [deleteContact] = useDeleteContactMutation();
  const filtered = useSelector(getFilter);

  const normalizedFilter = filtered.toLowerCase();
  const visibleContacts = data.filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter));

  return (
    <>
      {isFetching && (
        <Oval
          ariaLabel="loading-indicator"
          height={50}
          width={50}
          strokeWidth={5}
          color="black"
          secondaryColor="grey"
        />
      )}
      <ul className={s.ContactList}>
        {data &&visibleContacts&&
          visibleContacts.map(({ id, name, phone }) => (
            <li key={id} className={s.ContactItem}>
              <p className={s.ContactData}>
                {name}: {phone}
              </p>
              <button
                onClick={() => deleteContact(id)}
                className={s.ContactDelete}
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Contacts;
