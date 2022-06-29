import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

import { useFetchContactsQuery } from '../../redux/phonebook/phonebook-slice';
import ContactsItem from './ContactsItem/ContactsItem';

const ContactsList = () => {
  const getFilterValue = useSelector(state => state.filter);
  const { data: contacts, isSuccess } = useFetchContactsQuery();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  if (!isSuccess) {
    return;
  }

  const getVisibleContacts = (AllContacts, filter) => {
    const normalazeFilter = filter.toLowerCase();

    return AllContacts.filter(({ name }) =>
      name.toLowerCase().includes(normalazeFilter)
    );
  };

  const filteredContactsList = getVisibleContacts(contacts, getFilterValue);

  return (
    <>
      {contacts && (
        <Table
          size="small"
          sx={{ minWidth: 500 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Number</StyledTableCell>
              <StyledTableCell
                align="right"
                style={{ width: 100 }}
              ></StyledTableCell>
              <StyledTableCell
                align="right"
                style={{ width: 100 }}
              ></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredContactsList.map(({ id, name, number }) => (
              <ContactsItem key={id} name={name} number={number} id={id} />
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
};

export default ContactsList;
