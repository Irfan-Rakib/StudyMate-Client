import React, { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import logo from "../assets/logo.png";

import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";

import { toast } from "react-toastify";

import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [show, setShow] = useState(false);
  const emailRef = useRef(null);
  const {
    signInWithEmailAndPasswordFunc,
    signInWithPopupGoogleFunc,
    signOutFunc,
    sendPasswordResetEmailFunc,
    user,
    setUser,
    setLoading,
  } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  // const result = useContext(AuthContext);
  // console.log(result);

  const HandleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email?.value;
    const password = e.target.password?.value;
    // console.log(email, password);
    // signInWithEmailAndPassword(auth, email, password)
    signInWithEmailAndPasswordFunc(email, password)
      .then((res) => {
        setLoading(false);
        // email verify
        // if (!res.user?.emailVerified) {
        //   toast.error(
        //     "Your email is not verified. Go to inbox or spam folder in your email to verify"
        //   );
        //   return;
        // }
        console.log(res.user);
        toast.success("Congratulations! Login Successfull");
        setUser(res.user);
        navigate(location.state ? location.state : "/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const HandleLoginGoogle = (e) => {
    e.preventDefault();
    // console.log("cliked google");

    signInWithPopupGoogleFunc()
      .then((res) => {
        setLoading(false);
        // loggedin

        console.log(res.user);
        toast.success("Congratulations! Login Successfull");
        setUser(res.user);
        navigate(location.state ? location.state : "/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const HandleLogout = (e) => {
    e.preventDefault();

    signOutFunc()
      .then(() => {
        setLoading(false);
        // Sign-out successful.
        toast.success("Logout Successfull");
        setUser(null);
      })
      .catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
  };

  const handleForgetPass = () => {
    // e.preventDefault();
    // console.log("forget clicked");
    const email = emailRef.current.value;
    // console.log(email);
    sendPasswordResetEmailFunc(email)
      .then(() => {
        setLoading(false);
        // Password reset email sent!
        toast.success("Check your email(inbox/spam) to reset password");
      })
      .catch((err) => {
        // const errorCode = error.code;
        // const errorMessage = err.message;
        if (err.code == "auth/missing-email") {
          toast.error("You have to input your email in the email field");
        }

        // toast.error(errorMessage);
      });
  };
  console.log(user);
  return (
    <div>
      <div
        className="hero min-h-screen flex items-center justify-center md:justify-end  px-5 md:pr-10 lg:pr-50"
        style={{
          backgroundImage:
            "url(https://lagunabeachvet.com/wp-content/uploads/2023/11/lbvmc-keeping-your-furry-friend-warm.jpg)",
        }}
      >
        <div className="card px-5 backdrop-blur-sm w-full max-w-sm lg:max-w-lg shrink-0 shadow-2xl pb-8 rounded-2xl">
          <div className=" flex flex-col items-center justify-center pt-0 relative">
            {/* <img className="w-80 h- absolute -top-7" src={logo} alt="" /> */}
            <h1 className="font-bold text-2xl pt-18 pb-0">
              Please Login Your Account
            </h1>
          </div>
          <div className="card-body ">
            <form onSubmit={HandleLogin} className="fieldset">
              <label className="label">Email</label>
              <input
                required
                name="email"
                type="email"
                className="input w-full"
                placeholder="example@gmail.com"
                ref={emailRef}
              />
              <label className="label relative">Password</label>
              <input
                required
                name="password"
                type={show ? "text" : "password"}
                className="input w-full"
                placeholder="******"
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute cursor-pointer top-59  right-15 text-lg"
              >
                {show ? <FaEye /> : <IoEyeOff />}
              </span>
              <div>
                <a
                  onClick={handleForgetPass}
                  className="link text-purple-950 font-bold link-hover"
                  type="button"
                >
                  Forgot password?
                </a>
              </div>
              <button className="btn  mt-4 bg-orange-200 font-bold">
                Login
              </button>
              <br />
              <p className="font-bold flex justify-center">Or,</p>
              <div className="">
                <button
                  onClick={HandleLoginGoogle}
                  className="google w-full font-bold btn"
                >
                  <FcGoogle className="text-lg" /> Continue with google
                </button>
              </div>
              <p className="mt-3">
                {" "}
                Don't have an account?{" "}
                <Link className="link-hover font-bold" to="/register">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
