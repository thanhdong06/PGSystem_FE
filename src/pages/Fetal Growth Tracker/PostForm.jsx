import React, { useState } from 'react';

const PostForm = ({ posts, setPosts }) => {
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    week: ""
  });

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const post = {
      id: posts.length + 1,
      username: "CurrentUser",
      week: parseInt(newPost.week),
      title: newPost.title,
      content: newPost.content,
      likes: 0,
      comments: 0,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    setPosts([post, ...posts]);
    setNewPost({ title: "", content: "", week: "" });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
      <h2 className="text-xl font-semibold mb-4">Share your experience</h2>
      <form onSubmit={handlePostSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Week of pregnancy</label>
          <select
            className="w-full border rounded-md p-2"
            value={newPost.week}
            onChange={(e) => setNewPost({ ...newPost, week: e.target.value })}
            required
          >
            <option value="">Select week</option>
            {Array.from({ length: 35 }, (_, i) => i + 8).map(week => (
              <option key={week} value={week}>Week {week}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            className="w-full border rounded-md p-2"
            placeholder="Enter a title for your post"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Your experience</label>
          <textarea
            className="w-full border rounded-md p-2 min-h-32"
            placeholder="Share your thoughts, questions or experiences..."
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;
