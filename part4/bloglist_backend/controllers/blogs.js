const blogRouter = require("express").Router();
const Blog = require("../models/blogs");
const User = require("../models/users");

//Get all blogs
blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

//Create blog
blogRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = await User.findOne({});

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog.id);

  await user.save();

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
