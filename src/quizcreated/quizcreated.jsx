"use client";
import React, { useState } from "react";
// import Image from "next/image";

// Navbar-icons
import QuizifAilogo from "../../src/assets/Images/quiz-type/Quizifai 1.png";
import Dashboard from "../../src/assets/Images/quiz-type/Dashboard.png";
import Quiz from "../../src/assets/Images/quiz-type/Quiz.png";
import History from "../../src/assets/Images/quiz-type/History.png";
import Schedule from "../../src/assets/Images/quiz-type/Schedule.png";
import Notification from "../../src/assets/Images/quiz-type/Notification.png";
import QuizAdmin from "../../src/assets/Images/quiz-type/Quiz-admin.png";
import Profile from "../../src/assets/Images/quiz-type/Profile.png";
import Navigation from "../navbar/navbar.jsx";

// Main-Section-icons
import QuizTitle from "../../src/assets/Images/quiz-type/Quiz-Title.png";
import QuizCreatedBy from "../../src/assets/Images/quiz-type/Quiz-created-by.png";
import QuizDiscription from "../../src/assets/Images/quiz-type/Quiz-discription.png";
import HorizontalLine from "../../src/assets/Images/quiz-type/Horizontal-Line.png";
import Percentage from "../../src/assets/Images/quiz-type/Percentage.png";
import Easy from "../../src/assets/Images/quiz-type/Easy.png";
import Medium from "../../src/assets/Images/quiz-type/Medium.png";
import Complex from "../../src/assets/Images/quiz-type/Complex.png";
import Hash from "../../src/assets/Images/quiz-type/Hash.png";
import Camera from "../../src/assets/Images/quiz-type/Camera.png";
import MultipleAns from "../../src/assets/Images/quiz-type/Multiple-Answer.png";
import SubCategory from "../../src/assets/Images/quiz-type/Sub-Category.png";
import Clock from "../../src/assets/Images/quiz-type/Clock.png";
import Calender from "../../src/assets/Images/quiz-type/Calender.png";
import AiBot from "../../src/assets/Images/quiz-type/Ai-bot.png";
import Globe from "../../src/assets/Images/quiz-type/Globe.png";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { MdOutlineCancel } from "react-icons/md";


