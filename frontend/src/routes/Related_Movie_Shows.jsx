import React from "react";
import { useParams } from "react-router-dom";
import { get_related_movie_shows, get_all_movie_shows } from "../API/API_Calls";
import { Box, Container, Grid, Text } from "@chakra-ui/react";
import Shows_Card from "../components/Shows_Card";

const Related_Movie_Shows = () => {
  const { id } = useParams();

  const [movie_shows, set_movie_shows] = React.useState([]);

  const get_all_movie_shows_data = async () => {
    try {
      let res = await get_related_movie_shows(id);
      set_movie_shows(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    get_all_movie_shows_data();
  }, []);

  return (
    <Box>
      <Box>
        {movie_shows.length !== 0 ? (
          <Text as="b" fontSize={"2xl"}>
            All Movie Shows
          </Text>
        ) : (
          "Sorry, No Shows For this Movie !"
        )}
        <Grid templateColumns={"repeat(3,1fr)"}>
          {movie_shows?.map((elem) => {
            return (
              <Box key={elem._id}>
                <Shows_Card key={elem._id} elem={elem} />
              </Box>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default Related_Movie_Shows;
