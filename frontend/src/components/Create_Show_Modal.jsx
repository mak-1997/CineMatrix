import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Box,
  Grid,
  Flex,
  Checkbox,
  useDisclosure,
  Button,
  Container,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { AuthContext } from "../contexts/AuthContextProvider";
import {
  book_event_show,
  book_movie_show,
  create_event_show,
  create_movie_show,
} from "../API/API_Calls";

export function Create_Show_Modal({ elem }) {
  console.log(elem);
  const { token, setToken, username, setUsername, email, setEmail } =
    React.useContext(AuthContext);

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [date, setDate] = React.useState("");
  const [language, setLanguage] = React.useState("");
  const [price, setPrice] = React.useState();
  const [start_time, setStart_time] = React.useState("");

  const create_show = async () => {
    if (elem.hasOwnProperty("movie_name")) {
      const data = {
        movie_id: elem._id["$oid"],
        date,
        language,
        price,
        start_time,
      };
      try {
        let res = await create_movie_show(data, token);
        toast({
          title: "Show created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.log(error);
      toast({
        title: "Failed to create Show !",
        description: "Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      }
    } else {
      const data = {
        event_id: elem._id["$oid"],
        date,
        language,
        price,
        start_time,
      };
      try {
        let res = await create_event_show(data, token);
        toast({
          title: "Show created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.log(error);
      toast({
        title: "Failed to create Show !",
        description: "Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      }
    }
  };

  return (
    <>
      <Box onClick={onOpen} colorScheme="green">
        Create a new show
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Create A New Show for{" "}
            {elem.hasOwnProperty("movie_name")
              ? elem.movie_name
              : elem.event_name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" flexDir={"column"} gap="5" >
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="date"
              />
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              />
              <Input
                type="text"
                value={start_time}
                onChange={(e) => setStart_time(e.target.value)}
                placeholder="Start Time"
              />
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {elem.language.map((elem) => {
                  return (
                    <option value={elem} key={elem}>
                      {" "}
                      {elem}{" "}
                    </option>
                  );
                })}
              </Select>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={create_show}>
              Create this show
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
