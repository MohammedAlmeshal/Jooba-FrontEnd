import React, { useState } from "react";
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
  useDisclosure,
  useColorMode
} from "@chakra-ui/react";
import { ChatIcon } from '@chakra-ui/icons'

const AnswerModal = ({ question, id, answerToQuestion }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newAnswer, setNewAnswer] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();
  const color = colorMode === "light" ? "brand.600" : "brand.300";
  const BgColor = colorMode === "light" ? "white" : "gray.800";

  return (
    <>
      <Button variant='ghost'fontSize='14px' onClick={onOpen}> <ChatIcon me='0.5rem' /> Answer</Button>

      <Modal  motionPreset='slideInBottom' isCentered={true} p='0 1rem' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={BgColor} >
          <ModalHeader> Answer the question </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
{question}

          </ModalBody>
          <ModalFooter>
            <Input focusBorderColor={color} onChange={(e) => setNewAnswer(e.target.value)} />

            <Button
              onClick={() => {answerToQuestion(newAnswer, id); onClose() } }
            x
              ms={3}
              _hover={{ background: `${color}`, color: "white" }}
          
           
            >
              Answer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AnswerModal;
