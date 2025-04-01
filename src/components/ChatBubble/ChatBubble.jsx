import React, { useState } from 'react';

const ChatBubble = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleChat}
        className="bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 transition-colors"
      >
        <img
          src="https://cdn4.iconfinder.com/data/icons/social-media-2285/1024/logo-512.png"
          alt="Chat Icon"
          className="h-8 w-8" // Phóng to icon từ h-6 w-6 thành h-10 w-10
        />
      </button>
      {isChatOpen && (
        <div className="absolute bottom-16 right-0 w-64 bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2">Chat with us</h3>
          <p className="text-gray-600 mb-4">How can we help you?</p>
          <textarea
            className="w-full p-2 border rounded-md mb-2"
            rows="3"
            placeholder="Nhập tin nhắn của bạn..."
            value={message}
            onChange={handleMessageChange}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
            Gửi
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;