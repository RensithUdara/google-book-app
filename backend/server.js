const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/api/books", async (req, res) => {
    const query = req.query.q || "books";
    const startIndex = req.query.startIndex || 0;
    const maxResults = req.query.maxResults || 10;
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${maxResults}`;

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data.items || []);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).send("Error fetching books");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
