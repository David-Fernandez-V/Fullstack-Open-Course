const blogRouter = require("express").Router();
const Blog = require("../models/blogs");

//Get all blogs
blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

//Create blog
blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const savedBlog = await blog.save();

  response.status(201).json(savedBlog);
});

//Delete blog
blogRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;

  const deletedBlog = await Blog.findByIdAndDelete(id);

  if (deletedBlog) {
    response.status(204).end();
  } else {
    response.status(404).end();
  }
});

//update blog
blogRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const { title, author, url, likes } = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: "query" },
  );

  if (updatedBlog) {
    response.json(updatedBlog);
  } else {
    response.status(404).end();
  }
});

module.exports = blogRouter;
