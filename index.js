const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();

const PORT = process.env.PORT || 3000;

// Allow all origins
app.use(cors());
app.use(express.json());

app.post("/submit", async (req, res) => {
  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbzyYV4HeOdsbWotuj7fcdi-BJiLYTN05dBFVsv7YSoM9aSxBU_xc7ysYkJL_kTlGiu4pQ/exec", {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" }
    });

    const result = await response.json();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send to Google Script" });
  }
});

app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
