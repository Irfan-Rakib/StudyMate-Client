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
  const [loading, setLoading] = useState(true);

  // Filters & search
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");

  const cardRefs = useRef([]);

  // Fetch partners
  const fetchPartners = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://studymate-server-theta.vercel.app/models"
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

  // Apply filters + search
  useEffect(() => {
    let temp = [...partners];

    if (subjectFilter) {
      temp = temp.filter(
        (p) => p.subject.toLowerCase() === subjectFilter.toLowerCase()
      );
    }
    if (experienceFilter) {
      temp = temp.filter(
        (p) =>
          p.experienceLevel.toLowerCase() === experienceFilter.toLowerCase()
      );
    }
    if (search) {
      temp = temp.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(temp);
  }, [partners, subjectFilter, experienceFilter, search]);

  // Animate cards
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

  const subjects = [...new Set(partners.map((p) => p.subject))];
  const experiences = [...new Set(partners.map((p) => p.experienceLevel))];

  return (
    <div className="container max-w-6xl mx-auto px-4 my-20 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-[#4A7BA8] mb-8 animate__animated animate__fadeInDown">
        Find Your Partners
      </h1>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        {/* Left side: Filters */}
        <div className="flex gap-3 flex-wrap">
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7BA8]"
          >
            <option value="">All Subjects</option>
            {subjects.map((subj, i) => (
              <option key={i} value={subj}>
                {subj}
              </option>
            ))}
          </select>

          <select
            value={experienceFilter}
            onChange={(e) => setExperienceFilter(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7BA8]"
          >
            <option value="">All Experience Levels</option>
            {experiences.map((exp, i) => (
              <option key={i} value={exp}>
                {exp}
              </option>
            ))}
          </select>
        </div>

        {/* Right side: Search */}
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[#4A7BA8]"
        />
      </div>
      {/* Total partners found */}
      <p className="text-gray-700 dark:text-white font-medium mb-4">
        Total Found:{" "}
        <span className="font-bold text-[#4A7BA8]">{filtered.length}</span>
      </p>

      {/* Partner Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 object-cover">
        {filtered.map((partner, index) => (
          <div
            key={partner._id}
            ref={(el) => (cardRefs.current[index] = el)}
            className="border  border-gray-200 p-6 shadow-lg rounded-2xl overflow-hidden transform transition hover:-translate-y-1 opacity-0 w-full max-w-sm mx-auto"
          >
            <div className="relative w-full h-fit">
              <img
                src={partner.profileimage}
                alt={partner.name}
                className="w-full h-80 object-cover rounded-xl shadow-md"
              />
              <div className="absolute top-3 left-3 bg-[#4A7BA8] text-white text-xs px-2 py-1 rounded-md shadow">
                {partner.studyMode}
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-bold text-[#4A7BA8] mb-2">
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

              <Link
                to={`/partner/${partner._id}`}
                className="block mt-2 px-6 py-2 rounded-lg text-white font-semibold bg-[#4A7BA8] hover:bg-[#A88647] transition w-auto mx-auto text-center"
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
