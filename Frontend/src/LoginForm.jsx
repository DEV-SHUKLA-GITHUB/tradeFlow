import React, { useState } from "react";
import { Link } from "react-router-dom";
import bgVideo1 from "./assets/bgvideo1.mp4";
import bg from "./assets/logo.png";
import "./login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const isVibrationSupported = "vibrate" in navigator;
import { API_URL } from './dynamicRoutes';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_URL}/login-user`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data)
        if (data.status === "ok") {
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("email", data.email);
          window.localStorage.setItem("userdata", JSON.stringify(data.data));
          window.location.href = "./userDetails";

          toast.success("Login Successful", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        } else {
          setError("Invalid email or password");
          if (isVibrationSupported) {
            navigator.vibrate([100, 50, 100]); // Vibrate for 100ms, pause for 50ms, and vibrate again for 100ms
          }

          toast.error("Invalid Credentials", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        }
      })
     
  };

  return (
    <div>
      <section className="min-h-screen flex items-center justify-center">
        <video
          className="fixed  top-0 left-0 object-cover w-full h-full z-[-1]"
          src={bgVideo1}
          autoPlay
         loop
          muted
        />
        {/* login container */}
        <div className="hello flex rounded-2xl  w-1/2 justify-center p-5 items-center">
          {/* <div className="md:block hidden w-1/2">
            <img className="rounded-2xl " src={bg} alt="Logo" />
          </div> */}
          <div className="border-white h-full" />
          <div className="md:w-1/2 px-8 md:px-16  ">
            <h2 className="font-bold text-4xl text-cyan-300">Login</h2>
            <p className=" mt-4  text-cyan-300">
              If you are already a member, easily log in
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
              <input
                className="p-2 mt-8 text-white rounded-xl border border-cyan-300 bg-transparent "
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
              <div className="relative">
                <input
                  className="p-2 rounded-xl text-white border w-full bg-transparent border-cyan-300"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="gray"
                  className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>
              </div>

              {error && <p className="error-message">{error}</p>}
              <button className="  w-1/2 ml-12 mt-4 border  rounded-xl text-white py-2 hover:scale-105 duration-300">
                Login
              </button>
            </form>

            <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-cyan-300">
              <a href="#">Forgot your password?</a>
            </div>

            <div className="mt-3 text-xs flex justify-between items-center text-cyan-300">
              <p>Don't have an account?</p>
              <button className="py-2 px-5 border rounded-xl hover:scale-110 duration-300">
                <Link to="/signup">Register</Link>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
