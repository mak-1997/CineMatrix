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
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ColorContext } from "../contexts/ColorContextProvider";
import { AuthContext } from "../contexts/AuthContextProvider";
import {Create_Show_Modal} from './Create_Show_Modal'

import React from "react";

const data = {
  isNew: true,
  imageURL:
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80",
  name: "Wayfarer Classic",
  price: 4.5,
  rating: 4.2,
  numReviews: 34,
};

function Rating({ rating, numReviews }) {
  return (
    <Flex alignItems="center">
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: "1" }}
                color={i < rating ? "teal.500" : "gray.300"}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
          }
          return <BsStar key={i} style={{ marginLeft: "1" }} />;
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} review{numReviews > 1 && "s"}
      </Box>
    </Flex>
  );
}

function Event_Card({ elem }) {
  const { c1, c2, c3, c4, c5, c6 } = React.useContext(ColorContext);
  const { admin_flag } = React.useContext(AuthContext);

  console.log(elem);
  const navigate = useNavigate();
  const handleClick = (elem) => {
    if (admin_flag) {

    } else {
      navigate(`/related_event_shows/${elem._id["$oid"]}`);
    }
  };
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
          alt={`Picture of ${elem.event_name}`}
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
              {elem.event_name}
            </Box>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Rating rating={data.rating} numReviews={data.numReviews} />
            <Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
              <Box as="span" color={"gray.600"} fontSize="lg"></Box>
              {`${elem.duration} Hr`}
            </Box>
          </Flex>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Flex gap="3" alignItems={"center"}>
              {" "}
              {elem.language.map((lang) => (
                <Box
                  bg={c4}
                  paddingLeft={"3"}
                  paddingRight={"3"}
                  borderRadius={"5"}
                >
                  <Text id={lang} as="b">
                    {" "}
                    {lang}{" "}
                  </Text>
                </Box>
              ))}{" "}
            </Flex>
            <Tooltip
              label="See all shows related to this event"
              bg={c4}
              placement={"top"}
              color={"gray.800"}
              fontSize={"1em"}
            >
              <Button
                size="sm"
                colorScheme="green"
                onClick={() => handleClick(elem)}
              >
                { admin_flag ? <Create_Show_Modal elem={elem} /> : "Shows"}
              </Button>
            </Tooltip>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default Event_Card;
