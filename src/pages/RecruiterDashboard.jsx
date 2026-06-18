import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecruiterJobs } from "../services/jobService";
import Navbar from "../components/Navbar";

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  // ✅ Route protection
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "RECRUITER") {
      navigate("/jobs");
      return;
    }

    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await getRecruiterJobs(userId);
      setJobs(data);
    } catch (err) {
      console.error("Error fetching recruiter jobs:", err);
    }
  };

  const handleViewApplicants = (jobId) => {
    navigate(`/recruiter/jobs/${jobId}/applications`);
  };

  // ✅ NEW: Post Job handler
  const handlePostJob = () => {
    navigate("/recruiter/post-job");
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h2>My Posted Jobs</h2>

        {/* ✅ NEW BUTTON */}
        <button style={styles.createBtn} onClick={handlePostJob}>
          + Post New Job
        </button>

        {jobs.length === 0 && <p>No jobs posted yet</p>}

        {jobs.map((job) => (
          <div key={job.id} style={styles.card}>
            <h3 style={styles.title}>{job.title}</h3>

            <p style={styles.desc}>{job.description}</p>
            <p>📍 {job.city}</p>
            <p>💰 ₹{job.salary}</p>

            <button
              style={styles.button}
              onClick={() => handleViewApplicants(job.id)}
            >
              View Applicants
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px"
  },

  // ✅ NEW STYLE
  createBtn: {
    marginBottom: "15px",
    padding: "10px",
    width: "100%",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "green",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
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

  button: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer"
  }
};

export default RecruiterDashboard;