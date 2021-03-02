import React from "react";
import I18n from "../public/theme/i18n";

import {
  Flex,
  Heading,
  Center,
  useColorMode,
  Image,
  Fade,
} from "@chakra-ui/react";
import LogoLight from "../public/logo.svg";
import LogoDark from "../public/logoDark.svg";
import Background from "../public/texture3.svg";
const Home = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const Logo = colorMode === "light" ? LogoLight : LogoDark;

  return (
    <Fade in={true}>
      <Center
        h="100vh"
        style={{ backgroundImage: `url(${Background})` }}
        pt="7rem"
      >
        <Flex justify="center" align="center" w="90%" wrap="wrap">
          <Heading
            textAlign="center"
            fontWeight="800"
            fontSize={["6xl", "6xl", "8xl"]}
            as="h1"
            mb="2rem"
          >
            <I18n t="gotAquestion" />
          </Heading>

          <Image me="1rem" width="700px" src={Logo}></Image>
        </Flex>
      </Center>{" "}
    </Fade>
  );
};

export default Home;