function quizcreated() {
  const [quizData, setQuizData] = useState(null);
  // Use useLocation hook to access the location object
  const location = useLocation();

  useEffect(() => {
    // Check if quizData exists in location state before accessing its properties
    if (location.state && location.state.quizData) {
      // Access the quizData from the location state
      const quizData = location.state.quizData;
      setQuizData(quizData.data)

      // Show quizData in the console
      console.log(quizData);
    }
  }, [location.state]);
  const navigate = useNavigate();
const Preview = () => {
  navigate("/quizview", { state: { quizData: quizData } });
};
const Edit = (quizId) => {
  // navigate(`/quizaccess/${quizId}`);
  localStorage.setItem('quiz_id', quizId); // Store quiz_id in local storage
  navigate(`/editmanuly`);
};
const Back = () => {
    
  navigate("/dashboard");

};
  return (
    <>
      <div className="flex">
        <Navigation/>
        {/* Navigation-Section */}
        {/* <header className="w-[219px] h-[1000px] absolute top-[-19px] left-[-9px] rounded-tl-[20px] rounded-bl-[20px] bg-[#F5F5FB] z-10 ">
          <div className="h-[300px] w-[270px]absolute top-[65px] left-[47px]">
            <img src={QuizifAilogo} alt="QuizifAi Logo Icon" />
          </div>

          {/* Navigation-icons */}
          {/* <div className="flex w-[15px] h-[15px] absolute top-[231px] left-[51px]">
            <img src={Dashboard} alt="Dashborad Image" />
            <a
              className="ml-5 -mt-0.5 text-Poppins font-medium text-[15px] leading-[22.5px] text-[#9696BB]"
              for=""
            >
              Dashboard
            </a>
          </div> */}

          {/* <div className="flex w-[16px] h-[15px] absolute top-[285px] left-[51px]">
            <img src={Quiz} alt="Quiz's Image" />
            <a
              className="ml-5 -mt-0.5 text-Poppins font-medium text-[15px] leading-[22.5px] text-[#9696BB]"
              for=""
            >
              Quiz
            </a>
          </div> */}

          {/* <div className="flex w-[13.87px] h-[15.41px] absolute top-[338px] left-[51px]">
            <img src={History} alt="History Image" />
            <a
              className="ml-5 -mt-0.5 text-Poppins font-medium text-[15px] leading-[22.5px] text-[#9696BB]"
              for=""
            >
              History
            </a>
          </div> */}

          {/* <div className="flex w-[17px] h-4 absolute top-[394px] left-[51px]">
            <img src={Schedule} alt="Schedule Image" />
            <a
              className="ml-4 -mt-0.5 text-Poppins font-medium text-[15px] leading-[22.5px] text-[#9696BB]"
              for=""
            >
              Schedule
            </a>
          </div> */}

          {/* <div className="flex w-4 h-[15px] absolute top-[453px] left-[51px]">
            <img src={Notification} alt="Notification Image" />
            <a
              className="ml-4 -mt-0.5 text-Poppins font-medium text-[15px] leading-[22.5px] text-[#9696BB]"
              for=""
            >
              Notification
            </a>
          </div> */}

          {/* <div className="flex w-[25.46px] h-[27.87px] absolute top-[508px] left-[51px]">
            <img className="-ml-2.5" src={QuizAdmin} alt="QuizAdmin Image" />
            <a
              className="ml-4 text-Poppins font-medium text-[15px] leading-[15px] text-nowrap text-[#30304F]"
              for=""
            >
              Quiz Admin
            </a>
          </div> */}

          {/* <div className="flex w-[17px] h-[17px] absolute top-[335px] left-[51px]">
            <img src={Profile} alt="Profile Image" />
            <a
              className="ml-4 -mt-0.5 text-Poppins font-medium text-[15px] leading-[22.5px] text-[#9696BB]"
              for=""
            >
              Profile
            </a>
          </div> */}
        {/* </header>  */}

        <main className="w-full">
          <div className=" h-[1000px] max-w-full">
          <div className="absolute top-[30px] left-[1260px] cursor-pointer text-[#eeb600f0] " onClick={Back}><MdOutlineCancel /></div>
            <div className="w-[802px] h-[45px] absolute top-[80px] left-[297px]">
              <h1 className="font-Poppins text-[#ff5c38] text-[30px] font-bold leading-[45px]  flex justify-center">
                Created Successfully
              </h1>
            </div>
            {quizData && (
               <div className="w-[948px] h-[464px]">
               <div className=" absolute top-[-20px]">
              <div className="flex">
                {/* <img
                  className="w-[51px] h-[37px] absolute top-[180px] left-[295px]"
                  src={QuizTitle}
                /> */}
                <h1 className="font-Poppins text-[#214082] text-[18px] font-bold leading-[40px] absolute top-[175px] left-[100px]  text-nowrap">
                  {quizData.quiz_title}
                </h1>
               
                {/* <img
                  className="w-[30px] h-[30px] absolute top-[177px] left-[737px]"
                  src={QuizCreatedBy}
                /> */}
                {/* <h1 className="font-Poppins text-[#214082] text-[15px] font-medium leading-[40px] absolute top-[175px] left-[791px] text-nowrap">
                  Quiz created by user name on date
                </h1> */}
              </div>
              <div className="w-[900px] h-[49px] absolute top-[222px] left-[100px]">
                <h1 className="">
                  {quizData.quiz_description}
                </h1>
                <div className=" flex gap-[55px]">
                <div className=" w-[300px]">
                  <span className="font-Poppins text-[#214082] text-[15px] font-bold leading-[40px] ">created By :</span>
                  <span > {quizData.created_by}</span>
                </div>
                <div  className="w-[300px]">
                <span className="font-Poppins text-[#214082] text-[15px] font-bold leading-[40px] ">Created On :</span>
                  <span> {quizData.created_on}</span>
                </div>
              </div>
              </div>
              </div>
              <div className="flex">
                {/* <img
                  className="w-[43px] h-[43px] absolute top-[253px] left-[299px]"
                  src={QuizDiscription}
                /> */}
     
                <img
                  className="w-[885px] absolute top-[325px] left-[277px]"
                  src={HorizontalLine}
                />
              </div>
              <div className=" absolute top-[340px] left-[315px] flex gap-[55px]" >
                <div  className=" w-[300px]">
                  <span className="font-Poppins text-[#214082] text-[15px] font-bold leading-[40px]  ">Category : </span>
                  <span>{quizData.quiz_sub_category_name}</span>
                </div>
                <div className=" w-[300px]">
                <span className="font-Poppins text-[#214082] text-[15px] font-bold leading-[40px] ">Sub Category :</span>
                  <span> {quizData.quiz_sub_category_name}</span>
                </div>
              </div>
                <div className=" absolute top-[10px]">

              <div className="flex">
                {/* <img
                  className="w-[41px] h-[41px] absolute top-[346px] left-[300px]"
                  src={Percentage}
                /> */}
                <div className="w-[185px] h-[23px] absolute top-[356px] left-[100px]">
                  {/* <h1 className="font-Poppins text-[#214082] font-semibold text-[15px] leading-[22.5px] text-[#555555]">
                    {quizData.pass_percentage}% is the pass score
                  </h1> */}
                  <span className="font-Poppins text-[#214082] text-[15px] font-bold leading-[40px]  ">Complexity :</span>
                  <span> {quizData.quiz_complexity_name}</span>
                </div>
                {/* <img
                  className="w-[31px] h-[16.41px] absolute top-[357px] left-[565px]"
                  src={Easy}
                /> */}

                <div className="w-[344px] h-[23px] absolute top-[356px] left-[455px]">
                  {/* <h1 className="font-Poppins text-[#214082] font-semibold text-[15px] leading-[22.5px] text-[#555555]">
                    Complexity:{quizData.quiz_complexity_name}
                  </h1> */}
                  <span className="font-Poppins text-[#214082] text-[15px] font-bold leading-[40px]  ">pass percentage :</span>
                  <span> {quizData.pass_percentage}%</span>
                </div>
                {/* <img className="w-[31px] h-[16.41px] absolute top-[336px] left-[784px]" src={Medium}/>
           <img className="w-[31px] h-[16.41px] absolute top-[334px] left-[849px]" src={Complex}/> */}
{/* 
                <img
                  className="w-[26px] h-[26px] absolute top-[354px] left-[944px]"
                  src={Hash}
                /> */}
                <div className="w-[130px] h-[22px] absolute top-[356px] left-[720px]">
                  {/* <h1 className="font-Poppins text-[#214082] font-semibold text-[15px] leading-[22.5px] text-[#555555]">
                    {quizData.num_questions} questions
                  </h1> */}
                  <span className="font-Poppins text-[#214082] text-[15px] font-bold leading-[40px]  ">Duration :</span>
                  <span> {quizData.quiz_duration} Min</span>
                </div>
                <div className="w-[180px] h-[22px] absolute top-[356px] left-[915px]">
                  {/* <h1 className="font-Poppins text-[#214082] font-semibold text-[15px] leading-[22.5px] text-[#555555]">
                    {quizData.num_questions} questions
                  </h1> */}
                  <span className="font-Poppins text-[#214082] text-[15px] font-bold leading-[40px]  ">Question Count :</span>
                  <span> {quizData.num_questions}</span>
                </div>

                {/* <img
                  className="w-[885px] absolute top-[406px] left-[269px]"
                  src={HorizontalLine}
                /> */}
              </div>
              </div>
              <div className="flex absolute top-[-10px]">
                {/* <img
                  className="w-[37px] h-[37px] absolute top-[433px] left-[300px]"
                  src={Camera}
                /> */}

                <div className="w-[255px] h-[32px] absolute top-[400px] left-[100px]">
                  {/* <h1 className="font-Poppins text-[#214082] font-semibold text-[15px] leading-[40px] text-[#555555]">
                    {" "}
                    Retake this paper:{quizData.retake_flag}
                  </h1> */}
                  <span className="font-Poppins text-[#214082] text-[15px] font-bold leading-[40px]">Course :</span>
                  <span> {quizData.course_name}</span>
                </div>
                {/* <img
                  className="w-[39px] h-[39px] absolute top-[430px] left-[548px]"
                  src={MultipleAns}
                /> */}

                <div className="w-[223px] h-[32px] absolute top-[400px] left-[455px]">
                  {/* <h1 className="font-Poppins text-[#214082] font-semibold text-[15px] leading-[40px] text-[#555555]">
                    Multiple Answers:{" "}
                    {quizData.multi_answer ? "Yes" : "No"}
                  </h1> */}
                  <span className="font-Poppins text-[#214082] text-[15px] font-bold leading-[40px]  ">Class :</span>
                  <span> {quizData.class_name}</span>
                </div>
                {/* <img
                  className="w-[885px] absolute top-[484px] left-[277px]"
                  src={HorizontalLine}
                /> */}
              </div>
              <div className="flex absolute top-[-20px]">
                {/* <img
                  className="w-[37px] h-[37px] absolute top-[433px] left-[300px]"
                  src={Camera}
                /> */}

                <div className="w-[164px] h-[32px] absolute top-[432px] left-[100px]">
                  {/* <h1 className="font-Poppins text-[#214082] font-semibold text-[15px] leading-[40px] text-[#555555]">
                    {" "}
                    Retake this paper:{quizData.retake_flag}
                  </h1> */}
                  <span className="font-Poppins text-[#214082] text-[15px] font-bold leading-[40px]  ">Retake this paper : </span>
                  <span>{quizData.retake_flag}</span>
                </div>
                {/* <img
                  className="w-[39px] h-[39px] absolute top-[430px] left-[548px]"
                  src={MultipleAns}
                /> */}

                <div className="w-[223px] h-[32px] absolute top-[432px] left-[455px]">
                  {/* <h1 className="font-Poppins text-[#214082] font-semibold text-[15px] leading-[40px] text-[#555555]">
                    Multiple Answers:{" "}
                    {quizData.multi_answer ? "Yes" : "No"}
                  </h1> */}
                  <span className="font-Poppins text-[#214082] text-[15px] font-bold leading-[40px]  "> Multiple Answers : </span>
                  <span>{quizData.multi_answer ? "Yes" : "No"}</span>
                </div>
                {/* <img
                  className="w-[885px] absolute top-[484px] left-[277px]"
                  src={HorizontalLine}
                /> */}
              </div>

              {/* <div className="flex">
                {/* <img
                  className="w-[50px] h-[53px] absolute top-[502px] left-[296px]"
                  src={SubCategory}
                /> */}
                {/* <div className="w-[264px] h-[27px] absolute top-[514px] left-[100px]">
                  <h1 className="font-Poppins text-[#214082] font-semibold text-[15px] leading-[22.5px] text-[#555555]">
                  {quizData.quiz_sub_category_name} from  {" "}{quizData.quiz_category_name}
                   {" "}
                  </h1>
                </div> */}
                {/* <img
                  className="w-[25px] h-[25px] absolute top-[514px] left-[647px]"
                  src={Clock}
                /> */}
                {/* <div className="w-[329px] h-[27px] absolute top-[513px] left-[689px]">
                  <h1 className="font-Poppins text-[#214082] font-semibold text-[15px] leading-[22.5px] text-[#555555]">
               
            {/* <p>Total Questions: {quiz.num_questions}</p> */}
            {/* <span>Total {quizData.quiz_duration} minutes</span> {" "}
            <span>{quizData.quiz_duration * 60 / quizData.num_questions} seconds  for each questions</span>
                   {" "}
                  </h1> */}
                {/* </div>  */}
                <img
                  className="w-[885px] absolute top-[465px] left-[277px]"
                  src={HorizontalLine}
                />
              {/* </div>  */}

              <div className="flex absolute top-[-120px]">
                {/* <img
                  className="w-[35px] h-[35px] absolute top-[601px] left-[298px]"
                  src={Calender}
                /> */}
                <div className="w-[391px] h-[27px] absolute top-[599px] left-[100px]">
                  {/* <h1 className="font-Poppins text-[#214082] font-semibold text-[15px] leading-[40px] text-[#555555]">
                    Quiz will be live from: {quizData.available_from} to{" "}
                    {quizData.disabled_on}
                  </h1> */}
                  <span className="font-Poppins text-[#214082] text-[15px] font-bold leading-[40px]  "> Quiz will be live from :</span>
                  <span> {quizData.available_from} 
                  {quizData.disabled_on ? ` To ${quizData.disabled_on}` : ''}</span>
                </div>
                {/* <img
                  className="w-[32px] h-[32px] absolute top-[603px] left-[767px]"
                  src={AiBot}
                /> */}
                {/* <div className="w-[182px] h-[27px] absolute top-[599px] left-[585px]">
                  {/* <h1 className="font-Poppins text-[#214082] font-semibold text-[15px] leading-[40px] text-[#555555]">
                    AI support needed: No
                  </h1> */}
                  {/* <span className="font-Poppins text-[#214082] text-[15px] font-bold leading-[40px] ">AI support needed:</span>
                  <span> No</span>
                </div>  */}
                {/* <img
                  className="w-[38px] h-[38px] absolute top-[600px] left-[997px]"
                  src={Globe}
                /> */}
                <div className="w-[182px] h-[27px] absolute top-[599px] left-[725px]">
                  {/* <h1 className="font-Poppins text-[#214082] font-semibold text-[15px] leading-[40px] text-[#555555]">
                    Public access:{" "}
                    {quizData.quiz_public_access ? "Yes" : "No"}
                  </h1> */}
                  <span className="font-Poppins text-[#214082] text-[15px] font-bold leading-[40px]  " >Public access :</span>
                <span> {quizData.quiz_public_access ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>
            )}
          </div>

          <div className=" absolute top-[-150px]">
            <button className="w-[123px] h-[32px] absolute top-[729px] left-[373px] rounded-[10px] bg-[#214082] text-white"onClick={Preview}>
              Preview
            </button>
            <div className="absolute top-[729px] left-[524px]">
              <a onClick={() => Edit(quizData.quiz_id)}>
                <button className="w-[123px] h-[32px] rounded-[10px] bg-[#214082] text-white">
                  Edit
                </button>
              </a>
            </div>

            <a href="/publish">
              <button className="w-[123px] h-[32px] absolute top-[729px] left-[675px] rounded-[10px] bg-gray-500 cursor-not-allowed text-white">
                Publish
              </button>
            </a>

            <div className="absolute top-[729px] left-[834px]">
              <a href="/print">
                <button className="w-[123px] h-[32px] rounded-[10px] bg-gray-500 cursor-not-allowed text-white">
                  Print
                </button>
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default quizcreated;
