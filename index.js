import express from "express";
import mockApiApp from "./MockApi.js";
import loadBalancerApp from "./loadbalancer.js";

const app = express();

// Mount the mock API routes
app.use(mockApiApp);

// Mount the load balancer routes
app.use(loadBalancerApp);

// Start the combined server
const port = 3000;
app.listen(port, () => {
  console.log(
    `Server running on port ${port}, including mock APIs and load balancer`
  );
});
