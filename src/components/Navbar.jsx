import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={styles.navbar}>
      <h2 style={styles.logo}>KaamSaathi</h2>

      <div style={styles.links}>
        {role === "RECRUITER" ? (
          <button style={styles.link} onClick={() => navigate("/recruiter")}>
            Dashboard
          </button>
        ) : (
          <button style={styles.link} onClick={() => navigate("/jobs")}>
            Jobs
          </button>
        )}

        <button style={styles.link} onClick={() => navigate("/profile")}>
          Profile
        </button>

        <button style={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff"
  },
  logo: {
    margin: 0
  },
  links: {
    display: "flex",
    gap: "10px"
  },
  link: {
    background: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    cursor: "pointer"
  },
  logout: {
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default Navbar;