const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");

const app = require("../app");
const Blog = require("../models/blogs");
const { initialBlogs, blogsInDb, nonExistingId } = require("./test_helper");

const api = supertest(app);

describe("when there is initially some blogs saved", () => {
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

  describe("Addition of a new blog", () => {
    test("succeeds with valid data", async () => {
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

    test("sets the default value in 0 if the likes property is missing", async () => {
      const newBlog = {
        title: "Deep Dive Into Modern Web Development",
        author: "Matti Luukkainen",
        url: "https://fullstackopen.com/en/",
      };

      const response = await api.post("/api/blogs").send(newBlog);

      assert.strictEqual(response.body.likes, 0);
    });

    test("fails with statuscode 400 if title or url properties are missing", async () => {
      const newBlog1 = {
        author: "Matti Luukkainen",
        url: "https://fullstackopen.com/en/",
        likes: 7,
      };

      const newBlog2 = {
        title: "Deep Dive Into Modern Web Development",
        author: "Matti Luukkainen",
        likes: 8,
      };

      await api.post("/api/blogs").send(newBlog1).expect(400);
      await api.post("/api/blogs").send(newBlog2).expect(400);
    });
  });

  describe("Deletion of a note", () => {
    test("succeeds with valid id", async () => {
      const blogsAtStart = await blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      const blogsAtEnd = await blogsInDb();

      assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1);
    });

    test("fails with statuscode 400 id invalid", async () => {
      const invalidId = "5a3d5da59070081a82a3445";
      await api.delete(`/api/blogs/${invalidId}`).expect(400);
    });

    test("fails with statuscode 404 if blog does not exist", async () => {
      const validNonexistingId = await nonExistingId();
      await api.delete(`/api/blogs/${validNonexistingId}`).expect(404);
    });
  });

  describe("Modification of a blog", () => {
    test("succeeds with valid id", async () => {
      const blogsAtStart = await blogsInDb();
      const blogToUpdate = blogsAtStart[0];
      const updatedData = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,
      };

      const response = await api
        .put(`/api/blogs/${updatedData.id}`)
        .send(updatedData)
        .expect(200);

      assert.strictEqual(response.body.likes, blogToUpdate.likes + 1);
    });

    test("fails with statuscode 400 id invalid", async () => {
      const blogsAtStart = await blogsInDb();
      const blogToUpdate = blogsAtStart[0];
      const updatedData = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,
      };
      const invalidId = "5a3d5da59070081a82a3445";

      await api.delete(`/api/blogs/${invalidId}`).send(updatedData).expect(400);
    });

    test("fails with statuscode 404 if blog does not exist", async () => {
      const validNonexistingId = await nonExistingId();
      const blogsAtStart = await blogsInDb();
      const blogToUpdate = blogsAtStart[0];
      const updatedData = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,
      };
      await api
        .delete(`/api/blogs/${validNonexistingId}`)
        .send(updatedData)
        .expect(404);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
