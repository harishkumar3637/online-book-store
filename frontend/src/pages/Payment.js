import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api";
import { toast } from "react-toastify";

function Payment() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");

  const total = cart.length * 10;

  const handlePayment = async () => {
  if (!name || !cardNumber || !expiry) {
    toast.error("Please fill all card details");
    return;
  }

  if (cardNumber.length < 12) {
    toast.error("Invalid card number");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    await API.post(
      "/orders/create",
      { books: cart },
      {
        headers: { Authorization: token }
      }
    );

    clearCart();
    toast.success("✅ Payment Successful!");

    setTimeout(() => {
      navigate("/profile");
    }, 1500);

  } catch (error) {
    toast.error("❌ Payment Failed");
  }
};

  if (cart.length === 0)
    return <h2 style={{ textAlign: "center" }}>No items to pay.</h2>;

  return (
    <div className="container">
      <h2>💳 Payment</h2>

      <div style={styles.wrapper}>
        {/* Order Summary */}
        <motion.div
          style={styles.summary}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3>Order Summary</h3>

          {cart.map((item, index) => (
            <div key={index} style={styles.item}>
              <img src={item.image} alt={item.title} style={styles.image} />
              <div>
                <p>{item.title}</p>
                <p>$10</p>
              </div>
            </div>
          ))}

          <h4>Total: ${total}</h4>
        </motion.div>

        {/* Payment Form */}
        <motion.div
          style={styles.form}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3>Card Details</h3>

          <input
            style={styles.input}
            placeholder="Card Holder Name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Card Number"
            onChange={(e) => setCardNumber(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Expiry Date (MM/YY)"
            onChange={(e) => setExpiry(e.target.value)}
          />

          <button style={styles.payBtn} onClick={handlePayment}>
            Pay ${total}
          </button>
        </motion.div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    gap: "40px",
    marginTop: "30px",
    flexWrap: "wrap"
  },
  summary: {
    flex: 1,
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  },
  form: {
    flex: 1,
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "10px"
  },
  image: {
    width: "50px",
    height: "70px",
    objectFit: "cover",
    borderRadius: "6px"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  payBtn: {
    width: "100%",
    padding: "10px",
    background: "#4A90E2",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
};

export default Payment;