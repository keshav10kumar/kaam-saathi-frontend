import { useState } from "react";
import { searchCandidates } from "../services/userService";
import Navbar from "../components/Navbar";

const RecruiterCandidates = () => {
  const [city, setCity] = useState("");
  const [skill, setSkill] = useState("");
  const [candidates, setCandidates] = useState([]);

  const handleSearch = async () => {
    try {
      const data = await searchCandidates(city, skill);
      setCandidates(data);
    } catch (err) {
      console.error("Search failed:", err);
      alert("Search failed ❌");
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h2>Search Candidates</h2>

        {/* ✅ Search Box */}
        <div style={styles.searchBox}>
          <input
            style={styles.input}
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Skill (driver, helper)"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          />

          <button style={styles.searchBtn} onClick={handleSearch}>
            Search
          </button>
        </div>

        {candidates.length === 0 && <p>No candidates found</p>}

        {/* ✅ Results */}
        {candidates.map((c) => (
          <div key={c.id} style={styles.card}>
            <h3>{c.name || "No Name"}</h3>

            <p>📞 {c.phone}</p>
            <p>📍 {c.city}</p>
            <p>🛠 {c.skills}</p>
            <p>📅 Experience: {c.experience || 0} yrs</p>

            {/* ✅ Call */}
            <a href={`tel:${c.phone}`}>
              <button style={styles.callBtn}>Call</button>
            </a>
<a
  href={`https://wa.me/91${c.phone}`}
  target="_blank"
  rel="noopener noreferrer"
>
  <button style={styles.whatsappBtn}>WhatsApp</button>
</a>
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
  searchBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px"
  },
  input: {
    padding: "8px",
    flex: 1,
    borderRadius: "6px",
    border: "1px solid #ccc"
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
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    marginBottom: "10px",
    background: "#fff"
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
    cursor: "pointer",
    marginLeft: "5px"
  }
};

export default RecruiterCandidates;