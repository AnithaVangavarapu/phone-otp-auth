import { useSignIn } from "./useSignIn";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button } from "../../commonComponents";
import "./signIn.css";
import { OTPScreen } from "../../components/OTPScreen";
const SignIn = () => {
  const {
    handlePhoneVerification,
    phoneNumber,
    setPhoneNumber,
    showCard,
    otpLength,
    confirm,
    setConfirm,
    timer,
    setTimer,
    sendingOtp,
    setShowCard,
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
          <OTPScreen
            otpLength={otpLength}
            timer={timer}
            setTimer={setTimer}
            confirm={confirm}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            handlePhoneVerification={handlePhoneVerification}
            setConfirm={setConfirm}
            setShowCard={setShowCard}
          />
        )}
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default SignIn;
