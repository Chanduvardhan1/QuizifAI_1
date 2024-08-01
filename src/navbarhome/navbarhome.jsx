import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
import "./navbarhome.css";
import quizifailogo from "../assets/Images/images/home/Quizifai3.png";
import aiImage from "../../src/assets/Images/images/home/ai-img.png";
import homeImage from "../../src/assets/Images/images/home/home-img.png";
// import Head from "next/head";
import FirstNameIcon from "../../src/assets/Images/images/contact/first.png";
import LastNameIcon from "../../src/assets/Images/images/contact/last.png";
import PhoneIcon from "../../src/assets/Images/images/contact/mobile.png";
import EmailIcon from "../../src/assets/Images/images/contact/mailImg.png";
import MessageIcon from "../../src/assets/Images/images/contact/msg.png";
import signupIcon from "../../src/assets/Images/images/home/signup.png";
import loginIcon from "../../src/assets/Images/images/home/login.png";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function navbarhome() {
  const [firstName, setFirstName] = useState("");
  const [message, setMessage] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  // const router = useRouter();

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/contact");
  };

  const handleClick1 = () => {
    navigate("/");
  };
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const token = searchParams.get('token');
  // useEffect(() => {
  //   if (token) {
  //     const requestOptions = {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'accept': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         verify_option: "string",
  //         email_or_mobile: "string",
  //         otp: "string"
  //       })
  //     };

  //     fetch('https://nt-adhyn.centralindia.cloudapp.azure.com:8010/verification', requestOptions)
  //       .then(response => response.json())
  //       .then(token => {
  //         // Handle the verification result here
  //         console.log('Verification Result:', token);
  //         setVerificationResult(token);
  //       })
  //       .catch(error => {
  //         console.error('Error:', error);
  //         // Handle error if any
  //       });
  //   }
  // }, [token]);
  const [verificationResponse, setVerificationResult] = useState("");

  // const { email } = router.query;
  // const { email } = "";

  // console.log("email:", email);
 
  // // Ensure email value is properly populated before calling handleVerification
  // if (router.query && router.query.email) {
  //   const email = router.query.email;
  //   handleVerification(email); // Call handleVerification function with email value
  // } else {
  //   console.error('Email not found in router query');
  // }
  // useEffect(() => {
  //   if (email) {
  //     const requestOptions = {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'accept': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         verify_option: email,
  //         email_or_mobile: email,
  //         otp: "string"
  //       })
  //     };

  //     fetch('https://nt-adhyn.centralindia.cloudapp.azure.com:8010/verification', requestOptions)
  //       .then(response => response.json())
  //       .then(email => {
  //         console.log('Verification Result:', email);
  //         setVerificationResult(email);
  //       })
  //       .catch(error => {
  //         console.error('Error:', email);
  //         // Handle error if any
  //       });
  //   }
  // }, [email]);

  // Now you have access to the token

  const submitContactForm = async () => {
    const data = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      email_address: userEmail,
      message: message,
    };

    try {
      const response = await fetch(
        "https://quizifai.com:8010/contact_us_email",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setFirstName("");
      setMessage("");
      setLastName("");
      setPhoneNumber("");

      setUserEmail("");
      const responseData = await response.json();
      console.log(responseData); // Handle response data as needed
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      // Handle error
    }
  };
  return (
    <div className="container">
      {/* <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head> */}
    <header className="header1">
        <div className="logo">
          <Link to={"/"}>
            <img src={quizifailogo} alt="Logo" width={160} height={63} />
          </Link>
        </div>
        <nav className="navigation">
          <ul>
            <li  onClick={handleClick1} className="navItem">
              Home
            </li>
            {/* <li onClick={() => setActiveSection("pricing")} className="navItem">
              Pricing
            </li> */}

           
            <li className="buttons">
              <Link to={"/signup"}>
                <button
                  className="signup"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  // onClick={handleClick}
                >
                  {/* <img
                    src={signupIcon}
                    alt="Signup Icon"
                    className="icon"
                    style={{ marginRight: "10px" }}
                  /> */}
                  Sign Up
                </button>
              </Link>
            </li>
            <li className="buttons">
              <Link to="/login">
                <button
                  className="login"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  // onClick={handleClick1}
                >
                  {/* <img
                    src={loginIcon}
                    alt="Login Icon"
                    className="icon"
                    style={{ marginRight: "10px" }}
                  /> */}
                  Login
                </button>
              </Link>
            </li>
            <li  onClick={handleClick} className="navItem">
              Contact Us
            </li>
          </ul>
        </nav>
      </header>
      {/* <div className="content"> */}
        {/* {activeSection === "home" && (
          <div className="textContent">
            <h1>
              <span className="line1">Exploring online resources for</span>
              <br />
              <span className="line2">AI-generated exams and quizzes?</span>
            </h1>
            <div className="line3Container" style={{ position: "relative" }}>
            <Link to={"/signup"}>
              <button
                className="backgroundButton"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "132px",
                  height: "41px",
                  position: "absolute",
                  zIndex: 1,
                  backgroundColor: "darkblue",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  left: "-30px",
                  textAlign: "center",
                  marginTop: "230px",
                  marginLeft: "940px",
                
                }}
              >
                <span className="line3">Try QuizifAI</span>
              </button>
              </Link>
              <div
                className="aiImage"
                style={{
                  position: "relative",
                  marginLeft: "158px",
                  marginTop: "-40px",
                }}
              >
                {/* <img src={aiImage} alt="AI Image" width={380} height={346} /> */}
              {/* </div>
            </div>
            <div className="homeImage">
              <img src={homeImage} alt="home Image" width={820} height={566} />
            </div>
          </div> */}
        {/* )}  */}
        {/* {activeSection === "pricing" && (
          <div className="pricingContent">
            <h1>Pricing</h1>
            {/* Pricing content */}
          {/* </div> */}
        {/* )}  */}
        {/* {activeSection === "contact" && (
          <div className="contactContent">
            <img
              src="/images/contact/question3.png"
              alt="Image Description"
              width={300}
              height={300}
              layout="fixed"
              objectFit="cover"
              style={{
                position: "absolute",
                top: "174px",
                left: "270px",
              }}
            />
            <img
              src="/images/contact/whatsapp.png"
              alt="Logo 1"
              width={40}
              height={40}
              style={{
                position: "absolute",
                top: "500px",
                left: "200px",
              }}
            />
            <p
              style={{
                position: "absolute",
                top: "480px",
                left: "250px",
                fontSize: "12px",
                color: "#214082",
                fontWeight: 600,
                fontFamily: "poppins",
              }}
            >
              +91 9611291621 - Sales and Services <br></br>+91 9663901621 -
              Hiring Queries <br></br>+91 8297902227 - Whatsapp
            </p>

            {/* Second Logo */}
            {/* <img
              src="/images/contact/mail2.png"
              alt="Logo 2"
              width={40}
              height={40}
              style={{
                position: "absolute",
                top: "570px",
                left: "200px",
              }}
            />
            <p
              style={{
                position: "absolute",
                top: "560px",
                left: "250px",
                fontSize: "12px",
                color: "#214082",
                fontWeight: 600,
                fontFamily: "poppins",
              }}
            >
              info@narmtech.com<br></br>
              hr@narmtech.com
            </p>

            {/* Third Logo */}
            {/* <img
              src="/images/contact/address.png"
              alt="Logo 3"
              width={40}
              height={40}
              style={{
                position: "absolute",
                top: "640px",
                left: "200px",
              }}
            /> */}
            {/* <p
              style={{
                position: "absolute",
                top: "630px",
                left: "250px",
                fontSize: "12px",
                color: "#214082",
                fontWeight: 600,
                fontFamily: "poppins",
              }}
            >
              #92, 3rd Main, Virgo Nagar, Post, <br></br>Seegehalli, Bengaluru,
              Karnataka 560049
            </p>
            <h1
              style={{
                position: "absolute",
                left: "870px",
                top: "100px",
                color: "#0B3A55",
                fontFamily: "Open Sans",
                fontWeight: 600,
                fontSize: "30px",
              }}
            >
              Get in Touch With Us
            </h1>  */}

            {/* <div className="outerBox" style={{ marginLeft: "150px" }}>
              <div className="innerBox">
                <div className="contactForm">
                  <div className="formRow">
                    <div
                      className="icon"
                      style={{
                        backgroundImage: `url('/images/email/mail.png')`,
                      }}
                    ></div>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="inputField"
                      style={{
                        backgroundImage: `url('/images/contact/first.png')`,
                        backgroundSize: "23px 20px",
                        backgroundPosition: "10px center",
                        backgroundRepeat: "no-repeat",
                        width: 120,
                        height: 47,
                        top: "0px",
                        marginRight: "20px",
                        border: "none",
                        fontFamily: "poppins",
                        paddingLeft: "40px",
                        borderRadius: "10px",
                        color: "#D7D7D7",
                      }}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <div
                      className="icon"
                      style={{ backgroundImage: `url(${LastNameIcon})` }}
                    ></div>
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="inputField"
                      style={{
                        backgroundImage: `url('/images/contact/last.png')`,
                        backgroundSize: "23px 20px",
                        backgroundPosition: "10px center",
                        backgroundRepeat: "no-repeat",
                        width: 120,
                        height: 47,
                        top: "0px",
                        border: "none",
                        fontFamily: "poppins",
                        paddingLeft: "40px",
                        borderRadius: "10px",
                      }}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className="formRow">
                    <div
                      className={styles.icon}
                      style={{ backgroundImage: `url(${PhoneIcon})` }}
                    ></div>
                    <input
                      type="text"
                      placeholder="Your Number"
                      className="inputField"
                      style={{
                        backgroundImage: `url('/images/contact/mobile.png')`,
                        backgroundSize: "26px 30px",
                        backgroundPosition: "5px center",
                        backgroundRepeat: "no-repeat",
                        width: 300,
                        height: 47,
                        border: "none",
                        fontFamily: "poppins",
                        paddingLeft: "40px",
                        borderRadius: "10px",
                      }}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="formRow">
                    <div
                      className={styles.icon}
                      style={{ backgroundImage: `url(${EmailIcon})` }}
                    ></div>
                    <input
                      type="email"
                      placeholder="Your Email Address"
                      className="inputField"
                      style={{
                        backgroundImage: `url('/images/contact/mailImg.png')`,
                        backgroundSize: "19px 16px",
                        backgroundPosition: "10px center",
                        backgroundRepeat: "no-repeat",
                        width: 300,
                        height: 47,
                        // border: "none",
                        fontFamily: "poppins",
                        paddingLeft: "40px",
                        borderRadius: "10px",

                        outline: "none",
                        border: "none",
                      }}
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                  </div>
                  <div className="formRow">
                    <div
                      className={styles.icon}
                      style={{ backgroundImage: `url(${MessageIcon})` }}
                    ></div>
                    <textarea
                      placeholder="Your Message"
                      className="inputField"
                      style={{
                        display: "flex",
                        backgroundImage: `url('/images/contact/msg.png')`,
                        backgroundSize: "19px 16px",
                        backgroundPosition: "10px 5px",
                        backgroundRepeat: "no-repeat",
                        width: 300,
                        height: 77,
                        border: "none",
                        fontFamily: "poppins",
                        paddingLeft: "40px",
                        borderRadius: "10px",
                        alignItems: "flex-start",
                      }}
                      rows={8}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <button
                    style={{
                      width: "137.8px",
                      height: "29.8px",
                      position: "absolute",
                      top: "346.2px",
                      left: "240.9px",
                      backgroundColor: "#223F80",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "20px",
                      fontFamily: "poppins",
                      fontSize: "16px",
                      fontWeight: "700px",
                      cursor: "pointer",
                    }}
                    onClick={submitContactForm}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div> */}
          {/* </div> */}
        {/* )}  */}
      {/* </div> */}
    </div>
  );
}

export default navbarhome;