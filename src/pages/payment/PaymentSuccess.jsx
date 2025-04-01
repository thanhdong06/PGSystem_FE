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
        const updateMembership = async (membershipId) => {
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

                if (!response.ok) {
                    throw new Error("Failed to update membership");
                }

                const data = await response.json();
                
                // Update token and user role in localStorage
                localStorage.setItem("token", data.value.data.loginReponse.token);
                
                // Update user role in localStorage
                const storedUser = JSON.parse(localStorage.getItem("user"));
                if (storedUser) {
                    storedUser.role = "Member";
                    localStorage.setItem("user", JSON.stringify(storedUser));
                }

                // Force a reload to update the Navbar
                window.location.reload();
                
            } catch (error) {
                console.error("Membership Update Error:", error);
            }
        };
        
        if (status === "PAID") {
            updateMembership(membershipId);
        }
    }, [status, membershipId]);

    return (
        <div className="flex items-center justify-center h-screen">
            <h2 className="text-2xl font-bold">
                {status === "PAID" ? "Payment Successful! 🎉" : "Payment Failed ❌"}
            </h2>
        </div>
    );
};

export default PaymentSuccess;
