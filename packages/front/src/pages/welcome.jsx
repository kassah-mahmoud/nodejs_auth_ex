import { Center, Heading, VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/stores/userAction";

const Welcome = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const user = useSelector((state) => state?.user?.user);
  return (
    <Center w="full" height="100vh" alignItems="center">
      <VStack>
        <Heading>Welcome {user?.name}</Heading>
        <Button color="red.400" onClick={handleLogout}>
          Logout
        </Button>
      </VStack>
    </Center>
  );
};

export default Welcome;
