import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../store/actions/personActions";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/partials/Loader";
import HorizozntalCards from "../components/partials/HorizontalCards";
import Dropdown from "../components/partials/Dropdown";

const PersonDetails = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { info } = useSelector((state) => state.person);

  // console.log(info);

  const { id } = useParams();
  const [Category, setCategory] = useState("movie");
  const dispatch = useDispatch();




  useEffect(() => {
    dispatch(asyncloadperson(id));

    // back karne ke baad person remove bhi ho jaana chahiye:-
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  document.title = "MOVIE FLIX  |  People Detail";


// console.log(info)

  return info ? (
    <>
      <div className="px-[15%] w-screen bg-[#1F1E24] h-[170vh] ">
        <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-xl">
          <Link
            className="hover:text-[#6556CD] ri-arrow-left-line"
            onClick={() => {
              navigate(-1);
            }}
          ></Link>
        </nav>

        <div className="w-full flex ">
          {/* Part2 left poster and details */}
          <div className="w-[20%]">
            <img
              className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[35vh]  object-cover"
              src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
              alt=""
            />

            <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />

            {/* social media links */}
            <div className="text-2xl text-white flex gap-x-5">
              <a
                target="_blank"
                href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
              >
                <i className="hover:text-[#6556CD] ri-earth-fill"></i>
              </a>
              <a
                target="_blank"
                href={`https://www.facebook.com/${info.externalid.facebook_id}`}
              >
                <i className="hover:text-[#6556CD] ri-facebook-circle-fill"></i>
              </a>
              <a
                target="_blank"
                href={`https://www.instagram.com/${info.externalid.instagram_id}`}
              >
                <i className="hover:text-[#6556CD] ri-instagram-fill"></i>
              </a>
              <a
                target="_blank"
                href={`https://www.twitter.com/${info.externalid.twitter_id}`}
              >
                <i className="hover:text-[#6556CD] ri-twitter-fill"></i>
              </a>
            </div>

            {/* personal information */}
            <h1 className="text-2xl text-zinc-400 font-semibold my-5">
              Person Info
            </h1>

            <h1 className="text-lg text-zinc-400 font-semibold">Known For</h1>

            <h1 className="text-zinc-400">
              {info.detail.known_for_department}
            </h1>

            <h1 className="text-lg text-zinc-400 font-semibold mt-3">Gender</h1>

            <h1 className="text-zinc-400">
              {info.detail.gender === 2 ? "Male" : "Female"}
            </h1>

            <h1 className="text-lg text-zinc-400 font-semibold mt-3">
              Birthday
            </h1>

            <h1 className="text-zinc-400">{info.detail.birthday}</h1>

            <h1 className="text-lg text-zinc-400 font-semibold mt-3">
              Deathday
            </h1>

            <h1 className="text-zinc-400">
              {info.detail.deathday ? info.detail.deathday : "Present"}
            </h1>

            <h1 className="text-lg text-zinc-400 font-semibold mt-3">
              Place of Birth
            </h1>

            <h1 className="text-zinc-400">{info.detail.place_of_birth}</h1>

            <h1 className="text-lg text-zinc-400 font-semibold mt-3">
              Also Known As
            </h1>

            <h1 className="text-zinc-400">
              {info.detail.also_known_as.join(", ")}
            </h1>
          </div>

          {/* part 3 right details and information */}
          <div className="w-[80%] ml-[5%]">
            <h1 className="text-6xl text-zinc-400 font-black my-5">
              {info.detail.name}
            </h1>

            <h1 className="text-xl text-zinc-400 font-semibold">Biography</h1>

            <p className="text-zinc-400 mt-3">{info.detail.biography}</p>

            <h1 className="mt-5 text-lg text-zinc-400 font-semibold">
              Known For
            </h1>

            <HorizozntalCards
              data={info.combinedcredits.cast}
            ></HorizozntalCards>

            <div className="w-full flex justify-between">
              <h1 className="mt-5 text-xl text-zinc-400 font-semibold">
                Acting
              </h1>

              <Dropdown
                title="Category"
                options={["tv", "movie"]}
                func={(e) => setCategory(e.target.value)}
              ></Dropdown>
            </div>

            <div
              className="list-disc text-zinc-400 w-full h-[50vh] mt-5 overflow-x-hidden overflow-y-auto
shadow-xl shadow-[rgba(255,255,255,0.3)] border-2 border-zinc-700 p-5"
            >
             
              {info[Category + "credits"].cast.map((item, index) => (
                <li
                  key={index}
                  className="hover:text-white p-5 rounded hover:bg-[#19191d] duration-300 cursor-pointer"
                >
                  <Link to={`/${Category}/details/${item.id}`}>
                    <span>
                      {item.name ||
                        item.title ||
                        item.original_name ||
                        item.original_title}
                    </span>
                    <span className="block ml-5 mt-2">
                      {item.character && `Character Name: ${item.character}`}
                    </span>
                  </Link>
                </li>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loader></Loader>
  );
};

export default PersonDetails;
