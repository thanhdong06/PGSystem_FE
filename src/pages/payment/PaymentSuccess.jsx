import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const status = searchParams.get("status");
    const membershipId = JSON.parse(localStorage.getItem("membershipId"));
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.uid;


    console.log("Payment Status:", status);
    console.log("Membership ID from URL:", membershipId);
    console.log("User ID:", userId);
    console.log(localStorage.getItem("user"));


    useEffect(() => {
        console.log("something");
        
        const some = async (membershipId) => {
            
            try {
                const response = await fetch(
                    "https://localhost:7215/api/Members/Register-Membership",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify({
                            membershipId: membershipId,
                        }),
                    }
                );
    
                console.log(response)
                console.log("Response status:", response.status);
                const data = await response.json();
                console.log("Membership Registration Response:", data);
                
                localStorage.setItem("token", data.value.data.loginReponse.token)
                console.log(data.value.data.loginReponse.token);
                
            } catch (error) {
                console.error("Membership Update Error:", error);
            }
        };
        some(membershipId)
    }, [status]);

    return (
        <div className="flex items-center justify-center h-screen">
            <h2 className="text-2xl font-bold">
                {status === "PAID" ? "Payment Successful! 🎉" : "Payment Failed ❌"}
            </h2>
        </div>
    );
};

export default PaymentSuccess;
