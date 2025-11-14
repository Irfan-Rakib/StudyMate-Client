import React, { useContext, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import "animate.css";
import { AuthContext } from "../context/AuthContext";

const CreatePartnerProfile = () => {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    profileimage: "",
    subject: "",
    studyMode: "",
    availabilityTime: "",
    location: "",
    experienceLevel: "",
    rating: "",
    patnerCount: 0,
    email: user?.email || "",
  });

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/models", formData);

      if (res.data.success) {
        toast.success("Profile created successfully!");
        setFormData({
          name: "",
          profileimage: "",
          subject: "",
          studyMode: "",
          availabilityTime: "",
          location: "",
          experienceLevel: "",
          rating: "",
          patnerCount: 0,
          email: user?.email,
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to create profile!");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-24 p-8 bg-white rounded-xl shadow-lg animate__animated animate__fadeInUp">
      <h2 className="text-3xl font-bold text-center text-[#4A7BA8] mb-6">
        Create Your Study Partner Profile
      </h2>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center my-6 animate__animated animate__fadeIn">
          <div className="w-12 h-12 border-4 border-[#4A7BA8] border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Profile Image URL</label>
          <input
            type="text"
            name="profileimage"
            required
            value={formData.profileimage}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
            placeholder="Image URL"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Subject</label>
          <input
            type="text"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
            placeholder="English, Math, Programming..."
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Study Mode</label>
          <select
            name="studyMode"
            required
            value={formData.studyMode}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
          >
            <option value="">Select mode</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Availability Time</label>
          <input
            type="text"
            name="availabilityTime"
            required
            value={formData.availabilityTime}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
            placeholder="Evening 6–9 PM"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Location</label>
          <input
            type="text"
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
            placeholder="Dhaka, Chittagong..."
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Experience Level</label>
          <select
            name="experienceLevel"
            required
            value={formData.experienceLevel}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
          >
            <option value="">Select level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Rating</label>
          <input
            type="number"
            name="rating"
            required
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
            placeholder="1 to 5"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Email (Read Only)</label>
          <input
            type="text"
            name="email"
            readOnly
            value={formData.email}
            className="w-full border px-4 py-2 rounded-md bg-gray-100"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-md font-semibold text-white bg-[#4A7BA8] hover:opacity-90 transition"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default CreatePartnerProfile;
