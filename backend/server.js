const express = require("express");
const axios = require("axios");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is working!");
});


app.get("/api/movies/popular", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
        },
      }
    );

    res.json(response.data);
  } 
  catch (error) {
    console.error("TMDB request failed:", error.message);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});



app.get("/api/movies/search", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          query: req.query.query,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("TMDB search failed:", error.message);
    res.status(500).json({ error: "Failed to search movies" });
  }
});




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});