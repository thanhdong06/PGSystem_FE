  import React, { useState } from "react";
  import { Link } from "react-router-dom";

  const Comment = ({
    text,
    userName = "John Doe",
    userAvatar,
    userProfileLink = "#",
    commentLink = "#",
    likes = 0,
    comments = 0,
  }) => {
    const [showMore, setShowMore] = useState(false);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [replies, setReplies] = useState([]);

    const commentText =
      text && text.trim().length > 0
        ? text
        : "This is an example comment. If no text is provided, this will be shown instead.";

    const truncatedText =
      commentText.split(" ").length > 100
        ? commentText.split(" ").slice(0, 100).join(" ") + "..."
        : commentText;

    const handleReplySubmit = (e) => {
      e.preventDefault();
      if (replyText.trim()) {
        setReplies([...replies, { text: replyText, userName: "You" }]);
        setReplyText("");
        setShowReplyInput(false);
      }
    };

    return (
      <div className="block max-w-[800px] rounded-lg p-4 transition">
        {/* User Info */}
        <div className="flex items-center gap-x-3">
          <Link
            to={userProfileLink}
            className="avatar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={
                  userAvatar ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                className="w-full h-full object-cover"
                alt="User Avatar"
              />
            </div>
          </Link>
          <div className="flex flex-col">
            <Link
              to={userProfileLink}
              className="text-lg font-semibold text-base-content hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {userName}
            </Link>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
        </div>

        {/* Comment Content */}
        <div className="mt-3 text-base-content text-sm text-justify">
          {showMore ? commentText : truncatedText}
          {commentText.split(" ").length > 100 && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowMore(!showMore);
              }}
              className="text-blue-500 hover:underline ml-2"
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          )}
        </div>


        {showReplyInput && (
          <form
            onSubmit={handleReplySubmit}
            className="mt-3 flex items-center gap-2"
          >
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="input input-bordered w-full text-sm"
              placeholder="Write a reply..."
            />
            <button
              type="submit"
              className="btn btn-sm btn-primary"
              disabled={!replyText.trim()}
            >
              Post
            </button>
          </form>
        )}

        {/* Render Replies */}
        {replies.length > 0 && (
          <div className="mt-3 border-l-2 pl-4">
            {replies.map((reply, index) => (
              <div key={index} className="mt-2">
                <span className="font-semibold text-sm">{reply.userName}</span>
                <p className="text-sm text-gray-700">{reply.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  export default Comment;
