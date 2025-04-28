import { useSignIn } from "./useSignIn";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button } from "../../commonComponents";

const SignIn = () => {
  const {
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
  } = useSignIn();
  return (
    <div>
      <div id="recaptcha-container" style={{ display: "none" }}></div>
      {showCard === "phoneNumber" && (
        <div>
          <PhoneInput
            preferredCountries={["in"]}
            value={phoneNumber}
            onChange={setPhoneNumber}
            placeholder="Enter number"
          />
          <Button
            label="Continue"
            type="submit"
            onClick={handlePhoneVerification}
          />
        </div>
      )}
      {showCard === "otpVerification" && (
        <div>
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
              className="border"
              type="text"
              maxLength={1}
              onKeyDown={(e) => handleKeyDown(e)}
              id={`otp_${index}`}
            />
          ))}
          <Button
            type="submit"
            label="Verify"
            onClick={(e) => handleVerifyOTP(e)}
            classname={`${error ? "cursor-not-allowed" : "cursor-pointer"}`}
          />
        </div>
      )}
    </div>
  );
};

export default SignIn;
