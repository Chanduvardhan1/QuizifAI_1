import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./email.module.css";
import styles1 from "./signup.module.css";
import icon1 from "../assets/Images/images/mdi_gmail.png";
import icon2 from "../assets/Images/images/clarity_mobile-line.png";
import icon3 from "../assets/Images/images/logos_google-gmail.png";
import quizifailogo from  "../../src/assets/Images/images/home/home.jpg";
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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MenuItem from "@mui/material/MenuItem";
import Navbarhome from "../navbarhome/navbarhome";

const register = () => {
  const [loginMethod, setLoginMethod] = useState(null);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [name1, setName1] = useState("");
  const [name, setName] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [showGmailPopup, setShowGmailPopup] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isContentSelected, setIsContentSelected] = useState(false);
  const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [emailValid, setEmailValid] = useState(false);
  const [mobileValid, setMobileValid] = useState(false);

  const [occupations, setOccupations] = useState([]);
  //   const router = useRouter();
  const [Districtname, setDistrictname] = useState("");
  const [emailOrMobile, setemailOrMobile] = useState('');
  const [firstname, setfirstname] = useState("");
  const [middlename, setmiddlename] = useState("");
  const [lastname, setlastname] = useState("");
  const [userphonenumber, setuserphonenumber] = useState("");
  const [dateofbirth, setdateofbirth] = useState("");
  const [occupationname, setoccupationname] = useState("");
  const [occupationname1, setoccupationname1] = useState("");
  const [cityname, setcityname] = useState("");
  const [countryname, setcountryname] = useState("");
  const [statename, setstatename] = useState("");
  const [data, setdata] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(5); 
   const[platform, serplatform] =useState("")
   const [readOnly, setReadOnly] = useState(false);

  const handleDateChange =(e) =>{
    const dateValue = e.target.value;
    const year = dateValue.split('-')[0];
    if(year.length <= 4){
      setdateofbirth(dateValue);
    }
  }

  const signupDetails = useLocation();
  const { emailMobOption, emailMob } = signupDetails.state || {};

  console.log("emailMobOption - ",emailMobOption)
  useEffect(() => {
    if (emailMobOption && emailMob) {
      setemailOrMobile(emailMobOption === 'email' ? emailMob : '');
    }
  }, [emailMobOption, emailMob]);

  useEffect(() => {
    // Retrieve the email or mobile number from localStorage
    const storedEmailOrMobile = localStorage.getItem('emailOrMobile');
    if (storedEmailOrMobile) {
      setemailOrMobile(storedEmailOrMobile);
      setReadOnly(true); // Make the input field read-only if a value is found
    }
  }, []);


  useEffect(() => {
    // Retrieve the email or mobile number from localStorage
    const storedmobile = localStorage.getItem('mobile');
    if (storedmobile) {
      setuserphonenumber(storedmobile);
      setReadOnly(true); // Make the input field read-only if a value is found
    }
  }, []);
  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const email = searchParams.get("email");

  //   // Set emailOrMobile state with email from URL parameter
  //   if (email) {
  //     setemailOrMobile(email);
  //     console.log("EmailOrMobile state:", emailOrMobile);
  //   }
  // }, [location.search]);

  // const handleSignUp1 = () => {
  //   if (password !== confirmpassword) {
  //     console.error('Passwords do not match');
  //     return;
  //   }
  //   setShowRegisterForm(true);
  //   const userData = {
  //     signup_option: loginMethod,
  //     user_name: name,
  //     email_or_mobile: emailOrMobile,
  //     password: password,
  //     confirm_password: confirmpassword
  //   };

  //   // First, sign up the user
  //   fetch('https://nt-adhyn.centralindia.cloudapp.azure.com:8010/signup', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(userData)
  //   })
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Failed to sign up');
  //     }
  //     return response.json();
  //   })
  //   .then(data => {
  //     console.log('Sign-up successful:', data);

  //     // If sign-up is successful and the signup option is email,
  //     // trigger sending of verification email
  //     if (loginMethod === 'email') {
  //       const verificationData = {
  //         verify_option: 'email',
  //         email_or_mobile: emailOrMobile,
  //         otp: ''
  //       };

  //       // Trigger sending of verification email
  //       return fetchVerification(verificationData);
  //     } else if (loginMethod === 'mobile') {
  //       const verificationData = {
  //         verify_option: 'mobile',
  //         email_or_mobile: emailOrMobile,
  //         otp: ''
  //       };

  //       // Trigger sending of verification SMS (adjust as per your backend)
  //       return fetchVerification(verificationData);
  //     } else {
  //       return Promise.resolve();
  //     }
  //   })
  //   .then(verificationResponse => {
  //     console.log('Verification sent successfully');
  //     console.log('Verification Response:', verificationResponse); // Log verification response
  //     router.push("");
  //   })
  //   .catch(error => {
  //     console.error('Error signing up:', error);
  //   });
  // };

  // const fetchVerification = (verificationData) => {
  //   return fetch('https://nt-adhyn.centralindia.cloudapp.azure.com:8010/verification', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(verificationData)
  //   })
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Failed to send verification');
  //     }
  //     return response.json(); // Return response data
  //   });
  // };
  // const validateForm = () => {
  //   let valid = true;
  //   const newErrors = {};

  //   // Validate each field
  //   if (name.trim() === "") {
  //     newErrors.name = "Name is required";
  //     valid = false;
  //   } else {
  //     newErrors.name = "";
  //   }

  //   if (emailOrMobile.trim() === "") {
  //     newErrors.emailOrMobile = "Email or mobile number is required";
  //     valid = false;
  //   } else {
  //     newErrors.emailOrMobile = "";
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
  // const handleSignUp1 = () => {
  //   const isValid = validateForm();
  // if (!isValid) {
  //   return;
  // }

  //   if (!termsChecked) {
  //     setErrorMessage("Please agree to the terms and conditions");
  //     return;
  //   }
  //   const userData = {
  //     signup_option: loginMethod,
  //     user_name: name,
  //     email_or_mobile: emailOrMobile,
  //     password: password,
  //     confirm_password: confirmpassword,
  //   };

  //   fetch("https://quizifai.com:8010/signup", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(userData),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to sign up");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("Sign-up successful:", data);

  //       if (data.data) {
  //         alert(data.data);
  //       } else {
  //         alert(data.output);
  //       }

  //       // router.push("");
  //       setShowOtpField(true);
  //       setShowRegisterForm(true);
  //     })
  //     .catch((error) => {
  //       console.error("Error signing up:", error);
  //     });
  // };

  // const handleVerification = async () => {
  //   try {
  //     const response = await fetch("https://quizifai.com:8010/verification", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json", // 'accept' corrected to 'Accept'
  //       },
  //       body: JSON.stringify({
  //         verify_option: loginMethod,
  //         email_or_mobile: emailOrMobile,
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
  //       console.log("OTP verification failed");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  // const [response, setResponse] = useState("");

  // const handleVerification = async () => {
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
  const togglePasswordVisibility1 = () => {
    setShowPassword(!showPassword);
  };
  const handleEmailValidation = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(input);

    if (emailRegex.test(input)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handleClosePopup = () => {
    setShowGmailPopup(false);
    setLoginMethod(null);
    setIsContentSelected(null);
  };
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    localStorage.setItem('occupation_name', occupationname);
    navigate("/login");
  };

  const handleRegister = () => {
    setShowRegistrationSuccess(true);
    setShowRegisterForm(false);
  };

  // const handleEmailValidation = (input) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   setEmail(input);

  //   if (emailRegex.test(input)) {
  //     setEmailValid(true);
  //   } else {
  //     setEmailValid(false);
  //   }
  // };

  const renderEmailValidationIcon = () => {
    if (emailValid) {
      return (
        <FaCheck
          style={{
            width: "15px",
            height: "15px",
            verticalAlign: "middle",
            marginLeft: "-19px",
            marginTop: "30px",
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
            width: "15px",
            height: "15px",
            verticalAlign: "middle",
            marginLeft: "-19px",
            marginTop: "30px",
          }}
        />
      );
    }
  };

  const handleMobileChange = (event) => {
    const userphonenumber = event.target.value;
    const isValidMobile = /^[0-9]{10}$/.test(userphonenumber);

    setuserphonenumber(userphonenumber); // Update the state with the entered mobile number
    setMobileValid(isValidMobile); // Update the state to indicate whether the mobile number is valid
  };
  // const [data, setdata] = useState({
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
  //     if (data.response === "success") {
  //       setShowRegistrationSuccess(true);
  //     } else {

  //       alert(data.data);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     // }
  //   }
  // };
  // const validateForm = () => {
  //   let valid = true;
  //   const newErrors = {};

  //   // Validate each field
  //   if (firstname.trim() === "") {
  //     setfirstname("firstname is required");
  //   } else {
  //     setfirstname('')
  //   }

  //   if (lastname.trim() === "") {
  //     setlastname('lastname is required');

  //   } else {
  //     setlastname("");
  //   }

  //   if (middlename.trim() === "") {
  //     newErrors.middlename = "middlename is required";
  //     valid = false;
  //   } else {
  //     newErrors.middlename = "";
  //   }
  //   if (dateofbirth.trim() === "") {
  //     newErrors.dateofbirth = "dateofbirth is required";
  //     valid = false;
  //   } else {
  //     newErrors.dateofbirth = "";
  //   }
  //   if (emailOrMobile.trim() === "") {
  //     newErrors.emailOrMobile = "emailOrMobile is required";
  //     valid = false;
  //   } else {
  //     newErrors.emailOrMobile = "";
  //   }
  //   if (occupationname.trim() === "") {
  //     newErrors.occupationname = "occupationname is required";
  //     valid = false;
  //   } else {
  //     newErrors.occupationname = "";
  //   }

  //   if (occupationname1.trim() === "") {
  //     newErrors.occupationname1 = "occupationname1 is required";
  //     valid = false;
  //   } else {
  //     newErrors.occupationname1 = "";
  //   }

  //   if (pincode.trim() === "") {
  //     setpincode('pincode is required');
  //     valid = false;
  //   } else {
  //     newErrors.pincode = "";
  //   }

  //   if (cityname.trim() === '') {
  //     setCity('City is required');
  //   } else {
  //     setCityError('');
  //   }

  //   if (Districtname.trim() === '') {
  //     setDistrictError('District is required');
  //   } else {
  //     setDistrictError('');
  //   }

  //   if (statename.trim() === '') {
  //     setStateError('State is required');
  //   } else {
  //     setStateError('');
  //   }

  //   if (countryname.trim() === '') {
  //     setCountryError('Country is required');
  //   } else {
  //     setCountryError('');
  //   }

  //   setErrors(newErrors);
  //   return valid;
  // };

  const handleSubmit = async () => {
    setSubmitted(true);
    const platform = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? "mobile" // If any of the identifiers are found, return 'Mobile'.
    : "Web";
    // if (firstname.trim() === "") {
    //   setfirstname("");
    // } else {
    //   setfirstname("");
    // }

    // if (lastname.trim() === "") {
    //   setlastname("");
    // } else {
    //   setlastname("");
    // }
    // if (middlename.trim() === "") {
    //   setmiddlename("");
    // } else {
    //   setmiddlename("");
    // }
    // if (dateofbirth.trim() === "") {
    //   setdateofbirth("");
    // } else {
    //   setdateofbirth("");
    // }
    // if (emailOrMobile.trim() === "") {
    //   setemailOrMobile("");
    // } else {
    //   setemailOrMobile("");
    // }
    // if (occupationname.trim() === "") {
    //   setoccupationname("");
    // } else {
    //   setoccupationname("");
    // }

    // // if (occupationname1.trim() === "") {
    // //   setoccupationname1("");
    // // } else {
    // //   setoccupationname1("");
    // // }

    // if (pincode.trim() === "") {
    //   setpincode("");
    // } else {
    //   setpincode("");
    // }

    // if (cityname.trim() === "") {
    //   setcityname("");
    // } else {
    //   setcityname("");
    // }

    // if (Districtname.trim() === "") {
    //   setDistrictname("");
    // } else {
    //   setDistrictname("");
    // }

    // if (statename.trim() === "") {
    //   setstatename("");
    // } else {
    //   setstatename("");
    // }

    // if (countryname.trim() === "") {
    //   setcountryname("");
    // } else {
    //   setcountryname("");
    // }
    // if (statename.trim() === "") {
    //   setPassword("");
    // } else {
    //   setPassword("");
    // }

    // if (countryname.trim() === "") {
    //   setConfirmpassword("");
    // } else {
    //   setConfirmpassword("");
    // }

    const requstBody = {
      first_name: firstname,
      middle_name: middlename,
      last_name: lastname,
      date_of_birth: dateofbirth,
      user_email: emailOrMobile,
      user_phone_number: userphonenumber,
      occupation_name: occupationname,
      other_occupation_name: occupationname1,
      location_name: cityname,
      country_name: countryname,
      pin_code: pincode,
      state_name: statename,
      password: password,
      confirm_password: confirmpassword,
      district_name:Districtname,
      platform:platform,
    };

    try {
      const response = await fetch("https://quizifai.com:8010/rgstr_dtls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requstBody),
      });
      setdata({
        first_name: "",
        middle_name: "",
        last_name: "",
        date_of_birth: "",
        user_email: "",
        user_phone_number: "",
        occupation_name: "",
        location_name: "",
        country_name: "",
        pin_code: "",
        state_name: "",
        district_name:"",
      });

      

      const responseData = await response.json();

      if (responseData.response === "success") {
        setShowRegistrationSuccess(true);
      } else if (responseData.response === "fail") {
        setShowRegistrationSuccess(true);
      } else {
        // Check if the error detail contains information about age
        if (responseData.detail && responseData.detail.length > 0) {
          responseData.detail.forEach((error) => {
            if (error.type === "value_error" && error.msg === "Value error, User must be at least 12 years old to use the application") {
              setErrorMessage("User must be at least 12 years old to use the application");
            } else if (error.type === "date_from_datetime_parsing" && error.msg === "Input should be a valid date or datetime, input is too short") {
              setErrorMessage("Date of birth should be a valid date or datetime, input is too short");
            } else if (error.type === "value_error" && error.msg === "Value error, Password must be at least 8 characters long") {
              setErrorMessage("Password must be at least 8 characters long");
            } else {
              setErrorMessage(error.msg);
            }
          });
        } else {
          setErrorMessage(responseData.data);
        }
      }
      
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (showRegistrationSuccess && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (showRegistrationSuccess && countdown === 0) {
      navigate("/login");
    }
  }, [showRegistrationSuccess, countdown]);
  // const validateForm = () => {
  //   // Add validation logic for each field here
  //   // For example, check if fields are not empty or meet certain criteria
  //   if (
  //     firstname.trim() === "" ||
  //     lastname.trim() === "" ||
  //     dateofbirth.trim() === "" ||
  //     emailOrMobile.trim() === "" ||
  //     userphonenumber.trim() === "" ||
  //     occupationname.trim() === "" ||
  //     cityname.trim() === "" ||
  //     countryname.trim() === "" ||
  //     pincode.trim() === "" ||
  //     statename.trim() === ""
  //   ) {
  //     return false;
  //   }
  //   return true;
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

  const handleSubmit1 = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://quizifai.com:8010/location_details/",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pincode: pincode,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await response.json();
      setResponseData(data); // Set response data in state
      console.log(data); // Displaying response in console
      setErrorMessage(""); // Clear any previous error message
      if (data && data.data && data.data.length > 0) {
        setstatename(data.data[0].state);
        setcountryname(data.data[0].country);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("Failed to submit form. Please try again.");
    }
  };

  useEffect(() => {
    const fetchOccupations = async () => {
      try {
        const response = await fetch('https://quizifai.com:8010/occupations/', {
          headers: { 'accept': 'application/json' },
        });
        const data = await response.json();
        setOccupations(data.data);
      } catch (error) {
        console.error('Error fetching occupations:', error);
      }
    };

    fetchOccupations();
  }, []);
  return (
    <div>
      <Navbarhome/>
    <div className="container">
      <div className={styles.mainContent}>
        <div className={styles.leftSection}>
          <div className={styles1.logo}>
            <img src={quizifailogo} alt="Logo" width={1000} height={1000}
             style={{ marginTop: "-15px" }} />
          </div>
        </div>
        <div className={styles.rightSection1}>
          {/* Registration success message */}
          {showRegistrationSuccess && (
            <div className={styles.registrationSuccess}>
              <h2>Registration Successful!</h2>
              <img
                src={successImage}
                alt="Success"
                width={145.4}
                height={145.4}
              />
              <p className={styles.redirectText}>
              You will be redirected to the login page in {countdown} <span style={{ color: "blue",fontWeight:"700" }}>seconds...</span>

             
              </p>
              <p className={styles.redirectLink}>
                Click{" "}
                <span
                  className={styles.link}
                  style={{ fontWeight: 700, cursor: "pointer", color: "blue" }}
                  onClick={handleBackToDashboard}
                >
                  here
                </span>{" "} <span>if you are not redirected automatically
</span>
                {/* 
                if you are not <br /> redirected automatically */}
              </p>
            </div>
          )}
          {/* Register form */}
          {!showRegistrationSuccess && (
            <>
              <div className={styles.SignupHeader}>
                <h1 className={styles1.resgisterTitle}>Register</h1>
{/* 
                <p className={styles1.registerDescription}>
                  Enter your details to register 
                </p>
               <p className={styles.mandatory}>All fields are mandatory*</p> */}
              </div>
            
              <div
                className={styles.registrationForm}
                style={{ display:"flex",flexDirection:"column",alignItems:"end",paddingRight:"35px"}}
              >
                {/* First Name, Middle Name, Last Name */}
                <div className={styles.FirstMiddleLast}>
                  <TextField
                    id="firstName"
                    label="First Name"
                    variant="outlined"
                    required
                    error={submitted && firstname.trim() === ""}
                    // helperText={
                    //   submitted && firstname.trim() === ""
                    //     ? "First Name is required"
                    //     : ""
                    // }
                    className={styles.iconInput}
                    style={{
                      width: "130px",
                      height: "44px",
                      // marginRight: "20px",
                      // marginBottom: "20px",
                    }}
                    InputLabelProps={{
                      style: { fontFamily: "poppins" },
                    }}
                    InputProps={{
                      style: {
                        backgroundImage: `url('/images/signup/firstNameIcon.png')`,
                        //backgroundSize: "19px 16px",
                        backgroundPosition: "150px center",
                        backgroundRepeat: "no-repeat",
                        width: "130px",
                        height: "50px",
                        //backgroundColor: "#F0EFFF",
                        border: "none",
                        fontFamily: "poppins",
                        paddingLeft: "0px",
                        borderRadius: "10px",
                      },
                      autoComplete: "off",
                    }}
                    name="first_name"
                    value={firstname}
                    onChange={(e) => setfirstname(e.target.value)}
                  />

                  <TextField
                    id="middleName"
                    label="Middle Name"
                    variant="outlined"
                   
                    // error={submitted && middlename.trim() === ""}
                    // helperText={
                    //   submitted && middlename.trim() === ""
                    //     ? "middlename is required"
                    //     : ""
                    // }
                    className={styles.iconInput}
                    style={{ width: "150px", height: "44px" }}
                    InputLabelProps={{
                      style: { fontFamily: "poppins" },
                    }}
                    InputProps={{
                      style: {
                        backgroundImage: `url('/images/signup/middleNameIcon.png')`,
                        //backgroundSize: "19px 16px",
                        backgroundPosition: "150px center",
                        backgroundRepeat: "no-repeat",
                        width: "150px",
                        height: "50px",
                        //backgroundColor: "#F0EFFF",
                        border: "none",
                        fontFamily: "poppins",
                        fontSize: "15px",

                        borderRadius: "10px",
                      },
                      autoComplete: "off",
                    }}
                    name="middle_name"
                    value={middlename}
                    onChange={(e) => setmiddlename(e.target.value)}
                  />
                  <TextField
                    id="lastName"
                    label="Last Name"
                    variant="outlined"
                    required
                    error={submitted && lastname.trim() === ""}
                    // helperText={
                    //   submitted && lastname.trim() === ""
                    //     ? "Last Name is required"
                    //     : ""
                    // }
                    className={styles.iconInput}
                    style={{
                      width: "130px",
                      height: "44px",
                      // marginTop: "10px",
                      // marginBottom: "20px",
                    }}
                    InputLabelProps={{
                      style: { fontFamily: "poppins" },
                    }}
                    InputProps={{
                      style: {
                        backgroundImage: `url('/images/signup/lastNameIcon.png')`,
                        //backgroundSize: "19px 16px",
                        backgroundPosition: "355px center",
                        backgroundRepeat: "no-repeat",
                        width: "130px",
                        height: "50px",
                        //backgroundColor: "#F0EFFF",
                        border: "none",
                        fontFamily: "poppins",
                        fontSize: "15px",
                        borderRadius: "10px",
                      },
                      autoComplete: "off",
                    }}
                    name="last_name"
                    value={lastname}
                    onChange={(e) => setlastname(e.target.value)}
                  />
                </div>
                <div className={styles1.inputRow1}>
                  <TextField
                    // required
                    id="email"
                    label="Email"
                    variant="outlined"
                    error={submitted && emailOrMobile.trim() === ""}
                    // helperText={
                    //   submitted && emailOrMobile.trim() === ""
                    //     ? "email is required"
                    //     : ""
                    // }
                    className={styles.iconInput}
                    style={{
                      width: "432px",
                      height: "44px",
                      // marginTop: "10px",
                      marginBottom: "20px",
                    }}
                    InputLabelProps={{
                      style: { fontFamily: "poppins" },
                    }}
                    InputrequiredProps={{
                      style: { color:"red", },
                    }}
                    InputProps={{
                      style: {
                        backgroundImage: `url('/images/signup/emailIcon.png')`,
                        //backgroundSize: "19px 16px",
                        backgroundPosition: "400px center",
                        backgroundRepeat: "no-repeat",
                        width: "432px",
                        height: "50px",
                        //backgroundColor: "#F0EFFF",
                        border: "none",
                        fontFamily: "poppins",
                        fontSize: "15px",

                        borderRadius: "10px",
                      },
                      autoComplete: "off",
                      readOnly: true,
                    }}
                    // value={email}
                    //onChange={(e) => handleEmailValidation(e.target.value)}
                    name="user_email"
                    value={emailOrMobile}
                    //onChange={(e) => setemailOrMobile(e.target.value)}
                    onChange={(e) => {
                      handleEmailValidation(e.target.value);
                      setemailOrMobile(e.target.value);
                    }}
                  />
                  {/* {renderEmailValidationIcon()}{" "} */}
                </div>
                <div className={styles.password1}>
                  <TextField
                    id="password"
                    label="Password"
                    error={submitted && password.trim() === ""}
                    value={password}
                    required
                  
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    className={styles.inputField}
                    style={{ width: "210px", height: "50px" }}
                    InputLabelProps={{
                      style: { fontFamily: "poppins" },
                    }}
                    InputProps={{
                      style: {
                        backgroundSize: "19px 16px",
                        backgroundPosition: "10px center",
                        backgroundRepeat: "no-repeat",
                        width: isMobile ? "100%" : "210px",
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
                          style={{ color: "#A7A3FF",cursor:"pointer" }}
                        >
                          {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </div>
                      ),
                      autoComplete: "new-password",
                    }}
                    type={showPassword ? "text" : "password"}
                  />
                  <TextField
                    id="password"
                    required
                    label="Confirm Password"
                    error={submitted && confirmpassword.trim() === ""}
                    value={confirmpassword}
                    onChange={(e) => setConfirmpassword(e.target.value)}
                    variant="outlined"
                    className={styles.inputField}
                    style={{ width: "210px", height: "50px" }}
                    InputLabelProps={{
                      style: { fontFamily: "poppins" },
                    }}
                    InputProps={{
                      style: {
                        backgroundSize: "19px 16px",
                        backgroundPosition: "10px center",
                        backgroundRepeat: "no-repeat",
                        width: isMobile ? "100%" : "210px",
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
                          onClick={togglePasswordVisibility1}
                          style={{ color: "#A7A3FF", cursor:"pointer" }}
                        >
                          {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </div>
                      ),
                      autoComplete: "new-password",
                    }}
                    type={showPassword ? "text" : "password"}
                  />
                </div>
               

                {/* Date of Birth, Occupation */}
                <div className={styles.Dob}>
                  {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}
                    >
                      <DatePicker label="DOB" 
                      className={styles1.customDatePicker}/>
                    </DemoContainer>
                  </LocalizationProvider> */}
                  <TextField
                    type="date"
                    className={styles.iconInput}
                    label="Date of birth"
                    required
                    focused
                    error={submitted && dateofbirth.trim() === ""}
                    // helperText={
                    //   submitted && dateofbirth.trim() === ""
                    //     ? "dateofbirth is required"
                    //     : ""
                    // }
                    variant="outlined"
                    style={{
                      width: "210px",
                      height: "44px",
                      // marginRight: "20px",
                      // marginBottom: "10px",
                      // position: "relative",
                      // top: "10px",
                    }}
                    InputLabelProps={{
                      style: { fontFamily: "poppins",},
                    }}
                    InputProps={{
                      style: {
                        // backgroundImage: `url('/images/signup/firstNameIcon.png')`,
                        //backgroundSize: "19px 16px",
                        backgroundPosition: "150px center",
                        backgroundRepeat: "no-repeat",
                        width: "210px",
                        height: "50px",
                        paddingLeft: "0px",
                        //backgroundColor: "#F0EFFF",
                        border: "none",
                        fontFamily: "poppins",

                        borderRadius: "10px",
                      },
                      autoComplete: "off",
                      // style={{
                      //   backgroundImage: `url('images/signup/dateIcon.png')`,
                      //   backgroundRepeat: "no-repeat",
                      //   width: "179px",
                      //   height: "44px",
                      //   paddingLeft: "40px",
                      //   backgroundPosition: "10px center",
                      //   border:"1px solid #c2c2c2",

                      //   borderRadius: "10px",
                      // }}
                    }}
                    name="date_of_birth"
                    value={dateofbirth}
                    onChange={(handleDateChange)}
                  />
                   <TextField
                    id="mobileNumber"
                    label="Mobile Number"
                    variant="outlined"
                    className={styles.iconInput}
                    style={{
                      width: "210px",
                      height: "44px",
                      marginBottom: "10px",
                    }}
                    // style={{
                    //   backgroundImage: `url('images/signup/mobileIcon.png')`,
                    //   backgroundRepeat: "no-repeat",
                    //   width: "137px",
                    //   height: "43px",
                    //   paddingLeft: "40px",
                    //   backgroundPosition: "10px center",
                    // }}
                    InputLabelProps={{
                      style: { fontFamily: "poppins" },
                    }}
                    InputProps={{
                      style: {
                        backgroundImage: `url('images/signup/mobileIcon.png')`,
                        //backgroundSize: "19px 16px",
                        backgroundPosition: "182px center",
                        backgroundRepeat: "no-repeat",
                        width: "210px",
                        height: "50px",
                        //backgroundColor: "#F0EFFF",
                        border: "none",
                        fontFamily: "poppins",
                        fontSize: "15px",

                        borderRadius: "10px",
                      },
                      autoComplete: "off",
                      
                    }}
                    
                    // onChange={(e) => handleMobileChange}
                    //name="user_phone_number"
                    onChange={(e) => {
                      handleMobileChange(e);
                      setuserphonenumber(e.target.value);
                    }}
                    value={userphonenumber}
                    //onChange={(e) => setuserphonenumber(e.target.value)}
                  />
               
                </div>

                {/* Email Address, Country, Mobile Number */}
                {/* <div className={styles1.inputRow1}>
                  <TextField
                    // required
                    id="email"
                    label="Email Address"
                    variant="outlined"
                    error={submitted && emailOrMobile.trim() === ""}
                    // helperText={
                    //   submitted && emailOrMobile.trim() === ""
                    //     ? "email is required"
                    //     : ""
                    // }
                    className={styles.iconInput}
                    style={{
                      width: "432px",
                      height: "44px",
                      // marginTop: "10px",
                      marginBottom: "20px",
                    }}
                    InputLabelProps={{
                      style: { fontFamily: "poppins" },
                    }}
                    InputrequiredProps={{
                      style: { color:"red", },
                    }}
                    InputProps={{
                      style: {
                        backgroundImage: `url('/images/signup/emailIcon.png')`,
                        //backgroundSize: "19px 16px",
                        backgroundPosition: "400px center",
                        backgroundRepeat: "no-repeat",
                        width: "432px",
                        height: "50px",
                        //backgroundColor: "#F0EFFF",
                        border: "none",
                        fontFamily: "poppins",
                        fontSize: "15px",

                        borderRadius: "10px",
                      },
                      autoComplete: "off",
                      // readOnly: true,occupation
                    }}
                    // value={email}
                    //onChange={(e) => handleEmailValidation(e.target.value)}
                    name="user_email"
                    value={emailOrMobile}
                    //onChange={(e) => setemailOrMobile(e.target.value)}
                    onChange={(e) => {
                      handleEmailValidation(e.target.value);
                      setemailOrMobile(e.target.value);
                    }}
                  />
                  {/* {renderEmailValidationIcon()}{" "} */}
                {/* </div>  */}
                {/* Render email validation icon */}
                <div className={styles.Occupation}>
                  {/* <input
                      type="date"
                      className={styles.iconInput}
                      placeholder="Date of birth"
                      style={{
                        backgroundImage: `url('images/signup/dateIcon.png')`,
                        backgroundRepeat: "no-repeat",
                        width: "179px",
                        height: "44px",
                        paddingLeft: "40px",
                        backgroundPosition: "10px center",
                      }}
                      name="date_of_birth"
                      value={dateofbirth}
                      onChange={(e) => setdateofbirth(e.target.value)}
                    />
                    <select
                      className={styles.iconInput1}
                      style={{
                        backgroundImage: `url('images/signup/occupationIcon.png')`,
                        backgroundRepeat: "no-repeat",
                        borderRadius: "10px",
                        marginRight:"20px"
                      }}
                      value={occupationname}
                      onChange={(e) => setoccupationname(e.target.value)}
                    >
                      <option value="" disabled selected>
                        Occupation
                      </option>
                      <option value="Student">Student</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Professional">Professional</option> */}
                  {/* occupation options  */}
                  {/* </select> */}
                  {/* <select
                    className={styles.countrySelect}
                    defaultValue=""
                    style={{
                      backgroundImage: `url('images/signup/occupationIcon.png')`,
                      backgroundRepeat: "no-repeat",
                      borderRadius: "10px",
                      width: "146px",
                      height: "50px",
                      border: "1px solid #c2c2c2",
                      marginRight: "10px",
                    }}
                  >
                    <option value="" disabled selected>
                      Country
                    </option>
                    <option value="India">India +91</option>
                    <option value="Bangladesh">Bangladesh +880</option>
                    <option value="USA">USA +1</option>
                    <option value="Sri Lanka">Sri Lanka +94</option>
                    <option value="Germany">Germany +49</option>
                    {/* country options*/}
                  {/* </select>  */}

                  <TextField
                    id="outlined-select-currency-native"
                    select
                    label="Occupation"
                    required
                    error={submitted && occupationname.trim() === ""}
                    // helperText={
                    //   submitted && occupationname.trim() === ""
                    //     ? "occupationname is required"
                    //     : ""
                    // }
                    className={styles.iconInput1}
                    style={{
                      width: "210px",
                      height: "44px",
                      // marginTop: "10px",
                      // marginBottom: "20px",
                    }}
                    InputLabelProps={{
                      style: { fontFamily: "poppins",marginRight:'10px' },
                    }}
                    InputProps={{
                      style: {
                        // backgroundImage: `url('/images/signup/lastNameIcon.png')`,
                        //backgroundSize: "19px 16px",
                        backgroundImage: `url('images/signup/occupationIcon.png')`,
                        backgroundRepeat: "no-repeat",
                        borderRadius: "10px",
                        width: "210px",
                        height: "50px",
                      },
                    }}
                    value={occupationname}
                    onChange={(e) => setoccupationname(e.target.value)}
                  >
                    {/* <option value="" disabled selected>
                      Occupation
                    </option> */}
                       {occupations.map((occupation) => (
        <MenuItem key={occupation.occupation_id} value={occupation.occupation_name}>
          {occupation.occupation_name}
        </MenuItem>
      ))}
                    {/* occupation options  */}
                  </TextField>
                  <TextField
                  label="Other occupation"
                  variant="outlined"
                 
                  // error={submitted && occupationname1.trim() === ""}
                  // helperText={
                  //   submitted && occupationname1.trim() === ""
                  //     ? "Other_occupationname is required"
                  //     : ""
                  // }
                  className={styles.iconInput}
                  style={{
                    width: "212px",
                    height: "44px",
                    // marginTop: "10px",
                    // marginBottom: "20px",
                  }}
                  InputLabelProps={{
                    style: { fontFamily: "poppins" },
                  }}
                  InputProps={{
                    style: {
                      backgroundImage: `url('/images/signup/lastNameIcon.png')`,
                      //backgroundSize: "19px 16px",
                      backgroundPosition: "355px center",
                      backgroundRepeat: "no-repeat",
                      width: "212px",
                      height: "50px",
                      //backgroundColor: "#F0EFFF",
                      border: "none",
                      fontFamily: "poppins",
                      fontSize: "15px",
                      borderRadius: "10px",
                    },
                    autoComplete: "off",
                  }}
                  value={occupationname1}
                  onChange={(e) => setoccupationname1(e.target.value)}
                />
                  {/* <div className={styles.inputContainer}> */}
                  {/* {mobileValid ? (
                    <FaCheck
                      className={`${styles.validationIcon} ${styles.validationIconGreen}`}
                    />
                  ) : (
                    <div>
                      <img
                        src={wrongMarkImage}
                        alt="Wrong Mark"
                        className={styles.validationIcon}
                        style={{
                          width: "15px",
                          height: "15px",
                          verticalAlign: "middle",
                          marginLeft: "360px",
                          marginTop: "-36px",
                        }}
                      />
                      {/* <select
                            className={styles.countrySelect}
                            style={{ marginRight: "10px" }}
                            defaultValue=""
                          >
                            <option value="" disabled selected>
                              Country
                            </option>
                            <option value="India">India +91</option>
                            <option value="Bangladesh">Bangladesh +880</option>
                            <option value="USA">USA +1</option>
                            <option value="Sri Lanka">Sri Lanka +94</option>
                            <option value="Germany">Germany +49</option>
                            {/* country options*/}
                      {/* </select> */}
                      {/* <input
                            type="tel"
                            className={styles.iconInput}
                            // onChange={handleMobileChange}
                            placeholder="Mobile Number"
                            style={{
                              backgroundImage: `url('images/signup/mobileIcon.png')`,
                              backgroundRepeat: "no-repeat",
                              width: "137px",
                              height: "43px",
                              paddingLeft: "40px",
                              backgroundPosition: "10px center",
                            }}
                            name="user_phone_number"
                            value={userphonenumber}
                            onChange={(e) => setuserphonenumber(e.target.value)}
                          /> */}
                      {/* {!mobileValid && (
                            <FaTimes
                              className={`${styles.validationIcon} ${styles.validationIconRed}`}
                            />
                          )} */}
                    {/* </div>
                  )}  */}
                  {/* </div> */}
                </div>
                {/* Postal Code, City */}
                <div className={styles.inputRow10}>
                  <TextField
                    required
                    type="text"
                    label="Postal Code"
                    variant="outlined"
                    error={submitted && pincode.trim() === ""}
                    // helperText={
                    //   submitted && pincode.trim() === ""
                    //     ? "pincode is required"
                    //     : ""
                    // }
                    className={styles.iconInput1}
                    style={{
                     position:"relative",
                     right:"220px"
                    }}
                    InputLabelProps={{
                      style: { fontFamily: "poppins" },
                    }}
                    InputProps={{
                      style: {
                        // backgroundImage: `url('/images/signup/lastNameIcon.png')`,
                        //backgroundSize: "19px 16px",
                        backgroundRepeat: "no-repeat",
                        width: "170px",
                        height: "50px",

                        autoComplete: "off",
                        paddingRight: "35px",
                       
                        borderRadius: "10px",
                        // border: "1px solid #c2c2c2",
                        backgroundPosition:
                          "10px center, right 10px center, right 40px center",
                      },
                    }}
                    name="pin_code"
                    value={pincode}
                    onChange={(e) => setpincode(e.target.value)}
                  />
                  {/* <div  style={{
                      backgroundImage: `url('images/signup/postalCodeIcon.png')`,
                      backgroundRepeat: "no-repeat",
                      width: "35px",
                      height: "50px",
                  
                      position:" relative",
                      top: "27px",
                      left: "-189px",
                  
                      marginBottom: "10px",
                      // border: "1px solid #c2c2c2",
                      backgroundPosition:
                        "10px center, right 10px center, right 40px center",
                      cours: "pointer",
                    }}>

                  </div> */}
                  <div
                    className={styles1.searchicon}
                    onClick={handleSubmit1}
                    style={{
                      backgroundImage: `url('images/signup/LineIcon.png'),url('images/signup/searchIcon.png')`,
                      backgroundRepeat: "no-repeat",
                      width: "40px",
                      height: "50px",
                      right: "257px",
                      position: "relative",
                     // border: "1px solid #c2c2c2",
                      backgroundPosition:
                        "0px center, right 10px center, right 40px center",
                      cours: "pointer",
                    }}
                  ></div>
                </div>
                <div className={styles1.selected1}>
                  <div className={styles.selected1} >
                    <div className={styles.selected1}  style={{ display: "flex",flexDirection:"column",alignItems:"end" }}>
                      <label>
                        <TextField
                          id="outlined-select-currency-native"
                          select
                          required
                          label="Location"
                          error={submitted && cityname.trim() === ""}
                          // helperText={
                          //   submitted && cityname.trim() === ""
                          //     ? "cityname is required"
                          //     : ""
                          // }
                          className={styles.iconInput1}
                          style={{
                            width: "435px",
                            height: "44px",
                            marginTop: "10px",
                            marginBottom: "20px",
                          }}
                          InputLabelProps={{
                            style: { fontFamily: "poppins" },
                          }}
                          InputProps={{
                            style: {
                              // backgroundImage: `url('/images/signup/lastNameIcon.png')`,
                              //backgroundSize: "19px 16px",
                              backgroundPosition: "355px center",
                              backgroundRepeat: "no-repeat",
                              width: "435px",
                              height: "50px",
                              //backgroundColor: "#F0EFFF",
                              border: "none",
                              fontFamily: "poppins",
                              fontSize: "15px",
                              borderRadius: "10px",
                            },
                          }}
                          value={cityname}
                          onChange={(e) => setcityname(e.target.value)}
                        >
                          {/* <option value=""  disabled selected>Location</option> */}
                          {/* {
                            [
                              ...new Set(
                                responseData?.data.map(
                                  (location) => location.location
                                )
                              ),
                            ].map((cityName, index) => (
                              <MenuItem key={index} value={cityName}>
                                {cityName}
                              </MenuItem>
                            ))} */}
                            {responseData?.data.map((location, index) => (
        <MenuItem key={index} value={location.location}>
          {location.location}
        </MenuItem>
      ))}
                        </TextField>
                      </label>
                      <label>
                        <TextField
                          id="outlined-select-currency"
                          select
                          required
                          label="District"
                          error={submitted && Districtname.trim() === ""}
                          // helperText={
                          //   submitted && Districtname.trim() === ""
                          //     ? "Districtname is required"
                          //     : ""
                          // }
                          className={styles.iconInput1}
                          style={{
                            width: "255px",
                            height: "44px",
                            marginTop: "10px",
                            marginBottom: "20px",
                            position: "relative",
                            top: "-143px",
                            left: "",
                          }}
                          InputLabelProps={{
                            style: { fontFamily: "poppins" },
                          }}
                          InputProps={{
                            style: {
                              // backgroundImage: `url('images/signup/countryIcon.png')`,
                              backgroundRepeat: "no-repeat",
                              width: "255px",
                              height: "50px",
                              borderRadius: "10px",
                              marginTop: "0px",
                              marginRight: "10px",
                              // position: "relative",
                              // top: "-145px",
                              // left: "183px",
                              // top: "-108px",
                              // border: "1px solid #c2c2c2",
                              // left: "178px",
                            },
                          }}
                          value={Districtname}
                          onChange={(e) => setDistrictname(e.target.value)}
                        >
                          {/* <option value=""  disabled selected>District</option> */}
                          {responseData &&
                           
                            [
                              ...new Set(
                                responseData.data.map(
                                  (location) => location.district
                                )
                              ),
                            ].map((districtName, index) => (
                              <MenuItem key={index} value={districtName}>
                                {districtName}
                              </MenuItem>
                            ))}
                        </TextField>
                      </label>
                      <div className={styles.state}>
                        <label>
                          <TextField
                            id="outlined-select-currency"
                        
                            required
                            error={submitted && statename.trim() === ""}
                            // helperText={
                            //   submitted && statename.trim() === ""
                            //     ? "statename is required"
                            //     : ""
                            // }
                            label="State"
                            className={styles.iconInput1}
                            style={{
                              width: "377px",
                              height: "44px",
                              marginTop: "10px",
                              marginBottom: "20px",
                              position: "relative",
                              top: "-77px",
                              left: "-55px",
                            }}
                            InputLabelProps={{
                              style: { fontFamily: "poppins" },
                            }}
                            InputProps={{
                              style: {
                                // backgroundImage: `url('images/signup/countryIcon.png')`,
                                // backgroundImage: `url('images/signup/countryIcon.png')`,
                                backgroundRepeat: "no-repeat",
                                width: "243px",
                                height: "50px",
                                borderRadius: "10px",
                                marginTop: "0px",
                                marginRight: "10px",
                                // position: "relative",
                                // top: "-82px",
                                // border: "1px solid #c2c2c2",
                                // top: "-48px",
                              },
                              readOnly: true,
                            }}
                            value={statename}
                            onChange={(e) => setstatename(e.target.value)}
                          >
                            {/* <option value=""  disabled selected>State</option> */}
                            {/* {responseData &&
                              responseData.data &&
                              Array.isArray(responseData.data[0]) &&
                              [
                                ...new Set(
                                  responseData.data[0].map(
                                    (location) => location.Statename
                                  )
                                ),
                              ].map((stateName, index) => (
                                <MenuItem key={index} value={stateName}>
                                  {stateName}
                                </MenuItem>
                              ))} */}
                          </TextField>
                        </label>

                        <label>
                          <TextField
                            id="outlined-select-currency"
                          
                            required
                            label="Country"
                            error={submitted && countryname.trim() === ""}
                            // helperText={
                            //   submitted && countryname.trim() === ""
                            //     ? "countryname is required"
                            //     : ""
                            // }
                            className={styles.iconInput1}
                            style={{
                              width: "377px",
                              height: "44px",
                              marginTop: "10px",
                              marginBottom: "20px",
                              position: "relative",
                              top: "-151px",
                              left: "194px",
                            }}
                            InputLabelProps={{
                              style: { fontFamily: "poppins" },
                            }}
                            InputProps={{
                              style: {
                                // backgroundImage: `url('images/signup/countryIcon.png')`,
                                backgroundImage: `url('images/signup/countryIcon.png')`,
                                backgroundRepeat: "no-repeat",
                                width: "180px",
                                // border: "1px solid #c2c2c2",
                                height: "50px",
                                borderRadius: "10px",
                                marginTop: "0px",
                                marginRight: "10px",
                                // position: "relative",
                                // // top: "-48px",
                                // top: "-155px",
                                // left: "257px",
                              },
                              readOnly: true,
                            }}
                            // onChange={(e) => setcountryname(e.target.value)}
                            value={countryname}
                            >
                            {/* <option value=""  disabled selected>Country</option> */}
                            {/* {responseData &&
                            
                              [
                                ...new Set(
                                  responseData.data.map(
                                    (location) => location.country_name
                                  )
                                ),
                              ].map((countryName, index) => (
                                <MenuItem key={index} value={countryName}>
                                  {countryName}
                                </MenuItem>
                              ))} */}
                          </TextField>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div>
                    {responseData &&
                      responseData.data &&
                      Array.isArray(responseData.data[0]) && (
                        <div>
                          <div>
                            <label>
                              <select
                                className={styles.iconInput1}
                                style={{
                                  backgroundImage: `url('images/signup/countryIcon.png')`,
                                  backgroundRepeat: "no-repeat",
                                  width: "134px",
                                  height: "43px",
                                  borderRadius: "10px",
                                }}
                                value={statename}
                                onChange={(e) => setstatename(e.target.value)}
                              >
                                <option value="">Statename</option>
                                {responseData.data[0].map((location, index) => (
                                  <option
                                    key={index}
                                    value={location.Statename}
                                  >
                                    {location.Statename}
                                  </option>
                                ))}
                              </select>
                            </label>
                            <label>
                              <select
                                className={styles.iconInput1}
                                style={{
                                  backgroundImage: `url('images/signup/countryIcon.png')`,
                                  backgroundRepeat: "no-repeat",
                                  width: "134px",
                                  height: "43px",
                                  borderRadius: "10px",
                                }}
                                value={cityname}
                                onChange={(e) => setcityname(e.target.value)}
                              >
                                <option value="">City</option>
                                {responseData.data[0].map((location, index) => (
                                  <option key={index} value={location.City}>
                                    {location.City}
                                  </option>
                                ))}
                              </select>
                            </label>
                          </div>
                          <div className=" flex gap-2">
                            <label>
                              <select
                                className={styles.iconInput1}
                                style={{
                                  backgroundImage: `url('images/signup/countryIcon.png')`,
                                  backgroundRepeat: "no-repeat",
                                  width: "134px",
                                  height: "43px",
                                  borderRadius: "10px",
                                }}
                                value={countryname}
                                onChange={(e) => setcountryname(e.target.value)}
                              >
                                <option value="">Country</option>
                                {responseData.data[0].map((location, index) => (
                                  <option
                                    key={index}
                                    value={location.country_name}
                                  >
                                    {location.country_name}
                                  </option>
                                ))}
                              </select>
                            </label>
                            <label>
                              <select
                                className={styles.iconInput1}
                                style={{
                                  backgroundImage: `url('images/signup/countryIcon.png')`,
                                  backgroundRepeat: "no-repeat",
                                  width: "134px",
                                  height: "43px",
                                  borderRadius: "10px",
                                }}
                                value={occupationname}
                                onChange={(e) =>
                                  setoccupationname(e.target.value)
                                }
                              >
                                <option value="">Occupation</option>
                                {responseData.data[0].map((location, index) => (
                                  <option
                                    key={index}
                                    value={location.Regionname}
                                  >
                                    {location.Regionname}
                                  </option>
                                ))}
                              </select>
                            </label>
                          </div>
                        </div>
                      )}
                  </div> */}
               
                {/* <div>
            <label>State:</label>
            <input type="text" value={locationDetails.Statename} readOnly />
          </div>
          <div>
            <label>District:</label>
            <input type="text" value={locationDetails.Districtname} readOnly />
          </div>
          <div>
            <label>Region:</label>
            <input type="text" value={locationDetails.Regionname} readOnly />
          </div>
          <div>
            <label>City:</label>
            <input type="text" value={locationDetails.City} readOnly />
          </div>
          <div>
            <label>Country:</label>
            <input type="text" value={locationDetails.country_name} readOnly />
          </div> */}
                {/* State */}
                {/* <div className={styles.inputRow}>
                    <input
                      type="text"
                      className={styles.iconInput}
                      placeholder="State"
                      style={{
                        backgroundImage: `url('images/signup/stateIcon.png')`,
                        backgroundRepeat: "no-repeat",
                        width: "165px",
                        height: "44px",
                        backgroundPosition: "10px center",
                        paddingLeft: "20px",
                      }}
                      name="state_name"
                      value={statename}
                      onChange={(e) => setstatename(e.target.value)}
                    />
                    <input
                      type="text"
                      className={styles.iconInput}
                      placeholder="Country"
                      style={{
                        width: "155px",
                        height: "44px",
                        backgroundPosition: "10px center",
                        paddingLeft: "20px",
                      }}
                      name="country_name"
                      value={countryname}
                      onChange={(e) => setcountryname(e.target.value)}
                    />
                  </div> */}
                {/* 
                <p className={styles.signUpText1}>
                  Already have an account?{" "}
                  <span
                    className={styles.diffColor1}
                    onClick={handleBackToLogin}
                  >
                    Back to Login
                  </span>{" "}
                </p> */}
                {errorMessage && (
                  <div style={{ color: "red" }}>{errorMessage}</div>
                )}
                <button
                  // onClick={handleRegister}
                  className={styles.registerButton}
                  onClick={handleSubmit}
                >
                  Register
                </button>
              </div>
            </>
          )}
          {/* Sign up form */}
          {/* {!showRegisterForm && !showRegistrationSuccess && (
            <>
              <div className={styles.SignupHeader}>
                <h1 className={styles.SignupTitle}>Sign Up</h1>
                <p className={styles.SignupDescription}>
                  Enter your details to register
                </p>
              </div>

              <div className={styles.registerUsing}>
                <div className={styles.registerText}>Register Using</div>
                <div className={styles.rememberText}>
                  (Remember your selection for Login)
                </div>
              </div>

              <div className={styles.toggleOptions}>
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

                {/* <label className={styles.toggleLabel}>
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
                </label> */}
        </div>
        {/*  email content */}
        {/* {loginMethod === "email" && (
                <div className={styles.emailContent}>
                  <div className={styles.inputWrapper}>
                    <div
                      className={styles.inputWithIcon}
                      style={{ marginTop: "20px", marginRight: "90px" }}
                    >
                      <TextField
                        id="name"
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                      />

                    </div>
                       {errors.name && <p className={styles.errormessage}>{errors.name}</p>}
                  </div>
                  <div className={styles.inputContainer}>
                    <div className={styles.inputWrapper}>
                      <div
                        className={styles.inputWithIcon}
                        style={{ marginTop: "0px", marginRight: "90px" }}
                      >
                        <TextField
                          id="email"
                          label="Email ID"
                          value={emailOrMobile}
                          onChange={(e) => setemailOrMobile(e.target.value)}
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
                        />

                      </div>
                                {errors.emailOrMobile && <p className={styles.errormessage}>{errors.emailOrMobile}</p>}
                    </div>

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
                                {showPassword ? <FaEye/> : <FaEyeSlash />}
                              </div>
                            ),
                          }}
                          type={showPassword ? "text" : "password"}
                        />

                      </div>
                                {errors.password && <p className={styles.errormessage}>{errors.password}</p>}

                      <div className={styles.inputWrapper}>
                        <div
                          className={styles.inputWithIcon}
                          style={{ marginTop: "20px", marginRight: "87px" }}
                        >
                          <TextField
                            id="password"
                            label="Confirm Password"
                            value={confirmpassword}
                            onChange={(e) => setConfirmpassword(e.target.value)}
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
                                  {showPassword ? <FaEye/> : <FaEyeSlash />}
                                </div>
                              ),
                            }}
                            type={showPassword ? "text" : "password"}
                          />

                        </div>
                           {errors.confirmpassword && <p className={styles.errormessage}>{errors.confirmpassword}</p>}
                        {errorMessage && (
                          <p className={styles.errormessage}>{errorMessage}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )} */}

        {/* Mobile content */}
        {/* {loginMethod === "mobile" && (
                <div className={styles.mobileContent}>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#454B60",
                      marginRight: "210px",
                    }}
                  >
                    Enter your mobile number
                  </p>
                  <div className={styles.inputWrapper}>
                    <div
                      className={styles.inputWithIcon}
                      style={{ marginTop: "20px", marginRight: "90px" }}
                    >
                      <TextField
                        id="name"
                        label="Name"
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
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    {errors.name && <p className={styles.errormessage}>{errors.name}</p>}

                  </div>
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
                        value={emailOrMobile}
                        onChange={(e) => setemailOrMobile(e.target.value)}
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
                            backgroundSize: "19px 16px",
                            backgroundPosition: "10px center",
                            backgroundRepeat: "no-repeat",
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#F0EFFF",
                            border: "none",
                            fontFamily: "poppins",
                            paddingLeft: "10px",
                            borderRadius: "10px",
                          },
                        }}
                      />
                      
                      <button
                        onClick={handleSignUp1}
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          width: "100px",
                          height: "50px",
                          backgroundColor: "#1A73E8",
                          color: "#ffffff",
                          border: "none",
                          borderRadius: "10px",
                          cursor: "pointer",
                        }}
                      >
                        Send OTP
                      </button>
                    </div>
                    {errors.emailOrMobile && <p className={styles.errormessage}>{errors.emailOrMobile}</p>}

                  </div>
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
                                {showPassword ?  <FaEye/> : <FaEyeSlash />}
                              </div>
                            ),
                          }}
                          type={showPassword ? "text" : "password"}
                        />
                      </div>
                      {errors.password && <p className={styles.errormessage}>{errors.password}</p>}

                      <div className={styles.inputWrapper}>
                        <div
                          className={styles.inputWithIcon}
                          style={{ marginTop: "20px", marginRight: "87px" }}
                        >
                          <TextField
                            id="password"
                            label="Confirm Password"
                            value={confirmpassword}
                            onChange={(e) => setConfirmpassword(e.target.value)}
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
                                  {showPassword ?  <FaEye/> : <FaEyeSlash />}
                                </div>
                              ),
                            }}
                            type={showPassword ? "text" : "password"}
                          />
                        </div>
                        {errors.confirmpassword && <p className={styles.errormessage}>{errors.confirmpassword}</p>}

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
                        />
                      </div>
                    </div>
                  )}
                </div>
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
              > */}
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
      </div>
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
                    width: "20px",
                    height: "20px",
                  }}
                  checked={termsChecked}
                  onChange={() => setTermsChecked(!termsChecked)}
                />
                <span className={styles.span}>
                  {" "}
                  I agree with the terms and conditions
                </span> */}
      {/* <label
                  htmlFor="termsCheckbox"
                  className={styles.checkboxLabel}
                  style={{ marginRight: "80px", marginLeft: "20px"  }}
                >
                  I agree with the terms and conditions
                </label> */}
      {/* </div> */}
      {/* {loginMethod === "email" && (
                <button
                  onClick={handleSignUp1}
                  // onSubmit={handleVerification}
                  className={styles1.loginButton}
                >
                  Sign Up
                </button>
              )} */}
      {/* <button
                onClick={handleSignUp1}

                // onSubmit={handleVerification}
                className={styles.loginButton}
              >
                Sign Up
              </button> */}
      {/* {loginMethod === "mobile" && (
                <button
                  onClick={handleVerification}
                  className={styles1.loginButton}
                >
                  Sign Up
                </button>
              )} */}
      {/* <button onClick={handleVerification}>Verify</button> */}
      {/* </> */}
      {/* )} */}
    </div>
    </div>
  );
};

export default register;
