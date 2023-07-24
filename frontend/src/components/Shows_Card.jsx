import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  Button,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ColorContext } from "../contexts/ColorContextProvider";
import { Book_Show_Modal } from "./Book_Show_Modal";

const data = {
  isNew: true,
  imageURL:
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80",
  name: "Wayfarer Classic",
  price: 4.5,
  rating: 4.2,
  numReviews: 34,
};

function Shows_Card({ elem }) {
  const { c1, c2, c3, c4, c5, c6 } = React.useContext(ColorContext);

  console.log(elem);
  const navigate = useNavigate();
  // const handleClick = (elem) => {
  //   // elem.hasOwnProperty("movie_name") ? navigate("/book/movie") : navigate("/book/event")
  //   Book_Show_Modal(elem)
  // };
  return (
    <Flex p={50} w="full" alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue(c2, "gray.800")}
        maxW="sm"
        // borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Image
          src={data.imageURL}
          alt={`Picture of ${elem.movie_name}`}
          roundedTop="lg"
        />

        <Box p="6">
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {elem.hasOwnProperty("movie_name")
                ? elem.movie_name
                : elem.event_name}
            </Box>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Flex fontSize="2xl">
              <Text>Price : ₹ </Text>
              <Text>{elem.price}</Text>
            </Flex>
            <Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
              <Box as="span" color={"gray.600"} fontSize="lg"></Box>
              {`${elem.duration} Hr`}
            </Box>
          </Flex>
          <Flex justifyContent="space-between" alignContent="center" fontSize={"xl"} >
            <Text>From : {elem.start_time} </Text>
            <Text>To : {elem.end_time} </Text>
          </Flex>
          <Flex flexDir={"column"} justifyContent="space-between" alignContent="center" fontSize={"xl"} textAlign={"left"} >
            <Text>Total seats : {elem.total_seats} </Text>
            <Text>Available seats : {elem.total_seats - elem.booked_seats} </Text>
            <Text>Date : {elem.date}</Text>
          </Flex>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Flex gap="2" alignItems={"center"}>
              <Box
                bg={c4}
                paddingLeft={"2"}
                paddingRight={"2"}
                borderRadius={"5"}
              >
                <Text id={elem._id} as="b">
                  {" "}
                  {elem.language}{" "}
                </Text>
              </Box>
            </Flex>
            <Tooltip
              label="See all shows related to this movie"
              bg={c4}
              placement={"top"}
              color={"gray.800"}
              fontSize={"1em"}
            >
              <Book_Show_Modal elem={elem} />
            </Tooltip>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default Shows_Card;
