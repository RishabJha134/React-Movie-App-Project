import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import Cards from "./partials/Cards";
import Loader from "./partials/Loader";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
function Popular() {
  const navigate = useNavigate();
  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
 
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = "MOVIE FLIX | Popular " + category.toLocaleUpperCase();

  const getpopular = async function () {
    try {
      const { data } = await axios.get(`/${category}/popular?page=${page}`);

      if (data.results.length > 0) {
        setpopular((prevState) => [...prevState, ...data.results]);
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
  // console.log(popular);

  const refreshHandler = () => {
    if (popular.length === 0) {
      getpopular();
    } else {
      setpage(1);
      setpopular([]);
      getpopular();
    }
  };

  useEffect(
    () => {
      refreshHandler();
    },
    [category],
    
  );

  return popular.length > 0 ? (
    <div className="h-screen w-screen">
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            className="hover:text-[#6556CD] ri-arrow-left-line"
            onClick={() => {
              navigate(-1);
            }}
          ></i>
          Popular
        </h1>

        <div className="flex items-center w-[80%]">
          <Topnav></Topnav>
          <Dropdown
            title="Category"
            options={["tv","movie"]}
            func={(e) => setcategory(e.target.value)}
          ></Dropdown>
          <div className="w-[2%]"></div>
         
        </div>
      </div>

      <InfiniteScroll
        dataLength={popular.length}
        next={getpopular}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={popular} title={category}></Cards>
      </InfiniteScroll>
    </div>
  ) : (
    <Loader></Loader>
  );
}

export default Popular;
