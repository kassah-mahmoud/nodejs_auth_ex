import { Button } from "@chakra-ui/button";
import { FormControl, FormErrorMessage } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Text, VStack } from "@chakra-ui/layout";
import { Link, navigate } from "@reach/router";
import { useFormik } from "formik";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import * as yup from "yup";

const registerSchema = yup.object().shape({
  name: yup.string().min(3).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

const AuthForm = ({
  type = "login", // other option is register
  onSubmit,
}) => {
  const user = useSelector((state) => state.user?.user);
  useEffect(() => {
    if (user?.id) {
      navigate("/");
      return null;
    }
  }, [user]);
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: type === "login" ? loginSchema : registerSchema,
      validateOnBlur: true,
      onSubmit: (values) => {
        if (type === "login") {
          onSubmit({
            email: values.email,
            password: values.password,
          });
        } else {
          onSubmit(values);
        }
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <VStack>
        {type === "register" && (
          <FormControl
            flex="1"
            minWidth="40%"
            id="name"
            isRequired={true}
            isInvalid={Boolean(errors.name && touched.name)}
          >
            <Input
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Name"
            />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>
        )}

        <FormControl
          flex="1"
          minWidth="40%"
          id="email"
          isRequired={true}
          isInvalid={Boolean(errors.email && touched.email)}
        >
          <Input
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Email"
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl
          flex="1"
          minWidth="40%"
          id="password"
          isRequired={true}
          isInvalid={Boolean(errors.password && touched.password)}
        >
          <Input
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Password"
          />
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>

        {type === "register" && (
          <FormControl
            flex="1"
            minWidth="40%"
            id="confirmPassword"
            isRequired={true}
            isInvalid={Boolean(
              errors.confirmPassword && touched.confirmPassword
            )}
          >
            <Input
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Retype Password"
            />
            <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
          </FormControl>
        )}

        <Button width="full" type="submit" textTransform="uppercase">
          {type}
        </Button>
        <Text>
          {type === "login" && (
            <>
              Don't have an account?
              <Link to="/register">
                <Button as="span" variant="link">
                  Register
                </Button>
              </Link>
            </>
          )}

          {type === "register" && (
            <>
              Already have an account?
              <Link to="/login">
                <Button as="span" variant="link">
                  Login
                </Button>
              </Link>
            </>
          )}
        </Text>
      </VStack>
    </form>
  );
};

export default AuthForm;
