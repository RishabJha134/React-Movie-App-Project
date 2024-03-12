import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import Cards from "./partials/Cards";
import Loader from "./partials/Loader";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
function Movies() {
  const navigate = useNavigate();
  const [category, setcategory] = useState("now_playing");
  const [movies, setmovies] = useState([]);
 
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = "MOVIE FLIX | Movies " + category.toLocaleUpperCase();

  const getmovies = async function () {
    try {
      const { data } = await axios.get(`/movie/now_playing?page=${page}`);

      if (data.results.length > 0) {
        setmovies((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
        // console.log(data);
      } else {
        hasMore(false);
      }
    } catch (e) {
      console.log("Error:" + e);
    }
  };

  // console.log(duration);
  // console.log(movies);

  const refreshHandler = () => {
    if (movies.length === 0) {
      getmovies();
    } else {
      setpage(1);
      setmovies([]);
      getmovies();
    }
  };

  useEffect(
    () => {
      refreshHandler();
    },
    [category],
    
  );

  return movies.length > 0 ? (
    <div className="h-screen w-screen">
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            className="hover:text-[#6556CD] ri-arrow-left-line"
            onClick={() => {
              navigate(-1);
            }}
          ></i>
          Movies <small className="ml-2 text-sm text-zinc-600">({category})</small> 
        </h1>

        <div className="flex items-center w-[80%]">
          <Topnav></Topnav>
          <Dropdown
            title="Category"
            options={["popular","top_rated","upcoming","now_playing"]}
            func={(e) => setcategory(e.target.value)}
          ></Dropdown>
          <div className="w-[2%]"></div>
         
        </div>
      </div>

      <InfiniteScroll
        dataLength={movies.length}
        next={getmovies}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={movies} title="movie"></Cards>
      </InfiniteScroll>
    </div>
  ) : (
    <Loader></Loader>
  );
}

export default Movies;
