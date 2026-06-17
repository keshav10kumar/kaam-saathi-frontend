import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobApplicants } from "../services/jobService";

const ApplicantsPage = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
    <div style={styles.container}>
      <button style={styles.backBtn} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2>Applicants</h2>

      {applicants.length === 0 && <p>No applicants yet</p>}

      {applicants.map((app) => (
        <div key={app.id} style={styles.card}>
        <h3>{app.name || "No Name"}</h3>

        <p>📞 {app.phone || "-"}</p>
        <p>📍 {app.city || "-"}</p>
        <p>🛠 Skills: {app.skills || "-"}</p>
        <p>📅 Experience: {app.experience || 0} yrs</p>
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
  backBtn: {
    marginBottom: "10px",
    padding: "6px 10px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#ccc",
    cursor: "pointer"
  },
  card: {
    border: "1px solid #ddd",
    padding: "16px",
    marginBottom: "16px",
    borderRadius: "10px",
    background: "#fff"
  }
};

export default ApplicantsPage;