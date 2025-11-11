import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { auth } from "../firbase/firebase.config";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-700">
          You are not logged in.
        </p>
      </div>
    );
  }

  // When edit mode starts, fill fields with existing data
  const handleEdit = () => {
    setName(user.displayName || "");
    setPhotoURL(user.photoURL || "");
    setEditing(true);
  };

  // Handle update
  const handleUpdate = (e) => {
    e.preventDefault();

    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    })
      .then(() => {
        setUser({ ...auth.currentUser });
        toast.success("Profile updated successfully!");
        setEditing(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-5">
      <div className="p-6 bg-white shadow-lg rounded-lg text-center w-full max-w-sm">
        <img
          src={user?.photoURL || "https://i.ibb.co/3z2QZ5K/default-avatar.png"}
          alt="User"
          className="h-24 w-24 mx-auto rounded-full border-4 border-amber-400 object-cover"
        />

        {!editing ? (
          <>
            <h2 className="mt-4 text-xl font-bold text-gray-800">
              {user?.displayName || "Anonymous User"}
            </h2>
            <p className="text-gray-600">{user?.email}</p>

            <button
              onClick={handleEdit}
              className="btn bg-amber-500 text-white mt-5 w-full font-semibold"
            >
              Update Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleUpdate} className="mt-5 space-y-3 text-left">
            <div>
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Photo URL</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="Enter image URL"
              />
            </div>

            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                className="btn bg-amber-500 text-white w-1/2"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="btn btn-outline w-1/2"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
