import React from "react";
import {
  Box,
  Container,
  Text,
  Button,
  Flex,
  Image,
  color,
  Input,
  Select,
  Textarea,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { ColorContext } from "../../contexts/ColorContextProvider";
import { add_new_movie } from "../../API/API_Calls";
import { useToast } from "@chakra-ui/react";
import {useNavigate} from 'react-router-dom';
import { AuthContext } from "../../contexts/AuthContextProvider";

const Add_New_Movie = () => {
  const { c1, c4, c6 } = React.useContext(ColorContext);
  const {token} = React.useContext(AuthContext)

  const navigate = useNavigate();

  const [movie_name, set_movie_name] = React.useState("");
  const [language, set_language] = React.useState("");
  const [image_url, set_image_url] = React.useState("");
  const [duration, set_duration] = React.useState("");


  const toast = useToast();

  const handleAdd = async () => {
    const movie_data = {
      movie_name,
      language : language.trim().split(",").map((elem) => elem.trim()),
      image_url,
      duration,
    };
    console.log(movie_data)
    try {
      const response = await add_new_movie(movie_data, token);
      console.log(response);
      toast({
        title: "Movie Added Successfuly",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Falied to add a new movie !",
        description: "Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Box>
      <Container
        position={"absolute"}
        top={"50vh"}
        left={"50%"}
        transform={"translate(-50%, -50%)"}
        // border={"2px solid white"}
        padding={"10"}
        paddingTop={"5"}
        textAlign={"left"}
        display={"flex"}
        flexDir={"column"}
        gap="5"
        boxShadow={
          "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
        }
        borderRadius={"5"}
      >
        <Text textAlign={"center"} fontSize={"3xl"} as="b" color={c6}>
          Add A New Movie
        </Text>
        <Input
          required={true}
          type="text"
          value={movie_name}
          placeholder="Movie Name..."
          onChange={(e) => set_movie_name(e.target.value)}
          focusBorderColor={c4}
        />

        <Input
          required={true}
          focusBorderColor={c4}
          type="text"
          value={language}
          placeholder="Languages..."
          onChange={(e) => set_language(e.target.value)}
        />
        <Input
          required={true}
          focusBorderColor={c4}
          type="text"
          value={image_url}
          placeholder="Image URL..."
          onChange={(e) => set_image_url(e.target.value)}
        />
        <Input
          required={true}
          focusBorderColor={c4}
          type="text"
          value={duration}
          placeholder="Duration in hours (sample -> 2:30 )..."
          onChange={(e) => set_duration(e.target.value)}
        />


        <Button bg={c4} onClick={handleAdd}>
          Add Movie
        </Button>
      </Container>
    </Box>
  );
}

export default Add_New_Movie
