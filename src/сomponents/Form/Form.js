import { useState } from "react";
import { useAddContactMutation, useGetContactsQuery } from "redux/phonebook/phonebookSlice";
import s from "./Form.module.css";


function Form() {
  const [addContact, { isLoading }] = useAddContactMutation();
  const {data}=useGetContactsQuery()
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    if (name === "name") {
      setName(value);
    }
    if (name === "number") {
      setPhone(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addContact({ name, phone });
    const existingContact = data.find((contact) => name === contact.name);

    if (existingContact) {
      reset()
      return alert(`${name} is already in contacts`);
    }
    reset();
  };

  const reset = () => {
    setName("");
    setPhone("");
  };
  return (
    <form className={s.Form} onSubmit={handleSubmit}>
      <label className={s.Label}>
        Name
        <input
          className={s.Input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de  de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
      </label>
      <label className={s.Label}>
        Number
        <input
          className={s.Input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={phone}
          onChange={handleChange}
        />
      </label>
      <button className={s.FormBtn} type="submit">
        {isLoading?'Adding':'Add contact'}
      </button>
    </form>
  );
}

export default Form;
