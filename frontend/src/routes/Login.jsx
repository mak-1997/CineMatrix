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
import { ColorContext } from "../contexts/ColorContextProvider";
import { user_login } from "../API/API_Calls";
import { useToast } from "@chakra-ui/react";
import { AuthContext } from "../contexts/AuthContextProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { c1, c4, c6 } = React.useContext(ColorContext);
  const { token, setToken, username, setUsername, email, setEmail } =
    React.useContext(AuthContext);

  const navigate = useNavigate();

  const [user_email, setUser_email] = React.useState("");
  const [user_password, setUser_password] = React.useState("");

  const toast = useToast();

  const handleLogin = async () => {
    setEmail(user_email);
    const user_data = {
      user_email,
      user_password,
    };
    try {
      const response = await user_login(user_data);
      console.log(response);
      toast({
        title: "Login Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setToken(response.data.token);
      setUsername(response.data.username);
      // localStorage.setItem("cinematrix_username", JSON.stringify(response.data.username));
      // localStorage.setItem("cinematrix_token", JSON.stringify(response.data.token));
      navigate("/");
    } catch (error) {
      console.log(error);
      toast({
        title: error.response.data.message,
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
          Login
        </Text>

        <Input
          required={true}
          focusBorderColor={c4}
          type="email"
          value={user_email}
          placeholder="email..."
          onChange={(e) => setUser_email(e.target.value)}
        />
        <Input
          required={true}
          focusBorderColor={c4}
          type="password"
          value={user_password}
          placeholder="Password..."
          onChange={(e) => setUser_password(e.target.value)}
        />

        <Button bg={c4} onClick={handleLogin}>
          Login
        </Button>
      </Container>
    </Box>
  );
};

export default Login;
