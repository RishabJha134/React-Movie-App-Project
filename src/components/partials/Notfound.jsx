import React from "react";
import notfound from "../../../public/gifMovieTrailer.gif";

function Notfound() {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-black">
      <img src={notfound} alt="" />
     
    </div>
  );
}

export default Notfound;
