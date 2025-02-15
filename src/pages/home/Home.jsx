import React from "react";

function Home() {
  return (
    <div className="flex justify-center w-full h-screen">
      <div className="justify justify-center intems-center w-4/5 h-screen drop-shadow-sm bg-zinc-50">
        <div className="flex flex-row gap-10 px-10 py-10 bg-cyan-500 h-[100px]">
          <div className="basis-5/6 self-center text-center font-mono text-2xl text-white">
          Pregnancy Growth Tracking System
          </div>
          <div className="text-justify px-10 py-5 bg-cyan-200 rounded-xl ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </div>
        </div>
        <div className="grid grid-cols-6 grid-rows-6 mt-10 rounded-lg w-full">
          <div className="col-start-2 col-span-full row-start-2 row-span-full rounded-lg bg-neutral-200">
            .
          </div>
          <div className="col-start-1 col-span-2 row-start-1 row-span-2 rounded-lg min-h-[200px] bg-cyan-200">
            .
          </div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
