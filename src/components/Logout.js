import React from "react";
import I18n from "../public/theme/i18n";
import { logout } from "../flux//actions/authActions";
import { connect } from "react-redux";
import { Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";


const Logout = ({ logout }) => {

const location = useLocation();
const path = location.pathname.slice(0, 3);
  return (
    <>
      <Link
        to={`${path}/`}
        onClick={() => {
          logout();
        }}
      >
        <Text fontSize={["md", "md", "sm"]} fontWeight="700">
          <I18n t="Logout" />
        </Text>
      </Link>
    </>
  );
};
export default connect(null, { logout })(Logout);
