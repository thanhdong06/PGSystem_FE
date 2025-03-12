import React, { useState } from "react";
import { Link } from "react-router-dom";

const BlogPost = ({
  text = " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos, dicta labore adipisci suscipit fugiat in iusto saepe impedit repudiandae nemo veniam optio facere quas excepturi eveniet quisquam doloribus rerum numquam porro neque! Vel pariatur at optio laborum corporis eligendi aspernatur consequatur voluptatibus natus, nesciunt explicabo voluptatum minima atque nam repellat quibusdam maiores soluta? Quaerat amet qui beatae consequuntur consectetur maiores quam eveniet quas placeat aliquid voluptate tenetur enim, officia dolor, nemo error? Sed harum magni veniam dolor omnis neque veritatis repellat vel repellendus molestiae? Explicabo harum consequuntur quia odit culpa at ipsam necessitatibus? Perspiciatis, distinctio repudiandae rerum reprehenderit vitae nesciunt pariatur ea veniam aspernatur labore numquam omnis? Voluptatibus nobis totam expedita! Molestias, deserunt magni! Vero, assumenda. Provident maxime explicabo officiis, iusto doloremque suscipit tenetur reprehenderit maiores, incidunt sed repellendus a laudantium ab voluptatum enim aliquid quibusdam error cum iure aut minima quam numquam modi. Repudiandae totam quis nemo omnis similique voluptates assumenda itaque? Nulla, sapiente quam quia id maxime autem eligendi, laboriosam at sit unde omnis dolorem culpa hic odio possimus aut itaque veniam eaque fugiat, reiciendis ipsum temporibus. Blanditiis odit officiis tempora ipsa quam totam quisquam quis dolore officia autem, praesentium in nobis quidem voluptate fugit, atque doloribus unde?",
  userName = "John Doe",
  userAvatar,
  userProfileLink = "#",
}) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = (e) => {
    e.preventDefault();
    console.log("Reply submitted:", replyText);
    setReplyText(""); // Clear input after submission
  };

  return (
    <div className="bg-base-100 p-4 rounded-lg w-[800px] border border-gray-300">
      <div className="flex items-center gap-x-3 mb-2">
        <Link to={userProfileLink} className="avatar">
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
          >
            {userName}
          </Link>
          <span className="text-sm text-gray-500">2 hours ago</span>
        </div>
      </div>

      {/* Blog Content */}
      <div className="text-base-content font-semibold font-mono text-2xl pb-4">
        Lorem ipsum dolor sit amet.
      </div>
      <div className="text-base-content text-sm text-wrap text-justify">
        {text}
      </div>

      {/* Reply Button */}
      <div className="mt-4 flex items-center gap-x-4 text-gray-600 text-sm">
        <button
          onClick={() => setShowReplyInput(!showReplyInput)}
          className="flex items-center gap-x-1 hover:underline text-blue-500"
        >
          💬 Reply
        </button>
      </div>

      {/* Reply Input Field */}
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
    </div>
  );
};

export default BlogPost;
