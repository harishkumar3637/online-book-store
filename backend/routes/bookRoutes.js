const router = require("express").Router();
const axios = require("axios");

router.get("/search", async (req, res) => {
  const { query } = req.query;

  const response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&filter=ebooks`
  );

  res.json(response.data.items);
});

module.exports = router;