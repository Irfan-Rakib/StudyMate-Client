import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 bg-white shadow-lg rounded-lg text-center w-80">
        <img
          src={user.photoURL}
          alt="User"
          className="h-24 w-24 mx-auto rounded-full border-4 border-amber-400"
        />
        <h2 className="mt-4 text-xl font-bold">{user.displayName}</h2>
        <p className="text-gray-600">{user.email}</p>
      </div>
    </div>
  );
};

export default Profile;
