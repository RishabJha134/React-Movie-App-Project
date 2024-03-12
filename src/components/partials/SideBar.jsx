import React, { useEffect } from "react";
import { Link } from "react-router-dom";


function SideBar() {
 
  return (
    <>
      <div className="h-screen w-[20%] border-r-2 border-zinc-400 p-11">
        <h1 className="text-2xl text-white font-bold">
          <i className="text-[#6556CD] ri-tv-fill mr-2"></i>
          <span className="text-2xl">MOVIE FLIX.</span>
        </h1>

        <nav className="flex flex-col text-xl text-zinc-400 gap-3">
          <h1 className="text-white font-semibold text-xl mt-10 mb-5 ">
            New Feeds
          </h1>
          <Link to="/trending" className="hover:bg-[#6566CD] hover:text-white duration-300 rounded-lg p-4">
            <i className="mr-2 ri-fire-fill"></i>
            Trending
          </Link>
          <Link to="/popular" className="hover:bg-[#6566CD] hover:text-white duration-300 rounded-lg p-4">
            <i className="mr-2 ri-bard-fill"></i>
            Popular
          </Link>
          <Link to="movies" className="hover:bg-[#6566CD] hover:text-white duration-300 rounded-lg p-4">
            <i className="mr-2 ri-movie-fill"></i>
            Movies
          </Link>
          <Link to="tv" className="hover:bg-[#6566CD] hover:text-white duration-300 rounded-lg p-4">
            <i className="mr-2 ri-tv-2-fill"></i>
            Tv Shows
          </Link>
          <Link to="person" className="hover:bg-[#6566CD] hover:text-white duration-300 rounded-lg p-4">
            <i className="mr-2 ri-team-fill"></i>
            People
          </Link>
        </nav>

        <hr className="border-none h-[1px] mt-1 bg-zinc-400" />

        <nav className="flex flex-col text-xl text-zinc-400 gap-3">
          <h1 className="text-white font-semibold text-xl mt-10 mb-5 ">
            Website Information
          </h1>
          <Link to="About" className="hover:bg-[#6566CD] w-[16vw] hover:text-white duration-300 rounded-lg p-4">
            <i className="mr-2 ri-information-fill"></i>
            About MOVIE FLIX
          </Link>
          <Link to="Contact" className="hover:bg-[#6566CD] hover:text-white duration-300 rounded-lg p-4">
            <i className="mr-2 ri-phone-fill"></i>
            Contact Us
          </Link>
        </nav>
      </div>
    </>
  );
}

export default SideBar;
