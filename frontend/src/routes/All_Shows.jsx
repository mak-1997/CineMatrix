import React from "react";
import { get_all_event_shows, get_all_movie_shows } from "../API/API_Calls";
import { Box, Container, Grid, Text } from "@chakra-ui/react";
import Shows_Card from "../components/Shows_Card";

const All_Shows = () => {
  const [movie_shows, set_movie_shows] = React.useState([]);
  const [event_shows, set_event_shows] = React.useState([]);

  const get_all_movie_shows_data = async () => {
    try {
      let res = await get_all_movie_shows();
      set_movie_shows(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const get_all_event_shows_data = async () => {
    try {
      let res = await get_all_event_shows();
      set_event_shows(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    get_all_event_shows_data();
    get_all_movie_shows_data();
  }, []);

  return (
    <Box>
      <Box>
        {movie_shows.length !== 0 ? (
          <Text as="b" fontSize={"2xl"}>
            All Movie Shows
          </Text>
        ) : null}
        <Grid templateColumns={"repeat(3,1fr)"} >
          {movie_shows?.map((elem) => {
            return <Box key={elem._id} >
                <Shows_Card key={elem._id} elem={elem} />
            </Box>;
          })}
        </Grid>
      </Box>
      <Box>
      {event_shows.length !== 0 ? (
          <Text as="b" fontSize={"2xl"}>
            All Event Shows
          </Text>
        ) : null}
        <Grid templateColumns={"repeat(3,1fr)"} >
          {event_shows?.map((elem) => {
            return <Box key={elem._id} >
                <Shows_Card key={elem._id} elem={elem} />
            </Box>;
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default All_Shows;
