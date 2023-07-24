import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import Admin_Login from "./admin/Admin_Login";
import Admin_Signup from "./admin/Admin_Signup";
import All_Shows from "./All_Shows";
import Related_Movie_Shows from "./Related_Movie_Shows";
import Related_Event_Shows from "./Related_Event_Shows";
import Add_New_Movie from "./admin/Add_New_Movie";
import Add_New_Event from "./admin/Add_New_Event";
import Create_Show from "./admin/Create_Show";
import { Admin_Route, Private_Route } from "./Private_Route";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/shows"
          element={
            <Private_Route>
              {" "}
              <All_Shows />
            </Private_Route>
          }
        />
        <Route
          path="/related_movie_shows/:id"
          element={
            <Private_Route>
              {" "}
              <Related_Movie_Shows />
            </Private_Route>
          }
        />
        <Route
          path="/related_event_shows/:id"
          element={
            <Private_Route>
              {" "}
              <Related_Event_Shows />
            </Private_Route>
          }
        />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/login" element={<Login />} />

        {/* //////////////////////////////// */}
        <Route path="/admin/login" element={<Admin_Login />} />
        <Route path="/admin/signup" element={<Admin_Signup />} />
        <Route
          path="/admin/add/movie"
          element={
            <Admin_Route>
              {" "}
              <Add_New_Movie />{" "}
            </Admin_Route>
          }
        />
        <Route
          path="/admin/add/event"
          element={
            <Admin_Route>
              <Add_New_Event />
            </Admin_Route>
          }
        />
        <Route
          path="/admin/add/show"
          element={
            <Admin_Route>
              <Create_Show />
            </Admin_Route>
          }
        />
      </Routes>
    </div>
  );
};

export default AllRoutes;
