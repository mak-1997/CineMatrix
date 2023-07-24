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
} from "@chakra-ui/react";
import { AuthContext } from "../contexts/AuthContextProvider";
import { book_event_show, book_movie_show } from "../API/API_Calls";

export function Book_Show_Modal({ elem }) {
  const { token, setToken, username, setUsername, email, setEmail } =
    React.useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Initialize the seat_map with the data from elem.seat_map
  const [seatMap, setSeatMap] = useState(elem.seat_map);

  // Initialize the number of seats booked
  const [number_of_seats_booked, set_Number_of_seats_booked] = useState(0);

  // Function to handle checkbox click
  const handleCheckboxClick = (rowIndex, seatIndex) => {
    const currentValue = seatMap[rowIndex][seatIndex];

    if (currentValue === 0) {
      // Enable the checkbox and update seatMap and number_of_seats_booked
      setSeatMap((prevSeatMap) => {
        const newSeatMap = [...prevSeatMap];
        newSeatMap[rowIndex][seatIndex] = email; // Assuming email is already defined
        return newSeatMap;
      });
      set_Number_of_seats_booked((prevSeats) => prevSeats + 1);
    } else if (currentValue === email) {
      // Uncheck the checkbox and update seatMap and number_of_seats_booked
      setSeatMap((prevSeatMap) => {
        const newSeatMap = [...prevSeatMap];
        newSeatMap[rowIndex][seatIndex] = 0;
        return newSeatMap;
      });
      set_Number_of_seats_booked((prevSeats) => prevSeats - 1);
    }
  };

  const handleBooking = async () => {
    if (elem.hasOwnProperty("movie_id")) {
      const data = {
        _id: { $oid: elem._id },
        movie_id: { $oid: elem.movie_id },
        date: elem.date,
        language: elem.language,
        start_time: elem.start_time,
        end_time: elem.end_time,
        price: elem.price,
        total_seats: elem.total_seats,
        booked_seats: elem.booked_seats + number_of_seats_booked,
        seat_map: elem.seat_map,
      };
      try {
        let res = await book_movie_show(data, token);
        alert("Booking Successful !")
      } catch (error) {
        console.log(error);
        alert("Booking Failed !");
      }
    } else if (elem.hasOwnProperty("event_id")) {
      const data = {
        _id: { $oid: elem._id },
        event_id: { $oid: elem.event_id },
        date: elem.date,
        language: elem.language,
        start_time: elem.start_time,
        end_time: elem.end_time,
        price: elem.price,
        total_seats: elem.total_seats,
        booked_seats: elem.booked_seats + number_of_seats_booked,
        seat_map: elem.seat_map,
      };
      try {
        let res = await book_event_show(data, token);
        alert("Booking Successful !")
      } catch (error) {
        console.log(error);
        alert("Booking Failed !");
      }
    }
  };
  return (
    <>
      <Button onClick={onOpen} colorScheme="green">
        Book Your Seats
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Book Your Seats</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display={"flex"} flexDir={"column"}>
              <Text as="b">
                {" "}
                Number of seats booked : {number_of_seats_booked}{" "}
              </Text>
              <Text as="b">
                {" "}
                Total Amount : ₹{number_of_seats_booked * elem.price}{" "}
              </Text>
            </Box>
            <Box>
              <Container>
                {seatMap.map((row, rowIndex) => {
                  return (
                    <Flex
                      key={rowIndex}
                      w="100%"
                      justifyContent={"space-between"}
                      marginTop={"2"}
                    >
                      {row.map((value, seatIndex) => {
                        const isEnabled = value === 0 || value === email;
                        return (
                          <Box key={seatIndex}>
                            <Checkbox
                              isChecked={value === email}
                              isDisabled={!isEnabled}
                              onChange={() =>
                                handleCheckboxClick(rowIndex, seatIndex)
                              }
                            ></Checkbox>
                          </Box>
                        );
                      })}
                    </Flex>
                  );
                })}
              </Container>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleBooking}>
              Confirm Booking
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
