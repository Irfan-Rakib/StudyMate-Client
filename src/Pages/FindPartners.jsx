import React, { useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "animate.css";

const FindPartners = () => {
  const { user } = useContext(AuthContext);
  const [partners, setPartners] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const cardRefs = useRef([]);

  // Fetch partners from backend
  const fetchPartners = async (query = "") => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/models${query ? `?search=${query}` : ""}`
      );
      setPartners(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch partners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  // Search handler
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    fetchPartners(value);
  };

  // Sort handler
  const handleSort = () => {
    const sorted = [...filtered].sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    setFiltered(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Animate cards on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "animate__animated",
              "animate__fadeInUp"
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    cardRefs.current.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, [filtered]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-20 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-[#4A7BA8] mb-8 animate__animated animate__fadeInDown">
        Find Your Partners
      </h1>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <button
          onClick={handleSort}
          className="px-5 py-2 rounded-lg text-white font-semibold bg-[#A88647] hover:bg-[#a3743d] transition"
        >
          Sort ({sortOrder === "asc" ? "A-Z" : "Z-A"})
        </button>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={handleSearch}
          className="border border-gray-300 px-4 py-2 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[#4A7BA8]"
        />
      </div>

      {/* Partner Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((partner, index) => (
          <div
            key={partner._id}
            ref={(el) => (cardRefs.current[index] = el)}
            className="bg-white shadow-lg rounded-xl overflow-hidden transform transition hover:-translate-y-1 opacity-0"
          >
            <div className="relative w-full h-64">
              <img
                src={partner.profileimage}
                alt={partner.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#4A7BA8] text-white text-xs px-2 py-1 rounded-md shadow">
                {partner.studyMode}
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-[#4A7BA8] mb-2">
                {partner.name}
              </h3>
              <p className="text-gray-600 mb-1">
                <strong>Subject:</strong> {partner.subject}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Experience:</strong> {partner.experienceLevel}
              </p>
              <p className="text-gray-600 mb-3">
                <strong>Rating:</strong> {"⭐".repeat(partner.rating)}
              </p>

              {/* Only View Profile button */}
              <Link
                to={`/partner/${partner._id}`}
                className="block mt-2 w-auto px-6 py-2 rounded-lg text-white font-semibold bg-[#4A7BA8] hover:bg-[#3a6680] transition"
              >
                View Full Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindPartners;
