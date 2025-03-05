import React from "react";
import { Link } from "react-router-dom";

const BlogList = ({
  blogLink = "#",
  userProfileLink,
  userAvatar,
  userName,
  commentLink,
  comments = 0,
  text = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum similique, officiis iusto quidem reiciendis libero labore, natus sed quaerat quo repudiandae quos debitis aut ratione quae nisi! Illum reprehenderit, rem ullam quisquam quasi at temporibus voluptates cupiditate, recusandae quae, aliquid quidem? Porro velit consequuntur beatae neque suscipit, architecto quia saepe quo tenetur rerum expedita praesentium culpa soluta dolorum recusandae illo explicabo. Quas, ex temporibus excepturi laborum tenetur assumenda perspiciatis tempore aliquam fugit quae commodi, placeat vitae porro aut voluptas. Corporis non adipisci sed saepe autem recusandae vitae, voluptate molestias voluptas expedita consequuntur. Ut excepturi, commodi ad tempora autem vero provident modi minima dolores praesentium iste. Odit saepe ex sunt consequuntur cumque eius reprehenderit incidunt hic officiis quod nulla molestiae fugit aperiam, similique ipsum ipsa, laborum quam suscipit possimus quia quasi. Harum praesentium delectus esse, unde impedit numquam commodi dolor iure reprehenderit reiciendis nesciunt saepe recusandae explicabo quidem, culpa soluta aliquid expedita blanditiis laboriosam est perferendis. Iusto sapiente aliquid qui, quam tenetur accusamus, dolorem exercitationem neque aliquam molestiae minus. Est veniam, nisi iste, porro, eius quo possimus aliquam labore accusamus similique molestias deleniti repellat id voluptas? Neque aut officiis repellat! Natus corrupti quasi laboriosam neque tenetur quod. Numquam atque perspiciatis dignissimos.",
}) => {
  // Truncate text if it's longer than 300 characters
  const truncatedText =
    text.length > 300 ? text.substring(0, 300) + "..." : text;

  return (
    <div>
      <Link
        to={blogLink}
        className="block max-w-[300px] rounded-lg p-4 transition"
      ></Link>
      <div className="border border-gray-200 rounded-lg shadow-sm w-[300px] h-[300px] p-4">
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

        {/* Blog Content */}
        <p className="mt-3 text-gray-700 text-sm">{truncatedText}</p>
        {/* comment */}
      <div className="mt-4 flex items-center gap-x-4 text-gray-600 text-sm">
              
              <Link
                to="/home"
                className="flex items-center gap-x-1 hover:underline text-blue-500"
                onClick={(e) => e.stopPropagation()}
              >
                <span>💬</span>
                <span>{comments} Comment{comments !== 1 ? "s" : ""}</span>
              </Link>
            </div>
      </div>
      

    </div>
  );
};

export default BlogList;
