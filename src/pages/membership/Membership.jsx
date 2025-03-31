import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";


const Membership = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [subscriptionPlans, setSubcriptionPlans] = useState();

  useEffect(()=> {
    const getMembership = async () => {
      const response = await fetch ("https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Members/Memberships",{
        method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
      })
      const data = await response.json();
      console.log(data);
      setSubcriptionPlans(data.value.data);
    }
    getMembership()
  },[])
  // Handle Payment Function
  const handlePayment = async (plan, membershipId) => {
    const token = localStorage.getItem("token");
    const membership = localStorage.setItem("membershipId", membershipId);
    console.log("Membership : ", membership);
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

        setToastMessage(`Redirecting to payment for ${plan.name} plan...`);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          window.location.href = redirectUrl;
        }, 1500); 
      } else {
        throw new Error("Payment initiation failed: No checkout URL returned.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      setToastMessage(`${error.message || "An error occurred during payment."}`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-black text-white px-6 py-3 rounded-md shadow-lg">
          {toastMessage}
        </div>
      )}
      
      {/* Membership Plans */}
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Membership Plans</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subscriptionPlans?.map((plan) => (
            <div 
              key={plan.mid}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold text-center mb-4 capitalize">
                  {plan.name}
                </h2>
                <div className="text-center mb-8">
                  <span className="text-4xl font-bold">${plan.price}</span>
                </div>
                <p className="text-gray-600 text-center mb-8">
                  {plan.description}
                </p>
                <button
                  onClick={() => handlePayment(plan, plan.mid)}
                  className={`w-full py-3 px-6 rounded-full text-white font-semibold
                    ${plan.name === 'gold' 
                      ? 'bg-yellow-500 hover:bg-yellow-600' 
                      : plan.name === 'silver'
                      ? 'bg-gray-400 hover:bg-gray-500'
                      : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                >
                  {plan.price === 0 ? 'Get Started Free' : 'Subscribe Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )   
};

export default Membership;
