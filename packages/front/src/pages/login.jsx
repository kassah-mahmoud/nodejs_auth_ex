import { Center, Heading, VStack } from "@chakra-ui/layout";
import React from "react";
import { useDispatch } from "react-redux";
import AuthForm from "../components/AuthForm";
import { login } from "../features/user/userAction";

const Login = () => {
  const dispatch = useDispatch();
  const handleLogin = (data) => {
    dispatch(login(data));
  };
  return (
    <Center height="100vh" flexDir="column" alignItems="center">
      <VStack spacing="8">
        <Heading>Log in</Heading>
        <AuthForm type="login" onSubmit={handleLogin} />
      </VStack>
    </Center>
  );
};

export default Login;
