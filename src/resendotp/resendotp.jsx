import React, { useState, useEffect } from "react";
import styles from "./email.module.css";
import quizifailogo from "../assets/Images/images/logo1.png";
import butterflyImg from "../assets/Images/images/butterfly1.png";
import icon1 from "../assets/Images/images/mdi_gmail.png";
import icon2 from "../assets/Images/images/clarity_mobile-line.png";
import icon3 from "../assets/Images/images/logos_google-gmail.png";
import img2 from "../assets/Images/images/img2.png";
import logo2 from "../assets/Images/images/narmtech-logo.png";
import closeIcon from "../assets/Images/images/gmail/closeIcon.png";
import { FaSyncAlt } from "react-icons/fa";
import { BsFillVolumeUpFill, BsFillVolumeMuteFill } from "react-icons/bs";
import forgotPasswordIcon from "../assets/Images/images/back1.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
//import img from "next/image";
//import Head from "next/head";
//import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import { useMediaQuery } from "@mui/material";

const ResendOTP = () => {
  const [loginMethod, setLoginMethod] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [isContentSelected, setIsContentSelected] = useState(false);
  const [showGmailPopup, setShowGmailPopup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const [showResetOTP, setShowResetOTP] = useState(false);
  const [showResendOTPForm, setShowResendOTPForm] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const router = useRouter();
  const [emailError, setEmailError] = useState(false);

  const [resendOption, setResendOption] = useState("");

  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://quizifai.com:8010/rsd_otp_or_email",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Resend_option: resendOption,
            mobile: emailOrMobile,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Reset form fields and show success message
        setResendOption("");
        setEmailOrMobile("");
      } else {
        // Show error message
        setMessage(data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  const validateEmail = () => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = () => {
    return /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(password);
  };

  const handleLoginMethodChange = (method) => {
    setLoginMethod(method);
    setShowPassword(false);
    setIsContentSelected(true);
    if (method === "gmail") {
      setShowGmailPopup(true);
    }
  };

  const handleBlur = () => {
    validateEmail();
  };

  const handleClosePopup = () => {
    setShowGmailPopup(false);
    setLoginMethod(null);
    setIsContentSelected(null);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const handleGoBack = () => {
    setShowForgotPassword(false);
  };

  const handleForgotPasswordSubmit = () => {
    setShowThankYou(true);
  };

  const handleResendOTP = () => {
    console.log("Resending OTP...");
    setShowResendOTPForm(true);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        router.push("/dashboard");
      } else {
        setErrorMessage(responseData.detail);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("An error occurred while logging in.");
    }
  };

  return (
    <div className={styles.container}>
      {/*<Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
  </Head>*/}
      <div className={styles.mainContent}>
        <div className={styles.leftSection}>
          <div className={styles.logo}>
            <img src={quizifailogo} alt="Logo" width={300} height={308} />
          </div>
        </div>
        <div className={styles.rightSection}>
          {/* Mobile content */}

          <div className={styles.mobileContent} style={{ marginTop: "70px" }}>
            <p
              style={{
                fontSize: "30px",
                fontWeight: 700,
                color: "#454B60",
                marginRight: "210px",
              }}
            >
              Resend OTP
            </p>
            {/* <div className={styles.inputWrapper}>
              <div
                className={styles.inputWithIcon}
                style={{ marginTop: "20px", marginRight: "90px" }}
              >
                <TextField
                  id=""
                  label=""
                  type="text"
                  variant="outlined"
                  className={styles.inputField}
                  style={{ width: "325px", height: "50px" }}
                  InputLabelProps={{
                    style: { fontFamily: "poppins" },
                  }}
                  InputProps={{
                    style: {
                      // backgroundImage: `url('/images/contact/first.png')`,
                      backgroundSize: "19px 16px",
                      backgroundPosition: "10px center",
                      backgroundRepeat: "no-repeat",
                      width: "325px",
                      height: "50px",
                      backgroundColor: "#F0EFFF",
                      border: "none",
                      fontFamily: "poppins",
                      paddingLeft: "10px",
                      borderRadius: "10px",
                    },
                  }}
                  value={resendOption}
                  onChange={(e) => setResendOption(e.target.value)}
                />
              </div>
            </div> */}
            <select
              className={styles.inputField}
              style={{ width: "325px", height: "50px" }}
              InputLabelProps={{
                style: { fontFamily: "poppins" },
              }}
              InputProps={{
                style: {
                  // backgroundImage: `url('/images/contact/first.png')`,
                  backgroundSize: "19px 16px",
                  backgroundPosition: "10px center",
                  backgroundRepeat: "no-repeat",
                  width: "325px",
                  height: "50px",
                  backgroundColor: "#F0EFFF",
                  border: "none",
                  fontFamily: "poppins",
                  paddingLeft: "10px",
                  borderRadius: "10px",
                },
              }}
              value={resendOption}
              onChange={(e) => setResendOption(e.target.value)}
            >
              <option value="">Select Option</option>
              <option value="email">Email</option>
              <option value="mobile">Mobile</option>
            </select>
            <div className={styles.inputWrapper}>
              <div
                className={styles.inputWithIcon}
                style={{ marginTop: "20px", marginRight: "90px" }}
              >
                <TextField
                  id="number"
                  label={resendOption === "email" ? "Email" : "Mobile"}
                  type="tel"
                  variant="outlined"
                  className={styles.inputField}
                  style={{ width: "325px", height: "50px" }}
                  InputLabelProps={{
                    style: { fontFamily: "poppins" },
                  }}
                  InputProps={{
                    style: {
                      // backgroundImage: `url('/images/contact/first.png')`,
                      backgroundSize: "19px 16px",
                      backgroundPosition: "10px center",
                      backgroundRepeat: "no-repeat",
                      width: "325px",
                      height: "50px",
                      backgroundColor: "#F0EFFF",
                      border: "none",
                      fontFamily: "poppins",
                      paddingLeft: "10px",
                      borderRadius: "10px",
                    },
                  }}
                  value={emailOrMobile}
                  onChange={(e) => setEmailOrMobile(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.inputWrapper}>
              {/* <div
                className={styles.inputWithIcon}
                style={{
                  marginTop: "20px",
                  marginRight: "90px",
                  marginBottom: "40px",
                }}
              >
                <TextField
                  id="number"
                  label="OTP"
                  type="text"
                  variant="outlined"
                  className={styles.inputField}
                  style={{ width: "325px", height: "50px" }}
                  InputLabelProps={{
                    style: { fontFamily: "poppins" },
                  }}
                  InputProps={{
                    style: {
                      // backgroundImage: `url('/images/contact/first.png')`,
                      backgroundSize: "19px 16px",
                      backgroundPosition: "10px center",
                      backgroundRepeat: "no-repeat",
                      width: "325px",
                      height: "50px",
                      backgroundColor: "#F0EFFF",
                      border: "none",
                      fontFamily: "poppins",
                      paddingLeft: "10px",
                      borderRadius: "10px",
                    },
                  }}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div> */}
              {/* <div className={styles.inputWrapper}>
                <div
                  className={styles.inputWithIcon}
                  style={{ marginRight: "87px" }}
                >
                  <TextField
                    id="password"
                    label="Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    variant="outlined"
                    className={styles.inputField}
                    style={{ width: "328px", height: "50px" }}
                    InputLabelProps={{
                      style: { fontFamily: "poppins" },
                    }}
                    InputProps={{
                      style: {
                        backgroundSize: "19px 16px",
                        backgroundPosition: "10px center",
                        backgroundRepeat: "no-repeat",
                        width: isMobile ? "100%" : "328px",
                        height: "50px",
                        backgroundColor: "#F0EFFF",
                        border: "none",
                        fontFamily: "poppins",
                        paddingLeft: "10px",
                        borderRadius: "10px",
                      },
                      endAdornment: (
                        <div
                          className={styles.passwordToggleIcon}
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                      ),
                    }}
                    type={showPassword ? "text" : "password"}
                  />
                </div>

                <div className={styles.inputWrapper}>
                  <div
                    className={styles.inputWithIcon}
                    style={{ marginTop: "20px", marginRight: "87px" }}
                  >
                    <TextField
                      id="password"
                      label="Confirm Password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      variant="outlined"
                      className={styles.inputField}
                      style={{ width: "328px", height: "50px" }}
                      InputLabelProps={{
                        style: { fontFamily: "poppins" },
                      }}
                      InputProps={{
                        style: {
                          backgroundSize: "19px 16px",
                          backgroundPosition: "10px center",
                          backgroundRepeat: "no-repeat",
                          width: isMobile ? "100%" : "328px",
                          height: "50px",
                          backgroundColor: "#F0EFFF",
                          border: "none",
                          fontFamily: "poppins",
                          paddingLeft: "10px",
                          borderRadius: "10px",
                        },
                        endAdornment: (
                          <div
                            className={styles.passwordToggleIcon}
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </div>
                        ),
                      }}
                      type={showPassword ? "text" : "password"}
                    />
                    </div>
                    </div>
                  </div> */}
            </div>
          </div>

          <div
            className={styles.checkboxContainer}
            style={{ marginTop: "100px" }}
          >
            <span>
              <input
                type="checkbox"
                id="termsCheckbox"
                className={styles.checkboxInput}
              />
              <label
                htmlFor="termsCheckbox"
                className={styles.checkboxLabel}
              ></label>
            </span>
            <span className={styles.termsText}>
              I agree with the terms and conditions
            </span>
          </div>
          <p>{message}</p>
          <button
            onClick={handleSubmit}
            className={styles.loginButton}
            style={{ marginRight: "75px" }}
          >
            send
          </button>

          {errorMessage && (
            <p className={styles.displayError}>{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResendOTP;
