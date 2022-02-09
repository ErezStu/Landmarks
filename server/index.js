const express = require("express");
const mongoose = require("mongoose");
const PlaceRoute = require("./routes/places");
const userRoute = require("./routes/users");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connect to mongo"))
  .catch((err) => console.log("error:" + err));

app.use("/api/places", PlaceRoute);
app.use("/api/users", userRoute);

app.listen(PORT, () => console.log("The server is running"));
