import { useState, useRef, useEffect } from "react";
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
  const [confirm, setConfirm] = useState<ConfirmationResult | undefined>();
  const [timer, setTimer] = useState<number>(60);
  const recaptchaVerifier = useRef<RecaptchaVerifier | null>(null);
  const contextData = useContext<UserContextProps>(UserContext);
  const { isAuthenticate } = contextData;
  const [sendingOtp, setSendingOtp] = useState<boolean>(false);
  const navigate = useNavigate();
  const otpLength = 6;

  //RecaptchaVerifier renders only on intial render
  useEffect(() => {
    if (!recaptchaVerifier.current) {
      recaptchaVerifier.current = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );
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
      navigate("/");
    }
  }, [isAuthenticate]);

  //Sending request for otp
  const handlePhoneVerification = async () => {
    if (phoneNumber === undefined) return;
    setSendingOtp(true);
    const number = "+" + phoneNumber;
    try {
      //checks whether recaaptch verifier initialized or not
      if (!recaptchaVerifier.current) {
        return;
      }
      const response = await signInWithPhoneNumber(
        auth,
        number,
        recaptchaVerifier.current
      );
      setConfirm(response);
      setShowCard("otpVerification");
      setTimer(60);
    } catch (error) {
      console.log("error while recaptchvrifier and requsetig otp", error);
    }
    setSendingOtp(false);
  };

  return {
    handlePhoneVerification,
    phoneNumber,
    setPhoneNumber,
    showCard,
    setShowCard,
    otpLength,
    confirm,
    setConfirm,
    timer,
    setTimer,
    sendingOtp,
  };
};
