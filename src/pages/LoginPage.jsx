import React, { useState } from "react";
import { sendOtp, verifyOtp } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSendOtp = async () => {
        try {
            await sendOtp(phone);
            setOtpSent(true);
            setMessage("OTP sent ✅");
        } catch (error) {
            setMessage("Error sending OTP ❌");
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await verifyOtp(phone, otp);

            // ✅ IMPORTANT: store userId (REQUIRED for Day 13)
            localStorage.setItem("userId", response.data.id);

            // ✅ store phone (already correct)
            localStorage.setItem("phone", phone);

            // ✅ optional: full user object
            localStorage.setItem("user", JSON.stringify(response.data));

            setMessage("Login successful ✅");

            navigate("/profile");

        } catch (error) {
            setMessage("Invalid OTP ❌");
        }
    };

    return (
        <div style={{ width: "300px", margin: "100px auto" }}>
            <h2>Login</h2>

            <input
                type="text"
                placeholder="Enter phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ width: "100%", marginBottom: "10px" }}
            />

            {!otpSent && (
                <button onClick={handleSendOtp}>
                    Send OTP
                </button>
            )}

            {otpSent && (
                <>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        style={{ width: "100%", marginTop: "10px" }}
                    />

                    <button onClick={handleVerifyOtp}>
                        Verify OTP
                    </button>
                </>
            )}

            <p>{message}</p>
        </div>
    );
};

export default LoginPage;