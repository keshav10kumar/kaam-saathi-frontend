import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/userService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Profile = () => {
  const phone = localStorage.getItem("phone");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    city: "",
    skills: "",
    age: "",
    experience: "",
    role: "CANDIDATE" // ✅ ADDED
  });

  const [loading, setLoading] = useState(false);
  const [isRoleLocked, setIsRoleLocked] = useState(false); // ✅ ADDED

  // ✅ Load Profile
  useEffect(() => {
    if (phone) {
      getProfile(phone)
        .then((data) => {
          setForm({
            name: data.name || "",
            city: data.city || "",
            skills: data.skills || "",
            age: data.age || "",
            experience: data.experience || "",
            role: data.role || "CANDIDATE" // ✅ ADDED
          });

          // ✅ lock role if already present
          if (data.name) {
            setIsRoleLocked(true);
          }
        })
        .catch((err) => {
          console.log("Profile load error:", err);
        });
    }
  }, [phone]);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ✅ Handle Role Checkbox
  const handleRoleChange = (e) => {
    setForm({
      ...form,
      role: e.target.checked ? "RECRUITER" : "CANDIDATE"
    });
  };

  // ✅ Save Profile
  const handleSubmit = async () => {
    try {
      if (!form.name || !form.city) {
        alert("Name and City are required ❗");
        return;
      }

      setLoading(true);

      await updateProfile({
        phone,
        ...form // ✅ role included
      });

      alert("Profile saved ✅");

      setIsRoleLocked(true); // ✅ lock role after first save

    // ✅ ALWAYS sync localStorage with latest role
    const user = JSON.parse(localStorage.getItem("user")) || {};
    user.role = form.role;
    localStorage.setItem("user", JSON.stringify(user));

    // ✅ use updated role from localStorage
    if (form.role === "RECRUITER") {
        navigate("/recruiter");
    } else {
        navigate("/jobs");
    }

    } catch (err) {
      console.log(err);
      alert("Error saving profile ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ Navbar */}
      <Navbar />

      <div style={styles.container}>
        <h2>Complete Profile</h2>

        <input
          style={styles.input}
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          style={styles.input}
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
        />

        <input
          style={styles.input}
          type="text"
          name="skills"
          placeholder="Skills (e.g. Driver, Helper)"
          value={form.skills}
          onChange={handleChange}
        />

        <input
          style={styles.input}
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
        />

        <input
          style={styles.input}
          type="number"
          name="experience"
          placeholder="Experience (years)"
          value={form.experience}
          onChange={handleChange}
        />

        {/* ✅ ✅ NEW: Recruiter Checkbox */}
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={form.role === "RECRUITER"}
            onChange={handleRoleChange}
            disabled={isRoleLocked} // ✅ disable after save
          />
          Post job (hire workers)
        </label>

        <button style={styles.button} onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save Profile"}
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

  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "14px"
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

export default Profile;