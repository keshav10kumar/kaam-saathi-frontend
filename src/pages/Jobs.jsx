import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  // ✅ NEW STATES
  const [city, setCity] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  // ✅ NEW: SEARCH FUNCTION
  const handleSearch = async () => {
    try {
      // if both empty → fetch all (no change in behavior)
      if (!city && !keyword) {
        fetchJobs();
        return;
      }

      const res = await api.get(
        `/jobs/search?city=${city}&keyword=${keyword}`
      );

      setJobs(res.data);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  const handleApply = async (jobId) => {
    try {
      const userId = localStorage.getItem("userId");

      await api.post(`/jobs/${jobId}/apply?userId=${userId}`);

      setAppliedJobs([...appliedJobs, jobId]);

      alert("Applied successfully ✅");
    } catch (error) {
      console.error("Apply failed:", error);
      alert(error.response?.data || "Something went wrong ❌");
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h2>Available Jobs</h2>

        {/* ✅ ✅ NEW SEARCH UI */}
        <div style={styles.searchBox}>
          <input
            style={styles.input}
            placeholder="Search by city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Keyword (driver, helper)"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <button style={styles.searchBtn} onClick={handleSearch}>
            Search
          </button>
        </div>

        {jobs.length === 0 && <p>No jobs found</p>}

        {jobs.map((job) => {
          const isApplied = appliedJobs.includes(job.id);

          return (
            <div key={job.id} style={styles.card}>
              <h3 style={styles.title}>{job.title}</h3>

              <p style={styles.desc}>{job.description}</p>

              <p>📍 {job.city}</p>
              <p>💰 ₹{job.salary}</p>
              <p>📞 {job.phone}</p>

              <div style={styles.actions}>
                {/* APPLY */}
                <button
                  style={{
                    ...styles.applyBtn,
                    backgroundColor: isApplied ? "gray" : "#007bff"
                  }}
                  disabled={isApplied}
                  onClick={() => handleApply(job.id)}
                >
                  {isApplied ? "Applied ✅" : "Apply"}
                </button>

                {/* CALL */}
                <a href={`tel:${job.phone}`}>
                  <button style={styles.callBtn}>Call</button>
                </a>

                {/* WHATSAPP */}
                <a
                  href={`https://wa.me/${job.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button style={styles.whatsappBtn}>WhatsApp</button>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px"
  },

  // ✅ NEW
  searchBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px"
  },

  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    flex: 1
  },

  searchBtn: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer"
  },

  card: {
    border: "1px solid #ddd",
    padding: "16px",
    marginBottom: "16px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
  },

  title: {
    marginBottom: "8px",
    fontSize: "18px",
    fontWeight: "bold"
  },

  desc: {
    color: "#555",
    marginBottom: "10px"
  },

  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "10px"
  },

  applyBtn: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer"
  },

  callBtn: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "green",
    color: "white",
    cursor: "pointer"
  },

  whatsappBtn: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#25D366",
    color: "white",
    cursor: "pointer"
  }
};

export default Jobs;