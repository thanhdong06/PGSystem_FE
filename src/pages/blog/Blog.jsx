import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import BlogPost from "./components/BlogPost";
import CommentList from "./components/CommentList";
import Footer from "../../components/Footer/Footer";
import BlogList from "./components/BlogList";

const API_URL =
  "https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Blog/all";
const CREATE_BLOG_URL =
  "https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Blog/Create";
const COMMENT_API =
  "https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Comment/by-bid";

const Blog = () => {
  const { bid } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    type: "",
    aid: 0,
  });

  useEffect(() => {
    if (!bid) {
      fetchBlogs();
    }
  }, [bid]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch blogs.");
      }
      let data = await response.json();

      // Sort blogs by latest first
      data = data.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));

      // Fetch comment counts for each blog
      const blogsWithComments = await Promise.all(
        data.map(async (blog) => {
          try {
            const commentResponse = await fetch(`${COMMENT_API}/${blog.bid}`);
            if (!commentResponse.ok) {
              return { ...blog, commentCount: 0 }; // No comments
            }
            const comments = await commentResponse.json();
            return { ...blog, commentCount: comments.length };
          } catch (error) {
            return { ...blog, commentCount: 0 }; // Error handling
          }
        })
      );

      setBlogs(blogsWithComments);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please log in to create a blog.");
      return;
    }

    const blogData = { ...newBlog, aid: user.uid };

    try {
      const response = await fetch(CREATE_BLOG_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) throw new Error("Failed to create blog.");

      alert("Blog created successfully!");
      setIsModalOpen(false);
      setNewBlog({ title: "", content: "", type: "", aid: user.uid });
      fetchBlogs(); // Refresh list
    } catch (error) {
      alert(error.message || "Error creating blog.");
    }
  };

  return (
    <div>
      {bid ? (
        <div className="grid grid-cols-7 py-2 max-w-screen min-h-screen my-4">
          <div className="col-start-2 col-span-3">
            {/* Back Button */}
            <div className="flex justify-between items-center mb-4">
              <button onClick={() => navigate("/blog")} className="btn ">
                ⬅ Back to Blog Home
              </button>
            </div>
            <div className="text-sm underline font-bold mb-4">Catalog</div>
            <div className="mb-6">
              <BlogPost bid={bid} />
            </div>
            <CommentList bid={bid} />
          </div>
          <div className="col-start-6 col-end-8 hidden xl:block">
            <div className="bg-base-100 rounded-lg p-4 ">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                📰 Recent Blogs
              </h3>
              <BlogList />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-7 py-4 gap-6 min-h-screen">
          <div className="col-start-2 col-span-5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Recent Blog Posts</h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn btn-primary"
              >
                Create Blog
              </button>
            </div>

            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="space-y-6 mb-4">
                {blogs.map((blog) => (
                  <div
                    key={blog.bid}
                    className="card w-full bg-base-100 border-2 border-base-300 p-4"
                  >
                    <h3 className="text-lg font-semibold">
                      <Link
                        to={`/blog/${blog.bid}`}
                        className="text-primary font-semibold hover:underline"
                      >
                        {blog.title}
                      </Link>
                    </h3>
                    <p className="text-base-content text-justify text-sm mt-1">
                      {blog.content.slice(0, 500)}...
                    </p>
                    <div className="flex items-center gap-4 text-base-content text-sm mt-2">
                      <span>
                        📅 {new Date(blog.createAt).toLocaleDateString()}
                      </span>
                      <span>👤 {blog.authorName || "Unknown"}</span>
                      <span>💬 {blog.commentCount} Comments</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create Blog Modal */}
      {isModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Create New Blog</h3>
            <form onSubmit={handleCreateBlog}>
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                value={newBlog.title}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, title: e.target.value })
                }
                className="input input-bordered w-full"
                required
              />

              <label className="label mt-2">
                <span className="label-text">Content</span>
              </label>
              <textarea
                value={newBlog.content}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, content: e.target.value })
                }
                className="textarea textarea-bordered w-full"
                required
              ></textarea>

              <label className="label mt-2">
                <span className="label-text">Category</span>
              </label>
              <select
                value={newBlog.type}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, type: e.target.value })
                }
                className="select select-bordered w-full"
                required
              >
                <option value="">Select Category</option>
                <option value="pregnancy">Pregnancy</option>
                <option value="health">Health</option>
                <option value="lifestyle">Lifestyle</option>
              </select>

              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      <Footer />
    </div>
  );
};

export default Blog;
