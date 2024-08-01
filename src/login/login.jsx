import React, { useState, useEffect,useContext } from "react";
import styles from "../signup/email.module.css";
import quizifailogo from "../../src/assets/Images/images/home/home.jpg";
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
import TextField from "@mui/material/TextField";
import googleLogo from "../assets/Images/images/gmail/google.png";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbarhome from "../navbarhome/navbarhome";
// import { AuthContext } from "../Authcontext/AuthContext.jsx"


const LoginPage = () => {
  const [loginMethod, setLoginMethod] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [isContentSelected, setIsContentSelected] = useState(false);
  const [showGmailPopup, setShowGmailPopup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const [forgeotmobile, setforgeotmobile] = useState(false);
  const [showResetOTP, setShowResetOTP] = useState(false);
  const [showResendOTPForm, setShowResendOTPForm] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  // const router = useRouter();
  const [emailError, setEmailError] = useState(false);
  const [loginOption, setloginOption] = useState("");
  const [platform, setplatform] = useState("")
  const [Forgotmassage, setForgotmassage] = useState("")
  const [Forgotmobile, setForgotmobile] = useState("")
  // const { login } = useContext(AuthContext)
  const validateEmail = () => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = () => {
    return /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(password);
  };
  const handleMobileChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      setMobile(inputValue);
    }
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
  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
    setErrorMessage('')
  };

  const handleGoBack = () => {
    setShowThankYou(false);
  };
  const handleGoBack1 = () => {
    setShowForgotPassword(false);
  };
  // const handleForgotPasswordSubmit = () => {
  //   setShowThankYou(true);
  // };

  const handleResendOTP = () => {
    console.log("Resending OTP...");
    setShowResendOTPForm(true);
  };
  const navigate = useNavigate();
  // const handleLogin = async (loginOption, email, mobile, password) => {
  //   // if (!termsChecked) {
  //   //   setErrorMessage("Please agree to the terms and conditions");
  //   //   return;
  //   // }
  //   try {
  //     console.log("email - ", email);
  //     const response = await fetch(`https://quizifai.com:8010/login`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         login_option: loginMethod,
  //         email_or_mobile: loginMethod === "email" ? email : mobile,
  //         password: password,
  //       }),
  //     });
  //     const responseData = await response.json();
  //     console.log("API Response:", responseData);
  //     console.log(responseData);

  //     console.log("User ID:", responseData[0].user_id[0]);
  //     console.log("User Name:", responseData[0].user_name);
     
  //     // Store user_id and user_name in localStorage
  //     localStorage.setItem('user_id', responseData[0].user_id[0]);
  //     localStorage.setItem('user_name', responseData[0].user_name)
    

  //     {
  //       /*const userId = responseData[0].user_id[0]; 
  //     console.log('User ID:', userId);
      
     
  //     sessionStorage.setItem('userId', userId);*/
  //     }

  //     if (response.ok) {
  //       if (
  //         Array.isArray(responseData) &&
  //         responseData[0] &&
  //         responseData[0].response === "fail"
  //       ) {
  //         setErrorMessage(
  //           responseData[0].message ||
  //             "An unknown error occurred while logging in."
  //         );
  //         console.error(errorMessage);
  //       } else if (
  //         typeof responseData === "object" &&
  //         responseData.response === "fail"
  //       ) {
  //         setErrorMessage(
  //           responseData.data || "An unknown error occurred while logging in."
  //         );
  //         console.error(errorMessage);
  //       }else if (
     
  //         responseData.response === "fail" && responseData.data ==="Mobile Number is incorrect or account doesn't exist pls sinup." ) {
  //         setErrorMessage(
  //           responseData.data || "Mobile Number is incorrect or account doesn't exist pleass signup."
  //         );
  //         console.error(errorMessage);
  //       }  else if (responseData.response === "success") {
  //         // const userId = responseData.data.user_id;
  //         // sessionStorage.setItem('userId', userId);

  //         // const userName = responseData.response.user_name.user_id;
  //         // sessionStorage.setItem('userName', userName);
  //         // // sessionStorage.setItem('userid', userId);
  //         // navigate("/dashboard");
          
          
  //       } else {
  //         setErrorMessage("");
  //         navigate("/dashboard");
  //         console.log("Login successful!");
  //       }
  //     } else if (responseData.data === "Mobile Number is incorrect or account doesn't exist pls sinup.") {
  //       setErrorMessage("Mobile Number is incorrect or account doesn't exist. Please sign up.");
  //     } else {
  //       setErrorMessage(
  //         responseData.message || "An unknown error occurred while logging in."
  //       );
  //       console.error(errorMessage);
  //     }
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //     setErrorMessage("An error occurred while logging in.");
  //   }
  // };
  const handleLogin = async (loginOption, email, mobile, password) => {
    if (!password) {
      setErrorMessage("Please enter your password");
      return;
    }
    try {
      // console.log("email - ", email);
      // console.log("password before storing:", password);

      const platform = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      ? "mobile" // If any of the identifiers are found, return 'Mobile'.
      : "Web";
      const response = await fetch(`https://quizifai.com:8010/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login_option: loginOption,
          email_or_mobile: loginOption === "email" ? email : mobile,
          password: password,
          platform:platform,
        }),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        if (responseData.response === "success") {
          const userId = responseData.data && responseData.data[0] && responseData.data[0].user_id;
        const userRole = responseData.data && responseData.data[0] && responseData.data[0].user_role;
        if (userId && userRole) {
          // login({ userId, userRole });
          localStorage.setItem('user_id', userId);
          localStorage.setItem('user_role', userRole);
          localStorage.setItem('password', password);
          setErrorMessage("");
          navigate("/dashboard");
            console.log("Login successful!");
          } else {
            setErrorMessage("An unknown error occurred while logging in.");
          }
        } else if (responseData.response === "fail") {
          let errorMessage = responseData.response_message;
          if (responseData.response_message === "Password is incorrect.Please try again.") {
            errorMessage = "Password is incorrect. Please try again.";
          } else if (responseData.response_message === "Email is not valid.Please check your email") {
            errorMessage = "Email is not valid.Please check your email";
          } else if (responseData.response_message === "Mobile Number is incorrect or account doesn't exist pls sinup.") {
            errorMessage = "Mobile Number is not valid.Please check your number";
          } else if (responseData.response_message === "Email is not verified, please verify your email") {
            errorMessage = "Email is not verified, please verify your email";
          } else if (responseData.response_message === "Registration is not yet completed.") {
            errorMessage = "Registration is not yet completed.";
          } else if (responseData.response_message === "Mobile Number is not valid.Please check your number") {
            errorMessage = "Mobile Number is not valid.Please check your number";
          } else if (responseData.response_message === "Email is incorrect or account doesn't exist.") {
            errorMessage = "Email is incorrect or account doesn't exist.";
          } else if (responseData.response_message === "Your login request is being processed. Please wait a moment while we verify your account details.") {
            errorMessage = "Your login request is being processed. Please wait a moment while we verify your account details.";
          }else if (responseData.response_message === "Please click here to complete your registration and activate your account.") {
            errorMessage = "Please click here to complete your registration and activate your account.";
          }else if (responseData.response_message === "Mobile Number is incorrect or account doesn't exist. Please sign up.") {
            errorMessage = "Mobile Number is incorrect or account doesn't exist. Please sign up.";
          }else if (responseData.response_message === "Mobile Number is not valid. Please check your number") {
            errorMessage = "Mobile Number is not valid. Please check your number";
          }else if (responseData.response_message === "Password is incorrect. Please try again.") {
            errorMessage = "Password is incorrect. Please try again.";
          }else if (responseData.response_message === "You've chosen mobile as your login method, so please log in using your mobile number.") {
            errorMessage = "You've chosen mobile as your login method, so please log in using your mobile number.";
          }

          setErrorMessage(errorMessage);
        } else {
          setErrorMessage("An unknown error occurred while logging in.");
        }
      } else {
        setErrorMessage(responseData.message || "An unknown error occurred while logging in.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while logging in.");
    }
  };
  
  
  
  const validateEmail1 = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    if (validateEmail(email)) {
      setErrorMessage('');
    } else {
      setErrorMessage('Email is not valid.');
    }
  };
  const handleForgotPasswordSubmit = () => {
    const requestBody = JSON.stringify({
      Forogot_option: loginMethod,
      email_or_mobile: loginMethod === "email" ? email : mobile,
    });

    fetch("https://quizifai.com:8010/forgotpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: requestBody,
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data.response === "success") {
        const userId = data.data[0]?.user_id;
        if (data.response_message === "OTP Succuessfully Sent") {
          navigate("/resetpasswordmobile", { state: { userId,mobile } });
        } else if (data.response_message === "OTP Sent Successfully,Please reset your password") {
          navigate("/resetpassword", { state: { userId,email} });
        }
      } else {
        setForgotmassage(data.response_message);
        setForgotmassage(data.output);
      }
    })
    .catch((error) => {
      console.error("Error occurred:", error);
    });
  };


  const handleEmailChange1 = (e) => {
    const value = e.target.value.trim().toLowerCase();
    setEmail(value);
  };
  // const handleMobileChange = (event) => {
  //   setMobile(event.target.value);
  // };
  const handleBackToDashboard = () => {
    navigate("/signup");
  };
  return (
    <div>
        <Navbarhome/>
      <div className="container" style={{display:"flex"}}>
        <div className={styles.leftSection}>
          <div className={styles.logo1}>
            <img src={quizifailogo} alt="Logo"  width={1000} height={1000}
               style={{marginTop:"20px"}}
            />
          </div>
        </div>
        <div className={styles.rightSection}>
          {!showForgotPassword ? (
            <>
              <div className={styles.loginHeader}>
                <h1 className={styles.loginTitle}>Login</h1>
                {/* <p className={styles.loginDescription}>
                  Login by using the method you registered
                </p> */}
              </div>
              <div className={styles.totalBox1}>
              <div className={styles.formContainer1}>
              {/* <div className={styles.toggleOptions}>
                <label className={styles.toggleLabel}>
                  <input
                    type="radio"
                    name="contactMethod"
                    className={`${styles.toggleRadio} ${styles.greyScale}`}
                    value="email"
                    checked={loginMethod === "email"}
                    onChange={() => handleLoginMethodChange("email")}
                  />
                  <div className={styles.icon1}>
                    <img src={icon1} alt="Logo" width={24} height={24} />
                  </div>
                  Email
                </label>

                <label className={styles.toggleLabel}>
                  <input
                    type="radio"
                    name="contactMethod"
                    className={`${styles.toggleRadio} ${styles.greyScale}`}
                    value="mobile"
                    checked={loginMethod === "mobile"}
                    onChange={() => handleLoginMethodChange("mobile")}
                  />
                  <div className={styles.icon2}>
                    <img src={icon2} alt="Logo" width={30} height={30} />
                  </div>
                  Mobile
                </label>

                {/*<label className={styles.toggleLabel}>
                  <input
                    type="radio"
                    name="contactMethod"
                    className={`${styles.toggleRadio} ${styles.greyScale}`}
                    value="gmail"
                    checked={loginMethod === "gmail"}
                    onChange={() => handleLoginMethodChange("gmail")}
                  />
                  <div className={styles.icon3}>
                    <img src={icon3} alt="Logo" width={22} height={17} />
                  </div>
                  Gmail
                </label>
          */}
              {/* </div>  */}
              <div className={styles.toggleOptions}>
                    <div
                      className={`${styles.toggleLabel} ${
                        loginMethod === "email" ? styles.selected : ""
                      }`}
                      onClick={() => handleLoginMethodChange("email")}
                    >
                      Email
                    </div>
                    <div
                      className={`${styles.toggleLabel} ${
                        loginMethod === "mobile" ? styles.selected : ""
                      }`}
                      onClick={() => handleLoginMethodChange("mobile")}
                    >
                      Mobile
                    </div>
                    <div
                      className={styles.selectedLine}
                      style={{ left: loginMethod === "mobile" ? "50%" : "0" }}
                    />
                  </div>

              {/*  email content */}
              {loginMethod === "email" && (
                <div className={styles.emailContent}>
                  <div className={styles.inputContainer}>
                    <div className={styles.inputWrapper}>
                      <div
                        className={styles.inputWithIcon}
                        style={{ marginTop: "20px" }}
                      >
                        <TextField
                          id="email"
                          label="Email"
                          required
                          value={email}
                          onChange={handleEmailChange1}
                          variant="outlined"
                          className={styles.inputField}
                          style={{ width: "325px", height: "50px" }}
                          InputLabelProps={{
                            style: { fontFamily: "poppins" },
                          }}
                          InputProps={{
                            style: {
                              // backgroundImage: `url('/images/email/mail.png')`,
                              backgroundSize: "19px 16px",
                              backgroundPosition: "295px center",
                              backgroundRepeat: "no-repeat",
                              width: "325px",
                              height: "50px",
                              backgroundColor: "white",
                              border: "none",
                              fontFamily: "poppins",
                              paddingLeft: "0px",
                              borderRadius: "10px",
                            },
                            endAdornment: (
                              <div
                                className={styles.passwordToggleIcon}
                               
                                style={{ color: "#A7A3FF",cursor:"pointer",position:"relative",left:"10px" }}
                              >
                                <img src="images/email/mail.png" alt="" />
                              </div>
                            ),
                            autoComplete: "off",
                          }}
                        />
                      </div>
                    </div>

                    <div className={styles.inputWrapper}>
                      <div
                        className={styles.inputWithIcon}
                        style={{ marginRight: "87px" }}
                      >
                        <TextField
                          id="password1"
                          label="Password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
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
                              backgroundColor: "white",
                              border: "none",
                              fontFamily: "poppins",
                              paddingLeft: "0px",

                              borderRadius: "10px",
                            },
                            endAdornment: (
                              <div
                                className={styles.passwordToggleIcon}
                                onClick={togglePasswordVisibility}
                                style={{ color: "#A7A3FF",cursor:"pointer" }}
                              >
                                {showPassword ? <FaEye/> : <FaEyeSlash />}
                              </div>
                            ),
                            autoComplete: "new-password",
                          }}
                          type={showPassword ? "text" : "password"}
                        />
                      </div>

                      <div
                        className={styles.forgotPassword}
                        onClick={handleForgotPasswordClick}
                       
                      >
                        Forgot Password?
                      </div>
                    </div>
                  </div>

                  {/*<div
                    className={styles.captcha}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div
                      style={{
                        width: "145px",
                        height: "20px",
                        borderRadius: "20px",
                        border: "1px solid #223F80",
                        padding: "10px",
                        marginRight: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                        Captcha
                      </span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ cursor: "pointer" }}>
                        <FaSyncAlt size={12} />
                      </div>

                      <div style={{ cursor: "pointer" }}>
                        {soundOn ? (
                          <BsFillVolumeUpFill
                            size={18}
                            onClick={() => setSoundOn(!soundOn)}
                          />
                        ) : (
                          <BsFillVolumeMuteFill
                            size={20}
                            onClick={() => setSoundOn(!soundOn)}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div
                    className={styles.captchaText}
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      alignItems: "center",
                      marginRight: "30px",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Type the word above"
                      style={{
                        width: "240px",
                        height: "25px",
                        backgroundColor: "#F0EFFF",
                        borderRadius: "5px",
                        padding: "5px",
                        fontFamily: "Poppins",
                        textAlign: "left",
                        border: "none",
                      }}
                    />

                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        backgroundColor: "#223F80",
                        marginLeft: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      <span
                        style={{
                          color: "white",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        ✓
                      </span>{" "}
                    </div>
                      </div>*/}
                </div>
              )}

              {/* Mobile content */}
              {loginMethod === "mobile" && (
                <div className={styles.mobileContent}>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#454B60",
                      marginRight: "210px",
                    }}
                  >
                  </p>
                  <div className={styles.inputWrapper}>
                    <div
                      className={styles.inputWithIcon}
                      style={{ marginTop: "20px", marginRight: "90px" }}
                    >
                      <TextField
                        id="number"
                        label="Mobile Number"
                        type="tel"
                        required
                        inputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9]*", 
                        }}
                        value={mobile}
                        // onChange={(e) => {
                        //   
                        //   setMobile(e.target.value);
                        // }}
                        onChange={handleMobileChange}
                        // onChange={(e) => 
                        //   handleMobileChange(e)
                        //   setMobile(e.target.value)}
                        variant="outlined"
                        className={styles.inputField}
                        style={{ width: "325px", height: "50px" }}
                        InputLabelProps={{
                          style: { fontFamily: "poppins" },
                        }}
                        InputProps={{
                          style: {
                            backgroundImage: `url('/images/mobile/mob.png')`,
                            backgroundSize: "10px 19px",
                            backgroundPosition: "295px center",
                            backgroundRepeat: "no-repeat",
                            width: "325px",
                            height: "50px",
                            backgroundColor: "white",
                            border: "none",
                            fontFamily: "poppins",
                            paddingLeft: "0px",
                            borderRadius: "10px",
                          },
                          autoComplete: "off",
                        }}
                      />
                      
                    </div>
                  </div>
                  <div className={styles.inputWrapper}>
                    <div
                      className={styles.inputWithIcon}
                      style={{
                        marginTop: "20px",
                        marginRight: "90px",
                        marginBottom: "0px",
                      }}
                    >
                      <TextField
                        id="password2"
                        label="Password"
                        type="text"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                            backgroundColor: "white",
                            border: "none",
                            fontFamily: "poppins",
                            paddingLeft: "0px",
                            borderRadius: "10px",
                          },
                          endAdornment: (
                            <div
                              className={styles.passwordToggleIcon1}
                              onClick={togglePasswordVisibility1}
                              style={{ color: "#A7A3FF" ,cursor:"pointer"}}
                            >
                              {showPassword1 ? < FaEye/> : <FaEyeSlash />}
                            </div>
                          ),
                          type: showPassword1 ? "text" : "password",
                          autoComplete: "new-password",
                        }}
                      />
                    </div>
                    <div
                        className={styles.forgotPassword}
                        onClick={handleForgotPasswordClick}
                      >
                        Forgot Password?
                      </div>
                  </div>
                </div>
              )}

              {/* Gmail content */}
              {loginMethod === "gmail" && (
                <div className={styles.gmailPopup}>
                  <img
                    src={closeIcon}
                    alt="Close"
                    className={styles.closeButton}
                    onClick={handleClosePopup}
                  />

                  <div className={styles.popupLogo}>
                    <img src={googleLogo} alt="Google Logo" />
                  </div>
                  <div className={styles.signInText}>Sign in</div>
                  <div className={styles.googleAccountText}>
                    with your Google Account
                  </div>
                  <div className={styles.inputBoxContainer}>
                    <div className={styles.placeholderBox}>Email or phone</div>
                    <input
                      type="text"
                      placeholder=""
                      className={styles.inputBox}
                    />
                  </div>
                  <div className={styles.inputBoxContainer}>
                    <div className={styles.placeholderBox}>Password</div>
                    <input
                      type="password"
                      placeholder=""
                      className={styles.inputBox}
                    />
                  </div>

                  <div className={styles.forgotTextContainer}>
                    <div>Forgot Email?</div>
                    <div>Forgot Password</div>
                  </div>
                  <div className={styles.privacyText}>
                    Not your computer? Use Guest mode to sign in privately.
                  </div>
                  <div className={styles.learnMoreText}>Learn more</div>
                  <div className={styles.buttonContainer}>
                    <div className={styles.createAccountText}>
                      Create account
                    </div>
                    <button className={styles.nextButton}>Next</button>
                  </div>
                </div>
              )}

              <p
                className={`${styles.signUpText} ${
                  !isContentSelected || loginMethod === "gmail"
                    ? styles.withMarginTop
                    : ""
                }`}
               
              >
                Don't have an account yet?{" "}
                <span className={styles.diffColor}
                onClick={handleBackToDashboard}>Sign up</span>{" "}
              </p>
              {/* <div className={styles.checkboxContainer}>
              <input
                  type="checkbox"
                  id="termsCheckbox"
                  className={styles.checkboxInput1}
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                  // checked={termsChecked}
                  // onChange={() => setTermsChecked(!termsChecked)}
                />
            
             
                <span className={styles.termsText}>
                  I agree with the terms and conditions
                </span>
              </div> */}
          {/* <div className={styles.checkbox1}>
                <input
                  type="checkbox"
                  id="termsCheckbox"
                  className={styles.checkboxInput1}
                  style={{
                    width: "15px",
                    height: "15px",
                  }}
                  checked={termsChecked}
                  onChange={() => setTermsChecked(!termsChecked)}
                />
                <span className={styles.span}>
                  {" "}
                  I agree with the   <a className={styles.terms} href="/termsandconditions">
                        terms and conditions
                      </a>
                </span>
                {/* <p className={styles.span2} > and Please read over children police</p> */}
             
                {/* <label
                  htmlFor="termsCheckbox"
                  className={styles.checkboxLabel}
                  style={{ marginRight: "80px", marginLeft: "20px"  }}
                >
                  I agree with the terms and conditions
                </label> */}
              {/* </div>  */}
              
              <button
                onClick={() =>
                  handleLogin(loginMethod, email, mobile, password)
                }
                className={styles.loginButton}
              >
                Login
              </button>
              </div>
              {errorMessage && (
                <>
                  {console.log("Error message:", errorMessage)}
                  <p className={styles.displayError}>{errorMessage}</p>
                </>
              )}
              </div>
              {/* {loginMethod === "mobile" && (
                <button
                  onClick={handleResendOTP}
                  className={styles.resendButton}
                >
                  Resend OTP
                </button>
              )} */}
            
            </>
          ) : (
            <>
              {/* Content for forgot password */}
              {!showThankYou ? (
                <div className={styles.forgotPasswordContent}>
                  {/* Forgot password form */}
                  <div
                    className={styles.forgotPasswordContent}
                    styles={{ marginLeft: "300px" }}
                  >
                    <div className={styles.forgotPasswordHeader}>
                      <div
                        className={styles.goBackButton}
                        onClick={handleGoBack1}
                      >
                        <img
                          src={forgotPasswordIcon}
                          alt="Go Back"
                          width={12}
                          height={17}
                        />
                        <span>Go Back</span>
                      </div>
                    </div>
                    <div className={styles.forgotPasswordText}>
                      <p
                        className={styles.firstParagraph}
                        style={{
                          color: "#454B60",
                          fontSize: "30px",
                          fontWeight: 700,
                        }}
                        >
                        Forgot Password
                      </p>
                      
                      <p
                        className={styles.secondParagraph}
                        style={{
                          color: "#454B60",
                          fontSize: "16px",
                          fontWeight: 700,
                        }}
                      >
                        Reset using {loginMethod === "email" && (<span>email</span>)} {loginMethod === "mobile" && (<span>mobile</span>)}
                      </p>
                        
                      <div className={styles.emailinputbox}>
                      {loginMethod === "email" && (
                      <div
                        className={styles.inputWithIcon1}
                        // style={{ marginTop: "20px", marginRight: "90px" }}
                      >
                        <input
                          type="text"
                          placeholder="Enter Email"
                          className={styles.inputField1}
                          style={{
                            backgroundImage: `url('/images/email/mail.png')`,
                            backgroundSize: "19px 16px",
                            backgroundPosition: "10px center",
                            backgroundRepeat: "no-repeat",
                            width: "325px",
                            height: 40,
                            backgroundColor: "#F0EFFF",
                            border: "none",
                            fontFamily: "poppins",
                          padding:"10px",
                          paddingLeft:"35px",
                            borderRadius: "10px",
                          }}
                          value={email}
                          onChange={handleEmailChange}
                          readOnly
                        />
                      </div>
                        )}
                      {/* <p
                        className={styles.orText}
                        style={{
                          marginLeft: "140px",
                          color: "#454B60",
                          fontSize: "16px",
                          fontWeight: 700,
                        }}
                      >
                        OR
                      </p> */}
                       {loginMethod === "mobile" && (
                      <div
                        className={styles.inputWithIcon1}
                        // style={{ marginTop: "20px", marginRight: "90px" }}
                      >
                        <input
                          type="text"
                          placeholder="Mobile Number"
                          className={styles.inputField1}
                          style={{
                            backgroundImage: `url('/images/mobile/mob.png')`,
                            backgroundSize: "14px 24px",
                            backgroundPosition: "10px center",
                            backgroundRepeat: "no-repeat",
                            width: "325px",
                            height: 40,
                            backgroundColor: "#F0EFFF",
                            border: "none",
                            fontFamily: "poppins",
                            paddingLeft: "40px",
                            borderRadius: "10px",
                          }}
                          value={mobile}
                          onChange={handleMobileChange}
                          readOnly
                        />
                      </div>
                        )}
                      {/* <div
                        className={styles.checkboxContainer1}
                        styles={{ marginTop: "150px" }}
                      > */}
{/*                     
                          <input
                            type="checkbox"
                            id="termsCheckbox"
                            className={styles.checkboxInput}
                            checked={termsChecked}
                            onChange={() => setTermsChecked(!termsChecked)}
                          />
                          <label
                            htmlFor="termsCheckbox"
                            className={styles.checkboxLabel}
                          ></label>
                       
                        <span className={styles.termsText}>
                          I agree with the terms and conditions
                        </span> */}
                      {/* </div> */}
                  
                      <div className={styles.buttonContainer}>
                     
                        <button
                          className={`${styles.submitButton} ${styles.button1}`}
                          onClick={handleForgotPasswordSubmit}
                          style={{
                            width: "80px",
                            height: "30px",
                           
                            fontFamily: "poppins",
                          }}
                        >
                          Send OTP
                        </button>
                     
                        {/* <button
                          className={`${styles.cancelButton} ${styles.button1}`}
                          style={{
                            width: "144px",
                            height: "48px",
                            fontFamily: "poppins",
                          }}
                          onClick={handleGoBack1}
                        >
                          Cancel
                        </button> */}
                      </div>
                      {Forgotmassage && (
                <>
                 
                  <p className={styles.Forgotmassage} >{Forgotmassage}</p>
                </>
              )}
                      </div>
                      {errorMessage && (
                <>
                  {console.log("Error message:", errorMessage)}
                  <p className={styles.displayError}>{errorMessage}</p>
                </>
              )}
                    </div>
                 
                  </div>
                </div>
              ) : (  
                // Thank You message

                <div className={styles.forgotPasswordContent}>
                {/* Forgot password form */}
                <div
                  className={styles.forgotPasswordContent}
                  styles={{ marginLeft: "300px" }}
                >
                  <div className={styles.forgotPasswordHeader}>
                    <div
                      className={styles.goBackButton}
                      onClick={handleGoBack1}
                    >
                      <img
                        src={forgotPasswordIcon}
                        alt="Go Back"
                        width={12}
                        height={17}
                      />
                      <span>Go Back</span>
                    </div>
                  </div>
                  <div className={styles.forgotPasswordText}>
                    <p
                      className={styles.firstParagraph}
                      style={{
                        color: "#454B60",
                        fontSize: "30px",
                        fontWeight: 700,
                      }}
                    >
                      Forgot Password
                    </p>
                    <p
                      className={styles.secondParagraph}
                      style={{
                        color: "#454B60",
                        fontSize: "16px",
                        fontWeight: 700,
                      }}
                    >
                      Reset using phone or email
                    </p>
                    <div
                      className={styles.inputWithIcon1}
                      style={{ marginTop: "20px", marginRight: "90px" }}
                    >
                      <input
                        type="text"
                        placeholder="Enter Email"
                        className={styles.inputField1}
                        style={{
                          backgroundImage: `url('/images/email/mail.png')`,
                          backgroundSize: "19px 16px",
                          backgroundPosition: "10px center",
                          backgroundRepeat: "no-repeat",
                          width: 270,
                          height: 40,
                          backgroundColor: "#F0EFFF",
                          border: "none",
                          fontFamily: "poppins",
                          paddingLeft: "40px",
                          borderRadius: "10px",
                        }}
                        value={email}
                        onChange={handleEmailChange}
                        readOnly
                      />
                    </div>
                    <p
                      className={styles.orText}
                      style={{
                        marginLeft: "140px",
                        color: "#454B60",
                        fontSize: "16px",
                        fontWeight: 700,
                      }}
                    >
                      OR
                    </p>
                     <div
                      className={styles.inputWithIcon1}
                      style={{ marginTop: "20px", marginRight: "90px" }}
                    >
                      <input
                        type="text"
                        placeholder="Mobile Number"
                        className={styles.inputField1}
                        style={{
                          backgroundImage: `url('/images/mobile/mob.png')`,
                          backgroundSize: "14px 24px",
                          backgroundPosition: "10px center",
                          backgroundRepeat: "no-repeat",
                          width: 270,
                          height: 40,
                          backgroundColor: "#F0EFFF",
                          border: "none",
                          fontFamily: "poppins",
                          paddingLeft: "40px",
                          borderRadius: "10px",
                        }}
                        value={mobile}
                        onChange={handleMobileChange}
                      />
                    </div> 
                    <div
                      className={styles.checkboxContainer1}
                      styles={{ marginTop: "150px" }}
                    >
{/*                     
                        <input
                          type="checkbox"
                          id="termsCheckbox"
                          className={styles.checkboxInput}
                          checked={termsChecked}
                          onChange={() => setTermsChecked(!termsChecked)}
                        />
                        <label
                          htmlFor="termsCheckbox"
                          className={styles.checkboxLabel}
                        ></label>
                     
                      <span className={styles.termsText}>
                        I agree with the terms and conditions
                      </span> */}
                    </div>
                    {errorMessage && (
              <>
                {console.log("Error message:", errorMessage)}
                <p className={styles.displayError}>{errorMessage}</p>
              </>
            )}
                    <div className={styles.buttonContainer}>
                      <button
                        className={`${styles.submitButton} ${styles.button1}`}
                        onClick={handleForgotPasswordSubmit}
                        style={{
                          width: "144px",
                          height: "48px",
                          marginRight: "40px",
                          fontFamily: "poppins",
                        }}
                      >
                        Submit
                      </button>
                      <button
                        className={`${styles.cancelButton} ${styles.button1}`}
                        style={{
                          width: "144px",
                          height: "48px",
                          fontFamily: "poppins",
                        }}
                      >
                        Cancel
                      </button>
                    </div>
           
                  </div>
                </div>
              </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
