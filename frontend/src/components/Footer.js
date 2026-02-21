function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© Book Store | Built with MERN 🚀</p>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: "50px",
    padding: "20px",
    background: "#1C1C1C",
    color: "white",
    textAlign: "center"
  }
};

export default Footer;