import { useState } from 'react';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useUpdateContactMutation } from 'redux/phonebook/phonebook-slice';

const UpdateContact = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const { contactId } = useParams();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [url, setUrl] = useState(location.state.from);
  const [updateContact] = useUpdateContactMutation();

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

    if (name === '') {
      toast.error(`🤕 Please enter a valid name`);
      return;
    }

    updateContact({ contactId, name, number });

    setUrl(null);
    navigate(url);
    setName('');
    setNumber('');
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h3" variant="h3">
            Update contact
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
            >
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default UpdateContact;
