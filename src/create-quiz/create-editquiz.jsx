"use client";
import React from "react";


// Navbar-icons
import QuizifAilogo from "../assets/Images/Create-Quiz/Quizifai 1.png";
import Dashboard from "../assets/Images/Create-Quiz/Dashboard.png";
import Quiz from "../assets/Images/Create-Quiz/Quiz.png";
import History from "../assets/Images/Create-Quiz/History.png";
import Schedule from "../assets/Images/Create-Quiz/Schedule.png";
import Notification from "../assets/Images/Create-Quiz/Notification.png";
import QuizAdmin from "../assets/Images/Create-Quiz/Quiz-admin.png";
import Profile from "../assets/Images/Create-Quiz/Profile.png";

// Main-Section-icons 
import CreateAi from "../assets/Images/Create-Quiz/createai.svg"
import TypeInUrQuiz from "../assets/Images/Create-Quiz/type-in-ur-quiz.svg"
import Download from "../assets/Images/Create-Quiz/download.svg"
import Pdf from "../assets/Images/Create-Quiz/pdf.svg"
import Books from "../assets/Images/Create-Quiz/books.svg"
import createicon from "../assets/Images/Create-Quiz/Createicon.svg"
import Navigation from "../navbar/navbar.jsx"
import { useNavigate } from 'react-router-dom'; // Make sure to import useNavigate

