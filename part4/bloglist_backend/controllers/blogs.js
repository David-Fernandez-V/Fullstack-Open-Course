const blogRouter = require("express").Router();
const Blog = require("../models/blogs");
const { userExtractor } = require("../utils/middleware");

//Get all blogs
blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

//Create blog
blogRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

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
blogRouter.delete("/:id", userExtractor, async (request, response) => {
  const blogId = request.params.id;
  const user = request.user;

  const deletedBlog = await Blog.findOneAndDelete({
    _id: blogId,
    user: user.id,
  });

  if (deletedBlog) {
    response.status(200).json(deletedBlog);
  } else {
    response.status(404).json({ error: "blog not found or not owned by user" });
  }
});

//update blog
blogRouter.put("/:id", userExtractor, async (request, response) => {
  const blogId = request.params.id;
  const user = request.user;
  const { title, author, url, likes } = request.body;

  const updatedBlog = await Blog.findOneAndUpdate(
    {
      _id: blogId,
      user: user.id,
    },
    { title, author, url, likes },
    { new: true, runValidators: true, context: "query" },
  );

  if (updatedBlog) {
    response.status(200).json(updatedBlog);
  } else {
    response.status(404).json({ error: "blog not found" });
  }
});

module.exports = blogRouter;
