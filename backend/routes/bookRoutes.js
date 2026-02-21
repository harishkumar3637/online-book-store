const router = require("express").Router();
const axios = require("axios");

router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;

    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10&key=${process.env.GOOGLE_API_KEY}`
    );

    res.json(response.data.items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
});

module.exports = router;