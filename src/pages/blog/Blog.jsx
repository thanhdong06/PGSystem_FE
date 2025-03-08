import React from "react";
import BlogPost from "../../components/blog/BlogPost";
import Navbar from "../../components/Navbar/Navbar";
import CommentList from "../../components/blog/CommentList";
import Footer from "../../components/Footer/Footer";
import BlogList from "../../components/blog/BlogList";
const Blog = () => {
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-7 py-2 max-w-screen my-4">
        <div className="col-start-2 col-span-3">
          <div className="text-sm underline font-bold mb-4">Catalog</div>
          <div className="mb-6">
            <BlogPost />
          </div>

          <CommentList />
        </div>
        <div className="col-start-6 col-end-8">
          <BlogList />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
