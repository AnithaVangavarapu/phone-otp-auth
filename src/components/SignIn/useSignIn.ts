import React, { useState } from "react";
import { auth } from "../../FireBase";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
export const useSignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");
  const [showCard, setShowCard] = useState<"phoneNumber" | "otpVerification">(
    "phoneNumber"
  );
  const otpLength = 6;
  const [otpValues, setOtpValues] = useState<string[]>(
    Array(otpLength).fill("")
  );
  const [error, setError] = useState<boolean>(true);
  const [confirm, setConfirm] = useState<ConfirmationResult>();
  const navigate = useNavigate();
  const handlePhoneVerification = async () => {
    console.log(phoneNumber);
    if (phoneNumber === undefined) return;
    const number = "+" + phoneNumber;
    const recaptchVerification = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      { size: "invisible", appVerificationDisabledForTesting: "true" }
    );
    try {
      const response = await signInWithPhoneNumber(
        auth,
        number,
        recaptchVerification
      );
      console.log("otp sent", response);
      setConfirm(response);
      setShowCard("otpVerification");
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputValueChange = (value: string, index: number) => {
    console.log(value, index);
    const updatedOtp = [...otpValues];
    updatedOtp[index] = value;
    setOtpValues(updatedOtp);
    if (value !== "") setError(false);
    else setError(true);
  };
  const handleFocusOnNextInput = (index: number) => {
    const nextInput = document.getElementById(`otp_${index + 1}`);
    if (nextInput) nextInput.focus();
  };
  const handleVerifyOTP = async (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.preventDefault();
    console.log(otpValues);
    const otp = otpValues.join("");
    console.log("sending otp", otp);
    try {
      await confirm?.confirm(otp);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
      e.preventDefault();
    }
  };
  return {
    handlePhoneVerification,
    phoneNumber,
    setPhoneNumber,
    showCard,
    setShowCard,
    otpLength,
    handleInputValueChange,
    otpValues,
    handleVerifyOTP,
    handleKeyDown,
    handleFocusOnNextInput,
    error,
  };
};
