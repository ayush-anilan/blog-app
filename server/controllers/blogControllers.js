let blogs = [
  {
    title: "My First Blog",
    body: "Insert some text here",
    author: "mario",
    id: "1",
  },
  {
    title: "My Second Blog",
    body: "Insert some more text here",
    author: "yoshi",
    id: "2",
  },
];

// @desc Get all blogs
// @route /api/blogs/
// @access public
const getBlogs = (req, res) => {
  res.json(blogs);
};

// @desc Get single blog
// @route /api/blogs/{id}
// @access public
const getBlog = (req, res) => {
  const id = req.params.id;

  for (let blog of blogs) {
    if (blog.id === id) {
      res.json(blog);
      return;
    }
  }
  res.status(404).send("Blog not found");
};

// @desc Post a blog
// @route /api/blogs/{id}
// @access public
const postBlog = (req, res) => {
  const blog = req.body;
  blogs.push(blog);

  res.send("New post has been added");
};

// @desc Delete a blog
// @route /api/blogs/{id}
// @access public
const deleteBlog = (req, res) => {
  const id = req.params.id;

  blogs = blogs.filter((i) => {
    if (i.id !== id) {
      return true;
    }
    return false;
  });

  res.send("Blog has been deleted");
};

module.exports = {
  getBlogs,
  getBlog,
  postBlog,
  deleteBlog,
};
