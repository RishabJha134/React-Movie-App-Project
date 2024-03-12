import React from "react";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movies from "./components/Movies";
import Tvshows from "./components/Tvshows";
import People from "./components/People";
import MovieDetails from "./components/MovieDetails";
import TvDetails from "./components/TvDetails";
import PersonDetails from "./components/PersonDetails";
import Trailer from "./components/Trailer";
import Notfound from "./components/partials/Notfound";
import Contact from "./components/Contact";
import About from "./components/About";

function App() {
  return (
    <>
      <div className="bg-[#1F1E24] h-screen w-screen flex">
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/trending" element={<Trending></Trending>}></Route>
          <Route path="/popular" element={<Popular></Popular>}></Route>
          <Route path="/movies" element={<Movies></Movies>}></Route>
          <Route
            path="/movie/details/:id"
            element={<MovieDetails></MovieDetails>}
          >
            <Route
              path="/movie/details/:id/trailer"
              element={<Trailer></Trailer>}
            ></Route>
          </Route>
          <Route path="/tv" element={<Tvshows></Tvshows>}></Route>
          <Route path="/tv/details/:id" element={<TvDetails></TvDetails>}>
            <Route
              path="/tv/details/:id/trailer"
              element={<Trailer></Trailer>}
            ></Route>
          </Route>
          <Route path="/person" element={<People></People>}></Route>
          <Route
            path="/person/details/:id"
            element={<PersonDetails></PersonDetails>}
          ></Route>

          <Route path="*" element={<Notfound></Notfound>}></Route>

          <Route
            path="Contact"
            element={<Contact></Contact>}
          ></Route>

          <Route
            path="About"
            element={<About></About>}
            
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
