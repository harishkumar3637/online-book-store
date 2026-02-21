import { useState, useContext } from "react";
import { motion } from "framer-motion";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      const res = await API.post("/api/auth/login", { email, password });
      login(res.data.token);
      alert("Login Success");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={styles.wrapper}>
      <motion.div
        style={styles.card}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>🔐 Login</h2>

        <input
          style={styles.input}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={submit}>
          Login
        </button>
        <p style={styles.switchText}>
             Don’t have an account?{" "}
          <Link to="/signup" style={styles.link}>
           Signup
         </Link>
       </p>
      </motion.div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh"
  },
  card: {
    width: "350px",
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  button: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    background: "#4A90E2",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  switchText: {
  marginTop: "15px",
  fontSize: "14px"
},
link: {
  color: "#4A90E2",
  textDecoration: "none",
  fontWeight: "500"
}
};

export default Login;