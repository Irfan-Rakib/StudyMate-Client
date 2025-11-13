import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const FindPartners = () => {
  const [partners, setPartners] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    axios
      .get("http://localhost:3000/models")
      .then((res) => {
        setPartners(res.data);
        setFiltered(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // 🔍 Search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const result = partners.filter((p) => p.name.toLowerCase().includes(value));
    setFiltered(result);
  };

  // 🔃 Sort
  const handleSort = () => {
    const sorted = [...filtered].sort((a, b) => {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
    setFiltered(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="container mx-auto px-4 mt-20">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleSort}
          className="px-4 py-2 rounded-md text-white font-semibold bg-[#A88647] hover:opacity-90"
        >
          Sort ({sortOrder === "asc" ? "A-Z" : "Z-A"})
        </button>

        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={handleSearch}
          className="border px-4 py-2 rounded-md w-60 focus:outline-[#4A7BA8]"
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((partner) => (
          <div
            key={partner._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={partner.profileimage}
              alt={partner.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-[#4A7BA8]">
                {partner.name}
              </h3>
              <p className="text-gray-700">
                <strong>Subject:</strong> {partner.subject}
              </p>
              <p className="text-gray-700">
                <strong>Study Mode:</strong> {partner.studyMode}
              </p>
              <p className="text-gray-700">
                <strong>Experience:</strong> {partner.experienceLevel}
              </p>

              <Link
                to={`/partner/${partner._id}`}
                className="inline-block mt-3 px-5 py-2 rounded-md text-white font-semibold bg-[#4A7BA8] hover:opacity-90"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindPartners;
