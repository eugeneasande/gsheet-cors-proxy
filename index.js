import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to handle CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // ✅ Respond OK to preflight
  }
  next();
});

app.use(express.json());

app.post("/submit", async (req, res) => {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzyYV4HeOdsbWotuj7fcdi-BJiLYTN05dBFVsv7YSoM9aSxBU_xc7ysYkJL_kTlGiu4pQ/exec",
      {
        method: "POST",
        body: JSON.stringify(req.body),
        headers: { "Content-Type": "application/json" }
      }
    );

    const result = await response.json();
    res.json(result);
  } catch (err) {
    console.error("Proxy Error:", err);
    res.status(500).json({ error: "Failed to send to Google Script" });
  }
});

app.listen(PORT, () =>
  console.log(`✅ Proxy server running at http://localhost:${PORT}`)
);
