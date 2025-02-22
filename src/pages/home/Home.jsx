import React from "react";
import Footer from "../../components/footer/Footer";

function Home() {
  return (
    <div>
      <div className="flex justify-center w-full h-screen">
        <div className="justify justify-center intems-center w-4/5 h-screen drop-shadow-sm">
          <div className="flex flex-row gap-10 px-10 py-10 bg-[#adecda] h-[100px]">
            <div className="basis-5/6 self-center text-left pl-20 font-bold text-2xl text-black">
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
          <div className="relative">
            <img
              src="/api/placeholder/1200/400"
              alt="Pregnancy tracking banner"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/50 to-transparent flex items-center p-8">
              <div className="text-white max-w-md">
                <h2 className="text-2xl font-bold mb-4">Track Your Journey</h2>
                <p className="mb-6">
                  Monitor your pregnancy progress, get personalized insights,
                  and connect with healthcare providers.
                </p>
                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Get Started
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
            <div className="p-6 bg-base-100 rounded-xl shadow-lg">
              <div className="text-blue-500 mb-4">
                <h3 className="text-xl font-bold mb-2">Baby Development</h3>
                <p className="text-base-content">
                  Track your baby's growth week by week with detailed insights
                  and milestones.
                </p>
              </div>
            </div>

            <div className="p-6 bg-base-100 rounded-xl shadow-lg">
              <div className="text-teal-500 mb-4">
                <h3 className="text-xl font-bold mb-2">Health Monitoring</h3>
                <p className="text-base-content">
                  Log your vital signs, symptoms, and health metrics throughout
                  your pregnancy.
                </p>
              </div>
            </div>

            <div className="p-6 bg-base-100 rounded-xl shadow-lg">
              <div className="text-purple-500 mb-4">
                <h3 className="text-xl font-bold mb-2">Appointment Tracker</h3>
                <p className="text-base-content">
                  Never miss an important checkup with our appointment
                  management system.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-teal-600 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Join Our Community Today
              </h2>
              <p className="text-xl mb-8">
                Get personalized pregnancy insights, join discussion groups, and
                track your journey.
              </p>
              <button className="px-8 py-3 bg-white text-teal-600 rounded-lg text-lg hover:bg-gray-100">
                Create Free Account
              </button>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default Home;
