import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import { toast } from "react-toastify";

const API_BASE_URL = "https://localhost:7215/api";

const CommentList = () => {
  const { bid } = useParams(); // Lấy blog ID từ URL
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bid) return;

    const fetchComments = async () => {
      try {
        console.log(`Fetching comments for Blog ID: ${bid}`);

        const response = await fetch(`${API_BASE_URL}/Comment/by-bid/${bid}`);

        if (!response.ok) {
          throw new Error("No comments found.");
        }

        const data = await response.json();
        console.log("Fetched Comments:", data);
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [bid]);

  const handleCommentSubmit = async (e) => {
    //check
    // fetch("https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Comment/create", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ content: "Test comment", bid: 1, memberID: 0 })
    // })
    // .then(response => response.json())
    // .then(data => console.log(" API Response:", data))
    // .catch(error => console.error("API Error:", error));
    //check
    console.log("Comment Submit Clicked!");
    e.preventDefault();

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      toast.error("Please log in to comment.", { position: "top-right", autoClose: 2000 });
      return;
    }

    const user = JSON.parse(storedUser);
    console.log(user)
    if (!user || user.uid === undefined) {
      toast.error("Invalid user data. Please log in again.", { position: "top-right", autoClose: 2000 });
      return;
    }

    const newCommentData = {
      content: newComment,
      bid: parseInt(bid, 10),
      memberID: user.id, 
    };
    

    console.log(" Sending Comment Data:", newCommentData);

    try {
      console.log(localStorage.getItem("token"))
      const response = await fetch(`${API_BASE_URL}/Comment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
        body: JSON.stringify(newCommentData),
      });

      console.log("Comment API Response:", response);

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Comment API Error:", errorResponse);
        throw new Error(errorResponse.message || "Failed to post comment.");
      }

      const postedComment = await response.json();
      console.log("Comment Successfully Posted:", postedComment);

      setComments((prevComments) => [...prevComments, postedComment]);
      setNewComment("");

      toast.success("Comment added successfully!", { position: "top-right", autoClose: 2000 });
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error(error.message || "Error posting comment.", { position: "top-right", autoClose: 2000 });
    }
  };

  return (
    <div className="bg-base-100 p-4 rounded-lg w-[800px] ">
      <h2 className="text-xl font-bold mb-4">Comments</h2>

      <form onSubmit={handleCommentSubmit} className="mb-4 flex items-center gap-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="input input-bordered w-full text-sm"
          placeholder="Write a comment..."
          required
        />
        <button type="submit" className="btn btn-primary">Post</button>
      </form>

      {loading && (
        <div className="text-gray-500 text-center">
          <span className="loading loading-spinner loading-md"></span> Loading comments...
        </div>
      )}

      {!loading && comments.length === 0 && (
        <div className="text-gray-500 text-center italic">No comments yet. Be the first to comment!</div>
      )}

      {comments.length > 0 && (
        <div className="space-y-6">
          {comments.map((comment, index) => (
            <div key={comment.cid} className="w-full">
              <Comment text={comment.content} userName={`${comment.user.fullName}`} createAt={comment.createAt} />
              {index < comments.length - 1 && (
                <div className="divider"></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentList;
