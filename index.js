
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const blogController = require("./controllers/blogControllers");

// import "./index.css";

const USER_NAME = "prakriti_01";
const PASSWORD = "prakriti1112";
const DB_NAME = "ReactBackend";
const DB_URI = `mongodb+srv://${USER_NAME}:${PASSWORD}@merncluster.khab0.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=mernCluster`;
const PORT = 3020;
const app = express();

app.use(cors());

app.use(express.json());
mongoose
  .connect(DB_URI)
  .then((result) => {
    console.log("Connected to database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database", err);
    process.exit(1); // Exit the process with a failure code
  });



app.get("/", (req, res) => {
  res.send("Welcome to the React Backend");
});


app.get('/blogs', blogController.getBlogs);


app.get('/blogs/:id', blogController.getBlogsById);


app.post('/blogs', blogController.createBlog);


app.delete('/blogs/id/:id', blogController.deleteBlog);
