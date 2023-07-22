import "./App.css";
import AllRoutes from "./routes/AllRoutes";
import Navbar from "./components/Navbar";
import { Box } from "@chakra-ui/react";
import { ColorContext } from "./contexts/ColorContextProvider";
import React from "react";
import { AuthContext } from "./contexts/AuthContextProvider";
import Admin_Navbar from './components/Admin_Navbar';

function App() {
  const { c1, c2, c3, c4, c5, c6 } = React.useContext(ColorContext);
  const {admin_flag} = React.useContext(AuthContext);
  return (
    <div className="App">
      <Box bg={c1} minHeight={"100vh"}>
       {admin_flag ? <Admin_Navbar /> : <Navbar />}
        <Box>
          <AllRoutes />
        </Box>
      </Box>
    </div>
  );
}

export default App;
