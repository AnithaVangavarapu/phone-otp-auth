import { useState, useEffect, useContext } from "react";
import UserContext, { UserContextProps } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { ConfirmationResult } from "firebase/auth";

interface useOTPScreenProps {
  otpLength: number;
  handlePhoneVerification: () => void;
  timer: number;
  setTimer: (value: number) => void;
  confirm: ConfirmationResult | undefined;
  setConfirm: (val: ConfirmationResult | undefined) => void;
  setPhoneNumber: (val: string) => void;
  setShowCard: (val: "phoneNumber" | "otpVerification") => void;
  phoneNumber: string | undefined;
}
export const useOTPScreen = ({
  handlePhoneVerification,
  otpLength,
  timer,
  confirm,
  setTimer,
  setConfirm,
  setPhoneNumber,
  setShowCard,
  phoneNumber,
}: useOTPScreenProps) => {
  const contextData = useContext<UserContextProps>(UserContext);
  const { setIsAuthenticate } = contextData;
  const [otpValues, setOtpValues] = useState<string[]>(
    Array(otpLength).fill("")
  );
  const [validOtpError, setVAlidOtpError] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(true);
  const [resend, setResend] = useState<boolean>(false);
  const navigate = useNavigate();
  const [number, setNumber] = useState<string>("");
  useEffect(() => {
    if (phoneNumber !== undefined) {
      const num = phoneNumber.slice(0, 2) + " " + phoneNumber.slice(2);
      setNumber(num);
    }
  }, [phoneNumber]);

  //Showing OTP expiry time
  useEffect(() => {
    if (timer > 0) {
      setResend(false);
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setResend(true);
    }
  }, [timer]);

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
      navigate("/");
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
    handleInputValueChange,
    handleCancel,
    handleFocusOnNextInput,
    handleResend,
    handleKeyDown,
    handleVerifyOTP,
    otpValues,
    validOtpError,
    error,
    resend,
    number,
  };
};
