import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/actions/movieActions";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/partials/Loader";
import HorizozntalCards from "../components/partials/HorizontalCards";

const Moviedetails = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { info } = useSelector((state) => state.movie);
  // console.log(info);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadmovie(id));

    // back karne ke baad movie remove bhi ho jaana chahiye:-
    return () => {
      dispatch(removemovie());
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
        className="relative w-screen h-[150vh] px-[10%]"
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
            <i className="hover:text-[#6556CD]  ri-external-link-fill"></i>
          </a>
          <a
            target="_blank"
            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          >
            <i className="hover:text-[#6556CD] ri-earth-fill"></i>
          </a>
          <a className="hover:text-[#6556CD]"
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
                ({info.detail.release_date.split("-")[0]})
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
              <h1>{info.detail.release_date}</h1>
              <h1>{info.detail.genres.map((g) => g.name).join(",")}</h1>

              <h1>{info.detail.runtime}min</h1>
            </div>

            <h1 className="text-xl font-semibold italic text-zinc-200">
              {info.detail.tagline}
            </h1>

            <h1 className="text-xl mb-3 mt-5 text-white">Overview</h1>
            <p className="w-[60vw] text-white">{info.detail.overview}</p>

            <h1 className="text-xl mb-3 mt-5 text-zinc-200">
              Movie Translated
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

        {/* Part-4 Recommendations */}
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

export default Moviedetails;
