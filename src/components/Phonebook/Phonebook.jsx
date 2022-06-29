import { useState } from 'react';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import {
  useFetchContactsQuery,
  useAddContactMutation,
} from '../../redux/phonebook/phonebook-slice';

function Phonebook() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const { data: contacts } = useFetchContactsQuery();
  const [addContact, { isLoading }] = useAddContactMutation();

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        return setName(value);
      case 'number':
        return setNumber(value);
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const normalazeName = name.toLowerCase();

    const hasName = contacts.find(contact =>
      contact.name.toLowerCase().includes(normalazeName)
    );

    if (name === '') {
      toast.error(`🤕 Please enter a valid name`);
      return;
    }

    if (hasName) {
      toast.warn(`🥺 ${name} is already in contacts.`);
      return;
    }

    addContact({ name, number });

    setName('');
    setNumber('');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h2" variant="h3">
          Phonebook
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id={nameInputId}
            label="Name"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            name="number"
            label="Number"
            type="tel"
            id={numberInputId}
            value={number}
            autoComplete="current-password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            Add contact
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

Phonebook.propTypes = {
  addContact: PropTypes.func,
};

export default Phonebook;
