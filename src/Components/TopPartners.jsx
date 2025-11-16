import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const TopPartners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("https://studymate-server-theta.vercel.app/models")
      .then((res) => {
        const sorted = res.data.sort((a, b) => b.rating - a.rating);
        setPartners(sorted.slice(0, 3));
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleViewProfile = (id) => {
    navigate(`/partner/${id}`);
  };

  // 🔥 Loading Spinner
  if (loading) {
    return (
      <div className="w-full py-20 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-[#4A7BA8] border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {partners.map((partner, index) => (
            <div
              key={partner._id}
              className="border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition"
              data-aos="fade-up"
              data-aos-delay={index * 200}
            >
              <img
                src={partner.profileimage}
                alt={partner.name}
                className="w-full h-80 object-cover rounded-2xl"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-[#4A7BA8] mb-2">
                  {partner.name}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Subject:</strong> {partner.subject}
                </p>

                <p className="text-sm text-gray-600 mb-1">
                  <strong>Experience:</strong> {partner.experienceLevel}
                </p>

                <p className="text-sm text-gray-600 mb-3">
                  <strong>Rating:</strong> {"⭐".repeat(partner.rating)}
                </p>

                <button
                  onClick={() => handleViewProfile(partner._id)}
                  className="block w-full mt-2 px-6 py-2 rounded-lg text-white font-semibold bg-[#4A7BA8] hover:bg-[#A88647] transition  mx-auto text-center"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopPartners;
