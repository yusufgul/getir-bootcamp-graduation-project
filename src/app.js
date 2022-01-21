const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require("express");
const mongoose = require("mongoose");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorControllers");
const getirRouter = require("./routes/postRoute.js");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

//swagger options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Getir Task API",
      version: "1.0.0",
      description: "Getir bootcamp task",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const app = express();
app.use(express.json());

const specs = swaggerJsDoc(options);

mongoose.connect(process.env.DATABASE);
const con = mongoose.connection;
con.on("open", function () {
  console.log("connected...");
});

app.use("/", getirRouter);
app.use("/", swaggerUI.serve, swaggerUI.setup(specs));

//Error handler for unhandled routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
  console.log("Server is up!");
});

module.exports = {
  app,
};
 
