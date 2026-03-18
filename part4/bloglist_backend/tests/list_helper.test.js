const { test, describe } = require("node:test");
const assert = require("node:assert");
const {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
} = require("../utils/list_helper");

const { initialBlogs, listWithOneBlog } = require("./test_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("Total likes", () => {
  test("of empty list is 0", () => {
    assert.strictEqual(totalLikes([]), 0);
  });

  test("when list has only one blog equals the likes of that", () => {
    assert.strictEqual(totalLikes(listWithOneBlog), 5);
  });

  test("of a bigger list is calculated right", () => {
    assert.strictEqual(totalLikes(initialBlogs), 36);
  });
});

describe("Favorite Blog", () => {
  test("of empty list is null", () => {
    assert.deepStrictEqual(favoriteBlog([]), null);
  });

  test("when list has only one blog equals of that blog", () => {
    assert.deepStrictEqual(favoriteBlog(listWithOneBlog), {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("of a bigger list is calculated right", () => {
    assert.deepStrictEqual(favoriteBlog(initialBlogs), {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});

describe("Most blogs", () => {
  test("of empty list is null", () => {
    assert.deepStrictEqual(mostBlogs([]), null);
  });

  test("when list has only one blog equals the author of that blog", () => {
    assert.deepStrictEqual(mostBlogs(listWithOneBlog), {
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });

  test("of a bigger list is calculated right", () => {
    assert.deepStrictEqual(mostBlogs(initialBlogs), {
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("Most likes", () => {
  test("of empty list is null", () => {
    assert.deepStrictEqual(mostLikes([]), null);
  });

  test("when list has only one blog equals the author of that blog", () => {
    assert.deepStrictEqual(mostLikes(listWithOneBlog), {
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("of a bigger list is calculated right", () => {
    assert.deepStrictEqual(mostLikes(initialBlogs), {
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
