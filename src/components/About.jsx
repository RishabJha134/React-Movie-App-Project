import React from "react";
import { Link, useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();
  const stats = [
    { name: "Offices worldwide", value: "12" },
    { name: "Full-time colleagues", value: "300+" },
    { name: "Hours per week", value: "40" },
    { name: "Users", value: "1M+" },
  ];
  return (
    <div className=" w-full h-screen relative isolate overflow-hidden bg-gray-900  py-12">
      <div 
        style={{
          backgroundImage:
            "linear-gradient(360deg, rgba(0, 0, 0, 0.8500) 3.000%, rgba(0, 0, 0, 0.8465) 11.08%, rgba(0, 0, 0, 0.8361) 19.17%, rgba(0, 0, 0, 0.8187) 27.25%, rgba(0, 0, 0, 0.7944) 35.33%, rgba(0, 0, 0, 0.7632) 43.42%, rgba(0, 0, 0, 0.7250) 51.50%, rgba(0, 0, 0, 0.6868) 59.58%, rgba(0, 0, 0, 0.6556) 67.67%, rgba(0, 0, 0, 0.6313) 75.75%, rgba(0, 0, 0, 0.6139) 83.83%, rgba(0, 0, 0, 0.6035) 91.92%, rgba(0, 0, 0, 0.6000) 100.0%)",
        }}
      ></div>
      <img 
        className="blur-sm drop-shadow-xl absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center box-border"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/93da5c27-be66-427c-8b72-5cb39d275279/94eb5ad7-10d8-4cca-bf45-ac52e0a052c0/IN-en-20240226-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt=""
      />

      <i
        className="hover:text-[#6556CD] ml-[6%] text-zinc-200 ri-arrow-left-line text-3xl"
        onClick={() => {
          navigate(-1);
        }}
      ></i>

      <div className="ml-[30%] w-[100%] h-[40%] flex flex-col gap-y-8 ">
        <div className="flex items-center gap-2 h-[12vh] ">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-6xl">
            MOVIE FLIX
          </h2>

          <svg
            className="h-[20vh]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="rgba(101,86,205,1)"
          >
            <path d="M15.4142 4.99998H21.0082C21.556 4.99998 22 5.44461 22 6.00085V19.9991C22 20.5519 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5553 2 19.9991V6.00085C2 5.44808 2.45531 4.99998 2.9918 4.99998H8.58579L6.05025 2.46445L7.46447 1.05023L11.4142 4.99998H12.5858L16.5355 1.05023L17.9497 2.46445L15.4142 4.99998Z"></path>
          </svg>
        </div>

        <p className="mt-2 text-2xl font-semibold  leading-8 text-gray-300">
          Connecting movie fans with their favorite content worldwide
        </p>
      </div>

<div className="w-[100vw] text-center">
  <Link to="/">
  <button className="p-2 w-[8vw] h-[8vh] m-auto bg-[#6556CD] text-white rounded cursor-pointer transition-all duration-200 hover:bg-[#a69fd5] hover:text-white hover:border-btn hover:text-btn transform hover:scale-90">Explore Now</button>
  </Link>

</div>
    

      <div className="mt-20 flex justify-between w-[80%] m-auto ">
        {stats.map((stat,index) => (
          <div key={index} className="flex flex-col-reverse gap-y-4">
            <h1 className="text-3xl text-red-500 ml-4">{stat.name}</h1>
            <h1 className="text-7xl font-bold text-white">{stat.value}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
