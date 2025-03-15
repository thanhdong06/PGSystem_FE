import Footer from "../components/Footer/Footer";
import React from "react";

const test = () => {
  return (
    <div className="w-screen h-screen bg-base-300">
      <div className="bg-transparent w-[400px] h-[600px] rounded-xl">
        <div className=" px-6 py-6">
          <div className="flex flex-col justify-center items-center place-content-center w-full">
            <div>
              <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="green"
                  stroke-width="5"
                  fill="none"
                />
                <path
                  d="M30 50 L45 65 L70 35"
                  stroke="green"
                  stroke-width="5"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="text-base-content font-bold text-2xl">Payment Success</div>
          </div>
          <div className="divider"></div>
          <div className="flex flex-col gap-4 w-full h-full bg-black">
          <div className="text"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default test;
