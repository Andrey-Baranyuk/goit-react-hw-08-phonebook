import Container from '@mui/material/Container';

import Phonebook from 'components/Phonebook';
import ContactsList from 'components/ContactsList';
import Filter from 'components/Filter';

const ContactsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Phonebook />
      <Filter />
      <ContactsList />
    </Container>
  );
};

export default ContactsPage;
