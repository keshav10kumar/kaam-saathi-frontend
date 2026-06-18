import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobApplicants } from "../services/jobService";
import Navbar from "../components/Navbar";

const ApplicantsPage = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const navigate = useNavigate();

  // ✅ Route protection
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "RECRUITER") {
      navigate("/jobs");
      return;
    }

    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const data = await getJobApplicants(jobId);
      setApplicants(data);
    } catch (err) {
      console.error("Error fetching applicants:", err);
    }
  };

  return (
    <>
      {/* ✅ Navbar */}
      <Navbar />

      <div style={styles.container}>
        {/* ✅ Header Row */}
        <div style={styles.header}>
          <button style={styles.backBtn} onClick={() => navigate(-1)}>
            ← Back
          </button>
          <h2 style={styles.heading}>Applicants</h2>
        </div>

        {applicants.length === 0 && <p>No applicants yet</p>}

        {applicants.map((app) => (
          <div key={app.id} style={styles.card}>
            <h3 style={styles.name}>{app.name || "No Name"}</h3>

            <p>📞 {app.phone || "-"}</p>
            <p>📍 {app.city || "-"}</p>
            <p>🛠 Skills: {app.skills || "-"}</p>
            <p>📅 Experience: {app.experience || 0} yrs</p>
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

  header: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px"
  },

  heading: {
    margin: 0
  },

  backBtn: {
    padding: "6px 10px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#ccc",
    cursor: "pointer"
  },

  // ✅ Improved card UI
  card: {
    border: "1px solid #ddd",
    padding: "16px",
    marginBottom: "16px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
  },

  name: {
    marginBottom: "8px",
    fontSize: "18px",
    fontWeight: "bold"
  }
};

export default ApplicantsPage;