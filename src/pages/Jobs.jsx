import React, { useEffect, useState } from "react";
import api from "../api/api";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]); // ✅ track applied jobs

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

  const handleApply = async (jobId) => {
    try {
      const userId = localStorage.getItem("userId");

      await api.post(`/jobs/${jobId}/apply?userId=${userId}`);

      // ✅ Update UI instantly
      setAppliedJobs([...appliedJobs, jobId]);

      alert("Applied successfully ✅");

    } catch (error) {
      console.error("Apply failed:", error);
      alert(error.response?.data || "Something went wrong ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Jobs</h2>

      {jobs.length === 0 && <p>No jobs found</p>}

      {jobs.map((job) => {
        const isApplied = appliedJobs.includes(job.id);

        return (
          <div key={job.id} style={styles.card}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p><b>City:</b> {job.city}</p>
            <p><b>Salary:</b> ₹{job.salary}</p>

            {/* ✅ APPLY BUTTON */}
            <button
              style={{
                ...styles.button,
                backgroundColor: isApplied ? "gray" : "#007bff",
                color: "white"
              }}
              disabled={isApplied}
              onClick={() => handleApply(job.id)}
            >
              {isApplied ? "Applied ✅" : "Apply"}
            </button>

            <br /><br />

            {/* ✅ CALL BUTTON */}
            <a href={`tel:${job.phone}`}>
              <button style={styles.callButton}>
                Call Recruiter
              </button>
            </a>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "15px",
    marginBottom: "12px",
    borderRadius: "8px",
    background: "#fafafa"
  },
  button: {
    padding: "8px 12px",
    cursor: "pointer",
    border: "none",
    borderRadius: "4px"
  },
  callButton: {
    padding: "8px 12px",
    cursor: "pointer",
    backgroundColor: "green",
    color: "white",
    border: "none",
    borderRadius: "4px"
  }
};

export default Jobs;