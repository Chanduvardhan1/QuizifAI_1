import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import { useRouter } from "next/router";
import "./contactus.css";
import TextField from "@mui/material/TextField";
import Lady from "../assets/Images/images/contact/lady.png";
import ContactMail from "../assets/Images/images/contact/ContactMail.png";
// import Head from "next/head";
import LastNameIcon from "../../src/assets/Images/images/contact/last.png";
import PhoneIcon from "../../src/assets/Images/images/contact/mobile.png";
import EmailIcon from "../../src/assets/Images/images/contact/mailImg.png";
import MessageIcon from "../../src/assets/Images/images/contact/msg.png";
import { useNavigate } from "react-router-dom";
import Navbarhome from "../navbarhome/navbarhome";
import HeaderSection from "../HeaderSection/HeaderSection";


function contactus() {
  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [message, setMessage] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  // const router = useRouter();

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/contact");
  };

  const handleClick1 = () => {
    navigate("/");
  };

  const submitContactForm = async () => {
    const data = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      email_address: userEmail,
      message: message,
    };

    setSubmitted(true);


    const setPhoneNumber = (e) =>{
         const inputValue = e.target.value;
         if (/^[0-9]{10}$/.test(inputValue)){
          setPhoneNumber(inputValue);
         }
    }
    try {
      const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

      if (!authToken) {
        console.error('No authentication token found');
        return;
      }
      const response = await fetch(
        "https://quizifai.com:8010/contact_us_email",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();
      console.log(responseData);
      // Handle response data as needed
      if (responseData.response === "success") {
        // if (Array.isArray(responseData.message) && responseData.message.length > 0) {
        //   // Assuming you want to display the first message in the array
        //   console.log(responseData.message[0]);
        navigate("/contact1");
        }
      else {
        // Handle other response scenarios
        // For example, if response is not success
        // You can show an error message
        setError("There was an error processing your request. Please try again later.");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      // Handle error
      // For example, show a generic error message
      setError("An unexpected error occurred. Please try again later.");
    }
  };
  return (
    <div className="">
     <HeaderSection/>
      <div className="p-5 w-full">
          <div className="flex justify-between md:flex-row">
          <div className="flex flex-col pl-[100px] md:w-1/2">
            <img
              src={Lady}
              alt="Image Description"
              width={400}
              height={400}
              layout="fixed"
              objectFit="cover"
            />
            {/* Second Logo */}
            <div className="emailcontact">
            <img
              src={ContactMail}
              alt="Logo 2"
              width={40}
              height={40}
            />
            <span
              style={{
                fontSize: "12px",
                color: "#214082",
                fontWeight: 600,
                fontFamily: "poppins",
                display:"flex",
                gap:"5px"
                
              }}
            >

             <span> <a href="mailto:info@quizifai.com" className="ContactMail1">info@quizifai.com</a></span>
              <span className="line">|</span>
              <span> <a href="mailto:sales@quizifai.com" className="ContactMail2">sales@quizifai.com</a></span>
            </span>
            </div>

            </div>
            <div className="outerBox2">
            <h1
              style={{
                color: "#0B3A55",
                fontFamily: "Open Sans",
                fontWeight: 600,
                fontSize: "30px",
              }}
            >
              Get in Touch With Us
            </h1>

            <div className="outerBox" >
              <div className="innerBox">
                <div className="contactForm">
                  <div className="formRow">
                    <div
                      className="icon"
                      style={{
                        backgroundImage: `url('/images/email/mail.png')`,
                      }}>                       
                      </div>
                    <TextField
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
                        // backgroundImage: `url('/images/contact/first.png')`,
                        //backgroundSize: "19px 16px",
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
                  />
                    <div
                      className="icon"
                      style={{ backgroundImage: `url(${LastNameIcon})` }}>                       
                      </div>                 
                  <TextField
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
                        // backgroundImage: `url('/images/contact/first.png')`,
                        //backgroundSize: "19px 16px",
                        backgroundPosition: "120px center",
                        backgroundRepeat: "no-repeat",
                        width: "170px",
                        height: "50px",
                        border: "none",
                        fontFamily: "poppins",
                        fontSize: "15px",
                        borderRadius: "10px",
                        marginLeft: "20px",
                        // paddingLeft:"30px",
                       backgroundColor:"white",
                      },
                      autoComplete: "off",
                    }}
                    value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                  />
                    
                  </div>
                  <div className="formRow">
                    <div
                      className="icon"
                      style={{ backgroundImage: `url(${PhoneIcon})` }}>                        
                      </div>             
                  <TextField
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
                        // backgroundImage: `url('/images/contact/first.png')`,
                        //backgroundSize: "19px 16px",
                        backgroundPosition: "120px center",
                        backgroundRepeat: "no-repeat",
                        width: "340px",
                        height: "50px",
                        border: "none",
                        fontFamily: "poppins",
                        fontSize: "15px",
                        borderRadius: "10px",
                        // paddingLeft:"30px",
                        backgroundColor:"white",
                      },
                      autoComplete: "off",
                    }}
                    value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  </div>
                  <div className="formRow">
                    <div
                      className="icon"
                      style={{ backgroundImage: `url(${EmailIcon})` }}>
                      </div>

                   <TextField
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
                        // backgroundImage: `url('/images/contact/first.png')`,
                        //backgroundSize: "19px 16px",
                        backgroundPosition: "120px center",
                        backgroundRepeat: "no-repeat",
                        width: "340px",
                        height: "50px",
                        border: "none",
                        fontFamily: "poppins",
                        fontSize: "15px",
                        borderRadius: "10px",
                        // paddingLeft:"30px",
                        backgroundColor:"white",
                      },
                      autoComplete: "off",
                    }}
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                  </div>
                  <div className="formRow">
                    <div
                      className="icon"
                      style={{ backgroundImage: `url(${MessageIcon})` }}></div>                   

                  <TextField
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
                        // backgroundImage: `url('/images/contact/first.png')`,
                        //backgroundSize: "19px 16px",
                        backgroundPosition: "120px center",
                        backgroundRepeat: "no-repeat",
                        width: "340px",
                        height: "70px",
                        border: "none",
                        fontFamily: "poppins",
                        fontSize: "15px",
                        borderRadius: "10px",
                        // paddingLeft:"30px",
                        backgroundColor:"white",
                      },
                      autoComplete: "off",
                    }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  </div>
                  {/* <Navigate to={"/contact"}> */}
                  <div className="sendbutton1">
                  <button 
                    className="sendbutton"
                      style={{
                      width: "80px",
                      height: "29.8px",
                      // position: "absolute",
                      // top: "315.2px",
                      // left: "280.9px",
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
                  </button>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>     
      </div>
    </div>
  );
}

export default contactus;