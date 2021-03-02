import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { login } from "../flux/actions/authActions";
import { clearErrors } from "../flux/actions/errorActions";
import LogoLight from "../public/logo.svg";
import LogoDark from "../public/logoDark.svg";
import I18n from "../public/theme/i18n";

import {
  Flex,
  Box,
  Center,
  FormControl,
  Input,
  Button,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
  useColorMode,
  Fade,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
const Login = ({
  login,
  clearErrors,
  isLoading,
  isAuthenticated,
  toUsername,
  RegisterError,
}) => {
  let history = useHistory();
  const location = useLocation();
  const path = location.pathname.slice(0, 3);
  const { colorMode, toggleColorMode } = useColorMode();
  const color = colorMode === "light" ? "brand.600" : "brand.300";
  const Logo = colorMode === "light" ? LogoLight : LogoDark;

  useEffect(() => {
    if (RegisterError.msg.msg) {
      clearErrors();
    }
    if (isAuthenticated) {
      clearErrors();

      history.push(`${path}/${toUsername}`);
    }
  }, [isAuthenticated]);

  const validateUsername = (value) => {
    let error;
    if (!value) {
      error =  <I18n t='Required' /> ;
      return error;
    }
  };

  const validatePassword = (value) => {
    let error;
    if (!value) {
      error =  <I18n t='Prequired' /> ;

    }
    return error;
  };
  const alert = (
    <Fade in={true}>
      <Alert status="error" mb="1rem" borderRadius="base">
        <AlertIcon />
        <AlertTitle mr={2}>{RegisterError.msg.msg}</AlertTitle>
      </Alert>{" "}
    </Fade>
  );

  return (
    <Center>
      <Fade in={true}>
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
                  {RegisterError.status !== null &&
                  RegisterError.status != 401 ? (
                    alert
                  ) : (
                    <Box h="60px" w="1" />
                  )}

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
                          placeholder={I18n.getTranslation(
                            location,
                            "userOrEmail"
                          )}
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
                          placeholder={I18n.getTranslation(
                            location,
                            "password"
                          )}
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
                    <I18n t="Login" />
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Flex>
      </Fade>
    </Center>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  isAuthenticated: state.auth.isAuthenticated,
  toUsername: state.auth.user.username,
  RegisterError: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
