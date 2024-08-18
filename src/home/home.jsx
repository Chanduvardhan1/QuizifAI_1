import React, { useState} from "react";
import "./home.css";
import homeImage from "../../src/assets/Images/images/home/home.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HeaderSection from "../HeaderSection/HeaderSection";


function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [message, setMessage] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();

  const handleClick3 = () => {
    navigate("/contact");
  };
 
  // Now you have access to the token
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
    <div className="">
    <HeaderSection/>
    <div className="flex flex-col md:flex-row p-5">
  <div className="w-full md:w-1/2 pl-0 md:pl-20 mt-[-8px] flex justify-center">
    <img src={homeImage} alt="home Image" className="w-full" />
  </div>
  {activeSection === "home" && (
    <div className="w-full md:w-1/2 pr-0 md:pr-[70px] pt-4 md:pt-20 flex flex-col justify-center items-center md:items-end">
      <div className="relative mt-4 md:mt-[-152px]">
        <h1 className="text-xl font-Poppins font-bold text-[#555555] leading-[50px] text-center md:text-left">
          <span className="block">Exploring online resources for</span>
          <span className="block">AI-generated Exams and Quizzes?</span>
        </h1>
        <div className="flex flex-col items-center mt-4 ml-[120px] lg:ml-[1px]">
          <Link to={"/signup"} className="w-full">
            <button className="w-[103px] h-9 bg-[rgb(0,9,139)] text-white font-Poppins text-[13px] font-bold rounded-[10px] flex items-center justify-center hover:bg-[#EF512F] transition-transform transform hover:scale-110">
              Try QuizifAI
            </button>
          </Link>
        </div>
      </div>
    </div>
  )}
</div>
  </div>
  );
}

export default Home;
