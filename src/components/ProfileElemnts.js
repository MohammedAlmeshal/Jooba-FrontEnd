import React, { useState } from "react";
import AskModal from "../components/AskModal";
import I18n from "../public/theme/i18n";
import {
  Container,
  Heading,
  Avatar,
  Box,
  Text,
  Flex,
  Center,
  useMediaQuery,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
  Fade,
} from "@chakra-ui/react";
import Card from "./Card";

const ProfileElemnts = ({ isOwner, askQuestion, user, isItemLoading }) => {
  const [isMobile] = useMediaQuery("(max-width: 767px)");

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
  answered.reverse();
  inbox.reverse();

  const noAnswers = (
    <Center mt="3rem">
      <Text opacity="30%">
        {" "}
        <I18n t="noAnswers" />
      </Text>
    </Center>
  );

  return (
    <div>
      <Fade in={true}>
        <Container maxW="70rem" centerContent pt="8rem">
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
                    <Text>
                      <I18n t="Asnwered" /> &nbsp;
                    </Text>
                    ({`${answered.length}`})
                  </Tab>
                  <Tab onClick={onToggle}>
                    {" "}
                    <I18n t="Inbox" /> ({`${inbox.length}`})
                  </Tab>
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
              top={["78vh", "78vh", "88vh"]}
              w="75%"
              minW="20rem"
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
      </Fade>
    </div>
  );
};

export default ProfileElemnts;
