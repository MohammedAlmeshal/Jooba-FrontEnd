import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../flux/actions/authActions";
import { clearErrors } from "../flux/actions/errorActions";
import LogoLight from "../public/logo.svg";
import LogoDark from "../public/logoDark.svg";

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
const Login = ({
  login,
  clearErrors,
  isLoading,
  isAuthenticated,
  toUsername,
  RegisterError,
}) => {
  let history = useHistory();
  const { colorMode, toggleColorMode } = useColorMode();
  const color = colorMode === "light" ? "brand.600" : "brand.300";
  const Logo = colorMode === "light" ? LogoLight: LogoDark;


  useEffect(() => {
    if(RegisterError.msg.msg){
    clearErrors();

    }
    if (isAuthenticated) {
    clearErrors();

      history.push(`/${toUsername}`);
    }
  }, [isAuthenticated]);



  const validateUsername = (value) => {
    let error;
    if (!value) {
      error = "Required";
      return error;
    }
  };

  const validatePassword = (value) => {
    let error;
    if (!value) {
      error = "Password is required";
    }
    return error;
  };
  const alert = (
    <Alert status="error" mb="1rem" borderRadius="base">
      <AlertIcon />
      <AlertTitle mr={2}>{RegisterError.msg.msg}</AlertTitle>
    </Alert>
  );
  return (
    <>
      <Center>
        <Flex flexDir="column" m="10rem 0 0 0" align="center">
          <img src={Logo} width="250" />
          <Box m="2rem" w="20rem">
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              onSubmit={(values, actions) => {
                const { username, password } = values;
                login({ username, password });
              }}
            >
              {(props) => (
                <Form>
                  {RegisterError.status !== null && RegisterError.status != 401
                    ? alert
                    : <Box h='48px' />}

                  <Field name="username" validate={validateUsername}>
                    {({ field, form }) => (
                      <FormControl
                        mb="1rem"
                    
                        isInvalid={
                          form.errors.username && form.touched.username
                        }
                      >
                        <Input
                          {...field}
                          id="username"
                          variant="flushed"
                          focusBorderColor={color}
                         
                          placeholder="Username or Email"
                        />
                        <FormErrorMessage>
                          {form.errors.username}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password" validate={validatePassword}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <Input
                          {...field}
                          id="password"
                          type="password"
                          variant="flushed"
                          focusBorderColor={color}
                          placeholder="Password"
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
                    _hover={{bg:color,color:'white'}}
                  >
                    Login
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

export default connect(mapStateToProps, { login, clearErrors })(Login);
