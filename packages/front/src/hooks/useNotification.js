import { useToast } from "@chakra-ui/toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError, setSuccess } from "../features/user/userSlice";

export default function useNotification() {
  const dispatch = useDispatch();
  const { success, error } = useSelector((state) => state?.user);

  const toast = useToast();

  useEffect(() => {
    success &&
      toast({
        position: "top-right",
        title: success,
        status: "success",
        duration: 4000,
        isClosable: true,
        onCloseComplete: () => dispatch(setSuccess("")),
      });

    error &&
      toast({
        position: "top-right",
        title: error,
        status: "error",
        duration: 4000,
        isClosable: true,
        onCloseComplete: () => dispatch(setError("")),
      });
  }, [success, error, toast, dispatch]);
}
