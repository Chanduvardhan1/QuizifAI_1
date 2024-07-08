//import Head from 'next/head';
//import img from 'next/image';
import React, { useState } from "react";
import styles from './quizView.module.css';
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
import dateIcon from "../assets/Images/images/quizview/date.png";
import one1Image from "../assets/Images/images/quizview/one1.png";
import iconA from "../assets/Images/images/questions/IconA.png";
import iconB from "../assets/Images/images/questions/IconB.png";
import iconC from "../assets/Images/images/questions/IconC.png";
import iconD from "../assets/Images/images/questions/IconD.png";
import two2Icon from "../assets/Images/images/quizview/two2.png";
import three3Icon from "../assets/Images/images/quizview/three3.png"; 
import four4Icon from "../assets/Images/images/quizview/four4.png";
import rightIcon from "../assets/Images/images/quizresults/right.png"; 
import LeftBar from "../leftbar/leftbar";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const QuizView = () => {



  const [quizData, setQuizData] = useState(null);
  // Use useLocation hook to access the location object
  const location = useLocation();

  useEffect(() => {
    // Check if quizData exists in location state before accessing its properties
    if (location.state && location.state.quizData) {
      // Access the quizData from the location state
      const quizData = location.state.quizData;
      setQuizData(quizData.data);

      // Show quizData in the console
      console.log(quizData);
    }
  }, [location.state]);
  return (
    <div className={styles.container}>
      {/*<Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
  </Head>*/}
      <LeftBar/>
          {quizData && (
      <div className={styles.mainContent}>
        <div className={styles.header}>
        <div className={styles.titleContainer}>
        <img
  src={titleIcon} 
  alt="User Icon"
  className={styles.icon1}
  />
          <span> {quizData[0].quiz_title}</span>
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
      <span className={styles.descriptionText}>  {quizData[0].quiz_description}</span>
      </div>
     
      <div className={styles.horizontalLine}></div>
      <div className={styles.sentencesContainer}>
        <div className={styles.sentence}>
        <img
    src={percentIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>  {quizData[0].pass_percentage}%  is the pass score</span>
        </div>
        <div className={styles.sentence}>
        <img
    src={createdIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>Complexity:{quizData[0].quiz_complexity_name}</span>
        </div>
        <div className={styles.sentence}>
        <img
    src={questionsIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>  {quizData[0].num_questions} questions</span>
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
          <span>Retake this paper: {quizData[0].retake_flag}</span>
        </div>
        <div className={styles.sentence}>
        <img
    src={optionsIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>Multiple Answers:   {quizData[0].multi_answer ? "Yes" : "No"}</span>
        </div>
        
      </div>

      <div className={styles.horizontalLine}></div>
      <div className={styles.sentencesContainer}>
        <div className={styles.sentence}>
        <img
    src={categoryIcon} 
    className={styles.icon2}
  />
          <span> {quizData[0].quiz_sub_category_name} from  {" "}{quizData[0].quiz_category_name}</span>
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
       
        <div className={styles.boxContainer}>
        {/* Content inside the box container */}
        <div className={styles.sentencesContainer1} style={{marginLeft:"30px", marginTop:"40px"}}>
        <div className={styles.sentence}>
        <img
    src={one1Image} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span style={{color:"#F4774B"}}>Capital of INDIA Capital of INDIA Capital of INDIA Capital of INDIA</span>
          <span className={styles.iconContainer}>
          
  </span>
        </div>
        
        {/* Box 1 */}
        <div className={styles.box}>
    <div className={styles.iconA}>
    <img
    src={iconA} 
    alt="Icon 1"
    width={15}
    height={15}
  />
        <span className={styles.iconText}>Wrong Answer</span>
    </div>
</div>
<div className={styles.box} style={{backgroundColor:"#A9FFB7"}}>
    <div className={styles.iconB}>
    <img
    src={iconB} 
    alt="Icon 1"
    width={10}
    height={10}
  />
        <span className={styles.iconText}>Correct Answer</span>
    </div>
</div>
<div className={styles.box}>
    <div className={styles.iconC}>
    <img
    src={iconC} 
    alt="Icon 1"
    width={10}
    height={10}
  />
        <span className={styles.iconText}>Wrong Answer</span>
    </div>
</div>
<div className={styles.box}>
    <div className={styles.iconD}>
    <img
    src={iconD} 
    alt="Icon 1"
    width={10}
    height={10}
  />
        <span className={styles.iconText}>Wrong Answer</span>
    </div>
</div>
</div>

<div className={styles.sentencesContainer1} style={{marginLeft:"30px", marginTop:"40px"}}>
        <div className={styles.sentence}>
        <img
    src={two2Icon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span style={{color:"#F4774B"}}>Capital of INDIA Capital of INDIA Capital of INDIA Capital of INDIA</span>
          <span className={styles.iconContainer}>
         
  </span>
        </div>
        {/* Box 1 */}
        <div className={styles.box}>
    <div className={styles.iconA}>
    <img
    src={iconA} 
    alt="Icon 1"
    width={15}
    height={15}
  />
        <span className={styles.iconText}>Wrong Answer</span>
    </div>
</div>
<div className={styles.box} style={{backgroundColor:"#A9FFB7"}}>
    <div className={styles.iconB}>
    <img
    src={iconB} 
    alt="Icon 1"
    width={10}
    height={10}
  />
        <span className={styles.iconText}>Correct Answer</span>
    </div>
</div>
<div className={styles.box}>
    <div className={styles.iconC}>
    <img
    src={iconC} 
    alt="Icon 1"
    width={10}
    height={10}
  />
        <span className={styles.iconText}>Wrong Answer</span>
    </div>
</div>
<div className={styles.box}>
    <div className={styles.iconD}>
    <img
    src={iconD} 
    alt="Icon 1"
    width={10}
    height={10}
  />
        <span className={styles.iconText}>Wrong Answer</span>
    </div>
</div>
</div>
<div className={styles.sentencesContainer1} style={{marginLeft:"30px", marginTop:"40px"}}>
        <div className={styles.sentence}>
        <img
    src={three3Icon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span style={{color:"#F4774B"}}>Capital of INDIA Capital of INDIA Capital of INDIA Capital of INDIA </span>
          <span className={styles.iconContainer}>
        
  </span>
        </div>
        {/* Box 1 */}
        <div className={styles.box}>
    <div className={styles.iconA}>
    <img
    src={iconA}
    alt="Icon 1"
    width={15}
    height={15}
  />
        <span className={styles.iconText}>Wrong Answer</span>
    </div>
</div>
<div className={styles.box} >
    <div className={styles.iconB}>
    <img
    src={iconB}
    alt="Icon 2"
    width={10}
    height={10}
  />
        <span className={styles.iconText}>Wrong Answer</span>
    </div>
</div>
<div className={styles.box}>
    <div className={styles.iconC}>
    <img
    src={iconC}
    alt="Icon 3"
    width={10}
    height={10}
  />
        <span className={styles.iconText}>Wrong Answer</span>
    </div>
</div>
<div className={styles.box} style={{backgroundColor:"#A9FFB7"}}>
    <div className={styles.iconD} >
    <img
    src={iconD}
    alt="Icon 4"
    width={10}
    height={10}
  />
        <span className={styles.iconText}>Correct Answer</span>
    </div>
</div>
</div>

<div className={styles.sentencesContainer1} style={{marginLeft:"30px", marginTop:"40px"}}>
<div className={styles.sentence}>
        <img
    src={four4Icon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span style={{color:"#F4774B"}}>Capital of INDIA Capital of INDIA Capital of INDIA Capital of INDIA</span>
          <span className={styles.iconContainer}>
          
  </span>
        </div>
        {/* Box 1 */}
        <div className={styles.box}>
    <div className={styles.iconA}>
    <img
    src={iconA}
    alt="Icon 1"
    width={15}
    height={15}
  />
        <span className={styles.iconText}>Wrong Answer</span>
    </div>
</div>
<div className={styles.box} >
    <div className={styles.iconB}>
    <img
    src={iconB}
    alt="Icon 2"
    width={10}
    height={10}
  />
        <span className={styles.iconText}>Wrong Answer</span>
    </div>
</div>
<div className={styles.box}style={{backgroundColor:"#A9FFB7"}}>
    <div className={styles.iconC}>
    <img
    src={iconC}
    alt="Icon 3"
    width={10}
    height={10}
  />
        <span className={styles.iconText}>Correct Answer</span>
    </div>
</div>
<div className={styles.box}style={{backgroundColor:"#A9FFB7"}}>
    <div className={styles.iconD}>
    <img
    src={iconD}
    alt="Icon 4"
    width={10}
    height={10}
  />
        <span className={styles.iconText}>Correct Answer</span>
    </div>
</div>
</div>

      </div>
      <div className={styles.editbuttonContainer}>
      <button className={styles.editbutton}>Edit</button>
      </div>
       
       
        </div>
        )}
         
      </div>
      
    
  );
};

export default QuizView;
