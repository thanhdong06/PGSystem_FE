import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const status = searchParams.get("status");
    const membershipId = searchParams.get("membershipId"); 
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    console.log("Payment Status:", status);
    console.log("Membership ID from URL:", membershipId);
    console.log("User ID:", userId);

    useEffect(() => {
        if (status === "success" && userId && membershipId) {
            registerMembership(userId, membershipId);
        } else {
            toast.error("Payment Failed or User Not Found!", { position: "top-right", autoClose: 3000 });
        }
    }, [status, userId, membershipId]);

    const registerMembership = async (userId, membershipId) => {
        try {
            const response = await fetch(
                "https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Members/Register-Membership",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({
                        userId: userId,
                        membershipId: membershipId,
                    }),
                }
            );

            const data = await response.json();
            console.log("Membership Registration Response:", data);

            if (data.status === "200") {
                toast.success("Membership updated successfully!", { position: "top-right", autoClose: 3000 });
            } else {
                throw new Error(data.message || "Failed to update membership.");
            }
        } catch (error) {
            console.error("Membership Update Error:", error);
            toast.error(error.message || "An error occurred while updating membership.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <h2 className="text-2xl font-bold">
                {status === "success" ? "Payment Successful! 🎉 Updating Membership..." : "Payment Failed ❌"}
            </h2>
        </div>
    );
};

export default PaymentSuccess;
