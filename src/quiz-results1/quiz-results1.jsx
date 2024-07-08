//import Head from 'next/head';
//import img from "next/image";
import styles from './quizresults1.module.css';
import React, { useEffect, useState } from 'react';
import ranksIcon from "../assets/Images/images/quizresults/ranks.png"; 
import rank1Icon from "../assets/Images/images/quizresults/rank1.png";
import rank2Icon from "../assets/Images/images/quizresults/rank2.png";
import rank3Icon from "../assets/Images/images/quizresults/rank3.png";
import rankScoreIcon from "../assets/Images/images/quizresults/rankscore.png";
import greybox1Image from "../assets/Images/images/quizresults/greybox1.png";  
import greybox2Image from "../assets/Images/images/quizresults/greybox2.png";
import greybox3Image from "../assets/Images/images/quizresults/greybox3.png"; 
import FirstRank from "../assets/Images/images/quizresults/FirstRank.png";
import rightIcon from "../assets/Images/images/quizresults/right.png"; 
import one1Image from "../assets/Images/images/quizview/one1.png";
import iconA from "../assets/Images/images/questions/IconA.png";
import iconB from "../assets/Images/images/questions/IconB.png";
import iconC from "../assets/Images/images/questions/IconC.png";
import iconD from "../assets/Images/images/questions/IconD.png";
import dateIcon from "../assets/Images/images/quizview/date.png";
import answerTimerIcon from "../assets/Images/images/quizresults/answerTimer.png"; 
import rightIcon1 from "../assets/Images/images/quizresults/righticon.png"; 
import wrongIcon from "../assets/Images/images/quizresults/wrong.png";
import wrongIcon1 from "../assets/Images/images/quizresults/wrongicon.png";
import two2Icon from "../assets/Images/images/quizview/two2.png";
import three3Icon from "../assets/Images/images/quizview/three3.png"; 
import four4Icon from "../assets/Images/images/quizview/four4.png";
import titleIcon from "../assets/Images/images/quiz-Access/title.png"; 
import createdIcon from "../assets/Images/images/quiz-Access/created.png"; 
import descriptionIcon from "../assets/Images/images/quiz-Access/description.png";
import bot2Icon from "../assets/Images/images/quizresults/bot2.png"; 
import percentIcon from "../assets/Images/images/quiz-Access/percent.png";
import questionsIcon from "../assets/Images/images/quiz-Access/questions.png";
import saveIcon from "../assets/Images/images/quizview/save.png"; 
import retakeIcon from "../assets/Images/images/quizview/retake.png"; 
import optionsIcon from "../assets/Images/images/quizview/options.png";
import categoryIcon from "../assets/Images/images/quiz-Access/category.png";
import timeIcon from "../assets/Images/images/quiz-Access/time.png"; 
import botIcon from "../assets/Images/images/quizview/bot.png";
import publicIcon from "../assets/Images/images/quizview/public.png";
import startIcon from "../assets/Images/images/quiz-Access/start.png";
import LeftBar from "../leftbar/leftbar";
import { useLocation } from 'react-router-dom';
import Navigation from "../navbar/navbar.jsx"
import LogoutBar from "../logoutbar/logoutbar.jsx";
import Attempt1 from "../../public/images/dashboard/Attempt1.png";
import NoOfQuestion from "../../public/images/dashboard/NoOfQuestion.png";
import Clock from "../../public/images/dashboard/Clock.png";
import Easy from "../../public/images/dashboard/Easy.png";
import rankimage from "../../src/assets/Images/images/quizresults/rank.jpg"
import sucess from "../../src/assets/Images/images/quizresults/success.png"
import sucess1 from "../../src/assets/Images/images/quizresults/success1.png"
import Top1 from "../../src/assets/Images/images/quizresults/top-score.png"
import fast from "../../src/assets/Images/images/quizresults/fast.png"

