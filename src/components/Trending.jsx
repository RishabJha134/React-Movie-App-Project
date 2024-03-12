import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import Cards from "./partials/Cards";
import Loader from "./partials/Loader";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
function Trending() {
  const navigate = useNavigate();
  const [category, setcategory] = useState("all");
  const [trending, settrending] = useState([]);
  const [duration, setduration] = useState("day");
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = "MOVIE FLIX | Trending " + category.toLocaleUpperCase();

  const gettrending = async function () {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);

      if (data.results.length > 0) {
        settrending((prevState) => [...prevState, ...data.results]);
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
  // console.log(trending);

  const refreshHandler = () => {
    if (trending.length === 0) {
      gettrending();
    } else {
      setpage(1);
      settrending([]);
      gettrending();
    }
  };

  useEffect(
    () => {
      refreshHandler();
    },
    [category],
    [duration]
  );

  return trending.length > 0 ? (
    <div className="h-screen w-screen">
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            className="hover:text-[#6556CD] ri-arrow-left-line"
            onClick={() => {
              navigate(-1);
            }}
          ></i>
          Trending
        </h1>

        <div className="flex items-center w-[80%]">
          <Topnav></Topnav>
          <Dropdown
            title="Category"
            options={["movie", "tv", "all"]}
            func={(e) => setcategory(e.target.value)}
          ></Dropdown>
          <div className="w-[2%]"></div>
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setduration(e.target.value)}
          ></Dropdown>
        </div>
      </div>

      <InfiniteScroll
        dataLength={trending.length}
        next={gettrending}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={trending} title={category}></Cards>
      </InfiniteScroll>
    </div>
  ) : (
    <Loader></Loader>
  );
}

export default Trending;
