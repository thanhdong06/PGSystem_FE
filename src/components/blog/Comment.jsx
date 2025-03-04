import React from "react";
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
  const [showMore, setShowMore] = React.useState(false);

  // Default comment text if none is provided
  const commentText =
    text && text.trim().length > 0
      ? text
      : "This is an example comment. If no text is provided, this will be shown instead.";

  const truncatedText =
    commentText.split(" ").length > 100
      ? commentText.split(" ").slice(0, 100).join(" ") + "..."
      : commentText;

  return (
    <Link
      to={commentLink}
      className="block max-w-[800px] bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 transition"
    >
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
            className="text-lg font-semibold text-gray-800 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {userName}
          </Link>
          <span className="text-sm text-gray-500">2 hours ago</span>
        </div>
      </div>

      {/* Comment Content */}
      <div className="mt-3 text-gray-700 text-sm">
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

      {/* Like & Comment Counts */}
      <div className="mt-4 flex items-center gap-x-4 text-gray-600 text-sm">
        <div className="flex items-center gap-x-1">
          <span>👍</span>
          <span>{likes} Like{likes !== 1 ? "s" : ""}</span>
        </div>
        
        <Link
          to={commentLink}
          className="flex items-center gap-x-1 hover:underline text-blue-500"
          onClick={(e) => e.stopPropagation()}
        >
          <span>💬</span>
          <span>{comments} Comment{comments !== 1 ? "s" : ""}</span>
        </Link>
      </div>
    </Link>
  );
};

export default Comment