import React from "react";
import { Link } from "react-router-dom";
import bgVideo2 from "./assets/bgVideo2.mp4";
import logo from "./assets/degenLogo.png";
import Typewriter from "typewriter-effect";

const HomePage = () => {
  return (
    <div>
      <nav class>
        <img src={logo} className="w-60" />
      </nav>

      <div className="flex flex-col items-center justify-center h-96 ">
        <section>
          <video
            className="fixed  top-0 left-0 object-cover w-full h-full z-[-1]"
            src={bgVideo2}
            autoPlay
            loop
            muted
          />
        </section>

        <h1 className="text-6xl  mb-10 drop-shadow-2xl shadow-white  text-cyan-500">
        <Typewriter
  onInit={(typewriter) => {
    typewriter
    .changeDelay(50)
       // Optional: Add a pause before starting
      .typeString("The Advanced way of Trading the Markets")
       // Set a lower value for faster typewriter effect
      .start();
  }}
/>

{/* <Typewriter
  options={{
    strings: ["The Advanced way of Trading the Markets"],
    autoStart: true,
    delay: 70,
    pauseFor :5000,
    loop:false,
    deleteSpeed: 10000
  }} */}


        </h1>
        <div className="space-y-4 m-2">
          <Link
            to="/signup"
            className="bg-cyan-300 text-gray-900 py-3 px-6 rounded-md shadow-md hover:bg-cyan-600 transition m-4"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-gray-700 text-white py-3 px-6 rounded-md shadow-md hover:bg-gray-800 transition"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
