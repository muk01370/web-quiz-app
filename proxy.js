const express = require("express");
const cors = require("cors");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));


const app = express();
app.use(cors());

app.get("/api/quiz", async (req, res) => {
    try {
        const response = await fetch("https://api.jsonserve.com/Uw5CrX");
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch quiz data" });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
