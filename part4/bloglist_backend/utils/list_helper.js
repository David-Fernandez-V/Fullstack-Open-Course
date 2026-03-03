const _ = require("lodash");

const dummy = (blogs) => {
  console.log("Total blogs: ", blogs.length);
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const favorite = blogs.reduce((max, blog) =>
    blog.likes > max.likes ? blog : max,
  );

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const highest = _.chain(blogs)
    .countBy("author")
    .toPairs()
    .maxBy(([, count]) => count)
    .value();

  return { author: highest[0], blogs: highest[1] };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
