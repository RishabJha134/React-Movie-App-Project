import React from "react";
import { useNavigate } from "react-router-dom";

function Contact() {
  
  const navigate = useNavigate();
  return (
    <>
      <div className=" h-[130vh] w-full bg-[#1F1E24]">
        <div className="flex justify-start items-center p-6 mt-5 ">
          <div className=" h-[5vh] w-[20%] ml-[5%]">
            <i
              className="hover:text-[#6556CD] text-zinc-200 ri-arrow-left-line text-3xl"
              onClick={() => {
                navigate(-1);
              }}
            ></i>
          </div>
          <div className="h-[5vh] w-[50%] text-4xl text-center text-zinc-200 mb-1">
            <h1>Feel Free To Contact Us</h1>
          </div>
        </div>

        <div className="mt-2 p-4 ">
          <iframe
            className="h-[40vh] w-[100%] border-0 "
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448193.9510303648!2d76.76356891374637!3d28.64428735347703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1710056987326!5m2!1sen!2sin"
          ></iframe>
        </div>

        <form
          className=" shadow- shadow-[rgba(255,255,255,0.1)] border-1 border-[#1F1E24] flex flex-col gap-[1.5rem] w-[30vw]  m-auto mt-[5rem]  "
          action="https://formspree.io/f/xrgnllja"
          method="POST"
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            autoComplete="off"
            required
            className="p-2 border border-gray-300 rounded bg-zinc-200"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="off"
            required
            className="p-2 border border-gray-300 rounded bg-zinc-200"
          />

          <textarea
            name="message"
            cols="30"
            rows="6"
            placeholder="Your message"
            autoComplete="off"
            required
            className="p-2 border border-gray-300 rounded bg-zinc-200"
          ></textarea>

          <input
            type="submit"
            value="Send"
            className="p-2 w-[6.5vw] h-[6.5vh] bg-[#6556CD] text-white rounded cursor-pointer transition-all duration-200 hover:bg-[#a69fd5] hover:text-white hover:border-btn hover:text-btn transform hover:scale-90"
          />
        </form>
      </div>
    </>
  );
}

export default Contact;
