import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = 8080;


app.use(cors({ origin: "*" }));

app.get("/api/weather", async (req, res) => {
  const { city } = req.query;
  const apiKey = process.env.WEATHER_API_KEY;

  console.log("📍 Request received for city:", city);
  console.log("🔑 API Key loaded?", !!apiKey);

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;
  console.log("🌍 Fetching:", apiUrl);

  try {
    const response = await fetch(apiUrl);
    console.log("✅ WeatherAPI response status:", response.status);

    const data = await response.json();
    console.log("📦 Data received:", data);

    res.json(data);
  } catch (error) {
    console.error("❌ Error fetching WeatherAPI:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.listen(PORT, () =>
  console.log(`✅ Backend running at http://localhost:${PORT}`)
);

app.get("/", (req, res) => {
  res.send("Hello from backend ✅");
});
