const BlogPost = require("../models/BlogPost");

const getBlogs = (req,res) =>{
    BlogPost.find().sort({ createdAt: -1 })
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        res.status(500).send("Error fetching blog posts");
    });

};

const getBlogsById = (req,res) =>{
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
}


const createBlog = (req,res) =>{
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
}


const deleteBlog = (req,res) =>{
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
};




module.exports ={
    getBlogs,
    getBlogsById,
    createBlog,
    deleteBlog
}