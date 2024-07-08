import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import { useRouter } from "next/router";
import "./home.css";
import TextField from "@mui/material/TextField";
import quizifailogo from "../assets/Images/images/home/Quizifai3.png";
import Lady from "../assets/Images/images/contact/lady.png";
import ContactMail from "../assets/Images/images/contact/ContactMail.png";
import aiImage from "../../src/assets/Images/images/home/ai-img.png";
import homeImage from "../../src/assets/Images/images/home/home.jpg";
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


function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [message, setMessage] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  // const router = useRouter();

  const navigate = useNavigate();
  const handleClick = () => {
    // router.push("/signup");
  };

  const handleClick1 = () => {
    // router.push("/");
  };

  const handleClick3 = () => {
    navigate("/contact");
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
    // Swal.fire("Your message has been sent to our QuizifAi team take an deep breath our team will reach you within 24hours");
    const data = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      email_address: userEmail,
      message: message,
    };

    setSubmitted(true);
    // if (firstName.trim() === "") {
    //   setFirstName("");
    // } else {
    //   setFirstName("");
    // }

    // if (lastName.trim() === "") {
    //   setLastName("");
    // } else {
    //   setLastName("");
    // }

    // if(phoneNumber.trim() === "")  {
    //   setPhoneNumber("");
    // } else {
    //   setPhoneNumber("");
    // }

    // if (userEmail.trim() === "") {
    //   setUserEmail("");
    // } else {
    //   setUserEmail("");
    // }

    // if (message.trim() === "") {
    //   setMessage("");
    // } else {
    //   setMessage("");
    // }

    const setPhoneNumber = (e) =>{
         const inputValue = e.target.value;
         if (/^[0-9]{10}$/.test(inputValue)){
          setPhoneNumber(inputValue);
         }
    }

    const setUserEmail = (e) => {
      const inputValue = e.target.value;
      if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue)) {
        setUserEmail(inputValue);
      };
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
      console.log(responseData);
       // Handle response data as needed
       navigate("/contact");
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
      <header className="header">
        <div className="logo">
          <Link to={"/"}>
            <img src={quizifailogo} alt="Logo" width={160} height={63} />
          </Link>
        </div>
        <nav className="navigation">
          <ul>
            <li onClick={() => setActiveSection("home")} className="navItem">
              Home
            </li>
            {/* <li onClick={() => setActiveSection("pricing")} className="navItem">
              Pricing
            </li> */}
          
            <li  onClick={handleClick3} className="navItem">
         
              Contact Us
             
            </li>

            <li className="buttons">
              <Link to={"/signup"}>
                <button
                  className="signup"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={handleClick}
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
                  onClick={handleClick1}
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
          </ul>
        </nav>
      </header>
      <div className="content">
      <div className="homeImage">
        <div className="homeImage1"> 

              <img src={homeImage} alt="home Image" width={550} height={496}   />
        </div>
            </div>
        {activeSection === "home" && (
           <div className="textContent">
          <div className="textContent1">
            <h1>
              <span className="line1">Exploring online resources for</span>
              <br />
              <span className="line2">AI-generated Exams and Quizzes?</span>
            </h1>
            <div className="line3Container">
            <Link to={"/signup"} className="link">
              <button
                className="backgroundButton"
                // style={{
               
                //   width: "103px",
                //   height: "36px",
                 
                //   backgroundColor: "darkblue",
                //   borderRadius: "10px",
                //   border: "none",
                //   cursor: "pointer",
               
                
                // }}
              >
                Try QuizifAI
                {/* <span className="line3">Try QuizifAI</span> */}
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
              </div>
            </div>
          </div>
          </div>
        )}

        {/* {activeSection === "pricing" && (
          <div className="pricingContent">
            <h1>Pricing</h1>
            Pricing content
          </div>
        )} */}
        {/* {activeSection === "contact" && ( */}
          {/* <div className="contactContent"> */}
            {/* <img
              src={Lady}
              alt="Image Description"
              width={400}
              height={400}
              layout="fixed"
              objectFit="cover"
              style={{
                position: "absolute",
                top: "102px",
                left: "220px",
              }}
            /> */}
            {/* <img
              src="/images/contact/whatsapp.png"
              alt="Logo 1"
              width={40}
              height={40}
              style={{
                position: "absolute",
                top: "500px",
                left: "200px",
              }}
            /> */}

            {/* <p
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
            </p> */}

            {/* Second Logo */}
            {/* <img
              src={ContactMail}
              alt="Logo 2"
              width={30}
              height={30}
              style={{
                position: "absolute",
                top: "470px",
                left: "260px",
              }}
            /> */}
            {/* <p
              style={{
                position: "absolute",
                top: "460px",
                left: "299px",
                fontSize: "12px",
                color: "#214082",
                fontWeight: 600,
                fontFamily: "poppins",
                
              }}
            > */}
              {/* <a href="mailto:info@quizifai.com" className="ContactMail1">info@quizifai.com</a>
              <p className="line">|</p><br/>
              <a href="mailto:sales@quizifai.com" className="ContactMail2">sales@quizifai.com</a>
            </p> */}

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
            />
            <p
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
            </p> */}
            {/* <h1
              style={{
                position: "absolute",
                left: "813px",
                top: "80px",
                color: "#0B3A55",
                fontFamily: "Open Sans",
                fontWeight: 600,
                fontSize: "30px",
              }}
            >
              Get in Touch With Us
            </h1> */}

            {/* <div className="outerBox" style={{ marginLeft: "40px" }}> */}
              {/* <div className="innerBox"> */}
                {/* <div className="contactForm"> */}
                  {/* <div className="formRow"> */}
                    {/* <div
                      className="icon"
                      style={{
                        backgroundImage: `url('/images/email/mail.png')`,
                      }}
                    ></div> */}
                    {/* <TextField
                      id="First Name"
                      label="First Name"
                      variant="outlined"
                      required
                      error={submitted && firstName.trim() === ""}
                       helperText={
                         submitted && firstName.trim() === ""
                           ? "First Name is required"
                           : ""
                       }
                      className="inputField"
                      InputProps={{
                        style: {
                          backgroundImage: `url('/images/contact/first.png')`,
                        // backgroundSize: "23px 20px",
                        backgroundPosition: "145px",
                        backgroundRepeat: "no-repeat",
                        width: "180px",
                        height: "50px",
                        top: "0px",
                        marginRight: "30px",
                        border: "none",
                        fontSize:"10px",
                        fontFamily: "poppins",
                        borderRadius: "10px",
                        color: "#D7D7D7"
                        },
                        autoComplete: "off",
                      }}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    /> */}
                    {/* <TextField
                    id="FirstName"
                    label="First Name"
                    variant="outlined"
                    type="text"
                    error={submitted && firstName.trim() === ""}
                    helperText={
                      submitted && firstName.trim() === ""
                        ? "Name is required"
                        : ""
                    }
                    
                    style={{ width: "150px", height: "44px" }}
                    InputLabelProps={{
                      style: { fontFamily: "poppins" },
                    }}
                    InputProps={{
                      style: {
                        backgroundImage: `url('/images/contact/first.png')`,
                        backgroundSize: "19px 16px",
                        backgroundPosition: "120px center",
                        backgroundRepeat: "no-repeat",
                        width: "160px",
                        height: "50px",
                        border: "none",
                        fontFamily: "poppins",
                        fontSize: "15px",
                        borderRadius: "10px",
                        backgroundColor:"white",
                        
                      },
                      autoComplete: "off",
                    }}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  /> */}
                    {/* <div
                      className="icon"
                      style={{ backgroundImage: `url(${LastNameIcon})` }}
                    ></div> */}
                    {/* <TextField
                       id="Last Name"
                       label="Last Name"
                       variant="outlined"
                       required
                       error={submitted && lastName.trim() === ""}
                        helperText={
                          submitted && lastName.trim() === ""
                            ? "Last Name is required"
                            : ""
                        }
                      className="inputField"
                      style={{
                        backgroundImage: `url('/images/contact/last.png')`,
                        backgroundSize: "23px 20px",
                        backgroundPosition: "120px",
                        backgroundRepeat: "no-repeat",
                        width: 180,
                        height: "50px",
                        top: "0px",
                        border: "none",
                        fontFamily: "poppins",
                        borderRadius: "10px",
                      }}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    /> */}
                  
                  {/* <TextField
                    id="LastName"
                    label="Last Name"
                    variant="outlined"
                    type="text"
                    error={submitted && lastName.trim() === ""}
                    helperText={
                      submitted && lastName.trim() === ""
                        ? "Name is required"
                        : ""
                    }
                    
                    style={{ width: "150px", height: "44px" }}
                    InputLabelProps={{
                      style: { fontFamily: "poppins",
                                paddingLeft: "27px"},
                              
                    }}
                    InputProps={{
                      style: {
                        backgroundImage: `url('/images/contact/first.png')`,
                        backgroundSize: "19px 16px",
                        backgroundPosition: "120px center",
                        backgroundRepeat: "no-repeat",
                        width: "170px",
                        height: "50px",
                        border: "none",
                        fontFamily: "poppins",
                        fontSize: "15px",
                        borderRadius: "10px",
                        marginLeft: "20px",
                        paddingLeft:"30px",
                       backgroundColor:"white",
                      },
                      autoComplete: "off",
                    }}
                    value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                  /> */}
                    
                  {/* </div> */}
                  {/* <div className="formRow"> */}
                    {/* <div
                      className="icon"
                      style={{ backgroundImage: `url(${PhoneIcon})` }}
                    ></div> */}
                    {/* <TextField
                     id="Number"
                     label="Number"
                     variant="outlined"
                     required
                     error={submitted && phoneNumber.trim() === ""}
                      helperText={
                        submitted && phoneNumber.trim() === ""
                          ? "Number is required"
                          : "" 
                      }
                      className="inputField"
                      style={{
                        backgroundImage: `url('/images/contact/mobile.png')`,
                        backgroundSize: "26px 30px",
                        backgroundPosition: "310px",
                        backgroundRepeat: "no-repeat",
                        width: 350,
                        height: 65,
                        border: "none",
                        fontFamily: "poppins",
                        borderRadius: "10px",
                      }}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    /> */}

                  {/* <TextField
                   id="MobileNumber"
                   type="tel"
                   label="Mobile Number"
                   variant="outlined"
                    error={submitted && phoneNumber.trim() === ""}
                    helperText={
                      submitted && phoneNumber.trim() === ""
                        ? "Number is required"
                        : ""
                    }
                    style={{ width: "160px", height: "44px" }}
                    InputLabelProps={{
                      style: { fontFamily: "poppins" },
                    }}
                    InputProps={{
                      style: {
                        backgroundImage: `url('/images/contact/first.png')`,
                        backgroundSize: "19px 16px",
                        backgroundPosition: "120px center",
                        backgroundRepeat: "no-repeat",
                        width: "340px",
                        height: "50px",
                        border: "none",
                        fontFamily: "poppins",
                        fontSize: "15px",
                        borderRadius: "10px",
                        paddingLeft:"30px",
                        backgroundColor:"white",
                      },
                      autoComplete: "off",
                    }}
                    value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                  /> */}
                  {/* </div> */}
                  {/* <div className="formRow"> */}
                    {/* <div
                      className="icon"
                      style={{ backgroundImage: `url(${EmailIcon})` }}
                    ></div> */}
                    {/* <TextField
                      id="Email Address"
                      label="Email Address"
                      variant="outlined"
                      required
                      error={submitted && userEmail.trim() === ""}
                       helperText={
                         submitted && userEmail.trim() === ""
                           ? "Email Address required"
                           : "" 
                       }
                      className="inputField"
                      style={{
                        backgroundImage: `url('/images/contact/mailImg.png')`,
                        backgroundSize: "19px 16px",
                        backgroundPosition: "310px",
                        backgroundRepeat: "no-repeat",
                        width: 350,
                        height: 65,
                        // border: "none",
                        fontFamily: "poppins",
                        borderRadius: "10px",
                        outline: "none",
                        border: "none",
                      }}
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                    /> */}

                   {/* <TextField
                    id="Email"
                    label="Email"
                    variant="outlined"
                    error={submitted && userEmail.trim() === ""}
                    helperText={
                      submitted && userEmail.trim() === ""
                        ? "Mail is required"
                        : ""
                    }
                    style={{ width: "150px", height: "44px" }}
                    InputLabelProps={{
                      style: { fontFamily: "poppins" },
                    }}
                    InputProps={{
                      style: {
                        backgroundImage: `url('/images/contact/first.png')`,
                        backgroundSize: "19px 16px",
                        backgroundPosition: "120px center",
                        backgroundRepeat: "no-repeat",
                        width: "340px",
                        height: "50px",
                        border: "none",
                        fontFamily: "poppins",
                        fontSize: "15px",
                        borderRadius: "10px",
                        paddingLeft:"30px",
                        backgroundColor:"white",
                      },
                      autoComplete: "off",
                    }}
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  /> */}
                  {/* </div> */}
                  {/* <div className="formRow"> */}
                    {/* <div
                      className="icon"
                      style={{ backgroundImage: `url(${MessageIcon})` }}
                    ></div> */}
                    {/* <TextField
                     id="Your Message"
                     label="Your Message"
                     variant="outlined"
                     required
                      error={submitted && message.trim() === ""}
                       helperText={
                         submitted && message.trim() === ""
                           ? "Your message required"
                           : "" 
                       }
                      className="inputField"
                      style={{
                        display: "flex",
                        backgroundImage: `url('/images/contact/msg.png')`,
                        backgroundSize: "19px 16px",
                        backgroundPosition: "310px",
                        backgroundRepeat: "no-repeat",
                        width: 350,
                        height: 50,
                        // border: "none",
                        fontFamily: "poppins",
                        borderRadius: "10px",
                        outline: "none",
                        border: "none",
                      }}
                      rows={8}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    /> */}

                  {/* <TextField
                    id="yourmessage"
                    label="Your Message"
                    variant="outlined"
                    error={submitted && message.trim() === ""}
                    helperText={
                      submitted && message.trim() === ""
                        ? "message is required"
                        : ""
                    }
                    style={{ width: "150px", height: "44px" }}
                    InputLabelProps={{
                      style: { fontFamily: "poppins" },
                    }}
                    InputProps={{
                      style: {
                        backgroundImage: `url('/images/contact/first.png')`,
                        backgroundSize: "19px 16px",
                        backgroundPosition: "120px center",
                        backgroundRepeat: "no-repeat",
                        width: "340px",
                        height: "70px",
                        border: "none",
                        fontFamily: "poppins",
                        fontSize: "15px",
                        borderRadius: "10px",
                        paddingLeft:"30px",
                        backgroundColor:"white",
                      },
                      autoComplete: "off",
                    }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  /> */}
                  {/* </div> */}
                  {/* <Navigate to={"/contact"}> */}
                  {/* <button 
                    className="sendbutton"
                      style={{
                      width: "80px",
                      height: "29.8px",
                      position: "absolute",
                      top: "315.2px",
                      left: "280.9px",
                      backgroundColor: "#223F80",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "20px",
                      fontFamily: "poppins",
                      fontSize: "13px",
                      fontWeight: "700px",
                      cursor: "pointer",
                    }}
                    onClick={submitContactForm}
                  >
                    Send
                  </button> */}
                  {/* </Navigate> */}
                {/* </div> */}
              {/* </div> */}
            {/* </div>/ */}
          {/* </div> */}
        {/* )} */}
      </div>
    </div>
  );
}

export default Home;
