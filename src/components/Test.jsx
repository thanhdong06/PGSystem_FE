import React from "react";
import { Link } from "react-router-dom";
import CommentList from "./blog/CommentList";
const Test = ({
  text,
  userName = "John Doe",
  userAvatar,
  userProfileLink = "#",
  commentLink = "#",
  comments = 0,
}) => {
  return (
    <div className="bg-base-100 p-4 rounded-lg w-[800px]">
      <div className="flex items-center gap-x-3 mb-2">
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
      <div className="text-base-content font-semibold font-mono text-2xl pb-4">Lorem ipsum dolor sit amet.</div>
      <div className="text-base-content text-sm text-wrap text-justify">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati,
        omnis ipsum perspiciatis neque sequi numquam sit illo, labore et quos
        voluptatibus dolorem sapiente, culpa eum? Culpa soluta dicta totam!
        Voluptates asperiores, laudantium possimus maiores fugit pariatur dicta
        error consequuntur ut doloribus alias molestiae omnis ullam aliquam
        labore tenetur suscipit dolor voluptatibus similique excepturi magnam in
        est rem. Sapiente aliquam eius incidunt quae assumenda optio porro
        molestiae sed quo quidem. A voluptas facere nobis, dignissimos aliquam
        minima sint doloribus dolor vitae totam similique corrupti natus ipsam
        culpa accusantium inventore commodi suscipit vel eius quo quis itaque
        ex? Iure repellat laboriosam beatae in possimus iusto id corporis sit
        recusandae inventore laborum consequuntur, ipsum esse minus, error
        sapiente consequatur excepturi quia soluta praesentium molestias earum!
        Accusamus deleniti minima expedita! Aliquid doloremque, dolorem
        inventore aut voluptas enim aspernatur modi impedit! Quae laboriosam
        nulla repellat sed asperiores, recusandae ad suscipit eaque assumenda
        architecto pariatur error natus optio voluptates odit, consectetur
        deleniti possimus, porro exercitationem ea earum minima voluptatum
        ratione officia. Officiis velit nesciunt qui vero molestiae deleniti
        porro obcaecati quo voluptatem, reprehenderit molestias minus incidunt
        voluptatibus accusantium illum eos nulla, ab alias provident recusandae
        totam in repellat. Exercitationem expedita labore modi iste
        necessitatibus, nam doloribus!
      </div>
      <p className="text-base text-gray-700 mb-3 max-w-lg">{text}</p>
      <CommentList/>
    </div>
  );
};

export default Test;
