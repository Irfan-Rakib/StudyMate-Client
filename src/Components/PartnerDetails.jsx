import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const PartnerDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [partner, setPartner] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/models/${id}`)
      .then((res) => setPartner(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleSendRequest = async () => {
    try {
      // ✅ Increase partnerCount in the partner profile
      const updatedCount = partner.patnerCount + 1;
      await axios.patch(`http://localhost:3000/models/${id}`, {
        patnerCount: updatedCount,
      });

      // ✅ Save request info in another collection
      await axios.post("http://localhost:3000/requests", {
        partnerId: id,
        partnerName: partner.name,
        partnerEmail: partner.email,
        userEmail: user?.email || "guest@example.com",
      });

      toast.success("Partner request sent successfully!");
      setPartner({ ...partner, patnerCount: updatedCount });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while sending the request!");
    }
  };

  if (!partner) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="container mx-auto px-4 mt-20">
      <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md p-6 gap-6">
        <img
          src={partner.profileimage}
          alt={partner.name}
          className="w-64 h-64 object-cover rounded-lg shadow-md"
        />

        <div>
          <h2 className="text-3xl font-bold text-[#4A7BA8] mb-2">
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
            <strong>Rating:</strong> ⭐ {partner.rating}
          </p>
          <p className="text-gray-700">
            <strong>Partner Count:</strong> {partner.patnerCount}
          </p>

          <button
            onClick={handleSendRequest}
            className="mt-4 px-6 py-2 rounded-md text-white font-semibold bg-[#A88647] hover:opacity-90"
          >
            Send Partner Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetails;
