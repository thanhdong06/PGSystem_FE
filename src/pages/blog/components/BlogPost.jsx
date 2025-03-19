import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const BlogPost = ({ bid }) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(
          `https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Blog/${bid || id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blog post.");
        }

        const data = await response.json();
        setBlog(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [bid, id]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading blog post...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-base-100 p-4 rounded-lg w-[800px] border border-gray-300">
      <div className="flex items-center gap-x-3 mb-2">
        <Link to="#" className="avatar">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              className="w-full h-full object-cover"
              alt="User Avatar"
            />
          </div>
        </Link>
        <div className="flex flex-col">
          <Link to="#" className="text-lg font-semibold text-base-content hover:underline">
            Admin
          </Link>
          <span className="text-sm text-gray-500">
            {new Date(blog.createAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div
        className="text-base-content font-semibold font-mono text-2xl pb-4 break-words"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          wordBreak: "break-word",
        }}
      >
        {blog.title}
      </div>

      <div className="text-base-content text-sm text-wrap text-justify">
        {blog.content}
      </div>
    </div>
  );
};

export default BlogPost;
