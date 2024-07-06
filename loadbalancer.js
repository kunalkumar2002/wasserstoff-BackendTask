import express from "express";
import axios from "axios";
import logger from "./logger.js";

const apiEndpoints = [
  { type: "REST", url: "http://localhost:3000/api1" },
  { type: "REST", url: "http://localhost:3000/api2" },
  { type: "REST", url: "http://localhost:3000/api3" },
];

let currentIndex = 0;

// Round-robin routing
const roundRobinEndpoint = () => {
  const endpoint = apiEndpoints[currentIndex];
  currentIndex = (currentIndex + 1) % apiEndpoints.length;
  return endpoint;
};

// Routing based on API type
const routeBasedOnType = (type) => {
  const endpoints = apiEndpoints.filter((endpoint) => endpoint.type === type);
  const endpoint = endpoints[currentIndex % endpoints.length];
  currentIndex = (currentIndex + 1) % endpoints.length;
  return endpoint;
};

// Custom routing logic
const customRouting = (req) => {
  // Example custom criteria: Route based on URL length
  if (req.url.length % 2 === 0) {
    return apiEndpoints[0];
  } else {
    return apiEndpoints[1];
  }
};

const loadBalancerApp = express();
loadBalancerApp.use(logger);

// Load balancing route
loadBalancerApp.get("/load-balance", async (req, res) => {
  const type = req.query.type || "REST";
  const routeType = req.query.route || "round-robin"; // default routing method is round-robin

  let selectedEndpoint;
  if (routeType === "type") {
    selectedEndpoint = routeBasedOnType(type);
  } else if (routeType === "custom") {
    selectedEndpoint = customRouting(req);
  } else {
    selectedEndpoint = roundRobinEndpoint();
  }

  try {
    const response = await axios.get(selectedEndpoint.url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch from endpoint" });
  }
});

export default loadBalancerApp;
