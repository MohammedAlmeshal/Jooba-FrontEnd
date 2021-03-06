import React from "react";
import { Flex, Box, Center, Button } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Logout from "./Logout";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const Sidebar = ({
  links,
  home,
  langButton,
  color,
  BgColor,
  isAuthenticated,
  account,
  userInfo,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = React.useRef();
  return (
    <Center h="45px">
      <Flex justify="flex-start" width="90%">
        <HamburgerIcon color={color} onClick={onOpen} />
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        placement="left"
        onOverlayClick={onClose}
      >
        <DrawerOverlay>
          <DrawerContent bg={BgColor}>
            <DrawerCloseButton ms='17rem' />
            <DrawerHeader>{isAuthenticated ? userInfo : ""}</DrawerHeader>

            <DrawerBody>
              <Flex
                mt="2rem"
                h="15rem"
                flexDir="column"
                align="center"
                justify="space-between"
                onClick={onClose}
              >
                {home}

                {!isAuthenticated ? (
                  links
                ) : (
                  <>
                    {" "}
                    <Button
                      _active={{ background: `${color}`, color: "white" }}
                    >
                      {" "}
                      {account}
                    </Button>
                    <Button
                      _active={{ background: `${color}`, color: "white" }}
                      w="6rem"
                    >
                      <Logout />
                    </Button>
                  </>
                )}
                {langButton}
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Center>
  );
};

export default Sidebar;
