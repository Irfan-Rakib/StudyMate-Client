// MyConnections.jsx
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "animate.css";
import NotFound from "../Components/NotFound";

const MyConnections = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProfile, setEditProfile] = useState(null);

  // Fetch connections
  const fetchConnections = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://studymate-server-theta.vercel.app/models"
      );
      const userConnections = res.data.filter(
        (profile) => profile.email === user.email
      );
      setConnections(userConnections);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch connections");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchConnections();
  }, [user]);

  // Delete handler
  const handleDelete = (id) => {
    // Custom toast content
    const DeleteToast = ({ closeToast }) => (
      <div className="flex  flex-col gap-2 p-2">
        <p className="font-semibold text-gray-700">
          Are you sure you want to delete this profile?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={async () => {
              try {
                await axios.delete(
                  `https://studymate-server-theta.vercel.app/models/${id}`
                );
                toast.success("Profile deleted successfully!");
                setConnections((prev) => prev.filter((c) => c._id !== id));
              } catch (err) {
                console.error(err);
                toast.error("Failed to delete profile");
              }
              closeToast();
            }}
            className="px-3 py-1 bg-red-500 text-white rounded hover:opacity-90"
          >
            Yes
          </button>
          <button
            onClick={closeToast}
            className="px-3 py-1 bg-gray-400 text-white rounded hover:opacity-90"
          >
            No
          </button>
        </div>
      </div>
    );

    toast.info(<DeleteToast />, {
      autoClose: false, // stay open until user chooses
      closeOnClick: false,
    });
  };

  const handleEdit = (profile) => setEditProfile(profile);
  const handleCancel = () => setEditProfile(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfile({ ...editProfile, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { _id, ...data } = editProfile;
      await axios.put(
        `https://studymate-server-theta.vercel.app/models/${_id}`,
        data
      );
      toast.success("Profile updated successfully!");
      setConnections((prev) =>
        prev.map((c) => (c._id === _id ? editProfile : c))
      );
      handleCancel();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  if (authLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 ">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold  text-center text-[#4A7BA8]  animate__animated animate__fadeInDown my-15">
          My Connections
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : connections.length === 0 ? (
          <div className="flex justify-center items-center h-[60vh] text-gray-500 text-lg font-medium">
            <NotFound />
          </div>
        ) : (
          <div className="overflow-x-auto animate__animated animate__fadeIn">
            <p className="text-gray-700 dark:text-white font-medium mb-4">
              Total Found:{" "}
              <span className="font-bold text-[#4A7BA8]">
                {connections.length}
              </span>
            </p>
            <table className="w-full min-w-[700px] border-collapse border border-gray-300">
              <thead className="">
                <tr>
                  <th className="border p-2">Profile</th>
                  <th className="border p-2">Subject</th>
                  <th className="border p-2">Study Mode</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {connections.map((c, index) => (
                  <tr
                    key={c._id}
                    className={` animate__animated animate__fadeInUp`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td className="border p-2 flex items-center gap-2">
                      <img
                        src={c.profileimage}
                        alt={c.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span>{c.name}</span>
                    </td>
                    <td className="border p-2">{c.subject}</td>
                    <td className="border p-2">{c.studyMode}</td>
                    <td className="border p-2 flex flex-wrap gap-2">
                      <button
                        className="px-3 py-1 bg-[#A88647] text-white rounded hover:opacity-90"
                        onClick={() => handleEdit(c)}
                      >
                        Update
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded hover:opacity-90"
                        onClick={() => handleDelete(c._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Update Form */}
        {editProfile && (
          <div className="fixed inset-0  flex justify-center items-center z-50 p-4 pointer-events-none">
            <div className="bg-gray-50 p-6 rounded-lg w-full max-w-xl shadow-lg animate__animated animate__fadeInUp pointer-events-auto overflow-auto max-h-[90vh]">
              <h3 className="text-xl font-bold mb-4 text-center animate__animated animate__fadeIn">
                Update Profile
              </h3>
              <form onSubmit={handleUpdate} className="space-y-3">
                <input
                  type="text"
                  name="name"
                  value={editProfile.name}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded animate__animated animate__fadeIn"
                  placeholder="Full Name"
                />
                <input
                  type="text"
                  name="profileimage"
                  value={editProfile.profileimage}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded animate__animated animate__fadeIn"
                  placeholder="Profile Image URL"
                />
                <input
                  type="text"
                  name="subject"
                  value={editProfile.subject}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded animate__animated animate__fadeIn"
                  placeholder="Subject"
                />
                <select
                  name="studyMode"
                  value={editProfile.studyMode}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded animate__animated animate__fadeIn"
                >
                  <option value="">Select Study Mode</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
                <input
                  type="text"
                  name="availabilityTime"
                  value={editProfile.availabilityTime}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded animate__animated animate__fadeIn"
                  placeholder="Availability Time"
                />
                <input
                  type="text"
                  name="location"
                  value={editProfile.location}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded animate__animated animate__fadeIn"
                  placeholder="Location"
                />
                <select
                  name="experienceLevel"
                  value={editProfile.experienceLevel}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded animate__animated animate__fadeIn"
                >
                  <option value="">Select Experience Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
                <input
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  value={editProfile.rating}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded animate__animated animate__fadeIn"
                  placeholder="Rating (1-5)"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-400 text-white rounded"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#4A7BA8] text-white rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyConnections;
