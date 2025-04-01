import { useState, useEffect } from "react";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import MiniBlog from "../blog/components/MiniBlog";
import ChatBubble from "../../components/ChatBubble/ChatBubble";

const BLOG_API =
  "https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Blog/all";

// Enhanced carousel with fade transitions and overlay text
const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image:
        "https://www.shutterstock.com/image-photo/kindergarten-children-playing-different-musical-600nw-1284017200.jpg",
      title: "Welcome to Your Pregnancy Journey",
      description: "Track every moment of your miraculous nine-month adventure",
    },
    {
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/049/218/180/small_2x/best-selling-natural-and-organic-baby-care-products-photo.jpeg",
      title: "Expert Care Guidance",
      description: "Learn the essentials of baby care from trusted professionals",
    },
    {
      image:
        "https://pediatrixmd.com/wp-content/uploads/2022/11/tips-for-taking-care-of-a-newborn-baby-feat.jpg",
      title: "Prepare for Your New Arrival",
      description: "Everything you need to know before your baby comes home",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[550px] w-[830px] mx-auto overflow-hidden rounded-b-3xl shadow-2xl">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/70 to-transparent z-10"></div>
          <img
            src={slide.image}
            className="w-full h-full object-cover"
            alt={`Slide ${index + 1}`}
          />
          <div className="absolute bottom-1/4 left-16 z-20 max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-4 animate-fade-in-up">
              {slide.title}
            </h1>
            <p className="text-xl mb-8 animate-fade-in-up animation-delay-300">
              {slide.description}
            </p>
            <button className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-full font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-lg animate-fade-in-up animation-delay-600">
              Start Your Journey
            </button>
          </div>
        </div>
      ))}

      {/* Carousel indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white w-8" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
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
    description: "The baby's heart begins to beat, and vital organs start forming.",
    icon: "🌱",
    color: "bg-teal-100 border-teal-500",
    iconColor: "text-teal-500",
  },
  {
    stage: "Second Trimester (Weeks 13-26)",
    description: "The baby starts moving, and the mother may begin to feel kicks.",
    icon: "👣",
    color: "bg-blue-100 border-blue-500",
    iconColor: "text-blue-500",
  },
  {
    stage: "Third Trimester (Weeks 27-40)",
    description:
      "The baby gains weight, prepares for birth, and responds to external sounds.",
    icon: "🤱",
    color: "bg-purple-100 border-purple-500",
    iconColor: "text-purple-500",
  },
  {
    stage: "Due Date (Week 40)",
    description:
      "The baby is ready for delivery! Time for labor and meeting your newborn.",
    icon: "👶",
    color: "bg-pink-100 border-pink-500",
    iconColor: "text-pink-500",
  },
];

const features = [
  {
    title: "Baby Development Tracking",
    description:
      "Follow your baby's growth week by week with interactive visuals and detailed milestones.",
    icon: "👶",
    color: "bg-gradient-to-br from-blue-500 to-teal-400",
  },
  {
    title: "Health Monitoring",
    description:
      "Log vital signs, symptoms, and health metrics throughout your pregnancy journey.",
    icon: "❤️",
    color: "bg-gradient-to-br from-red-500 to-pink-400",
  },
  {
    title: "Appointment Management",
    description:
      "Never miss an important checkup with our smart reminder and scheduling system.",
    icon: "📅",
    color: "bg-gradient-to-br from-purple-500 to-indigo-400",
  },
  {
    title: "Nutrition Guide",
    description:
      "Get personalized meal plans and nutrition advice for each stage of pregnancy.",
    icon: "🥗",
    color: "bg-gradient-to-br from-green-500 to-teal-400",
  },
  {
    title: "Community Support",
    description:
      "Connect with other expecting parents and share experiences in our forums.",
    icon: "👨‍👩‍👧",
    color: "bg-gradient-to-br from-yellow-500 to-orange-400",
  },
  {
    title: "Expert Resources",
    description:
      "Access articles, videos, and guides written by healthcare professionals.",
    icon: "🧠",
    color: "bg-gradient-to-br from-indigo-500 to-purple-400",
  },
];

function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(BLOG_API);
        if (!response.ok) throw new Error("Failed to fetch blogs.");
        let data = await response.json();

        // Sort by creation time and get the 10 most recent blogs
        data = data
          .sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
          .slice(0, 10)
          // Assign authorName from user.fullName (if available)
          .map((blog) => ({
            ...blog,
            authorName: blog.user?.fullName || "Unknown",
          }));

        setBlogs(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="bg-gradient-to-b from-white to-teal-50 min-h-screen">
      {/* The header/navigation section has been removed */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-24">
          <HeroCarousel />
        </section>

        {/* Trust Banner */}
        <section className="relative -mt-16 mb-24">
          <div className="bg-white rounded-xl shadow-xl p-6 flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <img
                src="https://adspot.co/assets/upload/property-md/09f1662e46942ffc1e0b6ba822d288c4.jpg"
                className="h-12"
                alt="Trust Banner"
              />
              <div>
                <h3 className="font-semibold text-gray-800">
                  Trusted by over 100,000 parents
                </h3>
                <p className="text-gray-600">
                  Expert-reviewed content for your peace of mind
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <span className="text-yellow-400 text-2xl">★★★★★</span>
              <span className="font-semibold">4.9/5</span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Everything You Need For Your Pregnancy Journey
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive tools help you track, learn, and prepare for every
              stage of your pregnancy with confidence and peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className={`${feature.color} p-6 text-center`}>
                  <span className="text-5xl">{feature.icon}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pregnancy Timeline Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Your Pregnancy Journey
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Understanding the key milestones during your 40-week journey helps you
              prepare for each stage of your baby's development.
            </p>
          </div>

          <div className="space-y-6">
            {pregnancyTimeline.map((event, index) => (
              <div
                key={index}
                className={`${event.color} border-l-4 rounded-r-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg`}
              >
                <div className="p-6 flex items-start space-x-4">
                  <div
                    className={`h-12 w-12 rounded-full ${event.iconColor} bg-white flex items-center justify-center text-2xl`}
                  >
                    {event.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {event.stage}
                    </h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Blogs Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Latest from Our Blog
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Read expert articles, personal stories, and helpful guides from our
              community of parents and healthcare professionals.
            </p>
          </div>

          <div className="relative">
            <div className="carousel flex overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <div
                    key={blog.bid}
                    className="carousel-item snap-start w-80 mx-2 flex-shrink-0"
                  >
                    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full">
                      <MiniBlog
                        blogLink={`/blog/${blog.bid}`}
                        userProfileLink={`/user/${blog.aid}`}
                        userName={blog.authorName}
                        text={blog.title}
                        comments={blog.commentCount || 0}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center w-full p-8 bg-white rounded-xl shadow">
                  No blogs available at the moment.
                </p>
              )}
            </div>

            <div className="absolute top-1/2 left-0 -translate-y-1/2">
              <button className="p-2 rounded-full bg-white shadow-md text-gray-800 hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>

            <div className="absolute top-1/2 right-0 -translate-y-1/2">
              <button className="p-2 rounded-full bg-white shadow-md text-gray-800 hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/blog"
              className="inline-flex items-center text-teal-500 hover:text-teal-600 font-medium"
            >
              View all articles
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-4 w-4 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our pregnancy tracking system
              and how it works.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer p-6">
                    <span>{faq.question}</span>
                    <span className="transition group-open:rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="p-6 pt-0 text-gray-600 border-t">
                    {faq.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-24">
          <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-12 flex items-center">
                <div className="text-white">
                  <h2 className="text-3xl font-bold mb-4">
                    Start Your Pregnancy Journey Today
                  </h2>
                  <p className="text-white/80 mb-8">
                    Join thousands of expecting parents who trust our platform to guide them
                    through every step of their pregnancy.
                  </p>
                  <div className="flex space-x-4">
                    <Link
                      to="/signup"
                      className="px-6 py-3 bg-white text-teal-500 rounded-full font-medium hover:bg-gray-100 transition-colors"
                    >
                      Create Free Account
                    </Link>
                    <Link
                      to="/features"
                      className="px-6 py-3 bg-transparent border border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-8 flex items-center">
                <img
                  src="/api/placeholder/600/400"
                  alt="Pregnant woman using app"
                  className="rounded-xl shadow-lg object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              What Parents Say About Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Read testimonials from parents who have used our pregnancy tracking system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center mr-4">
                    <span className="text-teal-500 font-bold">
                      {["SM", "JD", "AK"][i - 1]}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      {["Sarah M.", "John D.", "Anna K."][i - 1]}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      {["First-time mom", "Dad of twins", "Mom of 3"][i - 1]}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  {[
                    "This app has been my go-to resource throughout my pregnancy. The tracking features are so helpful!",
                    "The reminders and appointment tracking saved me multiple times. Great for busy parents!",
                    "I love the week-by-week development insights. It helped me connect with my baby before birth.",
                  ][i - 1]}
                </p>
                <div className="text-yellow-400">★★★★★</div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <ChatBubble />
      <Footer />
    </div>
  );
}

export default Home;
