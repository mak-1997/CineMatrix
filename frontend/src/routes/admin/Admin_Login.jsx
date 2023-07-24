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
import { admin_login } from "../../API/API_Calls";
import { useToast } from "@chakra-ui/react";
import {AuthContext} from '../../contexts/AuthContextProvider';
import {useNavigate} from 'react-router-dom';


const Admin_Login = () => {
  const { c1, c4, c6 } = React.useContext(ColorContext);
  const {token, setToken, username, setUsername, set_Admin_flag} = React.useContext(AuthContext)

  const navigate = useNavigate();

  const [admin_email, setAdmin_email] = React.useState("");
  const [admin_password, setAdmin_password] = React.useState("");

  const toast = useToast();

  const handleLogin = async () => {
    const admin_data = {
      admin_email,
      admin_password,
    };
    try {
      const response = await admin_login(admin_data);
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
      set_Admin_flag(true)
      navigate("/admin/add/show")

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
         Admin Login
        </Text>

        <Input
          required={true}
          focusBorderColor={c4}
          type="email"
          value={admin_email}
          placeholder="email..."
          onChange={(e) => setAdmin_email(e.target.value)}
        />
        <Input
          required={true}
          focusBorderColor={c4}
          type="password"
          value={admin_password}
          placeholder="Password..."
          onChange={(e) => setAdmin_password(e.target.value)}
        />

        <Button bg={c4} onClick={handleLogin}>
          Login
        </Button>
      </Container>
    </Box>
  );
};

export default Admin_Login;
