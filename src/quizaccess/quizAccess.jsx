// Dashboard.js
"use client";
import React from "react";
import { useEffect, useState } from 'react';
import Navigation from "../navbar/navbar.jsx"
import LogoutBar from "../logoutbar/logoutbar.jsx";
import styles from "./quizAccess.module.css";
// import { useRouter } from 'next/router';
// import Head from "next/head";
// import Image from "next/image";
import searchIcon from "../../src/assets/Images/images/dashboard/searchBar.png";
import titleIcon from "../../src/assets/Images/images/quiz-Access/title.png"; 
import createdIcon from "../../src/assets/Images/images/quiz-Access/created.png"; 
import descriptionIcon from "../../src/assets/Images/images/quiz-Access/description.png";
import percentIcon from "../../src/assets/Images/images/quiz-Access/percent.png";
import questionsIcon from "../../src/assets/Images/images/quiz-Access/questions.png";
import saveIcon from "../../src/assets/Images/images/quizview/save.png"; 
import retakeIcon from "../../src/assets/Images/images/quizview/retake.png"; 
import optionsIcon from "../../src/assets/Images/images/quizview/options.png";
import categoryIcon from "../../src/assets/Images/images/quiz-Access/category.png";
import timeIcon from "../../src/assets/Images/images/quiz-Access/time.png";
import startIcon from "../../src/assets/Images/images/quiz-Access/start.png";
import scoringIcon from "../../src/assets/Images/images/quiz-Access/scoring.png";
import user4Icon from "../../src/assets/Images/images/quiz-Access/user4.png";
import user3Icon from "../../src/assets/Images/images/quiz-Access/user3.png";
import user1Icon from "../../src/assets/Images/images/quiz-Access/user1.png"; 
import ProgressBar from "@ramonak/react-progress-bar";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { MdOutlineCancel } from "react-icons/md";

const dashboardLogo = "/images/dashboard/quizifaiDashboard.png";
const dashboardIcon = "/images/dashboard/dashboard.png";
const quizIcon = "/images/dashboard/quiz.png";
const historyIcon = "/images/dashboard/history.png";
const scheduleIcon = "/images/dashboard/schedule.png";
const notificationIcon = "/images/dashboard/notification.png";
const adminIcon = "/images/quiz-Access/admin.png";
const settingsIcon = "/images/quiz-Access/settings.png";
const profileIcon = "/images/quiz-Access/profile1.png";


