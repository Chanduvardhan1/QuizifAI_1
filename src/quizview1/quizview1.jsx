// import Head from 'next/head';
"use client";
import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
import LeftBar from '../leftbar/leftbar';
import styles from './quizView.module.css';
import titleIcon from "../../src/assets/Images/images/quiz-Access/title.png"; 
import createdIcon from "../../src/assets/Images/images/quiz-Access/created.png"; 
import descriptionIcon from "../../src/assets/Images/images/quiz-Access/description.png";
import bot2Icon from "../../src/assets/Images/images/quizresults/bot2.png"; 
import percentIcon from "../../src/assets/Images/images/quiz-Access/percent.png";
import questionsIcon from "../../src/assets/Images/images/quiz-Access/questions.png";
import saveIcon from "../../src/assets/Images/images/quizview/save.png"; 
import retakeIcon from "../../src/assets/Images/images/quizview/retake.png"; 
import optionsIcon from "../../src/assets/Images/images/quizview/options.png";
import categoryIcon from "../../src/assets/Images/images/quiz-Access/category.png";
import timeIcon from "../../src/assets/Images/images/quiz-Access/time.png"; 
import botIcon from "../../src/assets/Images/images/quizview/bot.png";
import publicIcon from "../../src/assets/Images/images/quizview/public.png";
import startIcon from "../../src/assets/Images/images/quiz-Access/start.png";
import dateIcon from "../../src/assets/Images/images/quizview/date.png";
import one1Image from "../../src/assets/Images/images/quizview/one1.png";
import iconA from "../../src/assets/Images/images/questions/IconA.png"
import iconB from "../../src/assets/Images/images/questions/IconB.png";
import iconC from "../../src/assets/Images/images/questions/IconC.png";
import iconD from "../../src/assets/Images/images/questions/IconD.png";
import two2Icon from "../../src/assets/Images/images/quizview/two2.png";
import three3Icon from "../../src/assets/Images/images/quizview/three3.png"; 
import four4Icon from "../../src/assets/Images/images/quizview/four4.png";
import rightIcon from "../../src/assets/Images/images/quizresults/right.png"; 
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navigation from "../navbar/navbar.jsx";
import { MdOutlineCancel } from "react-icons/md";

// import LeftBar from "../pages/leftbar";

