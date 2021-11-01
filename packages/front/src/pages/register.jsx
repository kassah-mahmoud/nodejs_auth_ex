import { Center, Heading, VStack } from "@chakra-ui/layout";
import React from "react";
import { useDispatch } from "react-redux";
import AuthForm from "../components/AuthForm";
import { register } from "../features/stores/userAction";

const Register = () => {
  const dispatch = useDispatch();
  const handleRegister = (data) => {
    dispatch(register(data));
  };
  return (
    <Center height="100vh" flexDir="column" alignItems="center">
      <VStack spacing="8">
        <Heading>Register</Heading>
        <AuthForm type="register" onSubmit={handleRegister} />
      </VStack>
    </Center>
  );
};

export default Register;
