import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useFetchCurrentUserQuery } from 'redux/authorization/authApi';
import { refreshUser } from 'redux/feature/authSlice';
import { PrivateRoute } from 'utils/PrivateRoute';
import { PublicRoute } from 'utils/PublicRoute';
import Layout from './Layout/Layout';
import HomePage from 'pages/HomePage';
import ContactsPage from 'pages/ContactsPage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import UpdateContact from 'pages/UpdateContact';

function App() {
  const dispatch = useDispatch();
  const { data, isSuccess, isLoading } = useFetchCurrentUserQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(refreshUser(data));
    }
  }, [data, dispatch, isSuccess]);

  return (
    <>
      {!isLoading && (
        <>
          <Layout />

          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/" element={<HomePage />} />
            </Route>

            <Route element={<PrivateRoute redirectTo="/login" />}>
              <Route path="/contacts/*" element={<ContactsPage />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route
                path="/contacts/update/:contactId/*"
                element={<UpdateContact />}
              />
            </Route>

            <Route element={<PublicRoute redirectTo="/contacts" restricted />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route element={<PublicRoute restricted />}>
              <Route path="/register" element={<RegisterPage />} />
            </Route>
          </Routes>
        </>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
