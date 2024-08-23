
const express = require("express");
const mongoose = require("mongoose");
const BlogPost = require("./models/BlogPost");
// import "./index.css";

const USER_NAME = "prakriti_01";
const PASSWORD = "prakriti1112";
const DB_NAME = "ReactBackend";
const DB_URI = `mongodb+srv://${USER_NAME}:${PASSWORD}@merncluster.khab0.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=mernCluster`;
const PORT = 3020;
const app = express();

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

app.get('/blogs', (req, res) => {
  BlogPost.find().sort({ createdAt: -1 })
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        res.status(500).send("Error fetching blog posts");
    });

});


app.get('/blogs/:id', (req, res) => {
  const blogId = req.params.id;
  console.log(blogId);
  
  BlogPost.findById(blogId)
      .then((blog)=>{
          if (blog) {
              res.send(blog);
          } else {
              res.status(404).send("Blog post not found");
          }
      })
      .catch((err)=>{
          res.status(404).send(err.message)
      })
});


app.post('/blogs', (req, res) => {
  const data = req.body;
  console.log(data);
  const Blog = new BlogPost(data);
  Blog.save()
    .then((result) => {
      console.log("inside post request");
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.delete('/blogs/:id', (req, res) => {
  const blogId = req.params.id;
  BlogPost.findByIdAndDelete(blogId)
      .then((result) => {
          if (result) {
              res.send(`Deleted blog post with ID: ${blogId}`);
          } else {
              res.status(404).send("Blog post not found");
          }
      })
      .catch((err) => {
          console.error('Error deleting blog post:', err);
          res.status(500).send("Error deleting blog post");
      });
});