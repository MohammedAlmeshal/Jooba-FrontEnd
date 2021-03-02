import React, { useState } from "react";
import AskModal from "../components/AskModal";
import I18n from "../public/theme/i18n";
import {
  Container,
  Button,
  ButtonGroup,
  Heading,
  Avatar,
  Box,
  Text,
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
  Center,
  useMediaQuery,
  useColorMode,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Alert,
  AlertIcon,
  SlideFade,
  useDisclosure,
  Fade,
} from "@chakra-ui/react";
import Card from "./Card";

const ProfileElemnts = ({ isOwner, askQuestion, user, isItemLoading }) => {
  const [isMobile] = useMediaQuery("(max-width: 767px)");
  const { colorMode, toggleColorMode } = useColorMode();
  const [view, setView] = useState("answered");
  const [display, setDisplay] = useState(true);

  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

  // push
  var answered = new Array();
  var inbox = new Array();
  user.posts.map((post, i) => {
    if (post.answer) {
      answered.push(
        <Card
          key={i}
          question={post.question.questionTxt}
          answer={post.answer.answerTxt}
          id={post._id}
          user={user}
          isMobile={isMobile}
        ></Card>
      );
    } else
      inbox.push(
        <Card key={i} question={post.question.questionTxt} id={post._id}></Card>
      );
  });

  const noAnswers = (
    <Center mt="3rem">
      <Text opacity="30%">It seems like you haven't answer any question.</Text>
    </Center>
  );

  return (
    <div>
      <Container h="150vh" maxW="70rem" centerContent pt="8rem">
        <Flex
          p="1rem"
          align="center"
          justify="flex-start"
          w="100%"
          mb="3rem"
          wrap="nowrap"
        >
          <Avatar
            size={isMobile ? "lg" : "2xl"}
            src="https://bit.ly/broken-link"
          />

          <Box ms="1rem">
            <Heading as="h2" fontSize={["xl", "lg", "4xl"]} d="inline">
              {user.name}
            </Heading>
            <Text fontSize={["lg", "lg", "xl"]}> {`@${user.username}`}</Text>
          </Box>
        </Flex>

        <Box w="100%">
          {isOwner ? (
            <Tabs colorScheme="brand" isFitted w="100%" align="end">
              <TabList>
                <Tab onClick={onToggle}>
                  {" "}
                  <I18n t="Asnwered" />({`${answered.length}`})
                </Tab>
                <Tab onClick={onToggle}> Inbox ({`${inbox.length}`})</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Fade in={isOpen}>
                    {" "}
                    {answered.length !== 0 ? answered : noAnswers}
                  </Fade>
                </TabPanel>
                <TabPanel>
                  <Fade in={!isOpen}> {inbox}</Fade>
                </TabPanel>
              </TabPanels>
            </Tabs>
          ) : (
            answered
          )}
        </Box>

        {!isOwner ? (
          <Flex
            position="fixed"
            sx={{ transform: "translate3d(0,0,0)" }}
            top="88vh"
            w="75%"
            minW='20rem'
            justify="flex-end"
          >
            <AskModal
              display={display}
              setDisplay={setDisplay}
              askQuestion={askQuestion}
              user={user}
              isItemLoading={isItemLoading}
            />
          </Flex>
        ) : null}
      </Container>
    </div>
  );
};

export default ProfileElemnts;
