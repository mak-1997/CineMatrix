import React from "react";
import { Box, Container, Grid } from "@chakra-ui/react";
import { get_movies } from "../API/API_Calls";
import Movie_Card from '../components/Movie_Card';

const Home = () => {
  const [data, setData] = React.useState([]);

  const get_data = async () => {
    try {
      let res = await get_movies();
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    get_data();
  }, []);
  return <Box>
    <Grid>
      {data?.map((elem)=>{
        return (<Movie_Card key={elem._id["$oid"]} />)
      })}
    </Grid>
  </Box>;
};

export default Home;
