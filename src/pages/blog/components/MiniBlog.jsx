import React from "react";
import { Link } from "react-router-dom";

const MiniBlog = ({
  blogLink = "#",
  userProfileLink,
  userAvatar,
  userName = "Peter Parker",
  comments = 0,
  text = "Default blog content...",
}) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm p-4 w-[300px]">
      <div className="flex items-center gap-x-3 mb-2">
        <Link to={userProfileLink} className="avatar" onClick={(e) => e.stopPropagation()}>
          <div className="w-10 h-10 rounded-full overflow-hidden">
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
          <Link to={userProfileLink} className="text-lg font-bold text-base-content hover:underline">
            {userName}
          </Link>
        </div>
      </div>

      <Link to={blogLink} className="block">
        <p className="text-sm font-semibold text-gray-700 break-words overflow-hidden text-ellipsis"
           style={{
             display: "-webkit-box",
             WebkitLineClamp: 3,
             WebkitBoxOrient: "vertical",
             overflow: "hidden",
             wordBreak: "break-word"
           }}>
          {text}
        </p>
      </Link>

      <div className="mt-2 flex items-center gap-x-2 text-gray-600 text-sm">
        <Link to={blogLink} className="flex items-center gap-x-1 hover:underline text-blue-500">
          💬 <span>{comments} Comment{comments !== 1 ? "s" : ""}</span>
        </Link>
      </div>
    </div>
  );
};

export default MiniBlog;
