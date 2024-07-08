import React, { useState, useEffect } from "react";
import styles from "./email.module.css";
import styles1 from "./signup.module.css";

import icon1 from "../assets/Images/images/mdi_gmail.png";
import icon2 from "../assets/Images/images/clarity_mobile-line.png";
import icon3 from "../assets/Images/images/logos_google-gmail.png";
import quizifailogo from "../../src/assets/Images/images/home/home.jpg";
import successImage from "../assets/Images/images/signup/successImage.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaTimes, FaCheck } from "react-icons/fa";
import wrongMarkImage from "../assets/Images/images/signup/wrongMarkImage.png";
import firstNameIcon from "../assets/Images/images/signup/firstNameIcon.png";
import middleNameIcon from "../assets/Images/images/signup/middleNameIcon.png";
import lastNameIcon from "../assets/Images/images/signup/lastNameIcon.png";
import dateIcon from "../assets/Images/images/signup/dateIcon.png";
import emailIcon from "../assets/Images/images/signup/emailIcon.png";
import mobileIcon from "../assets/Images/images/signup/mobileIcon.png";
import postalCodeIcon from "../assets/Images/images/signup/postalCodeIcon.png";
import TextField from "@mui/material/TextField";
import googleLogo from "../assets/Images/images/gmail/google.png";
import closeIcon from "../assets/Images/images/gmail/closeIcon.png";
import { useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import Navbarhome from "../navbarhome/navbarhome";
// import { useHistory } from 'react-router-dom';

const Signup = () => {
  const [loginMethod, setLoginMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [name1, setName1] = useState("");
  const [name, setName] = useState("");
  const [showGmailPopup, setShowGmailPopup] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isContentSelected, setIsContentSelected] = useState(false);
  const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [emailValid, setEmailValid] = useState(false);
  const [mobileValid, setMobileValid] = useState(false);

  //   const router = useRouter();
  const [Districtname, setDistrictname] = useState("");
  const [emailOrMobile, setemailOrMobile] = useState("");
  const [firstname, setfirstname] = useState("");
  const [middlename, setmiddlename] = useState("");
  const [lastname, setlastname] = useState("");
  const [userphonenumber, setuserphonenumber] = useState("");
  const [dateofbirth, setdateofbirth] = useState("");
  const [occupationname, setoccupationname] = useState("");
  const [cityname, setcityname] = useState("");
  const [countryname, setcountryname] = useState("");
  const [statename, setstatename] = useState("");
  const [data, setdata] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [showOtpField1, setShowOtpField1] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [green, setGreen] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [mobile, setMobile] = useState("");
  const [mobile1, setMobile1] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitted1, setSubmitted1] = useState(false);
  const [resendAvailable, setResendAvailable] = useState(true);
  const [resendAvailable1, setResendAvailable1] = useState(true);
  const [resendTime, setResendTime] = useState(10 * 60);
  const [resendTime1, setResendTime1] = useState(10 * 60);
  const [showSecondButton, setShowSecondButton] = useState(false);
  const [countdown, setCountdown] = useState(5); // Initial countdown value
  const [terms, setTerms] = useState("");
  const [showVerifyButton, setShowVerifyButton] = useState(false); 
  const [showVerifyButton1, setShowVerifyButton1] = useState(false); 
  const [responseMessage1, setResponseMessage1] = useState("");

  const navigate = useNavigate();
  const handleBackToDashboard = () => {
    navigate("/login");
  };
  // const history = useHistory();
  // const history= useHistory();
  // const email1 = emailOrMobile;

  // const dataa = {
  //   data: { email1 },
  // };
  //  const handleOpenGmail = () => {
  //   history.push({
  //     pathname: '/register',
  //     state: dataa,
  //   });
  // };
  function handleOpenGmail(loginMethod,emailOrMobile) {
    navigate("/register", {
      state: { emailMobOption: loginMethod, emailMob: emailOrMobile },
    });
  }
  useEffect(() => {
    let timer;
    if (resendTime > 0) {
      timer = setTimeout(() => {
        setResendTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setResendAvailable(true);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [resendTime]);

  useEffect(() => {
    let timer;
    if (resendTime1 > 0) {
      timer = setTimeout(() => {
        setResendTime1((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setResendAvailable1(true);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [resendTime1]);

  useEffect(() => {
    if (showRegistrationSuccess && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (showRegistrationSuccess && countdown === 0) {
      navigate("/register");
    }
  }, [showRegistrationSuccess, countdown]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const degreesForMinutes = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    return (minutes / 10) * 360; // Convert minutes to degrees
  };
  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/; // Only alphabetic characters and spaces
    return nameRegex.test(name);
  };
  const handleSignUp1 = () => {
    let hasError = false;
   
    setResponseMessage("");
    setResponseMessage1("");
    setTerms("");
    if (name.trim() === "" || emailOrMobile.trim() === "") {
      setResponseMessage1("Please enter all fields");
      hasError = true;
    } else if (!validateName(name.trim())) {
      setResponseMessage1("Names can only contain alphabetic characters");
      hasError = true;
    } else {
      setResponseMessage1("");
    }
  
  if (!hasError) {
    if (!termsChecked) {
        setTerms("Please agree to the terms and conditions");
        hasError = true;
    } else {
        setTerms("");
    }
}

if (hasError) {
    return;
}
localStorage.setItem('emailOrMobile', emailOrMobile);
    setResendAvailable(false); // Disable resend button after sending OTP
    setResendTime(10 * 60);
    const userData = {
      signup_option: loginMethod,
      user_name: name,
      email_or_mobile: emailOrMobile,
    };

    fetch('https://quizifai.com:8010/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to sign up');
        }
        return response.json();
      })
      .then((data) => {
        // console.log('Sign-up successful:', data);

        if (loginMethod === 'email' && data.response === 'success' &&  data.response_message === 'Please verify your email to proceed' ) {
          setResponseMessage(data.response_message);
          setShowOtpField(true);
          setShowVerifyButton(true);
        } else if (
          data.response === 'success' &&
          data.response_message === 'Email is already registered. Please verify your email.'
        ) {
          setResponseMessage(data.response_message);
          setShowOtpField(true);
          setShowVerifyButton(true);
        }  else if (
          data.response === 'success' &&
          data.response_message === 'Account created successfully. Please check your email to verify your account.'
        ) {
          setResponseMessage(data.response_message);
          setShowOtpField(true);
          setShowVerifyButton(true);
        } 
        else if (
          data.response === 'fail' &&
          data.response_message === 'Email is already registered. Please log in or use a different email.'
        ) {
          setResponseMessage(data.response_message);
        }  else if (
          data.response === 'fail' &&
          data.response_message === 'Please provide a valid email address to proceed with your account.'
        ) {
          setTerms(data.response_message);
        }  else if (
          data.response === 'fail' &&
          data.response_message === 'Please click here to complete your registration and activate your account.'
        ) {
          setResponseMessage1(data.response_message);
          navigate("/register");
        } 
        else if (
          data.response === 'fail' &&
          data.response_message === 'Error while creating an account'
        ) {
          setTerms(data.response_message);
        }
        else {
          setResponseMessage1(data.response_message);
        }
      })
      .catch((error) => {
        console.error('Error signing up:', error);
        if (error.detail && Array.isArray(error.detail) && error.detail.length > 0) {
          const detail = error.detail[0];
          if (detail.type === 'value_error' && detail.loc.includes('user_name')) {
            setResponseMessage(detail.msg);
          } else {
            setResponseMessage('');
          }
        } else {
          setResponseMessage('Error signing up');
        }
      });
  };
 
  const sendOTP = () => {
    setShowOtpField(true);
  };
  const handleInputChange = (field, value) => {
    if (field === 'emailOrMobile') {
        setemailOrMobile(value.trim());  // Trim spaces from email input
    } else if (field === 'name') {
        if (validateName(value.trim())) {
            setResponseMessage1("");
        }
        setName(value);
    } else if (field === 'termsChecked') {
        setTermsChecked(value);
        setTerms("");
    }
}
  //   let valid = true;
  //   const newErrors = {};

  //   // Validate each field
  //   if (name.trim() === "") {
  //     newErrors.name = "Name is required";
  //     valid = false;
  //   } else {
  //     newErrors.name = "";
  //   }

  //   if (mobile.trim() === "") {
  //     newErrors.mobile = "mobile number is required";
  //     valid = false;
  //   } else {
  //     newErrors.mobile = "";
  //   }

  //   if (password.trim() === "") {
  //     newErrors.password = "Password is required";
  //     valid = false;
  //   } else {
  //     newErrors.password = "";
  //   }

  //   if (confirmpassword.trim() === "") {
  //     newErrors.confirmpassword = "Confirm password is required";
  //     valid = false;
  //   } else if (password !== confirmpassword) {
  //     newErrors.confirmpassword = "Passwords do not match";
  //     valid = false;
  //   } else {
  //     newErrors.confirmpassword = "";
  //   }

  //   setErrors(newErrors);
  //   return valid;
  // };
  const handleSignUp2 = () => {
  
    let hasError = false;
    setResponseMessage("");
    setResponseMessage1("");
    setTerms("");
    if (name1.trim() === "" || mobile.trim() === "") {
      setResponseMessage1("Please enter all fields");
      hasError = true;
    } else if (!validateName(name1.trim())) {
      setResponseMessage1("Names can only contain alphabetic characters");
      hasError = true;
    } else {
      setResponseMessage1("");
    }
  
  if (!hasError) {
    if (!termsChecked) {
        setTerms("Please agree to the terms and conditions");
        hasError = true;
    } else {
        setTerms("");
    }
}

if (hasError) {
    return;
}
localStorage.setItem('mobile', mobile);
    setResendAvailable1(false); // Disable resend button after sending OTP
    setResendTime1(10 * 60);
    const userData = {
      signup_option: loginMethod,
      user_name: name1,
      email_or_mobile: mobile,
      
    };

    fetch("https://quizifai.com:8010/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to sign up");
        }
        return response.json();
      })
      .then((data) => {
        // console.log("Sign-up successful:", data);

        // const { response, output } = data;
        if (
          data.response === "fail" &&
          data.output ===
          "Mobile Number is already registered.Please verify your"
        ) {
          setResponseMessage("Mobile Number is registered. Please verify your OTP");
          setShowOtpField1(true);
          setShowVerifyButton1(true); 
        } else if (
          data.response === "success"
        ) {
          // const sanitizedOutput = data.output.replace(/\d{6}\s?/, ""); // Removes the OTP (6 digits followed by optional space)
          // setResponseMessage(sanitizedOutput);
          setResponseMessage(data.response_message)
          // setGreen("Account Has Been Created OTP Successfully Sent Please verify your OTP")
          setShowOtpField1(true);
          setShowVerifyButton1(true); 
        } else if (
          data.response === "fail" &&
          data.response_message === "Mobile number is invalid to proceed with your account."
        ) {
          setResponseMessage(data.response_message);
        } else if (
          data.response === "fail" &&
          data.response_message ===
          "Mobile is already registered. Please log in or use a different mobile number."
          
        ) {
          setResponseMessage(data.response_message);
          // navigate("/Register");
          // navigate("/login", {
          //   state: { emailMobOption: loginMethod, emailMob: mobile },
          // });
        } else if (
          data.response === "fail" &&
          data.response_message === "Please click here to complete your registration and activate your account."
        ) {
          setResponseMessage(data.response_message);
          navigate("/Register");
        }
        else if (
          data.response === "fail" &&
          data.data ===
            "Mobile Number is Invalid."
          
        ) {
       
          setTerms(data.data);
        }
         else {
          setTerms(data.data);
        }
      })
      .catch((error) => {
        console.error('Error signing up:', error);
        if (error.detail && Array.isArray(error.detail) && error.detail.length > 0) {
          const detail = error.detail[0];
          if (detail.type === 'value_error' && detail.loc.includes('user_name')) {
            setResponseMessage(detail.msg);
          } else {
            setResponseMessage('');
          }
        } else {
          setResponseMessage('Error signing up');
        }
      });
  };
  const handleInputChange1 = (field, value) => {
    if (field === 'mobile') {
      setMobile(value);
    } else if (field === 'name1') {
      if (validateName(value.trim())) {
        setResponseMessage1("");
      }
      setName1(value);
    } else if (field === 'termsChecked') {
        setTermsChecked(value);
        setTerms("");
    }
};
  const handleVerification = async () => {
    setResponseMessage("");
    setResponseMessage1("");
    setTerms("");
    if (!termsChecked) {
      setTerms("Please agree to the terms and conditions");
      return;
    }
    if (otp.length !== 6) {
      setTerms("OTP must be exactly 6 digits");
      return;
    }
    if (!/^\d{6}$/.test(otp)) {
      setTerms("OTP must contain only numbers");
      return;
    }
    try {
      const response = await fetch("https://quizifai.com:8010/sgnup_verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          verify_option: loginMethod,
          email_or_mobile: mobile,
          otp: otp,
        }),
      });

      // Checking if response is successful
      if (!response.ok) {
        throw new Error("Failed to verify OTP. Status: " + response.status);
      }
      const data = await response.json();

      if (data.response === "success" && data.response_message === "Mobile is verified you can proceed with registration.") {
        // setShowSecondButton(true);
        setShowRegistrationSuccess(true);
        handleOpenGmail(loginMethod,mobile);
      } else if (
        data.response === "fail" &&
        data.response_message ===
          "Invalid or incorrect OTP."
        
      ) {
     
        setTerms(data.response_message);
      }else {
        // console.log("Response other than success:", data.response);
      }
  
    } catch (error) {
      // console.error("Error:", error);
      // Optionally show an error message to the user
      // alert("An error occurred during OTP verification");
    }
  };
  const handleVerification1 = async () => {
    setResponseMessage(""); 
    setResponseMessage1("");
    setTerms("");
    if (!termsChecked) {
      setTerms("Please agree to the terms and conditions");
      return;
    }
    if (otp.length !== 6) {
      setTerms("OTP must be exactly 6 digits");
      return;
    }
    if (!/^\d{6}$/.test(otp)) {
      setTerms("OTP must contain only numbers");
      return;
    }
    try {
      const response = await fetch("https://quizifai.com:8010/sgnup_verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          verify_option: loginMethod,
          email_or_mobile: emailOrMobile,
          otp: otp,
        }),
      });

      // Checking if response is successful
      if (!response.ok) {
        throw new Error("Failed to verify OTP. Status: " + response.status);
      }
      const data = await response.json();

      if (data.response === "success"  && data.response_message ==="Email is Verified you can proceed with registration.") {
        // setShowSecondButton(true);
        setShowRegistrationSuccess(true);
      }  else if (
        data.response === "fail" &&
        data.response_message ===
          "Invalid or incorrect OTP."
        
      ) {
     
        setTerms(data.response_message);
      }else {
        // console.log("Response other than success:", data.response);
      }
  
    } catch (error) {
      // console.error("Error:", error);
      // Optionally show an error message to the user
      // alert("An error occurred during OTP verification");
    }
  };

  //   try {
  //     const response = await fetch("https://quizifai.com:8010/verification", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json", // 'accept' corrected to 'Accept'
  //       },
  //       body: JSON.stringify({
  //         verify_option: loginMethod,
  //         email_or_mobile: mobile1,
  //         otp: otp,
  //       }),
  //     });

  //     // Checking if response is successful
  //     if (!response.ok) {
  //       throw new Error("Failed to verify OTP. Status: " + response.status); // Include response status in error message
  //     }

  //     const mobileopt = await response.json();

  //     if (mobileopt.data === "mobileopt") {
  //       console.log("OTP verification successful");
  //     } else {
  //       alert("OTP verification successful");
  //     }

  //     navigate("/Register");
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  const [response, setResponse] = useState("");


  //   try {
  //     const response = await fetch('https://quizifai.com:8010/verification', {
  //       verify_option: loginMethod,
  //       email_or_mobile: emailOrMobile,
  //       otp: otp
  //     });
  //     if (response.data && response.data.output) {
  //       setResponse(response.data.output);
  //     } else {
  //       setResponse('Error verifying OTP. Unexpected response format.');
  //     }
  //   } catch (error) {
  //     console.error('Error verifying OTP:', error);
  //     setResponse('Error verifying OTP. Please try again.');
  //   }
  // };
  // const handleButtonClick = () => {
  //   fetch('https://nt-adhyn.centralindia.cloudapp.azure.com:8010/rsd_otp_or_email', {
  //     method: 'POST', // Assuming you are sending data via POST method
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       Resend_option: loginMethod,
  //       mobile: emailOrMobile
  //     })
  //   })
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     return response.json(); // Parse the JSON from the response
  //   })
  //   .then(data => {
  //     console.log('Response:', data); // Display response data in console
  //     // Handle response here, such as updating state or showing a message to the user
  //   })
  //   .catch(error => {
  //     console.error('Error:', error); // Log any errors to console
  //     // Handle error, such as displaying an error message to the user
  //   });
  // };
  const handleSignUp = () => {
    setShowRegisterForm(true);
  };

  const handleBackToLogin = () => {
    setShowRegistrationSuccess(false);
    setShowRegisterForm(false);
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const handleLoginMethodChange = (method) => {
    setLoginMethod(method);
    setIsContentSelected(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClosePopup = () => {
    setShowGmailPopup(false);
    setLoginMethod(null);
    setIsContentSelected(null);
  };

  // window.open("https://mail.google.com/", "_blank"); // Opens Gmail in a new tab

  const handleRegister = () => {
    setShowRegistrationSuccess(true);
    setShowRegisterForm(false);
  };

  const renderEmailValidationIcon = () => {
    if (emailValid) {
      return (
        <FaCheck
          style={{
            width: "25px",
            height: "25px",
            verticalAlign: "middle",
            marginLeft: "-19px",
            marginTop: "20px",
          }}
          className={`${styles.validationIcon} ${styles.validationIconGreen}`}
        />
      );
    } else {
      return (
        <img
          src={wrongMarkImage}
          alt="Wrong Mark"
          className={styles.validationIcon}
          style={{
            width: "25px",
            height: "25px",
            verticalAlign: "middle",
            marginLeft: "-19px",
            marginTop: "20px",
          }}
        />
      );
    }
  };
  const handleMobileChange1 = (inputValue) => {
    if (/^\d*$/.test(inputValue)) {
      setMobile(inputValue);
      handleInputChange('mobile', inputValue); // Assuming 'mobile' is the input type
    }
  };
  const handleMobileChange2 = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      setMobile1(inputValue);
    }
  };

  const handleMobileChange = (event) => {
    const mobileNumber = event.target.value;
    const isValidMobile = /^[0-9]{10}$/.test(mobileNumber);

    setMobileValid(isValidMobile);
  };
 
  //   first_name: "",
  //   middle_name: "",
  //   last_name: "",
  //   date_of_birth: "",
  //   user_email: "",
  //   user_phone_number: "",
  //   occupation_name: "",
  //   city_name: "",
  //   country_name: "",
  //   pin_code: "",
  //   state_name: "",
  // });
  // const [errors, setErrors] = useState({
  //   first_name: "",
  //   middle_name: "",
  //   last_name: "",
  //   date_of_birth: "",
  //   user_email: "",
  //   user_phone_number: "",
  //   occupation_name: "",
  //   city_name: "",
  //   country_name: "",
  //   pin_code: "",
  //   state_name: "",
  // });

  // const handleSubmit = async () => {

  //   const requstBody = {
  //     first_name: firstname,
  //     middle_name: middlename,
  //     last_name: lastname,
  //     date_of_birth: dateofbirth,
  //     user_email: emailOrMobile,
  //     user_phone_number: userphonenumber,
  //     occupation_name: occupationname,
  //     city_name: cityname,
  //     country_name: countryname,
  //     pin_code: pincode,
  //     state_name: statename,
  //   };

  //   // if (validateForm()) {
  //   try {
  //     const response = await fetch("https://quizifai.com:8010/rgstr_dtls", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //       body: JSON.stringify(requstBody),
  //     });
  //     setdata({
  //       first_name: "",
  //       middle_name: "",
  //       last_name: "",
  //       date_of_birth: "",
  //       user_email: "",
  //       user_phone_number: "",
  //       occupation_name: "",
  //       city_name: "",
  //       country_name: "",
  //       pin_code: "",
  //       state_name: "",
  //     });

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();
  //     console.log(data);
  //     setResponseMessage(data.data[0]);
  //     setfirstname("");
  //     setmiddlename("");
  //     setlastname("");
  //     setdateofbirth("");
  //     setemailOrMobile("");
  //     setuserphonenumber("");
  //     setoccupationname("");
  //     setcityname("");
  //     setcountryname("");
  //     setpincode("");
  //     setstatename("");
  //     setShowRegistrationSuccess(true);

  //   } catch (error) {
  //     console.error("Error:", error);
  //     // }
  //   }
  // };

  // const isEmailValid = (email) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  // // Function to validate mobile number
  // const isMobileValid = (mobile) => {
  //   const mobileRegex = /^[0-9]{10}$/;
  //   return mobileRegex.test(mobile);
  // };
  // const [locationDetails, setLocationDetails] = useState({
  //   Statename:'',
  //   Districtname:"",
  //   Regionname:"",
  //   City:"",
  //   country_name:"",
  // });

  // const handleSubmit1 = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch('https://nt-adhyn.centralindia.cloudapp.azure.com:8010/location_details/', {
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         pincode: pincode
  //       })
  //     });

  //     const data = await response.json();
  //     setLocationDetails(data);
  //   } catch (error) {
  //     console.error('Error fetching location details:', error);
  //   }
  // };
  const [locationData, setLocationData] = useState(null);

  const [pincode, setpincode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [responseData, setResponseData] = useState(null);

  //   e.preventDefault();

  //   try {
  //     const response = await fetch(
  //       "https://quizifai.com:8010/location_details/",
  //       {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           pincode: pincode,
  //         }),
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error("Failed to submit form");
  //     }

  //     const data = await response.json();
  //     setResponseData(data); // Set response data in state
  //     console.log(data); // Displaying response in console
  //     setErrorMessage(""); // Clear any previous error message
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setErrorMessage("Failed to submit form. Please try again.");
  //   }
  // };
  const handleClick = () => {
    // router.push("/signup");
  };

  const handleClick1 = () => {
    // router.push("/login");
  };

  return (
    <div>
      <Navbarhome />
    <div className="container" style={{display:"flex"}}>

        <div className={styles.leftSection}>
          <div className={styles1.logo2}>
            <img
              src={quizifailogo}
              alt="Logo"
              width={1000}
              height={1000}
              style={{ marginTop: "20px" }}
            />
          </div>
        </div>
        <div className={styles.rightSection}>
          {/* Registration success message */}
          {showRegistrationSuccess && (
            <div className={styles.registrationSuccess1}>
              <h2>Email Verified Successfully</h2>
              <img src={successImage} alt="Success" width={200} height={200} />
              <p className={styles.redirectText} >
                Account has been successfully verified
                <br />
                you will be automatically redirecting to register page in{" "}
                {countdown} <span style={{ color: "blue",fontWeight:"700" }}>seconds...</span>
              </p>
              <p className={styles.redirectLink}>
                Click{" "}
                <span
                  className={styles.link}
                  style={{ fontWeight: 700, cursor: "pointer", color: "blue" }}
                  onClick={handleOpenGmail}
                >
                  here
                </span>{" "}
                <span>if you are not redirected automatically</span>
              </p>
            </div>
          )}
        {/* Sign up form */}
        {!showRegisterForm && !showRegistrationSuccess && (
          <>
            <div className={styles.Signup}>
              <div className={styles.SignupHeader}>
                <h1 className={styles.SignupTitle}>Sign Up</h1>
                {/* <p className={styles.SignupDescription}>
                  Enter your details to register
                </p> */}
              </div>          
            </div>
          
            <div className={styles.totalBox}>
              <div className={styles.formContainer}>
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
                          style={{ marginTop: "20px", marginRight: "90px" }}
                        >
                          <TextField
                            id="name"
                            label="Name"
                            required
                            variant="outlined"
                            error={submitted && responseMessage1}
                            value={name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className={styles.inputField}
                            style={{ width: "325px", height: "50px" }}
                            InputLabelProps={{
                              style: { fontFamily: "poppins" },
                            }}
                            InputProps={{
                              style: {
                                backgroundImage: `url('/images/contact/first.png')`,
                                backgroundSize: "25px 25px",
                                backgroundPosition: "290px center",
                                backgroundRepeat: "no-repeat",
                                width: "325px",
                                height: "50px",
                                // backgroundColor: "#F0EFFF",
                                border: "none",
                                fontFamily: "poppins",
                                paddingLeft: "0px",
                                borderRadius: "10px",
                              },
                              autoComplete: "off",
                            }}
                          />
                        </div>
                        {errors.name && (
                          <p className={styles.errormessage}>{errors.name}</p>
                        )}
                      </div>
                      <div className={styles.inputWrapper}>
                        <div
                          className={styles.inputWithIcon}
                          style={{ marginTop: "0px", marginRight: "90px" }}
                        >
                          <TextField
                            id="email"
                            required
                            label="Email"
                            error={submitted && responseMessage1}
                            value={emailOrMobile}
                            onChange={(e) => handleInputChange('emailOrMobile', e.target.value)}
                            variant="outlined"
                            className={styles.inputField}
                            style={{ width: "325px", height: "50px" }}
                            InputLabelProps={{
                              style: { fontFamily: "poppins" },
                            }}
                            InputProps={{
                              style: {
                                backgroundImage: `url('/images/email/mail.png')`,
                                backgroundSize: "19px 16px",
                                backgroundPosition: "296px center",
                                backgroundRepeat: "no-repeat",
                                width: "325px",
                                height: "50px",
                                // backgroundColor: "#F0EFFF",
                                border: "none",
                                fontFamily: "poppins",
                                paddingLeft: "0px",
                                borderRadius: "10px",
                              },
                              autoComplete: "off",
                            }}
                          />
                        </div>
                        {errors.emailOrMobile && (
                          <p className={styles.errormessage}>
                            {errors.emailOrMobile}
                          </p>
                        )}
                      </div>
                      {showOtpField && (
                        <div className={styles.verification}>
                          <div className={styles.verificationcode}>
                            <TextField
                              label="Verification Code"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
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
                                  backgroundPosition: "296px center",
                                  backgroundRepeat: "no-repeat",
                                  width: "325px",
                                  height: "50px",
                                  // backgroundColor: "#F0EFFF",
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
                      )}
                
                      <div className={styles1.checkbox1}> 
                  <input
                    type="checkbox"
                    id="termsCheckbox"
                    className={styles.checkboxInput1}
                    style={{
                      width: "15px",
                      height: "15px",
                    }}
                    checked={termsChecked}
                    onChange={(e) => handleInputChange('termsChecked', e.target.checked)}
                  />
                  <span className={styles.span1}>
                    {" "}
                    I agree with the{" "}
                    <a className={styles.terms} href="/termsandconditions">
                      terms and conditions
                    </a>
                  </span>

                
                </div>
                      {!showOtpField ? (
                        <div className={styles.sendOTP}>
                          <button
                            onClick={handleSignUp1}
                            className={styles.sendOTP1}
                          >
                            Send OTP
                          </button>
                        </div>
                      ) : (
                        <div className={styles.sendOTP}>
                          <span className={styles.resendAvailable}>
                            {" "}
                            {resendAvailable
                              ? ""
                              : ` (${formatTime(resendTime)})`}
                          </span>
                          <button
                            onClick={handleSignUp1}
                            disabled={!resendAvailable}
                            className={
                              resendAvailable
                                ? styles.sendOTP1
                                : styles.disabledButton
                            }
                          >
                            {resendAvailable ? "Resend OTP" : `Resend OTP `}
                          </button>
                        </div>
                      )}
                    
                                      
                    </div>
                  </div>
                )}

                {/* Mobile content */}
                {loginMethod === "mobile" && (
                  <div className={styles.inputmobile}>
                    <div className={styles1.Mobilecontent}>
                      {/* <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#454B60",
                        marginRight: "210px",
                      }}
                    ></p> */}

                      <div className={styles.inputWrapper}>
                        <div
                          className={styles.inputWithIcon}
                          style={{ marginTop: "20px", marginRight: "90px" }}
                        >
                          <TextField
                            id="name"
                            required
                            label="Name"
                            type="text"
                            variant="outlined"
                            error={submitted1 && responseMessage1}
                            className={styles.inputField}
                            style={{ width: "325px", height: "50px" }}
                            InputLabelProps={{
                              style: { fontFamily: "poppins" },
                            }}
                            InputProps={{
                              style: {
                                backgroundImage: `url('/images/contact/first.png')`,
                                backgroundSize: "25px 25px",
                                backgroundPosition: "290px center",
                                backgroundRepeat: "no-repeat",
                                width: "325px",
                                height: "50px",
                                // backgroundColor: "#F0EFFF",
                                border: "none",
                                fontFamily: "poppins",
                                paddingLeft: "0px",
                                borderRadius: "10px",
                              },
                              autoComplete: "off",
                            }}
                            name="name"
                            value={name1}
                            onChange={(e) => handleInputChange1('name1', e.target.value)}
                          />
                        </div>
                        {errors.name1 && (
                          <p className={styles.errormessage}>{errors.name1}</p>
                        )}
                      </div>

                      <div className={styles.inputWrapper}>
                        <div
                          className={styles.inputWithIcon}
                          style={{
                            position: "relative",
                          }}
                        >
                          <TextField
                            id="number"
                            label="Mobile Number"
                            type="tel"
                            required
                            error={submitted1 && responseMessage1}
                            value={mobile}
                            onChange={(e) => handleMobileChange1(e.target.value)} 
                            variant="outlined"
                            className={styles.inputField}
                            style={{
                              width: "325px",
                              height: "50px",
                            }}
                            InputLabelProps={{
                              style: { fontFamily: "poppins" },
                            }}
                            InputProps={{
                              style: {
                                backgroundImage: `url('/images/mobile/mob.png')`,
                                backgroundSize: "10px 19px",
                                backgroundPosition: "295px center",
                                backgroundRepeat: "no-repeat",
                                width: "100%",
                                height: "100%",
                                // backgroundColor: "#F0EFFF",
                                border: "none",
                                fontFamily: "poppins",
                                paddingLeft: "0px",
                                borderRadius: "10px",
                              },
                              autoComplete: "off",
                            }}
                          />
                        </div>
                        {errors.mobile && (
                          <p className={styles.errormessage}>
                            {errors.mobile}
                          </p>
                        )}
                      </div>
                      {showOtpField1 && (
                        <div className={styles.verification}>
                          <div className={styles.verificationcode}>
                            <TextField
                              label="Verification Code"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
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
                                  backgroundPosition: "296px center",
                                  backgroundRepeat: "no-repeat",
                                  width: "325px",
                                  height: "50px",
                                  // backgroundColor: "#F0EFFF",
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
                      )}
                
                    <div className={styles1.checkbox1}> 
                  <input
                    type="checkbox"
                    id="termsCheckbox"
                    className={styles.checkboxInput1}
                    style={{
                      width: "15px",
                      height: "15px",
                    }}
                    checked={termsChecked}
                    onChange={(e) => handleInputChange1('termsChecked', e.target.checked)}
                  />
                  <span className={styles.span1}>
                    {" "}
                    I agree with the{" "}
                    <a className={styles.terms} href="/termsandconditions">
                      terms and conditions
                    </a>
                  </span>

                
                </div>
                      {!showOtpField1 ? (
                        <div className={styles.sendOTP}>
                          <button
                            onClick={handleSignUp2}
                            className={styles.sendOTP1}
                          >
                            Send OTP
                          </button>
                        </div>
                      ) : (
                        <div className={styles.sendOTP}>
                          <span className={styles.resendAvailable}>
                            {" "}
                            {resendAvailable1
                              ? ""
                              : ` (${formatTime(resendTime1)})`}
                          </span>
                          <button
                            onClick={handleSignUp2}
                            disabled={!resendAvailable1}
                            className={
                              resendAvailable1
                                ? styles.sendOTP1
                                : styles.disabledButton
                            }
                          >
                            {resendAvailable1 ? "Resend OTP" : `Resend OTP `}
                          </button>
                        </div>
                      )}
                   
                   
                      {/* {showOtpField && (
      <div className={styles.sendOTP}>
        <button
          onClick={handleVerification}
          className={styles.verifly}
          style={{ display: showSecondButton ? 'none' : 'inline-block' }}
        >
          Verify
        </button>
        {showSecondButton && (
          <button
            // onClick={handleSecondButtonClick}
            className={styles.secondButton}
          >
            Verified
          </button>
        )}
      </div>
    )} */}

                      {/* {showOtpField && (
                      <div className={styles.inputWrapper}>
                        <div
                          className={styles.inputWithIcon}
                          style={{
                            marginTop: "20px",
                            marginRight: "90px",
                            position: "relative",
                          }}
                        >
                          <TextField
                            id="number"
                            label="Mobile Number"
                            type="tel"
                            value={mobile1}
                            onChange={handleMobileChange2}
                            variant="outlined"
                            className={styles.inputField}
                            style={{
                              width: "325px",
                              height: "50px",
                            }}
                            InputLabelProps={{
                              style: { fontFamily: "poppins" },
                            }}
                            InputProps={{
                              style: {
                                backgroundImage: `url('/images/mobile/mob.png')`,
                                backgroundSize: "10px 19px",
                                backgroundPosition: "295px center",
                                backgroundRepeat: "no-repeat",
                                width: "100%",
                                height: "100%",
                                // backgroundColor: "#F0EFFF",
                                border: "none",
                                fontFamily: "poppins",
                                paddingLeft: "0px",
                                borderRadius: "10px",
                              },
                              autoComplete: "off",
                            }}
                          />
                          {!showOtpField && (
                            <button
                              className={styles1.button}
                              onClick={handleSignUp2}
                              // style={{
                              //   position: "absolute",
                              //   top: "5px",
                              //   right: "5px",
                              //   width: "100px",
                              //   height: "50px",
                              //   backgroundColor: "#1A73E8",
                              //   color: "#ffffff",
                              //   border: "none",
                              //   borderRadius: "10px",
                              //   cursor: "pointer",

                              // }}
                            >
                              Send OTP
                            </button>
                          )}
                        </div>
                        {errors.mobile && (
                          <p className={styles.errormessage}>
                            {errors.mobile}
                          </p>
                        )}
                      </div>
                    )}
                    {!showOtpField && (
                      <div className={styles.inputWrapper}>
                        <div
                          className={styles.inputWithIcon}
                          style={{ marginRight: "87px" }}
                        >
                          <TextField
                            id="password"
                            label="Password"
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
                                // backgroundColor: "#F0EFFF",
                                border: "none",
                                fontFamily: "poppins",
                                paddingLeft: "0px",
                                borderRadius: "10px",
                              },
                              endAdornment: (
                                <div
                                  className={styles.passwordToggleIcon}
                                  onClick={togglePasswordVisibility}
                                >
                                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </div>
                              ),
                              autoComplete: "new-password",
                            }}
                            type={showPassword ? "text" : "password"}
                          />
                        </div>
                        {errors.password && (
                          <p className={styles.errormessage}>
                            {errors.password}
                          </p>
                        )}

                        <div className={styles.inputWrapper}>
                          <div
                            className={styles.inputWithIcon}
                            style={{ marginTop: "20px", marginRight: "87px" }}
                          >
                            <TextField
                              id="password"
                              label="Confirm Password"
                              value={confirmpassword}
                              onChange={(e) =>
                                setConfirmpassword(e.target.value)
                              }
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
                                  // backgroundColor: "#F0EFFF",
                                  border: "none",
                                  fontFamily: "poppins",
                                  paddingLeft: "0px",
                                  borderRadius: "10px",
                                },
                                endAdornment: (
                                  <div
                                    className={styles.passwordToggleIcon}
                                    onClick={togglePasswordVisibility}
                                  >
                                    {showPassword ? (
                                      <FaEye />
                                    ) : (
                                      <FaEyeSlash />
                                    )}
                                  </div>
                                ),
                                autoComplete: "new-password",
                              }}
                              type={showPassword ? "text" : "password"}
                            />
                          </div>
                          {errors.confirmpassword && (
                            <p className={styles.errormessage}>
                              {errors.confirmpassword}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    {showOtpField && (
                      <div className={styles.inputWrapper}>
                        <div
                          className={styles.inputWithIcon}
                          style={{
                            marginTop: "20px",
                            marginRight: "90px",
                            marginBottom: "40px",
                          }}
                        >
                          <TextField
                            id="otp"
                            label="OTP"
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            variant="outlined"
                            className={styles.inputField}
                            style={{ width: "325px", height: "50px" }}
                            InputLabelProps={{
                              style: { fontFamily: "poppins" },
                            }}
                            InputProps={{
                              style: {
                                backgroundImage: `url('/images/mobile/otp.png')`,
                                backgroundSize: "25px 19px",
                                backgroundPosition: "290px center",
                                backgroundRepeat: "no-repeat",
                                width: "325px",
                                height: "50px",
                                // backgroundColor: "#F0EFFF",
                                border: "none",
                                fontFamily: "poppins",
                                paddingLeft: "0px",
                                borderRadius: "10px",
                              },
                            }}
                          />
                        </div>
                      </div>
                    )} */}
                    </div>
                  </div>
                )}
 
              
                {/* {errorMessage && (
                        <p className={styles.errormessage}>{errorMessage}</p>
                      )} */}
                {/* Gmail content */}
                {/* {loginMethod === "gmail" && (
              <div className={styles.gmailPopup}>
              <img
src={closeIcon} 
alt="Close"
className={styles.closeButton}
onClick={handleClosePopup}
/>

              <div className={styles.popupLogo}>
              <img
src={googleLogo} 
alt="Google Logo"
/>
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
            )} */}

                {/* <div
              className={`${styles.captcha} ${
                !isContentSelected || loginMethod === "gmail"
                  ? styles.withMarginTop
                  : ""
              }`}
              style={{
                display: "flex",
                alignItems: "center",
                // marginTop: "170px",
                marginRight: "220px",
              }}
            >
              {/* <div
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
              </div> */}
                {/* <div style={{ display: "flex", flexDirection: "column" }}>
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
              </div> */}
                {/* </div>  */}
                {/* 
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
                  marginRight: "100px",
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
                </span>
              </div>
            </div>

            <p className={styles.signUpText}>
              Don't have an account yet?{" "}
              <span className={styles.diffColor}>Sign up</span>{" "}
            </p> */}
              
               {/* <div className={styles1.checkbox1}> 
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
                  <span className={styles.span1}>
                    {" "}
                    I agree with the{" "}
                    <a className={styles.terms} href="/termsandconditions">
                      terms and conditions
                    </a>
                  </span>

                  {/* <label
                htmlFor="termsCheckbox"
                className={styles.checkboxLabel}
                style={{ marginRight: "80px", marginLeft: "20px"  }}
              >
                I agree with the terms and conditions
              </label> */}
                {/* </div>  */}
                <p
                  className={`${styles.signUpText1} ${
                    !isContentSelected || loginMethod === "gmail"
                      ? styles.withMarginTop
                      : ""
                  }`}
                >
                  Already having an account?{" "}
                  <span
                    className={styles.diffColor}
                    onClick={handleBackToDashboard}
                  > 
                   login
                  </span>
                </p> 
             
                          {/* {green && (
                  <p className={styles1.responseMessage1} style={{ color: 'red' }}>{green}</p>
                )} */}
                              {/* {responseMessage1 && (
                  <p className={styles1.responseMessage1} style={{ color: 'red' }}>{responseMessage1}</p>
                )} */}
                              {/* {responseMessage && (
                  <p className={styles1.responseMessage1} style={{ color: 'red' }} >{responseMessage}</p>
                )} */}
                {loginMethod === "email" && showVerifyButton && (
                  // <button
                  //   onClick={handleSignUp1}
                  //   // onSubmit={handleVerification}
                  //   className={styles1.loginButton}
                  // >
                  //   Sign Up
                  // </button>
                  <div className={styles.veriflybutton}>
                    <button
                      onClick={handleVerification1}
                      className={styles.verifly}
                      // style={{ display: showSecondButton ? 'none' : 'inline-block' }}
                    >
                      Verify
                    </button>
                  </div>
                )}

                {/* <button
              onClick={handleSignUp1}

              // onSubmit={handleVerification}
              className={styles.loginButton}
            >
              Sign Up
            </button> */}

                {loginMethod === "mobile" && showVerifyButton1 && (
                  // <button
                  //   onClick={handleSignUp2}
                  //   className={styles1.loginButton}
                  // >
                  //   Sign Up
                  // </button>
                  <div className={styles.veriflybutton}>
                    <button
                      onClick={handleVerification}
                      className={styles.verifly}
                      // style={{ display: showSecondButton ? 'none' : 'inline-block' }}
                    >
                      Verify
                    </button>
                  </div>
                )}
                   {responseMessage1 && (
                  <p className={styles1.responseMessage1} style={{ color: 'red' }}>{responseMessage1}</p>
                )}
                        {responseMessage && (
                  <p className={styles1.responseMessage1} style={{ color: '#19ae0c' }}>{responseMessage}</p>
                )}
{submitted && !!errors && <div style={{ color: 'red' }}>{errors}</div>}
                {terms && (
                  <p className={styles1.responseMessage}>{terms}</p>
                )}
                {/* {loginMethod === "mobile" && !showOtpField && (
                  <button className={styles1.button} onClick={handleSignUp2}>
                    Send OTP
                  </button>
                )} */}
              </div>
            </div>
            {/* <button onClick={handleVerification}>Verify</button> */}
          </>
        )}
      </div>
    </div>
  </div>
);
};   
export default Signup;
