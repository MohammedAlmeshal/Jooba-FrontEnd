import React, { useState } from "react";
import { connect } from "react-redux";
import { ignoreQuestion, answerToQuestion } from "../flux/actions";
import AnswerModal from "./AnswerModal";

import {
  Avatar,
  Text,
  Heading,
  Box,
  Divider,
  Button,
  Flex,
  useColorMode,
} from "@chakra-ui/react";
import { ViewOffIcon } from "@chakra-ui/icons";

const Card = ({
  question,
  answer,
  id,
  ignoreQuestion,
  answerToQuestion,
  user,
  isMobile,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const answerRender = user ? (
    <Box p="1rem">
      <Flex align="center">
        <Avatar
          size={isMobile ? "sm" : "md"}
          src="https://bit.ly/broken-link"
        />

        <Heading as="h4" size="sm" d="inline" ms="0.8rem">
          Mohammed
        </Heading>
      </Flex>

      <Text ms="2rem" mt="1rem" textAlign="start">
        {answer}
      </Text>
    </Box>
  ) : null;

  const answerActions = (
    <>
      <Flex justify="space-between">
        <AnswerModal
          answerToQuestion={answerToQuestion}
          id={id}
          question={question}
        />
        <Button
          variant="ghost"
          fontSize="14px"
          onClick={() => ignoreQuestion(id)}
        >
          {" "}
          <ViewOffIcon
        
            me="0.5rem"
          />{" "}
          Ignore
        </Button>
      </Flex>
    </>
  );

  return (
    <Box
      border="1px"
      borderRadius="lg"
      borderColor={colorMode === "dark" ? "gray.500" : "gray.200"}
      mt="1rem"
      w="100%"
    >
      <Flex p="1rem" align="baseline">
        <Heading
          as="h4"
          size="sm"
          color={colorMode === "dark" ? "brand.200" : "brand.100"}
          d="inline"
          me="1rem"
        >
          Anon
        </Heading>
        <Text d="inline" wordBreak="break-word">
          {question}
        </Text>
      </Flex>
      <Divider />
      {answer ? answerRender : answerActions}
    </Box>
  );
};

export default connect(null, { ignoreQuestion, answerToQuestion })(Card);
