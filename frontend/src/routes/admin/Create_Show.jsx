import React from "react";
import { Box, Container, Grid, Text } from "@chakra-ui/react";
import { get_events, get_movies } from "../../API/API_Calls";
import Movie_Card from "../../components/Movie_Card";
import Event_Card from "../../components/Event_Card";

const Create_Show = () => {
  const [movie_data, set_Movie_data] = React.useState([]);
  const [event_data, set_Event_data] = React.useState([]);

  const get_movie_data = async () => {
    try {
      let res = await get_movies();
      // console.log(res.movie_data);
      set_Movie_data(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const get_event_data = async () => {
    try {
      let res = await get_events();
      // console.log(res.movie_data);
      set_Event_data(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    get_movie_data();
    get_event_data();
  }, []);

  return (
    <Box>
      <Box >
        <Text fontSize={"2xl"} fontStyle={"italic"} as="b"  >Movies</Text>
        <Grid templateColumns={"repeat(3,1fr)"}>
          {movie_data?.map((elem) => {
            return <Movie_Card key={elem._id["$oid"]} elem={elem} />;
          })}
        </Grid>
      </Box>
      <hr/>
      <Box >
        <Text fontSize={"2xl"} fontStyle={"italic"} as="b"  >Events</Text>
        <Grid templateColumns={"repeat(3,1fr)"}>
          {event_data?.map((elem) => {
            return <Event_Card key={elem._id["$oid"]} elem={elem} />;
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default Create_Show;
