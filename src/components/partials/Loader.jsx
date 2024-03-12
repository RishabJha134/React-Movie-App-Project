import React from "react";
import Loading from "../../../public/giphy.gif"

function Loader() {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-black">
      <img src={Loading} alt="" />
     
    </div>
  );
}

export default Loader;
