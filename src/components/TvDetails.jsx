import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv, removetv } from "../store/actions/tvActions";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/partials/Loader";
import HorizozntalCards from "../components/partials/HorizontalCards";

const TvDetails = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { info } = useSelector((state) => state.tv);
  // console.log(info);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadtv(id));

    // back karne ke baad tv remove bhi ho jaana chahiye:-
    return () => {
      dispatch(removetv());
    };
  }, [id]);
  return info ? (
    <>
      <div
        style={{
          background: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5),rgba(0,0,0,0.8)),url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="relative w-screen h-[175vh] px-[10%]"
      >
        {/* Part 1 navbar links */}
        <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-xl">
          <Link
            className="hover:text-[#6556CD] ri-arrow-left-line"
            onClick={() => {
              navigate(-1);
            }}
          ></Link>

          <a target="_blank" href={info.detail.homepage}>
            <i className="ri-external-link-fill"></i>
          </a>
          <a
            target="_blank"
            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          >
            <i className="ri-earth-fill"></i>
          </a>
          <a
            target="_blank"
            href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
          >
            imdb
          </a>
        </nav>

        {/* Part 2 Posters and details */}
        <div className="w-full flex">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[50vh] w-[18vw] mt-2 object-cover"
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.backdrop_path || info.detail.poster_path
            }`}
            alt=""
          />

          <div className="ml-[5%]">
            <h1 className="text-4xl font-black text-white">
              {info.detail.name ||
                info.detail.title ||
                info.detail.original_name ||
                info.detail.original_title}

              <small className="text-xl font-bold text-zinc-200">
                ({info.detail.first_air_date.split("-")[0]})
              </small>
            </h1>

            <div className="mt-3 mb-5 flex text-white items-center gap-x-3">
              <span className="rounded-full text-xl font-semibold bg-yellow-600 text-white w-[6vh] h-[6vh] flex justify-center items-center">
                {Math.floor(info.detail.vote_average) * 10}
                <sup>%</sup>
              </span>

              <h1 className="w-[60px] font-semibold text-2xl leading-6">
                User Score
              </h1>
              <h1>{info.detail.first_air_date}</h1>
              <h1>{info.detail.genres.map((g) => g.name).join(",")}</h1>

              <h1>{info.detail.runtime}min</h1>
            </div>

            <h1 className="text-xl font-semibold italic text-zinc-200">
              {info.detail.tagline}
            </h1>

            <h1 className="text-xl mb-3 mt-5 text-white">Overview</h1>
            <p className="w-[60vw] text-white">{info.detail.overview}</p>

            <h1 className="text-xl mb-3 mt-5 text-zinc-200">
              tv Translated
            </h1>
            <p className="mb-8 w-[60vw] text-white">
              {info.translations.join(", ")}
            </p>

            <Link
              className="p-4 text-white bg-[#6556CD] rounded-lg"
              to={`${pathname}/trailer`}
            >
              <i className="text-xl ri-play-fill mr-3 "></i>
              Play Trailer
            </Link>
          </div>
        </div>

        {/* Part 3 Available Platforms */}
        <div className="w-[50%] mt-5  flex flex-col gap-y-3 ">
          {info.watchproviders && info.watchproviders.flatrate && (
            <div className="flex gap-x-7 items-center text-white">
              <h1>Available on Platforms</h1>
              {info.watchproviders.flatrate.map((w,i) => (
                <img key={i}
                  title={w.provider_name}
                  className="w-[4vh] h-[4vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                ></img>
              ))}
            </div>
          )}
          {info.watchproviders && info.watchproviders.rent && (
            <div className="flex gap-x-7  items-center text-white">
              <h1>Available on Rent</h1>
              {info.watchproviders.rent.map((w,i) => (
                <img key={i}
                  title={w.provider_name}
                  className="w-[4vh] h-[4vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                ></img>
              ))}
            </div>
          )}
          {info.watchproviders && info.watchproviders.buy && (
            <div className="flex gap-x-7 items-center text-white">
              <h1>Available on Buy</h1>
              {info.watchproviders.buy.map((w,i) => (
                <img key={i}
                  title={w.provider_name}
                  className="w-[4vh] h-[4vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                ></img>
              ))}
            </div>
          )}
        </div>


  {/* Part-4 Seasons */}
  <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
        <h1 className="text-3xl font-bold text-white">
          Seasons
        </h1>
       

       <div className="w-[100%] flex overflow-y-hidden mb-5 p-5">

       {info.detail.seasons.length>0 ? info.detail.seasons.map((item,index)=>(
        <div key={index} className="w-[15vh] mr-[11%]">

           <img
                className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] min-w-[14vw] h-[30vh] object-cover"
                src={`https://image.tmdb.org/t/p/original/${
                 item.poster_path
                }`}
                alt=""
              />
              <h1 className="text-2xl text-zinc-300 mt-3 font-semibold">
                {item.name 
}
              </h1>

        </div>
       )): <h1 className="text-3xl mt-5 text-white font-black text-center">Nothing to Show</h1>
       }

       </div>




        {/* Part-5 Recommendations */}
        <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
        <h1 className="text-3xl font-bold text-white">
          Recommendations
        </h1>
        <HorizozntalCards
          data={
            info.recommendations.length > 0
              ? info.recommendations
              : info.similar
          }
        />
        <Outlet></Outlet>
      </div>
    </>
  ) : (
    <Loader></Loader>
  );
};

export default TvDetails;
