import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecruiterJobs } from "../services/jobService";

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
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

  return (
    <div style={styles.container}>
      <h2>My Posted Jobs</h2>

      {jobs.length === 0 && <p>No jobs posted yet</p>}

      {jobs.map((job) => (
        <div key={job.id} style={styles.card}>
          <h3>{job.title}</h3>

          <p>{job.description}</p>
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
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px"
  },
  card: {
    border: "1px solid #ddd",
    padding: "16px",
    marginBottom: "16px",
    borderRadius: "10px",
    background: "#fff"
  },
  button: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer"
  }
};

export default RecruiterDashboard;