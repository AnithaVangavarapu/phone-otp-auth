import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "../commonComponents";
import { ConfirmationResult } from "firebase/auth";
import { useOTPScreen } from "./useOTPScreen";
interface OTPScreenProps {
  otpLength: number;
  confirm: ConfirmationResult | undefined;
  timer: number;
  setTimer: (val: number) => void;
  phoneNumber: string | undefined;
  handlePhoneVerification: () => void;
  setConfirm: (val: ConfirmationResult | undefined) => void;
  setPhoneNumber: (val: string) => void;
  setShowCard: (val: "phoneNumber" | "otpVerification") => void;
}
const OTPScreen = ({
  otpLength,
  handlePhoneVerification,
  confirm,
  setConfirm,
  timer,
  setTimer,
  phoneNumber,
  setPhoneNumber,
  setShowCard,
}: OTPScreenProps) => {
  const {
    error,
    handleVerifyOTP,
    handleKeyDown,
    handleFocusOnNextInput,
    handleInputValueChange,
    handleCancel,
    handleResend,
    otpValues,
    validOtpError,
    resend,
  } = useOTPScreen({
    handlePhoneVerification,
    otpLength,
    timer,
    setTimer,
    confirm,
    setConfirm,
    setPhoneNumber,
    setShowCard,
  });
  return (
    <div className="text-center">
      <h1 className="text-[18px] pb-5 font-medium text-blue-950">
        Verification Code
      </h1>
      <p className="text-[12px] pb-5 font-light">
        Please enter code sent to{" "}
        <span className="text-blue-950 font-medium">{phoneNumber}</span>
      </p>
      {validOtpError && (
        <div className="text-[12px] text-red-500 font-medium pb-5">
          Invalid OTP
        </div>
      )}
      <div className="grid grid-cols-6 gap-2">
        {Array.from({ length: otpLength }).map((_, index) => (
          <input
            value={otpValues[index]}
            onChange={(e) => {
              handleInputValueChange(e.target.value, index);
              if (e.target.value && index < otpLength - 1) {
                handleFocusOnNextInput(index);
              }
            }}
            key={index}
            className="border-b-[2px] border-gray-300 focus:outline-none text-center"
            type="text"
            maxLength={1}
            onKeyDown={(e) => {
              handleKeyDown(e);
            }}
            id={`otp_${index}`}
          />
        ))}
      </div>

      {resend === false ? (
        <div className="mt-2 text-[12px]">{timer}</div>
      ) : (
        <div
          onClick={handleResend}
          className="flex justify-end items-center mt-5"
        >
          <Button
            classname="text-[12px] text-right  text-blue-950 font-medium border-none"
            label="Resend OTP"
            type="button"
          />
          <ChevronRight width={15} />
        </div>
      )}

      <Button
        type="submit"
        label="Verify"
        onClick={(e) => handleVerifyOTP(e)}
        classname={`${
          error ? "cursor-not-allowed" : "cursor-pointer"
        } w-[100%] h-[35px] mt-8 p-1 text-[14px] font-medium bg-blue-950 text-white border-blue-950`}
      />

      <div
        className="flex justify-center items-center text-blue-950 mt-5"
        onClick={handleCancel}
      >
        <ArrowLeft width={15} strokeWidth={3} />
        <Button
          type="button"
          label={` Go back`}
          classname={` cursor-pointer
             p-1 text-[14px] font-medium  border-none`}
        />
      </div>
    </div>
  );
};

export default OTPScreen;
