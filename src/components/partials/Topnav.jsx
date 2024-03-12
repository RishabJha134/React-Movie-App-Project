import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import noimage from "../../../public/noimage.jpg"

function Topnav() {
  const [query, setquery] = useState("");
  const [search, setsearch] = useState([]);
  const getSearch = async function () {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      // console.log(response);
      // console.log(data.results);
      setsearch(data.results);
    } catch (error) {
      console.log("Error:" + error);
    }
  };
  useEffect(() => {
    getSearch();
  }, [query]);
  return (
    <>
      <div className="w-[80%] h-[10vh] relative flex justify-start items-center mx-auto">
        <i className="text-zinc-400 text-3xl ri-search-line"></i>
        <input
          onChange={(e) => {
            setquery(e.target.value);
          }}
          value={query}
          className="w-[50%] text-zinc-200 mx-10 p-5 text-xl outline-none border-none bg-transparent"
          type="text"
          placeholder="search anything"
        />

        {query.length > 0 && (
          <i
            onClick={() => {
              setquery("");
            }}
            className="text-zinc-400 text-3xl ri-close-fill"
          ></i>
        )}

        <div className=" z-[100] absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[100%] left-[5%] overflow-auto rounded">
          {search.map((item, index) => {
            return (
              <Link to={`/${item.media_type}/details/${item.id}`}
                key={index}
                className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold
             text-zinc-600 w-[100%] p-10 flex justify-start items-center border-2 border-zinc-100 "
              >
                <img className="w-[10vh] h-[10vh] object-cover mr-5 rounded shadow-lg"
                  src={item.backdrop_path || item.poster_path || item.profile_path ? `https://image.tmdb.org/t/p/original/${
                    item.backdrop_path || item.poster_path || item.profile_path
                  }`: noimage}
                  alt=""
                />
                <span>
                  {item.name ||
                    item.title ||
                    item.original_name ||
                    item.original_title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Topnav;
