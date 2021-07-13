const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // CORS middleware
app.use(express.json()); // Allows us to parse JSON

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established succesfully");
});

// tells the server to use the following files
const logsRouter = require("./routes/log");
const usersRouter = require("./routes/users");
app.use("/log", logsRouter);
app.use("/users", usersRouter);

//Starting the server..
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
