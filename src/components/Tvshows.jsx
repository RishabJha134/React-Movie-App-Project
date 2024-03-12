import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import Cards from "./partials/Cards";
import Loader from "./partials/Loader";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
function Tvshows() {
  const navigate = useNavigate();
  const [category, setcategory] = useState("top_rated");
  const [tvshows, settvshows] = useState([]);

  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = "MOVIE FLIX | Tv Shows " + category.toLocaleUpperCase();

  const gettvshows = async function () {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);

      if (data.results.length > 0) {
        settvshows((prevState) => [...prevState, ...data.results]);
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
  // console.log(tvshows);

  const refreshHandler = () => {
    if (tvshows.length === 0) {
      gettvshows();
    } else {
      setpage(1);
      settvshows([]);
      gettvshows();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return tvshows.length > 0 ? (
    <div className="h-screen w-screen">
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            className="hover:text-[#6556CD] ri-arrow-left-line"
            onClick={() => {
              navigate(-1);
            }}
          ></i>
          Tv{" "}
          <small className="ml-2 text-sm text-zinc-600">({category})</small>
        </h1>

        <div className="flex items-center w-[80%]">
          <Topnav></Topnav>
          <Dropdown
            title="Category"
            options={["popular", "top_rated", "airing_today", "on_the_air"]}
            func={(e) => setcategory(e.target.value)}
          ></Dropdown>
          <div className="w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={tvshows.length}
        next={gettvshows}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={tvshows} title="tv"></Cards>
      </InfiniteScroll>
    </div>
  ) : (
    <Loader></Loader>
  );
}

export default Tvshows;
