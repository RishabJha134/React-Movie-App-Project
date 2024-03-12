import React, { useState, useEffect } from "react";
import SideBar from "./partials/SideBar";
import Topnav from "./partials/Topnav";
import axios from "../utils/axios";
import Headers from "./partials/Headers";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loader from "./partials/Loader";

function Home() {
  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all");
  const getHeaderWallpaper = async function () {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      const randomdata = Math.floor(Math.random() * data.results.length);
      // console.log(randomdata);
      setwallpaper(data.results[randomdata]);
    } catch (e) {
      console.log("Error:" + e);
    }
  };
  const gettrending = async function () {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
     settrending(data.results);
    } catch (e) {
      console.log("Error:" + e);
    }
  };

  useEffect(() => {
    gettrending();
    !wallpaper && getHeaderWallpaper(); // agar wallpaper ki value kuch nahi hai tabhi getHeaderWallpaper() call hoga:-
   
  }, [category]);

  // console.log(wallpaper);
  // console.log(trending);
  // console.log(category);

  document.title = "MOVIE FLIX | Homepage";
  // jab tak wallpaper ki value nahi aajaye tab tak dikhao bhi mat so we use ternary operator below line:-
  return wallpaper && trending ? (
    <>
      <SideBar></SideBar>
      <div className="h-full w-[80%] overflow-x-hidden overflow-auto">
        <Topnav></Topnav>
        <Headers data={wallpaper}></Headers>

        <div className="flex justify-between p-5">
        <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>
        <Dropdown title="Filter" options={["tv","movie","all"]} func={(e)=> setcategory(e.target.value)}></Dropdown>
      </div>

        <HorizontalCards data = {trending}></HorizontalCards>
        
      </div>
    </>
  ) : (
    <Loader></Loader>
    );
}

export default Home;
