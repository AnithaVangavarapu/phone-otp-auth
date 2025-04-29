import { useSignIn } from "./useSignIn";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button } from "../../commonComponents";
import "./signIn.css";
import { ArrowLeft, ChevronRight } from "lucide-react";
const SignIn = () => {
  const {
    handlePhoneVerification,
    phoneNumber,
    setPhoneNumber,
    showCard,
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
  } = useSignIn();

  return (
    <div className="flex justify-center  h-screen items-center">
      <div className="border w-[30%] p-8 rounded-md shadow-md border-gray-200">
        {showCard === "phoneNumber" && (
          <div className="w-[100%] text-center">
            <h1 className="text-[18px] pb-5 font-medium text-blue-950">
              Sign In
            </h1>
            <p className="text-[12px] pb-5 font-light">
              Please chose your country and enter number
            </p>
            <PhoneInput
              preferredCountries={["in"]}
              value={phoneNumber}
              onChange={setPhoneNumber}
              placeholder="Enter number"
            />

            <Button
              label={sendingOtp ? "Sending OTP" : "Continue"}
              type="submit"
              onClick={handlePhoneVerification}
              classname={`p-1 mt-10 w-[100%] h-[35px] text-[14px] font-medium bg-blue-950 text-white border-blue-950 cursor-pointer`}
              disable={sendingOtp ? true : false}
            />
          </div>
        )}
        {showCard === "otpVerification" && (
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
        )}
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default SignIn;
