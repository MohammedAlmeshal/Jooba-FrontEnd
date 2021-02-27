import React, { useState } from "react";

import { Button, Flex, Box, Center, Text } from "@chakra-ui/react";

const Navbar = ({ links, home, darkModeButton, langButton }) => {
  return (
    <>
      <Flex w="50rem" justify="space-between" align="baseline">
        <Flex w="35rem" justify="space-between">
          {home}

          <Box>{links}</Box>
        </Flex>

        <Box>
          {darkModeButton}
          {langButton}
        </Box>
      </Flex>
    </>
  );
};

export default Navbar;
