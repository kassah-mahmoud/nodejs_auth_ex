import React from "react";
import { Router, Redirect } from "@reach/router";
import Login from "./pages/login";
import { Container } from "@chakra-ui/layout";
import Register from "./pages/register";
import Loader from "./components/Loader";
import { connect } from "react-redux";
import useNotification from "./hooks/useNotification";
import Welcome from "./pages/welcome";
import PrivateRoute from "./components/PrivateRoute";

function App({ isLoading, user }) {
  useNotification();
  return (
    <Container>
      <Router>
        <PrivateRoute path="/" component={Welcome} />
        <Login path="/login" />
        <Register path="/register" />
      </Router>
      {isLoading && <Loader />}
    </Container>
  );
}

const mapStateToProps = ({ user: { isLoading, user } }) => ({
  user,
  isLoading,
});
export default connect(mapStateToProps)(App);