import percentIcon1 from "../../src/assets/Images/images/quizresults/discount.png"; 
import timeIcon1 from "../../src/assets/Images/images/quizresults/stopwatch1.png";
import dateIcon1 from "../../src/assets/Images/images/quizresults/schedule.png";
import current from "../../src/assets/Images/images/quizresults/faq.png"
import average1 from "../../src/assets/Images/images/quizresults/average1.png"
import questions from "../../src/assets/Images/images/quizresults/question-mark.png"

const Questions = () => {
  const location = useLocation();
  const { quizId , quizTotalMarks, passPercentage,quizname,quizdescription,createdby,complexity,numberofquestions,quizduration,  mincompletiontime,
    quizattempts,
    avgscore,
    max_percentage} = location.state || {};
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [quizData, setQuizData] = useState({});
  const [quizMetrics, setQuizMetrics] = useState({})
  useEffect(() => {
    const fetchData = async () => {
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
          // Assuming you have quiz data in result, otherwise update this part
          setQuizData({
            quiz_name: result.data[0].quiz_name,
            quiz_description: result.data[0].quiz_description,
            created_by: result.data[0].created_by,
            created_date: result.data[0].created_date,
            attempts_count: result.data[0].attempts_count,
            total_questions: result.data[0].total_questions,
            quiz_duration: result.data[0].quiz_duration,
            complexity: result.data[0].complexity,

          });
          setQuizMetrics(result.quiz_metrices);

        } else {
          console.error('Failed to fetch leaderboard data:', result.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (quizId) {
      fetchData();
    }
  }, [quizId]);
const topThree = leaderboardData.slice(0, 3);
  const remaining = leaderboardData.slice(0,10);

  return (
    <div className={styles.container}>
      {/*<Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
  </Head>*/}
      <Navigation/>
      <div className={styles.mainContent}>
       <div className={styles.mainContent1}>
      
        <div className={styles.titleContainer1}>
        {/* <img
  src={titleIcon} 
  alt="User Icon"
  className={styles.icon1}
/> */}
          <span className={styles.quizname}>{quizname}</span>
          <p className={styles.quizdescription}>{quizdescription}</p>
          <div className={styles.Questionslines }>
        <div className={styles.Questions}>

        <span className={styles.Question} >Questions :</span>{" "}
          <span className={styles.username1} >{complexity}</span>
        </div>
        <div>

        <span className={styles.Question} >Duration:</span>{" "}
          <span className={styles.username1} >{quizduration}</span>
        </div>
        <div>

<span className={styles.Question} >Total Marks:</span>{" "}
  <span className={styles.username1} >{quizTotalMarks}</span>
</div>
<div>

<span className={styles.Question } >Pass Score :</span>{" "}
  <span className={styles.username1} >{passPercentage}</span>
</div>
<div>

<span className={styles.Question } >Complexity:</span>{" "}
  <span className={styles.username1} >{numberofquestions}</span>
</div>
        </div>
          <div className={styles.Createdbyupdated}>
        <div className={styles.Created}>

        <span className={styles.Createdby} >Created By:</span>
          <span className={styles.username} >{createdby}</span>
        </div>
        <div>

        <span className={styles.Createdby} >Created On:</span>{" "}
          <span className={styles.username} >{`${quizData.created_date}`}</span>
        </div>
        </div>
        </div>
        <div className={styles.horizontalLine}></div>

        {/* <div className={styles.infoContainer}>
        {/* <img
  src={createdIcon} 
  alt="Calendar Icon"
  className={styles.icon2}
/> */}
          {/* <span>user name<br></br>date</span> */}
        {/* </div>  */}
    <div className={styles.flexcontent} >
      <div className={styles.flexcolumnecontent}>
      <div className={styles.verticaliconsContainer}>
          <img  className={styles.verticalicon4} style={{width:"80px" , height:"65px"}}
         src={questions} />
        <img
    src={rankimage} 
    alt="Icon 1"
    className={styles.verticalicon1}
  />
  <h1 className={styles.rank1}>Your Rank</h1>
      </div>
<div className={styles.alldetails}>
  <img className={styles.Allimg} src={sucess} alt="" />
  <span  className={styles.Question}>Total Attempts: </span>
  <span className={styles.username1} >{quizattempts}</span>

</div>
{/* <div className={styles.alldetails}>
<img className={styles.Allimg}  src={dateIcon1} a alt="" />
<span  className={styles.Question}>Most Recent Attempt: </span>
<span className={styles.username1} ></span>

</div> */}
<div className={styles.alldetails}>
<img className={styles.Allimg}  src={timeIcon1} alt="" />
<span  className={styles.Question}>Average Completion Time: </span>
<span className={styles.username1} >{mincompletiontime} Minutes</span>

</div>
{/* <div className={styles.alldetails}>
<img className={styles.Allimg}  src={fast} alt="" style={{ width:"30px", height:"40px", marginRight:"5px"}} />
<span  className={styles.Question}>Record Fastest Completion: </span>
<span className={styles.username1} ></span>

</div> */}
<div className={styles.alldetails}>
  <img className={styles.Allimg} src={Top1} alt="" style={{ width:"42px", height:"44px",marginRight:"-10px",position:"relative",right:"5px"}}/>
  <span  className={styles.Question}>Top Score:</span>
  <span className={styles.username1} >{quizMetrics.highest_score}</span>

</div>
<div className={styles.alldetails}>
<img className={styles.Allimg}  src={average1} a alt="" />
<span  className={styles.Question}>Average Score: </span>
<span className={styles.username1} >{avgscore}</span>

</div>
{/* <div className={styles.alldetails}>
<img className={styles.Allimg}  src={current} alt="" />
<span  className={styles.Question}>Total Questions Attempted: </span>
<span className={styles.username1} > Minutes</span>

</div> */}
{/* <div className={styles.alldetails}>
<img className={styles.Allimg}  src={sucess1} alt="" />
<span  className={styles.Question}>Success Rate: </span>
<span className={styles.username1} ></span>

</div> */}
{/* <div className={styles.alldetails}>
<img className={styles.Allimg}  src={percentIcon1} alt="" />
<span  className={styles.Question}>Number of Perfect Scores (100%): </span>
<span className={styles.username1} ></span>

</div> */}

      </div>
        <div className={styles.boxContainer1}>

        <div className={styles.titles}>
        <p className={styles.title}>Leaderboard</p>
        </div>
        <div className={styles.lines}>
          <div className={styles.lines1}></div>
          <div className={styles.lines2}> Top 10 Rankers</div>
          <div className={styles.lines3}></div>
        </div>
        {/* <div className={styles.firstRank}>
        <img src={FirstRank} alt="First Rank" style={{width:"60px",height:"52px"}} />
        </div> */}
        <div className={styles.ranksiconsContainer}>
          <img src={rank1Icon} alt="Icon 1" className={styles.rankicon1} />
      
          <img src={rank2Icon} alt="" className={styles.rankicon2} />
          <img src={rank3Icon} alt="Rank 3 Icon" className={styles.rankicon3} />
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
          <div className={styles.innerBox2} style={{width:"122px", height:"118px", marginTop:"-24px",}}>
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
        <div className={styles.innerBoxes}>
        {topThree.map((item, index) => (
            <div
              key={index}
              className={styles[`innerBox${index + 1}`]}
              style={{
                width: "122px",
                height: "93px",
      
              }}
            >
              {/* <img
                src={index === 0 ? greybox1Image : index === 1 ? greybox2Image : greybox3Image}
                alt={`img ${index + 1}`}
              /> */}
              <span
                className={styles[`textOverImage${index + 1}`]}
                style={{ width: "100px" }}
              >
                {item.user_name}<br />
                <span style={{ color: index === 0 ? "#e20000" : index === 1 ? "#e20000" : "#e20000" }}>{item.attained_percentage}</span>
              </span>
            </div>
          ))}
        </div>
       
        
      
        <div className={styles.columns}>
    <span className={styles.column}>Rank</span>
    <span className={styles.column}>User Name</span>
    <span className={styles.column}>Percentage</span>
    <span className={styles.column}>Attempts</span>
    <span className={styles.column}>Duration</span>
  </div>
        
  {remaining.map((item, index) => (
        <div className={styles.values} key={index + 3}>
          <div className={styles.value}>{item.rank}</div>
          <div className={styles.value}>{item.user_name}</div>
          <div className={styles.value}>{item.attained_percentage}</div>
          <div className={styles.value}>{item.attempts_count}</div>
          <div className={styles.value}>{item.attempt_duration_mins}</div>
        </div>
      ))}
          </div>
          </div>
          {/* <div>
  <span className={styles.boticonContainer}>
  <img
    src={bot2Icon} 
    alt="Your Icon"
    className={styles.boticon}
  />
  </span>
  </div> */}
  </div>
  {/* <div className={styles.header}>
        <div className={styles.titleContainer}>
        <img
      src={titleIcon} 
      alt="User Icon"
      className={styles.icon1}
    />
          <span>Title of the Quiz</span>
        </div>
        <div className={styles.infoContainer}>
        <img
      src={createdIcon} 
      alt="Calendar Icon"
      className={styles.icon2}
    />
          <span>Quiz created by user name on date</span>
        </div>
      </div>
      <div className={styles.descriptionContainer}>
      <img
      src={descriptionIcon} 
      alt="Description Icon"
      className={styles.description}
    />
      <span className={styles.descriptionText}>Description of the Quiz Description of the Quiz Description of the Quiz  Description of the Quiz <br></br>Description of the Quiz Description of the Quiz Description of the Quiz Description of the Quiz</span>
      </div>
     
      <div className={styles.horizontalLine}></div>
      <div className={styles.sentencesContainer}>
        <div className={styles.sentence}>
        <img
    src={percentIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>70% is the pass score</span>
        </div>
        <div className={styles.sentence}>
        <img
    src={createdIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>Complexity: Simple | Medium | Complex</span>
        </div>
        <div className={styles.sentence}>
        <img
    src={questionsIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>20 questions</span>
        </div>
        
      </div>
      <div className={styles.horizontalLine}></div>
      <div className={styles.sentencesContainer}>
        <div className={styles.sentence}>
        <img
    src={saveIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />

          <span>Save this paper: Yes</span>
        </div>
        <div className={styles.sentence}>
        <img
    src={retakeIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>Retake this paper: 2</span>
        </div>
        <div className={styles.sentence}>
        <img
    src={optionsIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>Multiple Answers:  Yes</span>
        </div>
        
      </div>

      <div className={styles.horizontalLine}></div>
      <div className={styles.sentencesContainer}>
        <div className={styles.sentence}>
        <img
    src={categoryIcon} 
    className={styles.icon2}
  />

          <span>Sub Category from Quiz Category</span>
        </div>
        <div className={styles.sentence}>
        <img
    src={timeIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>Total 40 mins of 60 Sec for each questions</span>
        </div>
        
      </div>
      <div className={styles.horizontalLine}></div>
      <div className={styles.sentencesContainer}>
        <div className={styles.sentence}>
        <img
    src={dateIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>Quiz will be live from: DD/MM/YYYY to DD/MM/YYYY</span>
        </div>
        <div className={styles.sentence}>
        <img
    src={botIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>AI support needed: Yes</span>
        </div>
        <div className={styles.sentence}>
        <img
    src={publicIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>Public access: Yes</span>
        </div>
        </div>
        
        <div className={styles.buttonContainer}>
        <button className={styles.imageButton}>
        <img
    src={startIcon} 
    alt="Calendar Icon"
  />
        </button>
      </div> */}
        </div>
        <LogoutBar/>
         
      </div>
      
    
  );
};

export default Questions;
