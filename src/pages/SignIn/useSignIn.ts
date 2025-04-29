import React, { useState, useRef, useEffect } from "react";
import { auth } from "../../FireBase";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext, { UserContextProps } from "../../context/userContext";
export const useSignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");
  const [showCard, setShowCard] = useState<"phoneNumber" | "otpVerification">(
    "phoneNumber"
  );
  const otpLength = 6;
  const [otpValues, setOtpValues] = useState<string[]>(
    Array(otpLength).fill("")
  );
  const [validOtpError, setVAlidOtpError] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(true);
  const [confirm, setConfirm] = useState<ConfirmationResult>();
  const [resend, setResend] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const navigate = useNavigate();
  const recaptchaVerifier = useRef<RecaptchaVerifier | null>(null);
  const contextData = useContext<UserContextProps>(UserContext);
  const { isAuthenticate, setIsAuthenticate } = contextData;
  const [sendingOtp, setSendingOtp] = useState<boolean>(false);

  //Showing OTP expiry time
  useEffect(() => {
    if (timer > 0) {
      setResend(false);
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setResend(true);
    }
  }, [timer]);

  //RecaptchaVerifier renders only on intial render
  useEffect(() => {
    if (!recaptchaVerifier.current) {
      recaptchaVerifier.current = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );

      console.log("recaptchaVerification: ", recaptchaVerifier.current);
      recaptchaVerifier.current
        .render()
        .catch((error) => console.log("Recaptcha render Error: ", error));
    }
    return () => {
      if (recaptchaVerifier.current) {
        recaptchaVerifier.current.clear();
        recaptchaVerifier.current = null;
      }
    };
  }, []);

  //Prevents authenticate user navigates to login page
  useEffect(() => {
    if (isAuthenticate) {
      navigate("/home");
    }
  }, [isAuthenticate]);

  //Sending request for otp
  const handlePhoneVerification = async () => {
    console.log("apicalling....");
    console.log(phoneNumber);
    if (phoneNumber === undefined) return;
    setSendingOtp(true);
    const number = "+" + phoneNumber;
    console.log("number:", number);

    try {
      if (!recaptchaVerifier.current) {
        console.log("Recaptcha verifier not initialzed");
        return;
      }
      const response = await signInWithPhoneNumber(
        auth,
        number,
        recaptchaVerifier.current
      );
      console.log("otp sent", response);
      setConfirm(response);
      setShowCard("otpVerification");
      setTimer(60);
    } catch (error) {
      console.log("error while recaptchvrifier and requsetig otp", error);
    }
    setSendingOtp(false);
  };

  //handles otp input values
  const handleInputValueChange = (value: string, index: number) => {
    console.log(value, index);
    const updatedOtp = [...otpValues];
    updatedOtp[index] = value;
    setOtpValues(updatedOtp);
    if (value !== "") setError(false);
    else setError(true);
  };

  // jump to next input after filling current input in otp inputs
  const handleFocusOnNextInput = (index: number) => {
    const nextInput = document.getElementById(`otp_${index + 1}`);
    if (nextInput) nextInput.focus();
  };

  //Confirming otp verification  by sending user enterd otp
  const handleVerifyOTP = async (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.preventDefault();
    console.log(otpValues);
    const otp = otpValues.join("");
    console.log("sending otp", otp);
    try {
      await confirm?.confirm(otp);
      setVAlidOtpError(false);
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticate(true);
      navigate("/home");
      setTimer(0);
    } catch (error) {
      setVAlidOtpError(true);
      setIsAuthenticate(false);
      console.log("Error while otp confirmation", error);
    }
  };

  //Ensure Otp input values recieve digit and backspace
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
      e.preventDefault();
    }
  };

  //goback functionality
  const handleCancel = () => {
    setConfirm(undefined);
    setPhoneNumber("");
    setShowCard("phoneNumber");
    setTimer(0);
  };

  //Resending otp to user
  const handleResend = () => {
    console.log("Resending otp...");
    handlePhoneVerification();
    setTimer(60);
    setResend(false);
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
    handleCancel,
    resend,
    timer,
    handleResend,
    validOtpError,
    sendingOtp,
  };
};
