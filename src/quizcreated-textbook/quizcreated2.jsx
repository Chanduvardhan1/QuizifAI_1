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



function quizcreated2() {
  const [quizData, setQuizData] = useState(null);
  // Use useLocation hook to access the location object
  const location = useLocation();

  useEffect(() => {
    // Check if quizData exists in location state before accessing its properties
    if (location.state && location.state.quizData) {
      // Access the quizData from the location state
      const quizData = location.state.quizData;
      setQuizData(quizData)

      // Show quizData in the console
      console.log(quizData);
    }
  }, [location.state]);
  const navigate = useNavigate();
const Preview = () => {
  navigate("/quizview1", { state: { quizData: quizData } });
};
  return (
    <>
      <div>
        {/* Navigation-Section */}
        <header className="w-[219px] h-[1000px] absolute top-[-19px] left-[-9px] rounded-tl-[20px] rounded-bl-[20px] bg-[#F5F5FB] z-10 ">
          <div className="h-[300px] w-[270px]absolute top-[65px] left-[47px]">
            <img src={QuizifAilogo} alt="QuizifAi Logo Icon" />
          </div>

          {/* Navigation-icons */}
          <div className="flex w-[15px] h-[15px] absolute top-[231px] left-[51px]">
            <img src={Dashboard} alt="Dashborad Image" />
            <a
              className="ml-5 -mt-0.5 text-Poppins font-medium text-[15px] leading-[22.5px] text-[#9696BB]"
              for=""
            >
              Dashboard
            </a>
          </div>

          <div className="flex w-[16px] h-[15px] absolute top-[285px] left-[51px]">
            <img src={Quiz} alt="Quiz's Image" />
            <a
              className="ml-5 -mt-0.5 text-Poppins font-medium text-[15px] leading-[22.5px] text-[#9696BB]"
              for=""
            >
              Quiz
            </a>
          </div>

          <div className="flex w-[13.87px] h-[15.41px] absolute top-[338px] left-[51px]">
            <img src={History} alt="History Image" />
            <a
              className="ml-5 -mt-0.5 text-Poppins font-medium text-[15px] leading-[22.5px] text-[#9696BB]"
              for=""
            >
              History
            </a>
          </div>

          <div className="flex w-[17px] h-4 absolute top-[394px] left-[51px]">
            <img src={Schedule} alt="Schedule Image" />
            <a
              className="ml-4 -mt-0.5 text-Poppins font-medium text-[15px] leading-[22.5px] text-[#9696BB]"
              for=""
            >
              Schedule
            </a>
          </div>

          <div className="flex w-4 h-[15px] absolute top-[453px] left-[51px]">
            <img src={Notification} alt="Notification Image" />
            <a
              className="ml-4 -mt-0.5 text-Poppins font-medium text-[15px] leading-[22.5px] text-[#9696BB]"
              for=""
            >
              Notification
            </a>
          </div>

          <div className="flex w-[25.46px] h-[27.87px] absolute top-[508px] left-[51px]">
            <img className="-ml-2.5" src={QuizAdmin} alt="QuizAdmin Image" />
            <a
              className="ml-4 text-Poppins font-medium text-[15px] leading-[15px] text-nowrap text-[#30304F]"
              for=""
            >
              Quiz Admin
            </a>
          </div>

          <div className="flex w-[17px] h-[17px] absolute top-[581px] left-[51px]">
            <img src={Profile} alt="Profile Image" />
            <a
              className="ml-4 -mt-0.5 text-Poppins font-medium text-[15px] leading-[22.5px] text-[#9696BB]"
              for=""
            >
              Profile
            </a>
          </div>
        </header>

        <main className="w-full">
          <div className=" h-[1000px] max-w-full bg-gradient-to-t from-[#CEE4FF80] to-[#E2EFFF80]">
            <div className="w-[802px] h-[45px] absolute top-[78px] left-[297px]">
              <h1 className="font-Poppins text-[30px] font-bold leading-[45px] text-[#2c3f7e] flex justify-center">
                Created Successfully
              </h1>
            </div>
            {quizData && (
              <div className="w-[948px] h-[464px]">
                <div className="flex">
                  <img
                    className="w-[51px] h-[37px] absolute top-[180px] left-[295px]"
                    src={QuizTitle}
                  />
                  <h1 className="font-Poppins text-[18px] font-bold leading-[40px] absolute top-[175px] left-[355px] text-[#555555] text-nowrap">
                    {quizData.quiz_title}
                  </h1>
                  <img
                    className="w-[30px] h-[30px] absolute top-[177px] left-[737px]"
                    src={QuizCreatedBy}
                  />
                  <h1 className="font-Poppins text-[15px] font-medium leading-[40px] absolute top-[175px] left-[791px] text-nowrap">
                    Quiz created by user name on date
                  </h1>
                </div>

                <div className="flex">
                  <img
                    className="w-[43px] h-[43px] absolute top-[253px] left-[299px]"
                    src={QuizDiscription}
                  />
                  <h1 className="w-[760px] h-[49px] absolute top-[252px] left-[355px]">
                    {quizData.quiz_description}
                  </h1>
                  <img
                    className="w-[885px] absolute top-[325px] left-[277px]"
                    src={HorizontalLine}
                  />
                </div>

                <div className="flex">
                  <img
                    className="w-[41px] h-[41px] absolute top-[346px] left-[300px]"
                    src={Percentage}
                  />
                  <div className="w-[185px] h-[23px] absolute top-[356px] left-[356px]">
                    <h1 className="font-Poppins font-semibold text-[15px] leading-[22.5px] text-[#555555]">
                      {quizData.pass_percentage}% is the pass score
                    </h1>
                  </div>
                  <img
                    className="w-[31px] h-[16.41px] absolute top-[357px] left-[565px]"
                    src={Easy}
                  />

                  <div className="w-[344px] h-[23px] absolute top-[356px] left-[604px]">
                    <h1 className="font-Poppins font-semibold text-[15px] leading-[22.5px] text-[#555555]">
                      Complexity:{quizData.quiz_complexity_name}
                    </h1>
                  </div>
                  {/* <img className="w-[31px] h-[16.41px] absolute top-[336px] left-[784px]" src={Medium}/>
             <img className="w-[31px] h-[16.41px] absolute top-[334px] left-[849px]" src={Complex}/> */}

                  <img
                    className="w-[26px] h-[26px] absolute top-[354px] left-[944px]"
                    src={Hash}
                  />
                  <div className="w-[113px] h-[22px] absolute top-[356px] left-[978px]">
                    <h1 className="font-Poppins font-semibold text-[15px] leading-[22.5px] text-[#555555]">
                      {quizData.num_questions} questions
                    </h1>
                  </div>

                  <img
                    className="w-[885px] absolute top-[406px] left-[269px]"
                    src={HorizontalLine}
                  />
                </div>

                <div className="flex">
                  <img
                    className="w-[37px] h-[37px] absolute top-[433px] left-[300px]"
                    src={Camera}
                  />

                  <div className="w-[164px] h-[32px] absolute top-[432px] left-[349px]">
                    <h1 className="font-Poppins font-semibold text-[15px] leading-[40px] text-[#555555]">
                      {" "}
                      Retake this paper:{quizData.retake_flag}
                    </h1>
                  </div>
                  <img
                    className="w-[39px] h-[39px] absolute top-[430px] left-[548px]"
                    src={MultipleAns}
                  />

                  <div className="w-[223px] h-[32px] absolute top-[432px] left-[594px]">
                    <h1 className="font-Poppins font-semibold text-[15px] leading-[40px] text-[#555555]">
                      Multiple Answers:{" "}
                      {quizData.multi_answer ? "Yes" : "No"}
                    </h1>
                  </div>
                  <img
                    className="w-[885px] absolute top-[484px] left-[277px]"
                    src={HorizontalLine}
                  />
                </div>

                <div className="flex">
                  <img
                    className="w-[50px] h-[53px] absolute top-[502px] left-[296px]"
                    src={SubCategory}
                  />
                  <div className="w-[264px] h-[27px] absolute top-[514px] left-[355px]">
                    <h1 className="font-Poppins font-semibold text-[15px] leading-[22.5px] text-[#555555]">
                    {quizData.quiz_sub_category_name} from  {" "}{quizData.quiz_category_name}
                     {" "}
                    </h1>
                  </div>
                  <img
                    className="w-[25px] h-[25px] absolute top-[514px] left-[647px]"
                    src={Clock}
                  />
                  <div className="w-[329px] h-[27px] absolute top-[513px] left-[689px]">
                    <h1 className="font-Poppins font-semibold text-[15px] leading-[22.5px] text-[#555555]">
                 
              {/* <p>Total Questions: {quiz.num_questions}</p> */}
              <span>Total {quizData.quiz_duration} minutes</span> {" "}
              <span>{quizData.quiz_duration * 60 / quizData.num_questions} seconds  for each questions</span>
                     {" "}
                    </h1>
                  </div>
                  <img
                    className="w-[885px] absolute top-[576px] left-[277px]"
                    src={HorizontalLine}
                  />
                </div>

                <div className="flex">
                  <img
                    className="w-[35px] h-[35px] absolute top-[601px] left-[298px]"
                    src={Calender}
                  />
                  <div className="w-[391px] h-[27px] absolute top-[599px] left-[355px]">
                    <h1 className="font-Poppins font-semibold text-[15px] leading-[40px] text-[#555555]">
                      Quiz will be live from: {quizData.available_from} to{" "}
                      {quizData.disabled_on}
                    </h1>
                  </div>
                  <img
                    className="w-[32px] h-[32px] absolute top-[603px] left-[767px]"
                    src={AiBot}
                  />
                  <div className="w-[182px] h-[27px] absolute top-[599px] left-[809px]">
                    <h1 className="font-Poppins font-semibold text-[15px] leading-[40px] text-[#555555]">
                      AI support needed: No
                    </h1>
                  </div>
                  <img
                    className="w-[38px] h-[38px] absolute top-[600px] left-[997px]"
                    src={Globe}
                  />
                  <div className="w-[182px] h-[27px] absolute top-[599px] left-[1035px]">
                    <h1 className="font-Poppins font-semibold text-[15px] leading-[40px] text-[#555555]">
                      Public access:{" "}
                      {quizData.quiz_public_access ? "Yes" : "No"}
                    </h1>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <button className="w-[123px] h-[32px] absolute top-[729px] left-[373px] rounded-[10px] bg-[#214082] text-white"onClick={Preview}>
              Preview
            </button>
            <div className="absolute top-[729px] left-[524px]">
              <a href="/quiz-type">
                <button className="w-[123px] h-[32px] rounded-[10px] bg-[#214082] text-white">
                  Edit
                </button>
              </a>
            </div>

            <a href="/publish">
              <button className="w-[123px] h-[32px] absolute top-[729px] left-[675px] rounded-[10px] bg-[#214082] text-white">
                Publish
              </button>
            </a>

            <div className="absolute top-[729px] left-[834px]">
              <a href="/print">
                <button className="w-[123px] h-[32px] rounded-[10px] bg-[#214082] text-white">
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

export default quizcreated2;





