import { Center } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";
import React from "react";

const Loader = () => {
  return (
    <Center
      width="full"
      height="full"
      position="fixed"
      top="0"
      left="0"
      backgroundColor="rgba(0,0,0,0.2)"
    >
      <CircularProgress isIndeterminate />
    </Center>
  );
};

export default Loader;
