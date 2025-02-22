import { useState, useEffect } from "react";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";


const AutoCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    "https://www.shutterstock.com/image-photo/kindergarten-children-playing-different-musical-600nw-1284017200.jpg",
    "https://thumbs.dreamstime.com/b/group-babies-playing-floor-nursery-children-day-care-center-fun-s-playroom-creche-135684186.jpg",
    "https://img.lovepik.com/photo/50169/4425_lovepik-high-end-confinement-center-nurses-take-care-of-photo-image_wh300.jpg",
    "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp",
    // "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel w-full relative h-[400px] overflow-hidden">
      {images.map((img, index) => (
        <div
          key={index}
          className={`carousel-item absolute inset-0 w-full transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={img}
            className="w-full h-full object-cover"
            alt={`Slide ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
};

const faqs = [
  {
    question: "How do I create an account?",
    answer:
      'Click the "Sign Up" button in the top right corner and follow the registration process.',
  },
  {
    question: "How do I get started on this website?",
    answer:
      "Simply sign up, choose a membership plan, and start tracking your pregnancy journey.",
  },
  {
    question: "How does pregnancy tracking work?",
    answer:
      "Our system allows you to log fetal growth metrics, receive health alerts, and set reminders for medical checkups.",
  },
  {
    question: "What are the key fetal growth milestones?",
    answer:
      "Our system provides weekly growth tracking, including weight and length measurements, based on medical guidelines.",
  },
  {
    question: "How can I set pregnancy reminders?",
    answer:
      "You can set reminders for doctor appointments, vaccinations, and important pregnancy milestones in your dashboard.",
  },
];

const pregnancyTimeline = [
  {
    stage: "First Trimester (Weeks 1-12)",
    description:
      "The baby’s heart begins to beat, and vital organs start forming.",
  },
  {
    stage: "Second Trimester (Weeks 13-26)",
    description:
      "The baby starts moving, and the mother may begin to feel kicks.",
  },
  {
    stage: "Third Trimester (Weeks 27-40)",
    description:
      "The baby gains weight, prepares for birth, and responds to external sounds.",
  },
  {
    stage: "Due Date (Week 40)",
    description:
      "The baby is ready for delivery! Time for labor and meeting your newborn.",
  },
];

function Home() {
  return (
    <div>
      <div className="flex justify-center w-full min-h-screen">
        <div className="justify justify-center items-center w-4/5 min-h-screen drop-shadow-sm">
          {/* Header Section */}
          <div className="flex flex-row gap-10 px-10 py-10 bg-[#adecda] h-[100px]">
            <div className="basis-5/6 self-center text-left pl-20 font-bold text-2xl text-black">
              Pregnancy Growth <br /> Tracking System
            </div>
           
            
          </div>  

          <div className="relative w-full">
            {/* Image Banner (Overlay on Carousel) */}
            <img
              src="https://assets.babycenter.com/ims/2023/11/BabyCenter-Trust_Wave-Desktop.svg"
              className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 w-full h-auto"
            />

            {/* Auto Carousel (Background) */}
            <AutoCarousel />
          </div>

          {/* Call to Action Banner */}
          <div className="relative mt-[-6px]">
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

          {/* Features Section */}
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

          {/* preg timeline section */}
          <div className="flex flex-col">
            <div className="flex justify-between">
              <div className="text-base-content font-bold text-xl">
                Pregnance Timeline
              </div>
              <button className="btn btn-dash btn-primary">More</button>
            </div>
            <ul className="timeline my-10">
              {pregnancyTimeline.map((event, index) => (
                <li key={index}>
                  {index !== 0 && <hr />}
                  <div
                    className={`${
                      index % 2 === 0 ? "timeline-start" : "timeline-end"
                    } timeline-box`}
                  >
                    <strong>{event.stage}</strong>
                    <p className="text-sm">{event.description}</p>
                  </div>
                  <div className="timeline-middle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* faq section */}
          <div className="space-y-2 w-full my-2 mb-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="collapse collapse-arrow bg-base-200 border border-base-300"
              >
                <input
                  type="radio"
                  name="faq-accordion"
                  defaultChecked={index === 0}
                />
                <div className="collapse-title font-semibold">
                  {faq.question}
                </div>
                <div className="collapse-content text-sm">{faq.answer}</div>
              </div>
            ))}
          </div>
          {/* Community Section */}
          <div className="bg-teal-600 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Join Our Community Today
              </h2>
              <p className="text-xl mb-8">
                Get personalized pregnancy insights, join discussion groups, and
                track your journey.
              </p>
              <a
               href="/login"
              className="px-8 py-3 bg-white text-teal-600 rounded-lg text-lg hover:bg-gray-100"
            >
             Create Free Account
</a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
