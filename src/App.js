import { useEffect, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Container from "./сomponents/Container";
import AppBar from "./сomponents/AppBar";
import Filter from "./сomponents/Filter";
import PrivateRoute from "./сomponents/PrivateRoute";
import PublicRoute from "./сomponents/PublicRoute";
import { fetchCurrentUser } from "./redux/auth/auth-operations";
import { getIsRefreshing } from "./redux/auth/auth-selectors";
import { Oval } from "react-loader-spinner";
import "./App.css";

const HomePage = lazy(() =>
  import("./сomponents/HomePage" /* webpackChunkName: 'home-page' */)
);
const Contacts = lazy(() =>
  import("./сomponents/Contacts" /* webpackChunkName: 'contacts' */)
);
const ContactForm = lazy(() =>
  import("./сomponents/ContactForm" /* webpackChunkName: 'contact-form' */)
);
const RegisterForm = lazy(() =>
  import("./сomponents/RegisterForm" /* webpackChunkName: 'register-form' */)
);
const LoginForm = lazy(() =>
  import("./сomponents/LoginForm" /* webpackChunkName: 'login-form' */)
);
const App = () => {
  const isRefreshing = useSelector(getIsRefreshing);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    !isRefreshing && (
      <Container>
        <AppBar />
        <Suspense
          fallback={
            <div className="loader">
              <Oval
                ariaLabel="loading-indicator"
                height={50}
                width={50}
                strokeWidth={5}
                color="#7B68EE"
                secondaryColor="#483D8B"
              />
            </div>
          }
        >
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute>
                  <HomePage />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute restricted>
                  <RegisterForm />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute restricted>
                  <LoginForm />
                </PublicRoute>
              }
            />

            <Route
              path="/add"
              element={
                <PrivateRoute>
                  <ContactForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute>
                  <Filter />
                  <Contacts />
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
      </Container>
    )
  );
};

export default App;