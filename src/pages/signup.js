import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearErrors } from "../flux//actions/errorActions";
import LogoLight from "../public/logo.svg";
import LogoDark from "../public/logoDark.svg";

import { register } from "../flux//actions/authActions";
import {
  Flex,
  Box,
  Center,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useColorMode,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
const SignUp = ({
  register,
  isLoading,
  isAuthenticated,
  RegisterError,
  toUsername,
  clearErrors,
}) => {
  let history = useHistory();
  const { colorMode, toggleColorMode } = useColorMode();
  const color = colorMode === "light" ? "brand.600" : "brand.300";
  const Logo = colorMode === "light" ? LogoLight: LogoDark;


  useEffect(() => {
    if (RegisterError.msg.msg) {
      clearErrors();
    }

    if (isAuthenticated) {
      clearErrors();

      history.push(`/${toUsername}`);
    }
  }, [isAuthenticated]);

  const validateName = (value) => {
    let error;
    if (!value) {
      error = "Name is required";
      return error;
    }
  };

  const validateUsername = (value) => {
    let error;
    if (!value) {
      error = "Username is required";
      return error;
    }
  };

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  };

  const validatePassword = (value) => {
    let error;
    if (!value) {
      error = "Password is required";
    } else if (!/^[A-Z0-9._%+-?]{6,16}$/i.test(value)) {
      error = "Invalid Password";
    }

    return error;
  };
  const alert = (
    <Alert status="error" mb="1rem"  borderRadius="base">
      <AlertIcon />
      <AlertTitle mr={2}>{RegisterError.msg.msg}</AlertTitle>
    </Alert>
  );
  return (
    <>
      <Center>
        <Flex flexDir="column" m="5rem" m="10rem 0 0 0" align="center">
          <img src={Logo} width="250" />
          <Box m="2rem" w="20rem">
            <Formik
              initialValues={{
                name: "",
                username: "",
                email: "",
                password: "",
              }}
              onSubmit={(values, actions) => {
                const { name, username, email, password } = values;
                register({ name, username, email, password });
              }}
            >
              {(props) => (
                <Form>
                  {RegisterError.status !== null &&
                  RegisterError.status != 401 ? (
                    alert
                  ) : (
                    <Box h="48px" />
                  )}
                  <Field name="name" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                        mb="1rem"
                      >
                        <Input
                          {...field}
                          id="name"
                          placeholder="Name"
                          variant="flushed"
                          focusBorderColor={color}
                        />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="username" validate={validateUsername}>
                    {({ field, form }) => (
                      <FormControl
                        mt="1rem"
                        isInvalid={
                          form.errors.username && form.touched.username
                        }
                      >
                        <Input
                          {...field}
                          id="username"
                          placeholder="Username"
                          variant="flushed"
                          focusBorderColor={color}
                        />
                        <FormErrorMessage>
                          {form.errors.username}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="email" validate={validateEmail}>
                    {({ field, form }) => (
                      <FormControl
                        mt="1rem"
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <Input
                          {...field}
                          id="email"
                          placeholder="Email"
                          variant="flushed"
                          focusBorderColor={color}
                        />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password" validate={validatePassword}>
                    {({ field, form }) => (
                      <FormControl
                        mt="1rem"
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <Input
                          {...field}
                          id="password"
                          type="password"
                          placeholder="Password"
                          variant="flushed"
                          focusBorderColor={color}
                        />
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Button
                    mt="2rem"
                    w="20rem"
                    isLoading={isLoading}
                    type="submit"
                    _hover={{ bg: color, color: "white" }}
                  >
                    Sign up
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Flex>
      </Center>
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  isAuthenticated: state.auth.isAuthenticated,
  toUsername: state.auth.user.username,
  RegisterError: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(SignUp);
