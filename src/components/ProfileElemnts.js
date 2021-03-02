import React, { useState } from "react";
import FlashMessage from "react-flash-message";
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
  const color = colorMode === "light" ? "brand.600" : "brand.300";
  const [view, setView] = useState("answered");
  const [display, setDisplay] = useState(true);
  const [question, setQuestion] = useState("");
  const [isActive, setIsActive] = useState(true);
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
            w="20rem"
            flexDir="column"
          >
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
                  Question sent!
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
                  _hover={{ background: `${color}`, color: "white" }}
                  onClick={() => {
                    askQuestion(question, user.username);
                    setDisplay(true);

                    setTimeout(() => {
                      setDisplay(false);
                    }, 2000);
                  }}
                >
                  Ask
                </Button>
              </Box>
            </InputGroup>
          </Flex>
        ) : null}
      </Container>
    </div>
  );
};

export default ProfileElemnts;
