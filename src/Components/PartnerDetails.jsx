import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const PartnerDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [partner, setPartner] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/models/${id}`);
        setPartner(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load partner details");
      } finally {
        setLoading(false);
      }
    };
    fetchPartner();
  }, [id]);

  const handleSendRequest = async () => {
    if (!user) return toast.warning("You must be logged in to send a request!");
    if (!message.trim()) return toast.warning("Message cannot be empty!");

    try {
      await axios.post("http://localhost:3000/requests", {
        senderEmail: user.email,
        partnerId: id,
        message,
      });

      const res = await axios.get(`http://localhost:3000/models/${id}`);
      setPartner(res.data);

      toast.success("Partner request sent successfully!");
      setMessage("");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to send request");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!partner) {
    return (
      <p className="text-center mt-20 text-gray-500">Partner not found.</p>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-start p-4  mt-14">
      <div className="bg-white rounded-xl  shadow-lg w-full max-w-4xl px-5 py-12 flex flex-col gap-6 animate__animated animate__fadeInUp">
        {/* Partner Info */}
        <div className="flex flex-col md:flex-row gap-8 items-center mx-auto ">
          <img
            src={partner.profileimage}
            alt={partner.name}
            className="w-64 h-64 object-cover rounded-lg shadow-md "
          />
          <div className="flex-1 flex flex-col gap-2 text-center md:text-left">
            <h2 className="text-3xl font-bold text-[#4A7BA8]">
              {partner.name}
            </h2>
            <p className="text-gray-700">
              <strong>Subject:</strong> {partner.subject}
            </p>
            <p className="text-gray-700">
              <strong>Study Mode:</strong> {partner.studyMode}
            </p>
            <p className="text-gray-700">
              <strong>Availability:</strong> {partner.availabilityTime}
            </p>
            <p className="text-gray-700">
              <strong>Location:</strong> {partner.location}
            </p>
            <p className="text-gray-700">
              <strong>Experience Level:</strong> {partner.experienceLevel}
            </p>
            <p className="text-gray-700">
              <strong>Rating:</strong> {"⭐".repeat(partner.rating)}
            </p>
            <p className="text-gray-700">
              <strong>Requests Received:</strong> {partner.requestCount || 0}
            </p>
          </div>
        </div>

        {/* Message & Send Button */}
        <div className="mt-4 w-full max-w-md mx-auto flex flex-col gap-3">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a short message..."
            rows={3}
            className="w-full border border-gray-300 p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#4A7BA8]"
          />
          <button
            onClick={handleSendRequest}
            className="self-center px-8 py-2 rounded-lg text-white font-semibold bg-[#A88647] hover:opacity-90 transition"
          >
            Send Partner Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetails;
