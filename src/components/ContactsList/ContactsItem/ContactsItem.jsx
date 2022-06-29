import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

import { useDeleteContactMutation } from '../../../redux/phonebook/phonebook-slice';
import styles from './ContactsItem.module.css';

const ContactsItem = ({ id, name, number }) => {
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
  const location = useLocation();

  return (
    <>
      <TableRow key={id}>
        <TableCell>{name}</TableCell>
        <TableCell>{number}</TableCell>
        <TableCell align="right">
          <Button
            variant="contained"
            color="success"
            startIcon={<CreateIcon />}
          >
            <Link
              className={styles.link}
              to={`update/${id}`}
              state={{ from: location }}
            >
              Update
            </Link>
          </Button>
        </TableCell>

        <TableCell align="right">
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            disabled={isDeleting}
            onClick={() => deleteContact(id)}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>

      {/* <Routes>
        <Route path={`contacts/update/${id}`} element={<UpdateContact />} />
      </Routes> */}
    </>
  );
};

ContactsItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default ContactsItem;
