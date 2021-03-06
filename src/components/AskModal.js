import React, { useState } from "react";
import I18n from "../public/theme/i18n";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  InputGroup,
  Box,
  Flex,
  useDisclosure,
  useColorMode,
  Alert,
  AlertIcon,
  SlideFade,
  Circle,
  Text,
} from "@chakra-ui/react";

const AnswerModal = ({
  display,
  setDisplay,
  isItemLoading,
  askQuestion,
  user,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const color = colorMode === "light" ? "brand.600" : "brand.300";

  const BgColor = colorMode === "light" ? "white" : "gray.800";
  const [question, setQuestion] = useState("");

  return (
    <>
      <Circle
        cursor="pointer"
        boxShadow="2xl"
        bg={color}
        size="4rem"
        onClick={onOpen}
      >
        {" "}
        <Text color="white" fontWeight="bold" fontSize="18px">
          {" "}
          <I18n t="Ask" />
        </Text>
      </Circle>

      <Modal
        motionPreset="slideInBottom"
        isCentered={true}
        p="0 1rem"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent bg={BgColor}>
          <ModalHeader>
            {" "}
            <I18n t="Ask" />&nbsp;
            {`${user.name}`}
          </ModalHeader>
          <ModalCloseButton  ms='20rem' />
          <ModalBody>
            <Flex flexDir="column" justify="center" m="0 2rem">
              {!isItemLoading && isItemLoading !== null ? (
                <SlideFade in={display} offsetY="30px">
                  <Alert
                    fontSize="sm"
                    h="25px"
                    mb="5px"
                    borderRadius="base"
                    status="success"
                    variant="left-accent"
                  >
                    <AlertIcon p="2px" />
                    <I18n t="questionSent" />
                  </Alert>
                </SlideFade>
              ) : (
                <Box h="25px" w="1" />
              )}
              <InputGroup bg={colorMode === "dark" ? "gray.800" : "white"}>
                <Input
                  boxShadow="lg"
                  focusBorderColor={
                    colorMode === "dark" ? "brand.300" : "brand.100"
                  }
                  onChange={(e) => setQuestion(e.target.value)}
                />
                <Box ms="0.5rem" boxShadow="lg" backgroundColor="transparent">
                  <Button
                    isActive={display}
                    boxShadow="sm"
                    size="md"
                    isLoading={isItemLoading}
                    _hover={{ bg: `${color}`, color: "white" }}
                    isDisabled={!/\S/.test(question)}
                    onClick={() => {
                      askQuestion(question, user.username);
                      setDisplay(true);

                      setTimeout(() => {
                        setDisplay(false);
                      }, 2000);
                    }}
                  >
                    <I18n t="Send" />
                  </Button>
                </Box>
              </InputGroup>
            </Flex>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AnswerModal;
