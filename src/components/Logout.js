import React from "react";
import { logout } from "../flux//actions/authActions";
import { connect } from "react-redux";
import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Logout = ({ logout }) => {
  return (
    <>
      <Link
        to="/"
        onClick={() => {
          logout();
        }}
      >
        <Text fontSize={['md','md','sm']}  fontWeight="700">
          Logout
        </Text>
      </Link>
    </>
  );
};
export default connect(null, { logout })(Logout);