// Assuming options have image properties
const quizData = [
  {
    id: 1,
    icon: iconA,
    text: "Option A",
    image: one1Image,
    imageWidth: "100px",
    imageHeight: "100px"
  },
  {
    id: 2,
    icon: iconB,
    text: "Option B",
    image: two2Icon,
    imageWidth: "100px",
    imageHeight: "100px"
  },
  {
    id: 3,
    icon: iconC,
    text: "Option C",
    image: three3Icon,
    imageWidth: "100px",
    imageHeight: "100px"
  },
  {
    id: 4,
    icon: iconD,
    text: "Option D",
    image: four4Icon,
    imageWidth: "100px",
    imageHeight: "100px"
  }
];
const getQuestionImage = (index) => {
  switch(index) {
    case 0:
      return one1Image;
    case 1:
      return two2Icon;
    case 2:
      return three3Icon;
    case 3:
      return four4Icon;
    default:
      return ""; // Return default image or handle as per your requirement
  }
}
const quizview1 = () => {
  const [quizData, setQuizData] = useState(null);

  const location = useLocation();

  // State to hold the quiz data

  useEffect(() => {
    // Check if quizData exists in location state before accessing its properties
    if (location.state && location.state.quizData) {
      // Access the quizData from the location state
      const quizDataFromLocation = location.state.quizData;

      // Set the quizData state with the data from location state
      setQuizData(quizDataFromLocation);
    } else {
      console.log("No quiz data found in location state:", location.state);
    }
  }, [location.state]); 

  console.log("Quiz data:", quizData);


  const navigate = useNavigate();
  // const handleBackToquizcreated = () => {
  //   navigate("/quizcreated");
  // };
  const Back = () => {
    // Check if quizData exists before navigating
    if (quizData) {
      // Pass quizData as state when navigating to "/quizcreated1"
      navigate("/quizcreated1", { state: { quizData } });
    } else {
      console.log("Quiz data is not available to pass to '/quizcreated1'.");
      // Navigate without passing quizData if it's not available
      navigate("/quizcreated1");
    }
  };

  // useEffect(() => {
  //   // const userId = sessionStorage.getItem('userId'); // Retrieve the user ID from sessionStorage
  //   // if (userId) {
  //     fetch('https://dev.quizifai.com:8010/access_quiz_for_master', {
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         quiz_id: 963,
  //         user_id: 1
  //       })
  //     })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       setQuizData(data.data);
  //     })
  //     .catch(error => {
  //       console.error('There was a problem with your fetch operation:', error);
  //     });
  //   // }
  // }, []);
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.slice(0, 4); // Return only the first 4 elements after shuffling
  }
  return (
    <div className={styles.container}>
      {/* <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head> */}
      <Navigation/>
         {quizData && (
      // <div className={styles.mainContent}>
          <div>
        {/* <div className={styles.header}>
        <div className={styles.titleContainer}>
        <img
  src={titleIcon} 
  alt="User Icon"
  className={styles.icon1}
/>
          <span>{quizData.quiz_title}</span>
        </div>
        <div className={styles.infoContainer}>
        <img
  src={createdIcon} 
  alt="Calendar Icon"
  className={styles.icon2}
/>
          <span>Quiz created by {quizData.created_by} on {quizData.created_date}</span>
        </div>
      </div>
      <div className={styles.descriptionContainer}>
      <img
    src={descriptionIcon} 
    alt="Description Icon"
    className={styles.description}
  />
      <span className={styles.descriptionText}>{quizData.quiz_description}</span>
      </div> */}
     
      {/* <div className={styles.horizontalLine}></div>
      <div className={styles.sentencesContainer}>
        <div className={styles.sentence}>
        <img
    src={percentIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>{quizData.pass_percentage}% is the pass score</span>
        </div>
        <div className={styles.sentence}>
        <img
    src={createdIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>Complexity:{quizData.quiz_complexity_name}</span>
        </div>
        <div className={styles.sentence}>
        <img
    src={questionsIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>{quizData.num_questions} questions</span>
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
          <span>Save this paper: {quizData.save_paper}</span>
        </div>
        <div className={styles.sentence}>
        <img
    src={retakeIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>Retake this paper: {quizData.retake_count}</span>
        </div>
        <div className={styles.sentence}>
        <img
    src={optionsIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>Multiple Answers: {quizData.multi_answer ? 'Yes' : 'No'}</span>
        </div>
        
      </div>

      <div className={styles.horizontalLine}></div>
      <div className={styles.sentencesContainer}>
        <div className={styles.sentence}>
        <img
    src={categoryIcon} 
    className={styles.icon2}
  />
          <span>{quizData.quiz_sub_category_name} from {quizData.quiz_category_name}</span>
        </div>
        <div className={styles.sentence}>
        <img
    src={timeIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
            <span>Total {quizData.quiz_duration} minutes</span> {" "}
              <span>{quizData.quiz_duration * 60 / quizData.num_questions} seconds  for each questions</span>
        </div>
        
      </div>
      <div className={styles.horizontalLine}></div> */}
      {/* <div className={styles.sentencesContainer}>
        <div className={styles.sentence}>
        <img
    src={dateIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>Quiz will be live from: {quizData.available_from} to {quizData.disabled_on}</span>
        </div>
        <div className={styles.sentence}>
        <img
    src={botIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>AI support needed: {quizData.ai_support ? 'Yes' : 'No'}</span>
        </div>
        <div className={styles.sentence}>
        <img
    src={publicIcon} 
    alt="Calendar Icon"
    className={styles.icon2}
  />
          <span>Public access: {quizData.quiz_public_access ? 'Yes' : 'No'}</span>
        </div>
        </div> */}
                 <div className="absolute top-[30px] left-[1260px] cursor-pointer text-[#eeb600f0] " onClick={Back}><MdOutlineCancel /></div>

        <div className={styles.boxContainer}>
        {quizData && quizData.questions && quizData.questions.map((question, index) => (
  <div key={index} className={styles.questionContainer}>
    <div className={styles.question}>
      <span className={styles.questionText}>{index + 1}. {question.question_text}</span>
    </div>
    <div className={styles.options}>
      {question.options.map((option, optionIndex) => (
        <div key={optionIndex} className={styles.option}>
          <input 
            type="radio" 
            id={`option_${index}_${optionIndex}`} 
            name={`question_${index}`} 
            checked={option.correct_answer_flag} // Check if option is correct
          />
          <label htmlFor={`option_${index}_${optionIndex}`} className={styles.optionLabel}>
            {String.fromCharCode(97 + optionIndex)}. {option.answer_option_text}
          </label>
        </div>
      ))}
    </div>
  </div>
))}
</div>
      <div className={styles.editbuttonContainer}>
      {/* <button className={styles.editbutton}>Edit</button> */}
      {/* <button className={styles.editbutton} onClick={handleBackToquizcreated}>back</button> */}
      </div>
      </div>

        // </div>
      )}
      </div>
      

  );
};

export default quizview1;