const quizAccess = () => {
  const getFormattedDate = () => {
    const currentDate = new Date();
    const options = {
      year: "numeric", 
      month: "short", 
      day: "numeric", 
      weekday: "long", 
    };
    return currentDate.toLocaleDateString("en-IN", options);
  };

  const currentValue1 = 50; 
  const maxValue1 = 100; 
  const currentValue2 = 30; 
  const maxValue2 = 80; 

 // const BasicProgressBar = ({ currentValue, maxValue }) => (
   // <progress value={currentValue} max={maxValue}>{currentValue}%</progress>
  //);
  // const router = useRouter();

  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };

  const handleBackToQuiz = () => {
    router.push('/quiz');
  };

  const handleBackToNotification = () => {
    router.push('/notification');
  };

  const handleBackToProfile = () => {
    router.push('/profile');
  };
  const handleButtonClick = () => {
  
    history.push('/quizquestions');
  };

  const BasicProgressBar = ({ currentValue, maxValue }) => (
    <progress
      value={currentValue}
      max={maxValue}
      style={{ width: "100px" }} 
    >
      {currentValue}%
    </progress>
  );
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [quizDetails, setQuizDetails] = useState(null);
  // const { quizId } = useParams();
  // const handleStartQuiz = () => {
  //   if (quizData && quizData.quiz_id) {
  //     navigate(`/quizquestions/${quizData.quiz_id}`);
  //   }
  // };
  const handleStartQuiz = () => {
    if (quizData && quizData.quiz_title && quizData.quiz_id) {
      navigate(`/quizquestions/${quizData.quiz_id}`, {
        state: { 
          quiz_id: quizData.quiz_id,
          quiz_title: quizData.quiz_title,
          quiz_description: quizData.quiz_description,
          quiz_duration: quizData.quiz_duration,
          pass_percentage: quizData.pass_percentage,
          num_questions: quizData.num_questions,
          quiz_total_marks: quizData.quiz_total_marks
        }
      });
    }
  };
  
  const Back = () => {
    
      navigate("/dashboard");
    
  };
  const [createdBy, setCreatedBy] = useState('');
  const [createdOn, setCreatedOn] = useState('');
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const quizId = localStorage.getItem("quiz_id");
    fetch('https://quizifai.com:8010/access_quiz_for_master', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quiz_id: quizId,
        user_id: userId
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      setQuizData(data.data);
      // setQuizDetails(data["quiz metrics"]);
      // setCreatedBy(data.created_by);
      // setCreatedOn(data.created_on);
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
    });
  }, []);
  return (
    <div className={styles.container}>
      {/* <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head> */}
      {/* <div className={styles.navigation}> */}
  {/* Navigation content */}

  {/* <img
    src={dashboardLogo}
    alt="Logo"
    width={126}
    height={129}
    className={styles.dashboardLogo}
  />
  <div className={styles.pageList}>
    <div className={styles.pageItem}>
      <img
        src={dashboardIcon}
        alt="Icon 1"
        width={20}
        height={20}
        className={styles.pageIcon}
      />
      <span className={styles.pageLink} onClick={handleBackToDashboard}>Dashboard</span>
    </div>
    <div className={styles.pageItem}>
      <img
        src={quizIcon}
        alt="Icon 2"
        width={20}
        height={20}
        className={styles.pageIcon}
      />
      <span className={styles.pageLink} onClick={handleBackToQuiz}>Quiz's</span>
    </div>
    <div className={styles.pageItem}>
      <img
        src={historyIcon}
        alt="Icon 1"
        width={20}
        height={20}
        className={styles.pageIcon}
      />
      <span className={styles.pageLink}>History</span>
    </div>
    <div className={styles.pageItem}>
      <img
        src={scheduleIcon}
        alt="Icon 2"
        width={20}
        height={20}
        className={styles.pageIcon}
      />
      <span className={styles.pageLink}>Schedule</span>
    </div>
    <div className={styles.pageItem}>
      <img
        src={notificationIcon}
        alt="Icon 1"
        width={20}
        height={20}
        className={styles.pageIcon}
      />
      <span className={styles.pageLink} onClick={handleBackToNotification}>Notification</span>
    </div>
    <div className={styles.pageItem}>
      <img
        src={adminIcon}
        alt="Icon 2"
        width={20}
        height={20}
        className={styles.pageIcon}
      />
      <span className={styles.pageLink}>Quiz Admin</span>
    </div>
    <div className={styles.pageItem}>
      <img
        src={settingsIcon}
        alt="Icon 2"
        width={20}
        height={20}
        className={styles.pageIcon}
      />
      <span className={styles.pageLink}>Settings</span>
    </div>
    <div className={styles.pageItem}>
      <img
        src={profileIcon}
        alt="Icon 2"
        width={20}
        height={20}
        className={styles.pageIcon}
      />
      <span className={styles.pageLink} onClick={handleBackToProfile}>Profile</span>
    </div>
  </div>
</div> */}
<Navigation/>
      <div className={styles.mainContent}>
        <div className={styles.back} onClick={Back}><MdOutlineCancel /></div>
      {quizData && (
        <>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
        {/* <img
  src={titleIcon} 
  alt="User Icon"
  className={styles.icon1}
/> */}
          <span style={{color:"#214082"}}>{quizData.quiz_title}</span>
        </div>
      
      </div>
      <div className={styles.descriptionContainer}>
      {/* <img
    src={descriptionIcon} 
    alt="Description Icon"
    className={styles.description}
  /> */}
      <span className={styles.descriptionText}>{quizData.quiz_description}</span>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.sentence4}>
        {/* <img
  src={createdIcon} 
  alt="Calendar Icon"
  className={styles.icon2}
/> */}
          <span className={styles.sentence5} style={{color:"#214082"}}>Created By:</span>{" "}
          <span className={styles.sentence3} >{quizData.created_by}</span>
          </div>
          <div className={styles.sentence4}>
        {/* <img
  src={createdIcon} 
  alt="Calendar Icon"
  className={styles.icon2}
/> */}
          <span className={styles.sentence5} style={{color:"#214082"}}>Created On:</span>
          <span className={styles.sentence3}>{quizData.created_on}</span>
          </div>
        </div>
      <div className={styles.horizontalLine}></div>
      <div className={styles.sentencesContainer2}>
        <div className={styles.sentence4}>
        {/* <img
    src={categoryIcon} 
    className={styles.icon2}
  /> */}
            <span className={styles.sentence5} style={{color:"#214082"}}>Category:</span>
          <span className={styles.sentence3}>{`${quizData.quiz_category_name}`}</span>
          
        </div>
        <div className={styles.sentence4}>
        {/* <img
    src={categoryIcon} 
    className={styles.icon2}
  /> */}
          <span  className={styles.sentence5} style={{color:"#214082"}}>Sub Category:</span>
          <span  className={styles.sentence3}>{`${quizData.quiz_sub_category_name}`}</span>
        </div>
        
      </div>
      <div className={styles.sentencesContainer}>
  
        <div className={styles.sentence4}>
        {/* <img
    src={timeIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  /> */}
          <span className={styles.sentence5} style={{color:"#214082"}}>Complexity:</span>
          <span className={styles.sentence3}>{`${quizData.quiz_complexity_name}`}</span>
        </div>
        <div className={styles.sentence4}>
        {/* <img
    src={percentIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  /> */}
          <span  className={styles.sentence5} style={{color:"#214082"}}>Pass Score:</span>
          <span  className={styles.sentence3}>{`${quizData.pass_percentage}%`}</span>
        </div>
        <div className={styles.sentence4}>
        {/* <img
    src={timeIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  /> */}
          <span className={styles.sentence5} style={{color:"#214082"}}>Duration:</span>
          <span className={styles.sentence3}>{`${quizData.quiz_duration} mints`}</span>
        </div>
        <div className={styles.sentence4}>
        {/* <img
    src={questionsIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  /> */}
          <span className={styles.sentence5} style={{color:"#214082"}}>Question Count:</span>
          <span className={styles.sentence3}>{`${quizData.num_questions}`}</span>
        </div>
      </div>
      <div className={styles.sentencesContainer1}>
        
     
        <div className={styles.sentence2}>
        {/* <img
    src={createdIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  /> */}
          <span className={styles.sentence5} style={{color:"#214082"}}>Course:</span>
          <span className={styles.sentence3}>{`${quizData.course_name}`}</span>
        </div>
        <div className={styles.sentence1}>
        {/* <img
    src={createdIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  /> */}
          <span className={styles.sentence5} style={{color:"#214082"}}>Class:</span>
          <span className={styles.sentence3}>{`${quizData.class_name}`}</span>
        </div>
        
      </div>
      {/* <div className={styles.horizontalLine}></div> */}
 
      <div className={styles.horizontalLine}></div>
      <div className={styles.sentencesContainer3}>
        <div className={styles.sentence}>
        {/* <img
    src={user1Icon} 
    alt="Calendar Icon"
    className={styles.icon2}
  /> */}
          <span className={styles.sentence5} style={{color:"#214082"}}>Total Attempts:</span>
          <span >{quizData['quiz metrics'].total_attempts}</span>
        </div>
        <div className={styles.sentence}>
        {/* <img
    src={user3Icon} 
    alt="Calendar Icon"
    className={styles.icon2}
  /> */}
   <span className={styles.sentence5} style={{color:"#214082"}}>Your Attempts:</span>
          <span>{quizData['quiz metrics'].your_attempts}</span>
        </div>
        <div className={styles.sentence}>
        {/* <img
    src={user4Icon} 
    alt="Calendar Icon"
    className={styles.icon2}
  /> */}  <span className={styles.sentence5} style={{color:"#214082"}}>Highest Score:</span>
          <span>{quizData['quiz metrics'].highest_score !== null ? quizData['quiz metrics'].highest_score : 'N/A'}</span>
        </div>
       
        </div>
        <div className={styles.sentencesContainer4}>
     
        <div className={styles.sentence}>
        {/* <img
    src={user4Icon} 
    alt="Calendar Icon"
    className={styles.icon2}
  /> */}
   <span className={styles.sentence5} style={{color:"#214082"}}>Quickest completion time: </span>
          <span>{quizData['quiz metrics'].quickest_completion_time !== null ? quizData['quiz metrics'].quickest_completion_time : 'N/A'}</span>
        </div>
        </div>
      {/* <div className={styles.sentencesContainer}>
        <div className={styles.sentence}>
        {/* <img
    src={user1Icon} 
    alt="Calendar Icon"
    className={styles.icon2}
  /> */}
          {/* <span>{`${quizData.attendees_today_count} accessed today`}</span> */}
        {/* </div> */}
        {/* <div className={styles.sentence}>
        {/* <img
    src={user3Icon} 
    alt="Calendar Icon"
    className={styles.icon2}
  /> */}
          {/* <span>{`${quizData.attendees_now_count} accessing now`}</span> */}
        {/* </div>  */}
        {/* <div className={styles.sentence}> */}
        {/* <img
    src={user4Icon} 
    alt="Calendar Icon"
    className={styles.icon2}
  /> */}
          {/* <span>{`${quizData.quiz_score}`}</span> */}
        {/* </div> */}
        {/* </div>  */}
        <div className={styles.sentencesContainer}>
        {/* <div className={styles.sentence}>
        {/* <img
    src={scoringIcon}
    alt="Calendar Icon"
    className={styles.icon2}
  /> */}
          {/* <span>256 people have attended this</span> */}
        {/* </div>  */}
        </div>
        <div className={styles.buttonContainer}>
       
      <button className={styles.imageButton} onClick={handleStartQuiz}>
        <img
          src={startIcon} 
          alt="Calendar Icon"
        />
      </button>
  
      </div>
      </> 
        )}
        </div>
        <LogoutBar />
      </div>
    
  );
};

export default quizAccess;
