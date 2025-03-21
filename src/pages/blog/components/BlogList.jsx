import React, { useEffect, useState } from "react";
import MiniBlog from "./Miniblog";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Blog/all"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blogs.");
        }

        let data = await response.json();

        // Sort blogs
        data = data
          .sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
          .slice(0, 6);

        // Fetch comments for each blog
        const blogsWithComments = await Promise.all(
          data.map(async (blog) => {
            try {
              const commentResponse = await fetch(
                `https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Comment/by-bid/${blog.bid}`
              );

              if (!commentResponse.ok) {
                return { ...blog, commentCount: 0 }; // No comments found
              }

              const comments = await commentResponse.json();
              return { ...blog, commentCount: comments.length };
            } catch (error) {
              console.error(`Error fetching comments for blog ${blog.bid}:`, error);
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

    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading blogs...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col gap-6 w-[320px]">
      {blogs.map((blog) => (
        <MiniBlog 
          key={blog.bid}
          blogLink={`/blog/${blog.bid}`}
          userProfileLink={`/user/${blog.aid}`}
          userName={blog.authorName || "Unknown"}
          text={blog.title}
          comments={blog.commentCount || 0}
        />
      ))}
    </div>
  );
};

export default BlogList;
