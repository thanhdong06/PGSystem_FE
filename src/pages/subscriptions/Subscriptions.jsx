
import Footer from "../../components/footer/Footer";

const subscriptionPlans = [
    {
      name: "Basic",
      price: "$9/mo",
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
      price: "$19/mo",
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
      price: "$29/mo",
      features: [
        "Real-time fetal growth tracking",
        "Advanced pregnancy health tracking",
        "Kick & contraction tracker",
        "Doctor consultation reports",
        "AI-based pregnancy recommendations",
      ],
      unavailableFeatures: [
        "3D Ultrasound scan integration",
      ],
      isPopular: true,
    },
    {
      name: "Ultimate",
      price: "$49/mo",
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
  

const Subscriptions = () => {
  return (
    <div>
      <div className="flex flex-col min-h-screen w-5/6 justify-center mx-auto">
        <div className="h-screen">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-10 justify-center items-stretch place-items-center">
            {subscriptionPlans.map((plan, index) => (
              <div
                key={index}
                className="card border-black border-[1px] w-80 bg-base-100 shadow-lg flex flex-col"
              >
                <div className="card-body flex flex-col flex-grow">
                  {plan.isPopular && (
                    <span className="badge badge-xs badge-warning self-start">
                      Most Popular
                    </span>
                  )}
                  <div className="flex justify-between">
                    <h2 className="text-3xl font-bold">{plan.name}</h2>
                    <span className="text-xl">{plan.price}</span>
                  </div>
                  <ul className="mt-6 flex flex-col gap-2 text-xs flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-4 me-2 inline-block text-success"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.unavailableFeatures.map((feature, i) => (
                      <li key={i} className="opacity-50 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-4 me-2 inline-block text-base-content/50"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="line-through">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <button className="btn btn-primary btn-block">
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

export default Subscriptions;
