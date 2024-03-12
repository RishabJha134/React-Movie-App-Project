import React from "react";
import { Link } from "react-router-dom";

function Cards({ data, title }) {
  // console.log(title);
  // console.log(data);
  // convert object into array because map work on the array not an object.
  const dataArray = Array.isArray(data) ? data : [];

  return (
    <div className="flex flex-wrap w-full h-full px-[5%] bg-[#1F1E24]">
      {dataArray.map((item, index) => {
        return (
          
            <Link 
             key={index}
              to={`/${item.media_type || title}/details/${item.id}`}
             
              className="relative w-[25vh] mr-[5%] mb-[5%]"
            >
              <img
                className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[40vh] object-cover"
                src={ item.backdrop_path || item.poster_path || item.profile_path ? `https://image.tmdb.org/t/p/original/${
                  item.backdrop_path || item.poster_path || item.profile_path
                }`: noimage}
                alt=""
              />
              <h1 className="text-2xl text-zinc-300 mt-3 font-semibold">
                {item.name ||
                  item.title ||
                  item.original_name ||
                  item.original_title}
              </h1>

              {item.vote_average && (
                <div className="absolute right-[-11%] bottom-[30%] rounded-full text-xl font-semibold bg-yellow-600 text-white w-[6vh] h-[6vh] flex justify-center items-center">
                  {Math.floor(item.vote_average) * 10}
                  <sup>%</sup>
                </div>
              )}
            </Link>
          
        );
      })}
    </div>
  );
}

export default Cards;
