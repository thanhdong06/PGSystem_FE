import React, { useState } from "react";
import Footer from "../../components/footer/Footer";

const subscriptionPlans = [
  {
    name: "Basic",
    price: 9,
    features: [
      "Weekly fetal growth updates",
      "Basic pregnancy health tracking",
      "Kick & movement counter",
    ],
    unavailableFeatures: [
      "Personalized pregnancy insights",
      "Doctor consultation reports",
      "AI-based pregnancy recommendations",
    ],
    isPopular: false,
  },
  {
    name: "Standard",
    price: 19,
    features: [
      "Daily fetal growth updates",
      "Advanced pregnancy health tracking",
      "Kick & movement counter",
      "Personalized pregnancy insights",
    ],
    unavailableFeatures: [
      "Doctor consultation reports",
      "AI-based pregnancy recommendations",
    ],
    isPopular: false,
  },
  {
    name: "Premium",
    price: 29,
    features: [
      "Real-time fetal growth tracking",
      "Advanced pregnancy health tracking",
      "Kick & contraction tracker",
      "Doctor consultation reports",
      "AI-based pregnancy recommendations",
    ],
    unavailableFeatures: ["3D Ultrasound scan integration"],
    isPopular: true,
  },
  {
    name: "Ultimate",
    price: 49,
    features: [
      "Real-time fetal growth tracking",
      "Comprehensive pregnancy health monitoring",
      "Kick & contraction tracker",
      "Doctor consultation reports",
      "AI-based pregnancy insights",
      "3D Ultrasound scan integration",
    ],
    unavailableFeatures: [],
    isPopular: false,
  },
];

const Membership = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Handle Payment Function
  const handlePayment = async (plan, membershipId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setToastMessage("⚠️ Please login before making a payment.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); // Hide after 3 seconds
      return;
    }

    try {
      console.log("Initiating payment request...");

      const response = await fetch(
        `https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/payment?orderCode=${Math.floor(
          Math.random() * 100000
        )}&amount=${plan.price}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Payment API returned status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Payment API Response:", data);

      if (data?.value?.data?.checkoutUrl) {
        const redirectUrl = `${data.value.data.checkoutUrl}`;
        console.log("Redirecting to:", redirectUrl);

        setToastMessage(`✅ Redirecting to payment for ${plan.name} plan...`);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          window.location.href = redirectUrl;
        }, 1500); // Show for 1.5 sec, then redirect
      } else {
        throw new Error("Payment initiation failed: No checkout URL returned.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      setToastMessage(`❌ ${error.message || "An error occurred during payment."}`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div>
      {showToast && (
        <div className="toast toast-end fixed z-50 p-4">
          <div className="alert alert-warning text-white bg-yellow-600">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col min-h-screen w-5/6 justify-center mx-auto">
        <div className="h-screen">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-10 justify-center items-stretch place-items-center">
            {subscriptionPlans.map((plan, index) => (
              <div
                key={index}
                className="card border-collapse border-[1px] w-80 bg-base-300 shadow-lg flex flex-col"
              >
                <div className="card-body flex flex-col flex-grow">
                  {plan.isPopular && (
                    <span className="badge badge-xs badge-warning self-start">
                      Most Popular
                    </span>
                  )}
                  <div className="flex justify-between">
                    <h2 className="text-3xl font-bold">{plan.name}</h2>
                    <span className="text-xl">${plan.price}/mo</span>
                  </div>
                  <ul className="mt-6 flex flex-col gap-2 text-xs flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        ✅ {feature}
                      </li>
                    ))}
                    {plan.unavailableFeatures.map((feature, i) => (
                      <li key={i} className="opacity-50 flex items-center">
                        ❌ {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <button
                      className="btn btn-primary btn-block"
                      onClick={() => handlePayment(plan, index + 1)}
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Membership;