export default function createeditquiz() {
  const navigate = useNavigate();
  const handleEditExcel = () => {
    navigate(`/editmanuly`);
  };
  return ( 
    <>
      <div>
        {/* Navigation-Section */}
        <header className="w-[219px] h-[1000px] absolute top-[-19px] left-[-9px] rounded-tl-[20px] rounded-bl-[20px] bg-[#F5F5FB] z-10 shadow-lg shadow-gray-400/60">
          {/* <div className="h-[300px] w-[270px] absolute top-[20px] -left-[20px]">
            <img src={QuizifAilogo} alt="QuizifAi Logo Icon" />
          </div> */}

          {/* Navigation-icons */}
          {/* <div className="flex w-[15px] h-[15px] absolute top-[231px] left-[51px]">
            <img src={Dashboard} alt="Dashborad img" />
            <a
              className="ml-5 -mt-0.5 text-Poppins font-medium text-[15px] leading-[22.5px] text-[#9696BB]"
              for=""
            >
              Dashboard
            </a>
          </div>

          <div className="flex w-[16px] h-[15px] absolute top-[285px] left-[51px]">
            <img src={Quiz} alt="Quiz's img" />
            <a
              className="ml-5 -mt-0.5 text-Poppins font-medium text-[15px] leading-[22.5px] text-[#9696BB]"
              for=""
            >
              Quiz
            </a>
          </div>

          <div className="flex w-[13.87px] h-[15.41px] absolute top-[338px] left-[51px]">
            <img src={History} alt="History img" />
            <a
              className="ml-5 -mt-0.5 text-Poppins font-medium text-[15px] leading-[22.5px] text-[#9696BB]"
              for=""
            >
              History
            </a>
          </div>

          <div className="flex w-[17px] h-4 absolute top-[394px] left-[51px]">
            <img src={Schedule} alt="Schedule img" />
            <a
              className="ml-4 -mt-0.5 text-Poppins font-medium text-[15px] leading-[22.5px] text-[#9696BB]"
              for=""
            >
              Schedule
            </a>
          </div>

          <div className="flex w-4 h-[15px] absolute top-[453px] left-[51px]">
            <img src={Notification} alt="Notification img" />
            <a
              className="ml-4 -mt-0.5 text-Poppins font-medium text-[15px] leading-[22.5px] text-[#9696BB]"
              for=""
            >
              Notification
            </a>
          </div>

          <div className="flex w-[25.46px] h-[27.87px] absolute top-[508px] left-[51px]">
            <img className="-ml-2.5" src={QuizAdmin} alt="QuizAdmin img" />
            <a
              className="ml-4 text-Poppins font-medium text-[15px] leading-[15px] text-nowrap text-[#30304F]"
              for=""
            >
              Quiz Admin
            </a>
          </div>

          <div className="flex w-[17px] h-[17px] absolute top-[581px] left-[51px]">
            <img src={Profile} alt="Profile img" />
            <a
              className="ml-4 -mt-0.5 text-Poppins font-medium text-[15px] leading-[22.5px] text-[#9696BB]"
              for=""
            >
              Profile
            </a>
          </div> */}
          <Navigation/>
        </header>
        <main className="">
            <div className="w-[752px] h-[71px] absolute top-[110px] left-[647px]">
               <h1>
                <span className="font-poppins font-bold text-[30px] leading-[45px] text-[#F25822]">Create a new Question Paper</span> <br/>
                <span className="font-poppins font-light text-[21px] leading-[31.5px] text-[#214082]">(You can choose any of the options below)</span>
              </h1>          
            </div>

            <div className="w-[350px] h-[262px] absolute top-[252px] left-[450px] rounded-[20px] bg-[#F8F4F4]">
                <div className="flex justify-center">
                <img className=" w-[81px] h-[81px] ml-3 mt-5 -mb-3" src={createicon} alt="Create Your Own Quiz Icon"/> 
                </div>
                <h1 className="font-Poppins font-bold text-[20px] leading-[30px] text-[#575757] flex justify-center mt-4">
                  Create your Own Quiz
                  </h1>
                  <h1 className="font-Poppins font-light text-[15px] leading-[22.5px] text-[#575757]">
                  <span className="mt-2 flex justify-center">Add and Prepare<br/></span>
                  <span className="flex justify-center">something beautiful</span>
                  </h1>
            </div>

            <div className="w-[350px] h-[262px] absolute top-[252px] left-[880px] rounded-[20px] bg-[#F8F4F4]">
            <div className="flex justify-center">
            <img className=" w-[81px] h-[81px] ml-3 mt-5 -mb-3" src={CreateAi} alt="Create with Ai Icon"/> 
           </div>
           <h1 className="font-Poppins font-bold text-[20px] leading-[30px] text-[#575757] flex justify-center mt-4">
                  Create with Al
            </h1>
            <h1 className="font-Poppins font-light text-[15px] leading-[22.5px] text-[#575757]">
                  <span className="mt-2 flex justify-center">Save your time and create<br/></span>
                  <span className="flex justify-center">forms faster our Al will</span>
                  <span className="flex justify-center">create the first draft</span>
                  </h1>
            </div>

            <div className="flex">
            <button className="w-[140.02px] h-[142.72px] absolute top-[528px] left-[450.95px] rounded-[20px] bg-[#E0FFE8]" onClick={handleEditExcel}>
  <div className="flex justify-center mx-12 mt-4">
    <img className="w-[36.47px] h-[36.47px] ml-2" src={TypeInUrQuiz} alt="create in your quiz icon"/>
  </div>
  <h1 className="font-Poppins font-bold text-[12px] leading-[18px] text-[#575757] flex justify-center mt-4">
    Type in your Quiz
  </h1>
  <h1 className="font-Poppins font-light text-[10px] leading-[15px] text-[#575757] flex justify-center">
    Start Entering
  </h1>
</button>


<a href="/csv" className="w-[150.02px] h-[142.72px] absolute top-[528px] left-[650.48px] rounded-[20px] bg-[#FCE7E7]">
  <div className="flex justify-center mx-12 mt-4">
    <img className="w-[36.47px] h-[36.47px] ml-2" src={Download} alt="Download icon"/>
  </div>
  <h1 className="font-Poppins font-bold text-[12px] leading-[18px] text-[#575757] flex justify-center mt-4">
    Import
  </h1>
  <h1 className="font-Poppins font-light text-[10px] leading-[15px] text-[#575757] flex justify-center">
     Excel
  </h1>
</a>

<a href="/pdf" className="w-[150.02px] h-[142.72px] absolute top-[528px] left-[879.95px] rounded-[20px] bg-[#B1FB9B]">
  <div className="flex justify-center mx-12 mt-4">
    <img className="w-[36.47px] h-[36.47px] ml-2" src={Pdf} alt="Pdf icon"/>
  </div>
  <h1 className="font-Poppins font-bold text-[12px] leading-[18px] text-[#575757] flex justify-center mt-4">
    Use pdf
  </h1>
  <h1 className="font-Poppins font-light text-[10px] leading-[15px] text-[#575757] flex justify-center">
    Articles, Pages
  </h1>
</a>


<a href="/textbook" className="w-[150.02px] h-[142.72px] absolute top-[528px] left-[1077.48px] rounded-[20px] bg-[#FFEDCD]">
  <div className="flex justify-center mx-12 mt-4">
    <img className="w-[36.47px] h-[36.47px] ml-2" src={Books} alt="Books icon"/>
  </div>
  <h1 className="font-Poppins font-bold text-[12px] leading-[18px] text-[#575757] flex justify-center mt-4">
    Use Text Book
  </h1>
  <h1 className="font-Poppins font-light text-[10px] leading-[15px] text-[#575757] flex justify-center">
    Course text books
  </h1>
</a>
</div>
        </main>
      </div>
    </>
  );
};
