import React from "react";
import Footer from "../../components/footer/Footer";

function Home() {
  return (
    <div>
      <div className="flex justify-center w-full h-screen">
        <div className="justify justify-center intems-center w-4/5 h-screen drop-shadow-sm bg-zinc-50">
          <div className="flex flex-row gap-10 px-10 py-10 bg-[#adecda] h-[100px]">
            <div className="basis-5/6 self-center text-left pl-20 font-mono text-3xl text-black">
              Pregnancy Growth <br /> Tracking System
            </div>
            <div className="text-justify px-10 py-5 bg-cyan-200 rounded-xl ">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </div>

            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>

            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
          </div>
          <img
            src="https://assets.babycenter.com/ims/2023/11/BabyCenter-Trust_Wave-Desktop.svg"
            className="w-full h-auto"
          />

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
      <Footer />
    </div>
  );
}

export default Home;
