import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/userService";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const phone = localStorage.getItem("phone");
  const navigate = useNavigate(); // ✅ added

  const [form, setForm] = useState({
    name: "",
    city: "",
    skills: "",
    age: "",
    experience: ""
  });

  const [loading, setLoading] = useState(false); // ✅ optional UX

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
            experience: data.experience || ""
          });
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
        ...form
      });

      alert("Profile saved ✅");

      // ✅ Navigate to Jobs page (IMPORTANT)
      navigate("/jobs");

    } catch (err) {
      console.log(err);
      alert("Error saving profile ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Complete Profile</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="text"
        name="city"
        placeholder="City"
        value={form.city}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="text"
        name="skills"
        placeholder="Skills (e.g. Driver, Helper)"
        value={form.skills}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="number"
        name="age"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="number"
        name="experience"
        placeholder="Experience (years)"
        value={form.experience}
        onChange={handleChange}
      />
      <br /><br />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Save Profile"}
      </button>
    </div>
  );
};

export default Profile;