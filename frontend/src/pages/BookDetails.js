import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState, useContext } from "react";
import API from "../api";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

function BookDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const book = location.state?.book;
  const [similarBooks, setSimilarBooks] = useState([]);

  useEffect(() => {
    if (book?.volumeInfo?.categories) {
      loadSimilar(book.volumeInfo.categories[0]);
    }
  }, [book]);

  const loadSimilar = async (category) => {
    const res = await API.get(`/books/search?query=${category}`);
    setSimilarBooks(res.data || []);
  };

  if (!book) return <h2>No Book Selected</h2>;

  const info = book.volumeInfo;

  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ display: "flex", gap: "40px", marginBottom: "40px" }}
      >
        <img
          src={
            info.imageLinks?.thumbnail ||
            "https://via.placeholder.com/200"
          }
          alt={info.title}
          style={{ width: "200px", height: "300px", objectFit: "cover" }}
        />

        <div>
          <h2>{info.title}</h2>
          <p><strong>Author:</strong> {info.authors?.join(", ")}</p>
          <p><strong>Publisher:</strong> {info.publisher}</p>
          <p><strong>Published:</strong> {info.publishedDate}</p>
          <p style={{ marginTop: "15px" }}>
            {info.description || "No description available."}
          </p>

          <button
            onClick={() => {
              addToCart({
                title: info.title,
                price: 10,
                image:
                  info.imageLinks?.thumbnail ||
                  "https://via.placeholder.com/150"
              });
              toast.success("📚 Book added to cart!");
            }}
          >
            Add to Cart
          </button>
        </div>
      </motion.div>

      {/* Similar Books */}
      <h3>📚 Similar Books</h3>

      <div style={styles.grid}>
        {similarBooks.slice(0, 6).map((b) => (
          <div
            key={b.id}
            style={styles.card}
            onClick={() =>
              navigate("/book", { state: { book: b } })
            }
          >
            <img
              src={
                b.volumeInfo.imageLinks?.thumbnail ||
                "https://via.placeholder.com/120"
              }
              alt={b.volumeInfo.title}
              style={styles.image}
            />
            <p>{b.volumeInfo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "20px"
  },
  card: {
    background: "white",
    padding: "10px",
    borderRadius: "8px",
    textAlign: "center",
    cursor: "pointer",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)"
  },
  image: {
    width: "100px",
    height: "150px",
    objectFit: "cover",
    marginBottom: "10px"
  }
};

export default BookDetails;