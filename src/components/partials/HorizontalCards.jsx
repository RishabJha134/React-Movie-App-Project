import React from "react";
import { Link } from "react-router-dom";
import noimage from "../../../public/noimage.jpg";

function HorizontalCards({ data }) {

  // Check if data is provided and is an array
  if (!Array.isArray(data) || data.length === 0) {
    console.error("Invalid Array or empty data:", data);
    return (
      <h1 className="text-3xl mt-5 text-white font-black text-center">
        Nothing to Show
      </h1>
    );
  }


  return (
    <div className="w-[100%] flex overflow-y-hidden mb-5 p-5">
      {data.map((item, i) => (
        <Link
          to={`/${item.media_type}/details/${item.id}`}
          key={i}
          className="min-w-[15%] h-[36vh] bg-zinc-900 mr-5 mb-5"
        >
          <img
            className="w-full object-cover h-[55%]"
            src={
              item.backdrop_path ||
              item.poster_path ||
              item.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                    item.backdrop_path ||
                    item.poster_path ||
                    item.profile_path
                  }`
                : noimage
            }
            alt=""
          />

          <div className="text-white p-3 h-[45%] overflow-y-auto">
            <h1 className="text-xl font-semibold">
              {item.name ||
                item.title ||
                item.original_name ||
                item.original_title}
            </h1>

            <p className="">
              {item.overview.slice(0, 50)}...
              <span className="text-zinc-300">more</span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default HorizontalCards;
