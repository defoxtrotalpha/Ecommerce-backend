// Framework for Node.js, used for building APIs and web applications
const express = require("express");
// Object Data Modeling (ODM) library for MongoDB, making it easier to work with MongoDB databases
const mongoose = require("mongoose");
const { ProductRouter } = require("./routes/ProductRoutes");
const { CategoryRouter } = require("./routes/CategoryRoutes");
const { BrandRouter } = require("./routes/BrandRoutes");
const { UserRouter } = require("./routes/UserRoutes");
const { AuthRouter } = require("./routes/AuthRoutes");
const { CartRouter } = require("./routes/CartRoutes");
const { OrderRouter } = require("./routes/OrderRoutes");

const cors = require("cors");

// Creating a db connection
async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connected");
  } catch (error) {
    console.error(error);
  }
}
main();

// creates an instance of the Express application, which represents server
const server = express();

//Middlewares
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
server.use(express.json()); //to parse req.body as JSON
server.use("/products", ProductRouter);
server.use("/users", UserRouter);
server.use("/auth", AuthRouter);
server.use("/categories", CategoryRouter);
server.use("/brands", BrandRouter);
server.use("/cart", CartRouter);
server.use("/orders", OrderRouter);

// Definig a route. Callback func will be called
server.get("/", (req, res) => {
  res.json({ status: "success" });
});

// This instructs the Express server to start listening on port 8080 for incoming
// HTTP requests. Once the server is successfully started, the provided callback
// function will be executed, and the message "server started" will be logged to the console.
server.listen(8080, () => {
  console.log("server started");
});
