import { Link } from "react-router-dom";

function Header() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>📚 Book Store</div>
      <div>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/login" style={styles.link}>Login</Link>
        <Link to="/signup" style={styles.link}>Signup</Link>
        <Link to="/cart" style={styles.link}>Cart</Link>
        <Link to="/profile" style={styles.link}>Profile</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    background: "#4A90E2",
    color: "white"
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold"
  },
  link: {
    color: "white",
    marginLeft: "15px",
    textDecoration: "none",
    fontWeight: "500"
  }
};

export default Header;