import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import Cards from "./partials/Cards";
import Loader from "./partials/Loader";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
function People() {
  const navigate = useNavigate();
  const [category, setcategory] = useState("popular");
  const [people, setpeople] = useState([]);

  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = "MOVIE FLIX | People ";

  const getpeople = async function () {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);

      if (data.results.length > 0) {
        setpeople((prevState) => [...prevState, ...data.results]);
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
  // console.log(people);

  const refreshHandler = () => {
    if (people.length === 0) {
      getpeople();
    } else {
      setpage(1);
      setpeople([]);
      getpeople();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return people.length > 0 ? (
    <div className="h-screen w-screen">
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            className="hover:text-[#6556CD] ri-arrow-left-line"
            onClick={() => {
              navigate(-1);
            }}
          ></i>
          People{" "}
          
        </h1>

        <div className="flex items-center w-[80%]">
          <Topnav></Topnav>
         
          <div className="w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={people.length}
        next={getpeople}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={people} title="person"></Cards>
      </InfiniteScroll>
    </div>
  ) : (
    <Loader></Loader>
  );
}

export default People;
