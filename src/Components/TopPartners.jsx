import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const TopPartners = () => {
  const [partners, setPartners] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:3000/models")
      .then((res) => {
        const sorted = res.data.sort((a, b) => b.rating - a.rating);
        setPartners(sorted.slice(0, 3));
      })
      .catch((err) => console.error(err));
  }, []);

  const handleViewProfile = (id) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/partner/${id}`);
    }
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-10 text-[#4A7BA8]"
          data-aos="fade-down"
        >
          Top Study Partners
        </h2>

        <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {partners.map((partner, index) => (
            <div
              key={partner._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
              data-aos="fade-up"
              data-aos-delay={index * 200}
            >
              <img
                src={partner.profileimage}
                alt={partner.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-[#4A7BA8] mb-2">
                  {partner.name}
                </h3>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Subject:</span>{" "}
                  {partner.subject}
                </p>
                <p className="text-yellow-500 font-semibold">
                  ⭐ {partner.rating}/5
                </p>
                <button
                  onClick={() => handleViewProfile(partner._id)}
                  className="mt-4 bg-[#A88647] text-white px-5 py-2 rounded-md hover:bg-[#4A7BA8] transition"
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
