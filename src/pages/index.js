import React from "react";
import {
  Box,
  Flex,
  Container,
  Heading,
  Center,
  useColorMode,
  Image
} from "@chakra-ui/react";
import LogoLight from "../public/logo.svg";
import LogoDark from "../public/logoDark.svg";
import Background from "../public/texture3.svg";
const Home = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const Logo = colorMode === "light" ? LogoLight : LogoDark;

  return (
    <Center
      h="100vh"
      style={{ backgroundImage: `url(${Background})` }}

      pt="7rem"
    >
      <Flex justify="center" align="center" w="90%" wrap="wrap">
        <Heading textAlign="center" fontWeight="800" fontSize={['6xl','6xl','8xl']} as="h1" mb='2rem' >
          Got a<br /> question ?
        </Heading>

        <Image me='1rem' width="700px" src={Logo}></Image>
      </Flex>
    </Center>
  );
};

export default Home;
