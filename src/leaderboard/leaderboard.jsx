// import Head from 'next/head';
// import Image from "next/image";
import React, { useEffect, useState,useRef } from 'react';
import styles from './quiz_results.module.css';
import LeftBar from '../leftbar/leftbar.jsx';
import createdIcon from "../../src/assets/Images/images/quiz-Access/created.png";
import descriptionIcon from "../../src/assets/Images/images/quiz-Access/description.png";
import percentIcon from "../../src/assets/Images/images/quizresults/discount.png"; 
import timeIcon from "../../src/assets/Images/images/quizresults/stopwatch1.png";
import dateIcon from "../../src/assets/Images/images/quizresults/schedule.png";
import current from "../../src/assets/Images/images/quizresults/faq.png"

import titleIcon from "../../src/assets/Images/images/quiz-Access/title.png";
import categoryIcon from "../../src/assets/Images/images/quiz-Access/category.png";
import ranksIcon from "../../src/assets/Images/images/quizresults/ranks.png"; 
import rank1Icon from "../../src/assets/Images/images/quizresults/rank1.png";
import rank2Icon from "../../src/assets/Images/images/quizresults/rank2.png";
import rank3Icon from "../../src/assets/Images/images/quizresults/rank3.png";
import rankScoreIcon from "../../src/assets/Images/images/quizresults/rankscore.png";
import greybox1Image from "../../src/assets/Images/images/quizresults/greybox1.png";  
import greybox2Image from "../../src/assets/Images/images/quizresults/greybox2.png";
import greybox3Image from "../../src/assets/Images/images/quizresults/greybox3.png"; 
import rightIcon from "../../src/assets/Images/images/quizresults/right.png"; 
import one1Image from "../../src/assets/Images/images/quizview/one1.png";
import iconA from "../../src/assets/Images/images/questions/IconA.png"
import iconB from "../../src/assets/Images/images/questions/IconB.png";
import iconC from "../../src/assets/Images/images/questions/IconC.png";
import iconD from "../../src/assets/Images/images/questions/IconD.png";
import answerTimerIcon from "../../src/assets/Images/images/quizresults/answerTimer.png"; 
import rightIcon1 from "../../src/assets/Images/images/quizresults/righticon.png"; 
import wrongIcon from "../../src/assets/Images/images/quizresults/wrong.png";
import wrongIcon1 from "../../src/assets/Images/images/quizresults/wrongicon.png";
import two2Icon from "../../src/assets/Images/images/quizview/two2.png";
import three3Icon from "../../src/assets/Images/images/quizview/three3.png"; 
import four4Icon from "../../src/assets/Images/images/quizview/four4.png";
import { useLocation } from 'react-router-dom';
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import fistrank from '../../src/assets/Images/images/quizresults/FirstRank.png'
import vector from "../../src/assets/Images/images/quizresults/icon-park_check-correct.png"
import Navigation from "../navbar/navbar.jsx";
import LogoutBar from "../logoutbar/logoutbar.jsx";
// import rankimage from "../../src/assets/Images/images/quizresults/rankimage.png"
import rankimage from "../../src/assets/Images/images/quizresults/rank.jpg"
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const leaderboard = () => {
  const [quizData, setQuizData] = useState(null);
  const [quizData1, setQuizData1] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { quizId, attemptNo } = location.state || {};
  const [leaderboardData, setLeaderboardData] = useState([]);
  const navigate = useNavigate();
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false); // State to track quiz submission
  const resultRef = useRef();
  const complexity = localStorage.getItem("complexity");

  const optionLabels = {
    option1: 'A',
    option2: 'B',
    option3: 'C',
    option4: 'D'
  };

 useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const quizId = localStorage.getItem("quiz_id");
    const attemptNo = localStorage.getItem("quiz_level_attempt_id");
    const {passPercentage} = location.state || {};
    const fetchQuizReport = async () => {
      try {
        const response = await fetch('https://quizifai.com:8010/quiz_report', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            quiz_id: quizId,
            user_id: userId,
            attempt_no: attemptNo
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setQuizData1(data.data);
      } catch (error) {
        console.error('Error fetching quiz report:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizReport();
  }, []);


  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch('https://quizifai.com:8010/leaderboard_result', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            quiz_id: quizId
          })
        });

        const result = await response.json();

        if (result.response === 'success') {
          setLeaderboardData(result.data);
        } else {
          console.error('Failed to fetch leaderboard data:', result.message);
        }
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboardData();
  }, [quizId]);

  const userId = localStorage.getItem("user_id");
  // useEffect(() => {

  //   const sendQuizResult = async () => {
  //     try {
  //       const response = await fetch('https://quizifai.com:8010/quiz_result', {
  //         method: 'POST',
  //         headers: {
  //           'accept': 'application/json',
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({
  //           user_id: userId,
  //           quiz_id: quizId,
  //           attempt_id: attemptNo
  //         })
  //       });
  //       const result = await response.json();
  //       const data = result[0]?.data;
  //       setQuizData(data);
  //       console.log('Quiz result submitted:', data);
  //     } catch (error) {
  //       console.error('Error submitting quiz result:', error);
  //     }
  //   };

  //   if (quizId && attemptNo) {
  //     sendQuizResult(); // Trigger the POST request only if quizId and attemptNo are available
  //   }
  // }, [quizId, attemptNo]);
  const quizduration = localStorage.getItem("quiz_duration");

  useEffect(() => {
    const quizId = localStorage.getItem("quiz_id");
    const attemptNo = localStorage.getItem("quiz_level_attempt_id");

    const sendQuizResult = async () => {
      try {
        const response = await fetch('https://quizifai.com:8010/quiz_result', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: userId,
            quiz_id: quizId,
            attempt_id: attemptNo
          })
        });
        const result = await response.json();
        const data = result.data[0];
        setQuizData(data);
        console.log('Quiz result submitted:', data);
        setIsQuizSubmitted(true); // Set the submission state to true after success
      } catch (error) {
        console.error('Error submitting quiz result:', error);
        setIsQuizSubmitted(false); // Ensure it's false on error
      }
    };

    if (quizId && attemptNo) {
      sendQuizResult(); // Trigger the POST request only if quizId and attemptNo are available
    }
  }, [userId]);

  useEffect(() => {
    const quizId = localStorage.getItem("quiz_id");

    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch('https://quizifai.com:8010/leaderboard_result', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            quiz_id: quizId
          })
        });

        const result = await response.json();

        if (result.response === 'success') {
          setLeaderboardData(result.data);
        } else {
          console.error('Failed to fetch leaderboard data:', result.message);
        }
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    if (isQuizSubmitted) { // Trigger fetch only if quiz result submission was successful
      fetchLeaderboardData();
    }
  }, [isQuizSubmitted]);

  if (!quizData) {
    return <div>Loading...</div>;
  }
 
  
 
  const Back = () => {
    
   /* fetch or store quizId */;
  navigate(`/dashboard`);
};
  const questions = quizData1.questions;
  const topThree = leaderboardData.slice(0, 3);
  const handleDownload = () => {
    const input = resultRef.current;
    if (input) {
      html2canvas(input, { useCORS: true, scale: 2 })
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(`${quizData.quiz_name}_results.pdf`);
        })
        .catch((error) => {
          console.error('Error generating PDF:', error);
        });
    } else {
      console.error('resultRef is not attached to any DOM element');
    }
  };
  return (

    <div className={styles.container}>
      {/* <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head> */}
      <Navigation/>
      
      <div className={styles.mainContent}  ref={resultRef}>
      <div className={styles.back1} onClick={Back}><MdOutlineCancel /></div>

        <div className={styles.header}>
        <div className={styles.titleContainer}>
        {/* <img
  src={titleIcon} 
  alt="User Icon"
  className={styles.icon1}
/> */}
<div className={styles.downloads} >
<div className={styles.download} >

          <span className={styles.quizname}>{quizData.quiz_name}</span>
</div>

</div>

          <p className={styles.quizdescription}>{quizData.quiz_description}</p>
          <div className={styles.Questionslines }>
        <div className={styles.Questions}>

        <span className={styles.Question} >Questions :</span>{" "}
          <span className={styles.username1} >{`${quizData.total_questions}`}</span>
        </div>
        <div>

        <span className={styles.Question} >Duration:</span>{" "}
          <span className={styles.username1} >{quizduration}</span>
        </div>
        <div>

<span className={styles.Question} >Total Score:</span>{" "}
  <span className={styles.username1} >{`${quizData.quiz_total_marks}`}</span>
</div>
<div>

<span className={styles.Question } >Pass Score :</span>{" "}
  <span className={styles.username1} >{`${quizData.attempt_percentage}`}</span>
</div>
<div>

<span className={styles.Question } >complexity :</span>{" "}
  <span className={styles.username1} >{complexity}</span>
</div>
        </div>
          <div className={styles.Createdbyupdated}>
        <div className={styles.Created}>

        <span className={styles.Createdby} >Created By:</span>{" "}
          <span className={styles.username} >{`${quizData.created_by}`}</span>
        </div>
        <div>

        <span className={styles.Createdby} >Created On:</span>{" "}
          <span className={styles.username} >{`${quizData.created_on}`}</span>
        </div>
        </div>
        </div>
        {/* <div className={styles.infoContainer}>
        {/* <img
  src={createdIcon} 
  alt="Calendar Icon"
  className={styles.icon2}
/> */}
          {/* <span>user name<br></br>date</span> */}
        {/* </div>  */}
      </div>
      {/* <div className={styles.descriptionContainer}>
      {/* <img
    src={descriptionIcon} 
    alt="Description Icon"
    className={styles.description}
  /> */}
      {/* <span className={styles.descriptionText}>{quizData.quiz_description}</span> */}
      {/* </div>  */}
     
      <div className={styles.horizontalLine}></div>
      <div className={styles.wrapper}>
      <div className={styles.sentenceBox}>
         <div className={styles.verticaliconsContainer}>
          <h1  className={styles.verticalicon2} >{quizData.rank}</h1>
        <img
    src={rankimage} 
    alt="Icon 1"
    className={styles.verticalicon1}
  />
  <h1 className={styles.rank1}>Your Rank</h1>
      </div>
      <div className={styles.sentencesContainer}>
         <div className={styles.sentence}>
        <img
    src={dateIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>Taken on {quizData.quiz_start_date}</span>
        </div>
        </div>
        <div className={styles.sentencesContainer}>
        <div className={styles.sentence}>
        <img
    src={timeIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>Spent {quizData.attempt_duration}</span>
        </div>
       
        
      </div>
      <div className={styles.sentencesContainer}>
        <div className={styles.sentence}>
        <img
    src={current}
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>Attempted {quizData.attempted_questions} Questions</span>
        </div>
        </div>
        
        <div className={styles.sentence1}>
        <img
    src={vector} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>{quizData.correct_answers} correct answer</span>
        </div>
      <div className={styles.sentencesContainer}>
        <div className={styles.sentence}>
        <img
    src={percentIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span className={styles.sentence3}>You have scored {quizData.attained_score_percentage}%, {quizData.quiz_grade} Grade,<span className={`${quizData.pass_flag ? styles.pass : styles.fail}`}>{quizData.pass_flag ? 'Pass' : 'Fail'}</span></span>
        </div>
       
        
      </div>
     
     

      {/* <div className={styles.sentencesContainer}>
        {/* <div className={styles.sentence}>
        <img
    src={categoryIcon} 
    alt="Category Icon"
    className={styles.icon2}
  />
          <span>1st attempt, You have 2 more attempts</span>
        </div> */}
       
        
      {/* </div>  */}
      
      {/* <div className={styles.sentencesContainer}>
        <div className={styles.sentence}>
        <img
    src={current}
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>Attempted {quizData.attempted_questions} Questions</span>
        </div>
        </div> */}
        {/* <div className={styles.sentence}>
        <img
        src={dateIcon} 
        alt="Calendar Icon"
        className={styles.icon2}
        />
        <span>{quizData.attained_score} attained score</span>
        </div> */}
       
       
        </div>
        {/* <div className={styles.verticalLine}></div> */}
       

        <div className={styles.boxContainer1}>
          <div className={styles.titles}>
        <p className={styles.title}>Leaderboard</p>


        </div>
        <div className={styles.lines}>
          <div className={styles.lines1}></div>
          <div className={styles.lines2}> Top 10 Rankers</div>
          <div className={styles.lines3}></div>
        </div>
        {/* <div className={styles.fistrank}>
          <img src={fistrank} alt="" style={{width:"60px",height:"52px"}} />
        </div> */}
        <div className={styles.ranksiconsContainer}>
        <img
    src={rank1Icon} 
    alt="Icon 1"
    className={styles.rankicon1}
  />
         
         <img
    src={rank2Icon} 
    alt="" 
    className={styles.rankicon2}
  />
           <img
    src={rank3Icon} 
    alt="Rank 3 Icon"
    className={styles.rankicon3}
  />
        </div>
        <div className={styles.ranksiconsContainer1}>
     <p className={styles.second}>2<span  className={styles.st}>nd</span></p>
        <p className={styles.fist}>1<span  className={styles.st}>st</span></p> 
      
        <p className={styles.thired}>3<span  className={styles.st}>rd</span></p>
        </div>
         <div className={styles.innerBoxes1}>
        <div className={styles.innerBox1} style={{width:"122px", height:"93px",}}>
        {/* <img
    src={greybox1Image} 
    alt="img 1"
  /> */}
            {/* <span className={styles.textOverImage} style={{marginTop:"-40px", marginLeft:"50px"}}>Username<br></br>99.5</span> */}
            
           </div>
          <div className={styles.innerBox2} style={{width:"122px", height:"118px", marginbottom:"23px"}}>
          {/* <img
    src={greybox2Image} 
    alt="img 1"
  /> */}
            {/* <span className={styles.textOverImage1}>Username<br></br>100</span> */}
           </div>
          <div className={styles.innerBox3} style={{width:"122px", height:"93px",}}>
          {/* <img
    src={greybox3Image} 
    alt="img 1"
  /> */}
            {/* <span className={styles.textOverImage2}>Username<br></br>99</span> */}
          </div>
        </div>    
        {/* <div className={styles.tables}>
          <div className={styles.table1}> 
            <h1 className={styles.heading}>QuI</h1>
          </div>
          <div className={styles.table2}>2</div>
          <div className={styles.table3}>3</div>
        </div> */}
        
        
        {/* <div  className={styles.columns1}>
        {/* <div className={styles.columns}>
    <span className={styles.column}>Rank</span>
    <span className={styles.column}>User Name</span>
    <span className={styles.column}>Score</span>
    <span className={styles.column}>Attempts</span>
    <span className={styles.column}>Duration</span>
  </div> */}
 
  {/* <div>
      {leaderboardData.map((entry, index) => (
        <div key={index} className={styles.values}>
          <div className={styles.value}>{entry.rank}</div>
          <div className={styles.value}>{entry.user_name}</div>
          <div className={styles.value}>{entry.score}</div>
          <div className={styles.value}>{entry.attempts}</div>
          <div className={styles.value}>{entry.duration}</div>
        </div>
      ))}
    </div> */}
    {/* </div>  */}
    <div>
      <div className={styles.innerBoxes}>
        {topThree.map((entry, index) => {
          // const boxStyles = [
          //   { width: "122px", height: "93px",  },
          //   { width: "122px", height: "118px", marginbottom:"23px"},
          //   { width: "122px", height: "93px", }
          // ];
          
          // const textStyles = [
          //   {},
          //   {},
          //   {}
          // ];

          // const images = [greybox1Image, greybox2Image, greybox3Image];

          return (
            <div key={entry.rank}  >
              {/* <img src={images[index]} alt={`img ${index + 1}`} /> */}
              <span className={styles[`textOverImage${index + 1}`]} >
                {entry.user_name} <br /> <span style={{color:'#e20000'}}>{entry.attained_percentage}</span>
              </span>
              {/* <span className={styles[`textOvernumber${index + 1}`]} >
                 {entry.attained_percentage}
              </span> */}
            </div>
          );
        })}
      </div>
      <div className={styles.columns}>
    <span className={styles.column}>Rank</span>
    <span className={styles.column}>User Name</span>
    <span className={styles.column}>Percentage</span>
    <span className={styles.column}>Attempts</span>
    <span className={styles.column}>Duration</span>
  </div>
      {leaderboardData.slice(0,10).map((entry, index) => (
        <div key={entry.rank} className={styles.values}>
          <div className={styles.value}>{entry.rank}</div>
          <div className={styles.value}>{entry.user_name}</div>
          <div className={styles.value}>{entry.attained_percentage}</div>
          <div className={styles.value}>{entry.attempts_count}</div>
          <div className={styles.value}>{entry.attempt_duration_mins}</div>
        </div>
      ))}
    </div>
    </div>
    </div>
    <div className={styles.horizontalLine} style={{marginTop:"0px"}}></div>
   
    <div className={styles.boxContainer}>
      <div className={styles.parentContainer}>
      {questions.map((question, index) => (
        <div className={styles.sentencesContainer1} style={{ marginLeft: "0px", marginTop: "40px", height:"220px" }} key={index}>
          <div className={styles.sentence}>
            {/* <img
              src={one1Image} // Replace with dynamic image selection if needed
              alt="Calendar Icon"
              className={styles.icon2}
            /> */}
             <span style={{ color: "#F4774B" }}>{index + 1}. {question.question_text}</span>
            {/* <span className={styles.iconContainer}>
              <img
                src={question.selected_option === question.correct_option ? rightIcon : wrongIcon}
                alt="Result Icon"
                className={styles.righticon}
              />
            </span> */}
          </div>

          {Object.keys(question.options).map((optionKey, idx) => {
            const optionText = question.options[optionKey];
            const isSelected = optionText === question.selected_option;
            const isCorrect = optionText === question.correct_option;

            return (
              <div className={styles.box} key={idx} style={{ backgroundColor: isCorrect ? '#A9FFB7' : isSelected ? '#FFB7B7' : 'white' }}>
                <div className={styles.iconA}>
                  {/* <img
                    src={optionKey === 'optionA' ? iconA : optionKey === 'optionB' ? iconB : optionKey === 'optionC' ? iconC : iconD}
                    alt={`Icon ${idx + 1}`}
                    width={15}
                    height={15}
                  /> */}
                  <span className={styles.iconText}>{optionLabels[optionKey]}. {optionText}</span>
                </div>
              </div>
            );
          })}

<span className={styles.newContainer}>
            <span className={styles.iconContainer}>
              {/* <img
                src={answerTimerIcon}
                alt="Answer Timer Icon"
                className={styles.icon5}
              /> */}
              <img
                src={question.selected_option === question.correct_option ? rightIcon1 : wrongIcon1}
                alt="Answer Icon"
                className={styles.icon6}
              />
            </span>
            <span className={styles.textContainer}>
              {/* <p>Answered in 53 Sec</p> */}
              <p>{question.selected_option === question.correct_option ? 'Correct Answer' : 'Wrong Answer'}</p>
            </span>
          </span>
        </div>
      ))}
      </div>
    </div>
        </div>
         <LogoutBar/>
      </div>
      
    
  );
};

export default leaderboard;
