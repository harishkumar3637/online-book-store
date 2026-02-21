import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import API from "../api";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Home() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    loadRecommended();
  }, []);

         const loadRecommended = async () => {
        try {
           const res = await API.get("/api/books/search?query=bestseller");
            setBooks(res.data || []);
            } catch (error) {
          console.log("Too many requests, try again later");
           }
        };

  // const loadRecommended = async () => {
  //   const res = await API.get("/books/search?query=bestseller");
  //   setBooks(res.data || []);
  // };

  const search = async () => {
    const res = await API.get(`/api/books/search?query=${query}`);
    setBooks(res.data || []);
  };
  
   const navigate = useNavigate();

  return (
    <div className="container">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        📚 Welcome to Book Store
      </motion.h1>

      {/* Search */}
      <div style={{ marginBottom: "30px" }}>
        <input
          placeholder="Search for e-books..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={search}>Search</button>
      </div>

      <h2>🔥 Recommended Books</h2>

      <motion.div
        style={styles.grid}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {books.map((b) => {
  // 🎲 Generate random rating between 3 and 5
  const rating = Math.floor(Math.random() * 3) + 3; // 3, 4, or 5

  return (
    <motion.div
      key={b.id}
      style={styles.card}
      variants={cardVariants}
      whileHover={{ scale: 1.05 }}
    >
      <img
        src={
          b.volumeInfo.imageLinks?.thumbnail ||
          "https://via.placeholder.com/150"
        }
        alt={b.volumeInfo.title}
        style={styles.image}
      />

        <h4
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/book", { state: { book: b } })}
     >
          {b.volumeInfo.title}
       </h4>

      {/* ⭐ Random Rating ABOVE author */}
      <div style={styles.rating}>
        {"⭐".repeat(rating)}
        {"☆".repeat(5 - rating)}
      </div>

      <p style={styles.author}>
        {b.volumeInfo.authors?.join(", ")}
      </p>

      <button
        onClick={() => {
          addToCart({
            title: b.volumeInfo.title,
            price: 10,
            image:
              b.volumeInfo.imageLinks?.thumbnail ||
              "https://via.placeholder.com/150"
          });

          toast.success("📚 Book added to cart!");
        }}
      >
        Add to Cart
      </button>
    </motion.div>
  );
})}
      </motion.div>
    </div>
  );
}

/* Animation Variants */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px"
  },
  card: {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    textAlign: "center",
    cursor: "pointer"
  },
  image: {
    width: "120px",
    height: "170px",
    objectFit: "cover",
    marginBottom: "10px"
  },
  author: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "5px"
  },
  rating: {
    color: "#f5a623",
    marginBottom: "10px",
    fontSize: "14px"
  }
};

export default Home;