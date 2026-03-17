const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");

const app = require("../app");
const Blog = require("../models/blog");
const { initialBlogs, blogsInDb } = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("All blogs are returned as json", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.length, initialBlogs.length);
});

test("The unique identifier for blogs is called id (not _id)", async () => {
  const response = await api.get("/api/blogs");

  response.body.forEach((blog) => {
    assert(Object.keys(blog).includes("id"));
    assert(!Object.keys(blog).includes("_id"));
  });
});

test("A valid blog can be added", async () => {
  const newBlog = {
    title: "Deep Dive Into Modern Web Development",
    author: "Matti Luukkainen",
    url: "https://fullstackopen.com/en/",
    likes: 7,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await blogsInDb();
  assert.strictEqual(initialBlogs.length + 1, blogsAtEnd.length);

  const addedBlog = blogsAtEnd.find((blog) => {
    return blog.title === newBlog.title && blog.author === newBlog.author;
  });
  assert(addedBlog);
});

test("If likes property is missing will have the value of 0", async () => {
  const newBlog = {
    title: "Deep Dive Into Modern Web Development",
    author: "Matti Luukkainen",
    url: "https://fullstackopen.com/en/",
  };

  const response = await api.post("/api/blogs").send(newBlog);

  assert.strictEqual(response.body.likes, 0);
});

after(async () => {
  await mongoose.connection.close();
});
