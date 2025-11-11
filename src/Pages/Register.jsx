import { Link, useNavigate } from "react-router";
import logo from "../assets/logo.png";
// import {
//   createUserWithEmailAndPassword,
//   sendEmailVerification,
//   updateProfile,
// } from "firebase/auth";

import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { useContext, useState } from "react";
import { IoEyeOff } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [show, setShow] = useState(false);
  const {
    createUserWithEmailAndPasswordFunc,
    updateProfileFunc,
    sendEmailVerificationFunc,
    setLoading,
    signOutFunc,
    setUser,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const HandleRegister = (e) => {
    e.preventDefault();
    const displayName = e.target.name?.value;
    const photoURL = e.target.photo?.value;
    const email = e.target.email?.value;
    const password = e.target.password?.value;

    const passwordRegExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

    if (!passwordRegExp.test(password)) {
      toast.error(
        "Password must be at least 6 characters, include uppercase, lowercase, number, and special symbol."
      );
      return;
    }

    createUserWithEmailAndPasswordFunc(email, password)
      // createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // registered
        // update profile

        updateProfileFunc(displayName, photoURL)
          .then(() => {
            // toast.success("Congratulations! Registration Successfull");
            // email Verification
            sendEmailVerificationFunc()
              .then(() => {
                setLoading(false);
                // Email verification sent!
                // signout
                signOutFunc()
                  .then(() => {
                    // Sign-out successful.
                    toast.success("Check your email to verify");
                    setUser(null);
                    navigate("/login");
                  })
                  .catch((error) => {
                    // An error happened.
                    toast.error(error.message);
                  });
              })
              .catch((err) => toast.error(err.message));
          })
          .catch((error) => {
            // An error occurred
            toast.error(error.message);
          });

        // const user = res.user;
        // console.log(user);

        toast.success("Congratulations! Registration Successfull");
      })
      .catch((err) => {
        if (err.code == "auth/email-already-in-use") {
          toast.error("Your email already exsist in our database");
        }
      });

    // console.log("email and password", { name, photo, email, password });
  };
  return (
    <div>
      <div
        className="hero min-h-screen flex items-center justify-center md:justify-end px-5 md:pr-10 lg:pr-50"
        style={{
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2021/02/18/12/03/people-6027028_1280.jpg)",
        }}
      >
        <div className="card px-5 backdrop-blur-sm  w-full max-w-sm lg:max-w-lg shrink-0 shadow-2xl pb-8 rounded-2xl">
          <div className=" flex flex-col items-center justify-center pt-0 relative">
            {/* <div className="w-40  absolute -top-3 border-orange-400 shadow-2xl border-3">
              <img className="" src={logo} alt="" />
            </div> */}
            <h1 className="font-bold text-2xl pt-18 pb-0">
              Please Register Your Account
            </h1>
          </div>
          <div className="card-body relative ">
            <form onSubmit={HandleRegister} className="fieldset ">
              {/* Full Name */}
              <label className="label">Name</label>
              <input
                required
                name="name"
                type="text"
                className="input w-full"
                placeholder="Your Name"
              />
              {/* PhotoURL */}
              <label className="label">Your Photo URL</label>
              <input
                required
                name="photo"
                type="text"
                className="input w-full"
                placeholder="Example:  https://image..."
              />
              {/* <Link
                to="https://imgbb.com/ "
                target="_blank"
                rel="noopener noreferrer"
                className="link link-hover  flex justify-center font-semibold"
              >
                Click me for creating photo URL
              </Link> */}
              {/* email */}
              <label className="label">Your Email</label>
              <input
                required
                name="email"
                type="email"
                className="input w-full"
                placeholder="Example:  irfan@gmail.com"
              />
              {/* password */}
              <label className="label">Create Password</label>
              <input
                required
                name="password"
                type={show ? "text" : "password"}
                className="input  w-full"
                placeholder="Example:  irFaN@123"
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute cursor-pointer top-68  right-9 text-lg"
              >
                {show ? <FaEye /> : <IoEyeOff />}
              </span>
              <button className="btn bg-[#4A7BA8] text-white font-bold mt-4">
                Register
              </button>{" "}
              <p className="mt-3">
                {" "}
                Already have an account?{" "}
                <Link className="link-hover font-bold" to="/login">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
