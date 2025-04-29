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
  const otpLength = 6;

  const [confirm, setConfirm] = useState<ConfirmationResult | undefined>();

  const [timer, setTimer] = useState<number>(60);
  const navigate = useNavigate();
  const recaptchaVerifier = useRef<RecaptchaVerifier | null>(null);
  const contextData = useContext<UserContextProps>(UserContext);
  const { isAuthenticate } = contextData;
  const [sendingOtp, setSendingOtp] = useState<boolean>(false);

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
