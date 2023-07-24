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
import { user_signup } from "../../API/API_Calls";
import { useToast } from "@chakra-ui/react";
import {useNavigate} from 'react-router-dom';

const Admin_Signup = () => {

  const { c1, c4, c6 } = React.useContext(ColorContext);

  const navigate = useNavigate();

  const [admin_name, setAdmin_name] = React.useState("");
  const [admin_email, setAdmin_email] = React.useState("");
  const [admin_password, setAdmin_password] = React.useState("");

  const toast = useToast();

  const handleSignup = async () => {
    const user_data = {
      admin_name,
      admin_email,
      admin_password,
    };
    try {
      const response = await user_signup(user_data);
      console.log(response);
      toast({
        title: "Signup Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/admin/login")
    } catch (error) {
      console.log(error);
      toast({
        title: "Signup Falied !",
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
          Admin SignUp
        </Text>
        <Input
          required={true}
          type="text"
          value={admin_name}
          placeholder="Name..."
          onChange={(e) => setAdmin_name(e.target.value)}
          focusBorderColor={c4}
        />

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

        <Button bg={c4} onClick={handleSignup}>
          Signup
        </Button>
      </Container>
    </Box>
  );
};

export default Admin_Signup;
