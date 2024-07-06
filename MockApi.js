import express from "express";
const mockApiApp = express();

// Mock API 1 (Fast Response)
mockApiApp.get("/api1", (req, res) => {
  res.send({ message: "Response from API 1 (Fast)" });
});

// Mock API 2 (Slow Response)
mockApiApp.get("/api2", (req, res) => {
  setTimeout(() => {
    res.send({ message: "Response from API 2 (Slow)" });
  }, 2000);
});

// Mock API 3 (Random Response Time)
mockApiApp.get("/api3", (req, res) => {
  const responseTime = Math.random() * 3000;
  setTimeout(() => {
    res.send({
      message: `Response from API 3 (Random), Delay: ${responseTime}ms`,
    });
  }, responseTime);
});

export default mockApiApp;
