import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.length * 10;

  return (
    <div className="container">
      <h2>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p>No books in cart</p>
      ) : (
        <>
          {cart.map((b, i) => (
            <motion.div
              key={i}
              style={styles.card}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <img src={b.image} alt={b.title} style={styles.image} />

              <div style={{ flex: 1 }}>
                <h4>{b.title}</h4>
                <p>$10</p>
              </div>

              <button
                style={styles.removeBtn}
                onClick={() => removeFromCart(i)}
              >
                ❌ Remove
              </button>
            </motion.div>
          ))}

          <h3>Total: ${total}</h3>

          <button
            style={styles.checkoutBtn}
            onClick={() => navigate("/payment")}
          >
            Proceed to Payment
          </button>
        </>
      )}
    </div>
  );
}

const styles = {
  card: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    background: "white",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  },
  image: {
    width: "80px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "6px"
  },
  removeBtn: {
    background: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  checkoutBtn: {
    background: "#4A90E2",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px"
  }
};

export default Cart;