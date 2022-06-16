//import { useEffect } from "react";
//import { useDispatch } from "react-redux";
//import { contactOperations } from "redux/phonebook"; 
import { useGetContactsQuery } from "redux/phonebook/phonebookSlice";
import Container from "сomponents/Container";
import Form from "./сomponents/Form";
import Filter from "./сomponents/Filter";
import Contacts from "./сomponents/Contacts";

import s from "./App.module.css";

const App = () => {
  const { data, isFetching } = useGetContactsQuery('');

  return (
    <>
      {data && !isFetching ?
        (<Container>
          <h1 className={s.Title}>Phonebook</h1>
          <Form />
          <h2 className={s.Title}>Contacts</h2>
          <Filter />
          <Contacts />
        </Container>) : ('Loading...')}
    </>
  );
};

export default App;
