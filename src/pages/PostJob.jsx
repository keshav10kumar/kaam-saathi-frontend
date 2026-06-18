import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const PostJob = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    city: "",
    salary: "",
    phone: localStorage.getItem("phone")
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      if (!form.title || !form.city) {
        alert("Title and City are required ❗");
        return;
      }

      setLoading(true);

    // ✅ DEFINE userId here
      const userId = localStorage.getItem("userId");

      await api.post(`/jobs?userId=${userId}`, form);

      alert("Job posted successfully ✅");

      navigate("/recruiter");

    } catch (err) {
      console.error("Error posting job:", err);
      alert("Failed to post job ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h2>Post New Job</h2>

        <input
          style={styles.input}
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
        />

        <textarea
          style={styles.input}
          name="description"
          placeholder="Job Description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          style={styles.input}
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
        />

        <input
          style={styles.input}
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
        />

        <button style={styles.button} onClick={handleSubmit} disabled={loading}>
          {loading ? "Posting..." : "Post Job"}
        </button>
      </div>
    </>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "30px auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },

  button: {
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer"
  }
};

export default PostJob;