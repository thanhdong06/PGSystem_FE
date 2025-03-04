import React from "react";
import Comment from "./Comment";

const comments = [
  {
    text: "Pregnancy is a beautiful journey filled with countless emotions, from excitement to nervousness. As the body changes, so do the emotions, and it's incredible how one moment you feel overwhelmed with joy and the next you're worrying about every tiny detail. The experience of feeling a baby grow inside you is truly miraculous. Every kick, every movement reminds you that you're nurturing a tiny human. While morning sickness and cravings can be tough, the anticipation of holding your baby makes it all worthwhile. The love a mother feels even before birth is indescribable, and it's an experience that changes you forever.",
    userName: "User 1",
    userAvatar: "https://randomuser.me/api/portraits/women/30.jpg",
    userProfileLink: "#",
    commentLink: "#",
    likes: 234,
    comments: 23,
  },
  {
    text: "One of the hardest yet most rewarding parts of pregnancy is watching your body transform to accommodate new life. The changes can be overwhelming, from morning sickness in the first trimester to the sheer exhaustion of the third. Yet, despite the challenges, there's an unspoken beauty in it all. The moment you hear your baby's heartbeat for the first time, every hardship becomes insignificant. Every doctor's visit, every ultrasound scan strengthens the bond between mother and child. Although pregnancy comes with discomforts like back pain, heartburn, and sleepless nights, the thought of bringing life into the world makes it all feel worth it. It is a journey of strength, resilience, and immense love.",
    userName: "User 2",
    userAvatar: "https://randomuser.me/api/portraits/men/31.jpg",
    userProfileLink: "#",
    commentLink: "#",
    likes: 312,
    comments: 45,
  },
  {
    text: "Pregnancy is a rollercoaster ride—both emotionally and physically. It’s a time when everything seems to be changing, from your body to your emotions. You suddenly have cravings for food you never even liked before, and sleep can become a challenge due to discomfort. Yet, despite all these things, the moment you feel those first tiny kicks inside you, everything suddenly becomes so real. The excitement of preparing a nursery, picking out baby clothes, and imagining the future with your child keeps you going through the tough days. It’s an experience unlike any other, and it truly brings out the strength in a woman.",
    userName: "User 3",
    userAvatar: "https://randomuser.me/api/portraits/women/32.jpg",
    userProfileLink: "#",
    commentLink: "#",
    likes: 198,
    comments: 30,
  }
];

const CommentList = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Comments</h1>
      {comments.map((comment, index) => (
        <div key={index} className="w-max">
          <Comment {...comment} />
          {index < comments.length - 1 && <div className="px-4"><div className="divider"></div></div>}
        </div>
      ))}
    </div>
  );
};

export default CommentList;