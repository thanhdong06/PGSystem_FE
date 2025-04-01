import React from 'react';

const CommunityPosts = ({ posts }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Community Experiences</h2>
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-medium">{post.title}</h3>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <span className="font-medium">{post.username}</span>
                  <span className="mx-2">•</span>
                  <span>Week {post.week}</span>
                  <span className="mx-2">•</span>
                  <span>{post.date}</span>
                </div>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                Week {post.week}
              </span>
            </div>
            <p className="text-gray-700 mb-4">{post.content}</p>
            <div className="flex items-center text-sm text-gray-600">
              <button className="flex items-center hover:text-blue-600 transition-colors">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                </svg>
                {post.likes} Likes
              </button>
              <span className="mx-3">•</span>
              <button className="flex items-center hover:text-blue-600 transition-colors">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                </svg>
                {post.comments} Comments
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPosts;
