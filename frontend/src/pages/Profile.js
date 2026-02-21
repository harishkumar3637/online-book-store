import { useEffect, useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

function Profile() {
  const { logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/orders/myorders", {
        headers: { Authorization: token }
      });

      setOrders(res.data);

      // Decode user from token (simple way)
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser({
        name: payload.name || "User",
        email: payload.email || ""
      });

    } catch (error) {
      console.log("Error loading profile");
    }
  };

  const totalOrders = orders.length;
  const totalBooks = orders.reduce(
    (sum, order) => sum + order.books.length,
    0
  );
  const totalSpent = totalBooks * 10;

  return (
    <div className="container">
      <h2>👤 My Profile</h2>

      {/* User Info Card */}
      <motion.div
        style={styles.card}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3>{user.name}</h3>
        <p>{user.email}</p>

        <button style={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      </motion.div>

      {/* Analytics */}
      <div style={styles.analytics}>
        <div style={styles.statBox}>
          <h4>{totalOrders}</h4>
          <p>Total Orders</p>
        </div>

        <div style={styles.statBox}>
          <h4>{totalBooks}</h4>
          <p>Books Purchased</p>
        </div>

        <div style={styles.statBox}>
          <h4>${totalSpent}</h4>
          <p>Total Spent</p>
        </div>
      </div>

      {/* Order History */}
      <h3>📜 Order History</h3>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order, i) => (
          <div key={i} style={styles.orderCard}>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>

            {order.books.map((book, index) => (
              <p key={index}>📘 {book.title}</p>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    marginBottom: "30px"
  },
  logoutBtn: {
    background: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px"
  },
  analytics: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px"
  },
  statBox: {
    flex: 1,
    background: "#4A90E2",
    color: "white",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center"
  },
  orderCard: {
    background: "white",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "8px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)"
  }
};

export default Profile;