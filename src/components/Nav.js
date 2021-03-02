import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import I18n from "../public/theme/i18n";

import {
  useColorMode,
  Button,
  Flex,
  Box,
  Center,
  Text,
  useMediaQuery,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, ChevronDownIcon } from "@chakra-ui/icons";

import Navbar from "./Navbar";
import Logout from "./Logout";
import LogoLight from "../public/logo.svg";
import LogoDark from "../public/logoDark.svg";
import Sidebar from "./Sidebar";

const Nav = ({ isAuthenticated, isLoading, username }) => {
  const location = useLocation();

  const [isMobile] = useMediaQuery("(max-width: 767px)");
  const { colorMode, toggleColorMode } = useColorMode();

  const color = colorMode === "light" ? "brand.600" : "brand.300";
  const BgColor = colorMode === "light" ? "white" : "gray.800";
  const Logo = colorMode === "light" ? LogoLight : LogoDark;

  const [lang, setLang] = useState("AR");
  let Topath = "";
  const path = location.pathname.slice(0, 3);

  if (location.pathname.startsWith("/en")) {
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
    Topath = location.pathname.replace("en", "ar");
  } else if (location.pathname.startsWith("/ar")) {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
    Topath = location.pathname.replace("ar", "en");
  }

  const langButton = (
    <Link to={Topath}>
      {" "}
      <Button _hover={{ bg: color, color: "white" }} bg="transparent">
        <Text>
          {" "}
          <I18n t="switchTo" />{" "}
        </Text>
      </Button>{" "}
    </Link>
  );

  const home = (
    <Link to={`${path}/`}>
      <Button
        bg="transparent"
        _hover={{ background: `${color}`, color: "white" }}
        _active={{ background: `${color}`, color: "white" }}
        isActive={
          location.pathname === "/en" ||
          location.pathname === "/en/" ||
          location.pathname === "/ar" ||
          location.pathname === "/ar/"
            ? true
            : false
        }
        w="6rem"
      >
        <I18n t="Home" />
      </Button>
    </Link>
  );
  const userInfo = (
    <Flex align="center">
      {" "}
      <Avatar size="xs" me="0.5rem" />
      <Text fontSize="md"> {username}</Text>
    </Flex>
  );

  const account = (
    <Link to={`${path}/${username}`}>
      <Text fontSize={["md", "md", "sm"]} fontWeight="700">
        <I18n t="Account" />
      </Text>
    </Link>
  );
  const links =
    !isLoading && isLoading !== null ? (
      isAuthenticated ? (
        <>
          {" "}
          <Menu >
            <MenuButton
              matchWidth={true}
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              {userInfo}
            </MenuButton>
            <MenuList  bg={BgColor}>
              <MenuItem >{account}</MenuItem>
              <MenuItem>
                <Logout />
              </MenuItem>
            </MenuList>
          </Menu>
        </>
      ) : (
        <>
          {" "}
          <Link to={`${path}/login`}>
            <Button
              m="0 1rem"
              w="6rem"
              bg="transparent"
              _hover={{ background: `${color}`, color: "white" }}
              _active={{ background: `${color}`, color: "white" }}
              isActive={
                location.pathname === "/en/login" ||
                location.pathname === "/ar/login"
                  ? true
                  : false
              }
            >
              {" "}
              <I18n t="Login" />
            </Button>
          </Link>{" "}
          <Link to={`${path}/signup`}>
            <Button
              bg="transparent"
              _hover={{ background: `${color}`, color: "white" }}
              _active={{ background: `${color}`, color: "white" }}
              w="6rem"
              isActive={
                location.pathname === "/en/signup" ||
                location.pathname === "/ar/signup"
                  ? true
                  : false
              }
            >
              <I18n t="SignUp" />
            </Button>
          </Link>{" "}
        </>
      )
    ) : null;

  const darkModeButton = (
    <Button
      _hover={{ bg: color, color: "white" }}
      me="1rem"
      bg="transparent"
      _focus="none"
      onClick={toggleColorMode}
    >
      {" "}
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );

  return (
    <>
      <Center
        position="fixed"
        w="100%"
        bg={colorMode === "dark" ? "gray.800" : "white"}
        zIndex="100"
        h="80px"
        borderBottom="1px solid"
        borderColor={colorMode === "light" ? "brand.100" : "brand.200"}
      >
        <Flex w="70rem" justify="space-between" align="center" m="0 2rem">
        <Link to={`${path}/`}>
            <img width="85" src={Logo}></img>
          </Link>

          {isMobile ? (
            <Flex align="center">
              {darkModeButton}

              <Sidebar
                links={links}
                home={home}
                langButton={langButton}
                color={color}
                isAuthenticated={isAuthenticated}
                userInfo={userInfo}
                account={account}
                BgColor={BgColor}
              />
            </Flex>
          ) : (
            <Navbar
              links={links}
              home={home}
              darkModeButton={darkModeButton}
              langButton={langButton}
            />
          )}
        </Flex>
      </Center>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  username: state.auth.user.username,
  isLoading: state.auth.isLoading,
});
export default connect(mapStateToProps)(Nav);
