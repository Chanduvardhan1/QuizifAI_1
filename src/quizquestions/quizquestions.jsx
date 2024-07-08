//import Head from 'next/head';
//import img from 'next/image';
import { useEffect, useState,useRef } from 'react';
import styles from './quizquestions.module.css';
import numberIcon from "../assets/Images/images/questions/numberIcon.png"; 
import iconA from "../assets/Images/images/questions/IconA.png";
import iconB from "../assets/Images/images/questions/IconB.png";
import iconC from "../assets/Images/images/questions/IconC.png";
import iconD from "../assets/Images/images/questions/IconD.png"; 
import clockIcon from "../assets/Images/images/questions/clock.png";
import LeftBar from "../leftbar/leftbar";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { MdOutlineCancel } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import Navigation from "../navbar/navbar.jsx";
import LogoutBar from "../logoutbar/logoutbar.jsx";


const QuizQuestions = () => {

  // const [quizData, setQuizData] = useState(null);
  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // const [selectedOptions, setSelectedOptions] = useState({});
  // const [answers, setAnswers] = useState({});
  // const [attemptNo, setAttemptNo] = useState(null);
  // const { quizId } = useParams();
  // useEffect(() => {
  //   const userId = localStorage.getItem("user_id");

  //   fetch('https://quizifai.com:8010/get-questions', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       quiz_id: 46,
  //       user_id: userId
  //     })
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       console.log(data);
  //       setQuizData(data.data);
  //       setAttemptNo(data.data.quiz_level_attempt_id);
  //     })
  //     .catch(error => {
  //       console.error('There was a problem with your fetch operation:', error);
  //     });
  // }, []); 

  // if (!quizData) {
  //   return <div>Loading...</div>;
  // }


  // const handleOptionSelect = (optionId) => {
  //   setSelectedOptions(prevOptions => ({
  //     ...prevOptions,
  //     [currentQuestionIndex]: optionId
  //   }));
  // };

  // const handlePreviousQuestion = () => {
  //   setCurrentQuestionIndex(prevIndex => prevIndex - 1);
  // };

  // const handleNextQuestion = () => {
  //   setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  // };

  // const handleSubmit = () => {
  //   const userId = localStorage.getItem("user_id");
  //   const answers = Object.keys(selectedOptions).map(questionIndex => ({
  //     question_id: quizData.questions[questionIndex].question_id,
  //     options: {
  //       [`option_${selectedOptions[questionIndex]}`]: true
  //     }
  //   }));

  //   fetch('https://quizifai.com:8010/submit', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       user_id: userId,
  //       quiz_id: quizId,
  //       attempt_no: attemptNo,
  //       answers: answers
  //     })
  //   })
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     return response.json();
  //   })
  //   .then(data => {
  //     console.log(data);
  //     // Handle response if needed
  //     setAttemptNo(data.data.quiz_level_attempt_id);
  //   })
  //   .catch(error => {
  //     console.error('There was a problem with your fetch operation:', error);
  //   });
  // };

  // if (!quizData) {
  //   return <div>Loading...</div>;
  // }

  // const currentQuestion = quizData.questions.data[currentQuestionIndex];
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const userId = localStorage.getItem("user_id");
 // Assuming quiz_id is 1592
  const [attemptNo, setAttemptNo] = useState(null);
  
  const { quizId } = useParams();
  const location = useLocation();
  const {quiz_title, quiz_description,quiz_duration,quiz_total_marks,num_questions,pass_percentage} = location.state;
  const [elapsedTime, setElapsedTime] = useState(quiz_duration * 60); 
  const timerRef = useRef(null);


  useEffect(() => {
    const quizId = localStorage.getItem("quiz_id");
    fetch('https://quizifai.com:8010/get-questions', {
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

      if (data && data.data && Array.isArray(data.data)) {
        const questions = data.data.filter(item => item.question_id !== undefined);
        const attemptData = data.data.find(item => item.quiz_level_attempt_id !== undefined);

        setQuizData({ questions });

        if (attemptData) {
          setAttemptNo(attemptData.quiz_level_attempt_id);
          setQuizData(prevState => ({
            ...prevState,
            created_by: attemptData.created_by,
            created_on: attemptData.created_on
          }));
        } else {
          console.warn('No object with quiz_level_attempt_id found');
        }
        
        // Start the countdown timer
        timerRef.current = setInterval(() => {
          setElapsedTime(prevTime => {
            if (prevTime > 0) {
              return prevTime - 1;
            } else {
              clearInterval(timerRef.current);
              return 0;
            }
          });
        }, 1000);
      } else {
        throw new Error('Unexpected response format');
      }
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
    });

    return () => {
      clearInterval(timerRef.current);
    };
  }, [userId, quiz_duration]);
 
  const handleOptionSelect = (optionId) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      [currentQuestionIndex]: optionId
    }));
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex - 1);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  const navigate = useNavigate();
  const handleSubmit = () => {
    clearInterval(timerRef.current);
    if (!quizData || !quizData.questions) {
      console.error('No quiz data available to submit');
      return;
    }

    const answers = Object.keys(selectedOptions).map(questionIndex => ({
      question_id: quizData.questions[questionIndex].question_id,
      options: {
        option_1: selectedOptions[questionIndex] === quizData.questions[questionIndex].quiz_ans_option_1_id,
        option_2: selectedOptions[questionIndex] === quizData.questions[questionIndex].quiz_ans_option_2_id,
        option_3: selectedOptions[questionIndex] === quizData.questions[questionIndex].quiz_ans_option_3_id,
        option_4: selectedOptions[questionIndex] === quizData.questions[questionIndex].quiz_ans_option_4_id
      }
    }));
    // const quizId = localStorage.getItem("quiz_id");

    fetch('https://quizifai.com:8010/submit', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userId,
        quiz_id: quizId,
        attempt_no: attemptNo,
        answers: answers
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
      navigate(`/quizresults`, { state: { quizId, attemptNo } });
      // Handle response if needed
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
    });
  };
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  if (!quizData || !quizData.questions) {
    return <div>Loading...</div>;
  }
  const filteredQuizData = quizData.questions.filter(item => item.question_id);
  const currentQuestion = quizData.questions.filter(item => item.question_id)[currentQuestionIndex];
  const optionLabels = ['A', 'B', 'C', 'D'];
  const optionKeys = ['quiz_ans_option_1_text', 'quiz_ans_option_2_text', 'quiz_ans_option_3_text', 'quiz_ans_option_4_text'];

  const sortedOptionKeys = [...optionKeys].sort((a, b) => {
    const optionA = currentQuestion[a];
    const optionB = currentQuestion[b];
  
    // Define your special options
    const specialOptions = ["All of the above", "None of the above"];
  
    // Check if optionA or optionB is a special option
    if (specialOptions.includes(optionA) && specialOptions.includes(optionB)) {
      // Both are special options, sort alphabetically
      return optionA.localeCompare(optionB);
    } else if (specialOptions.includes(optionA)) {
      // optionA is a special option, it should come last
      return 1;
    } else if (specialOptions.includes(optionB)) {
      // optionB is a special option, it should come last
      return -1;
    } else {
      // Otherwise, maintain the current order
      return 0;
    }
  });
  

  const Back = () => {
    
    navigate("/quizaccess");
  
};

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
      <div>
        <h1 className={styles.quiztitle} style={{color:"#214082"}}>{quiz_title}</h1>
        <p className={styles.quizdescription}>{quiz_description}</p>
        <div className={styles.Questionslines }>
        <div className={styles.Questions}>

        <span className={styles.Question} >Questions :</span>{" "}
          <span className={styles.username1} >{num_questions}</span>
        </div>
        <div>

        <span className={styles.Question} >Duration:</span>{" "}
          <span className={styles.username1} >{quiz_duration} min</span>
        </div>
        <div>

<span className={styles.Question} >Total Score:</span>{" "}
  <span className={styles.username1} >{quiz_total_marks}</span>
</div>
<div>

<span className={styles.Question } >Pass Score :</span>{" "}
  <span className={styles.username1} >{pass_percentage}</span>
</div>
        </div>
        <div className={styles.Createdbyandupdated}>
        <div className={styles.Createdby}>

        <span className={styles.Created} style={{color:"#214082"}} >Created By:</span>{" "}
          <span className={styles.username} >{`${quizData.created_by}`}</span>
        </div>
        <div>

        <span className={styles.Created}style={{color:"#214082"}} >Created On:</span>{" "}
          <span className={styles.username} >{`${quizData.created_on}`}</span>
        </div>
        </div>
      </div>
          {/* <h1 className={styles.quizTitle}>{quizData.data.quiz_title}</h1> */}
          {/* <div className={styles.imageContainer}>
          {/* <img
    src={numberIcon} 
    alt="Logo"
    width={59}
    height={59}
    className={styles.logoImage}
  /> */}
        {/* <div className={styles.textContainer}>
        <p>{`${currentQuestionIndex + 1}. ${currentQuestion.question_text}`}</p>

        </div> */}
        
    {/* </div>  */}
    {/* <div className={styles.boxesContainer}>
{/* 
    <div className={styles.icon}>
    <ul>
        {Object.keys(currentQuestion).map(key => {
          if (key.startsWith('quiz_ans_option_') && key.endsWith('_text')) {
            const optionId = currentQuestion[key.replace('_text', '_id')];
            return (
              <li key={optionId}>
                <button
                  className={styles.box}
                  onClick={() => handleOptionSelect(optionId)}
                  style={{ fontWeight: selectedOption === optionId ? 'bold' : 'normal' }}
                >
                  {currentQuestion[key]}
                </button>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div> */}

    {/* <div className={styles.buttonsContainer}>
        <button
          className={styles.button}
          style={{ color: '#FFFFFF', backgroundColor: '#FEBB42', height: '52px', borderRadius: '10px', border: 'none' }}
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        {currentQuestionIndex === quizData.questions.length - 1 && (
          <button
            className={styles.button}
            style={{ marginLeft: '50px', backgroundColor: '#8453FC', height: '52px', borderRadius: '10px', border: 'none', color: '#FFFFFF' }}
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
        <button
          className={styles.button}
          style={{ marginLeft: '50px', backgroundColor: '#8453FC', height: '52px', borderRadius: '10px', border: 'none', color: '#FFFFFF' }}
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === quizData.questions.length - 1}
        >
          Next
        </button>
      </div> */}
  {/* <div>
      <ul>
        {currentQuestion && Object.keys(currentQuestion).map(key => {
          if (key.startsWith('quiz_ans_option_') && key.endsWith('_text')) {
            const optionId = currentQuestion[key.replace('_text', '_id')];
            return (
              <li key={optionId}>
                <button
                  className={styles.box}
                  onClick={() => handleOptionSelect(optionId)}
                  style={{ fontWeight: selectedOptions[currentQuestionIndex] === optionId ? 'bold' : 'normal' }}
                >
                  {currentQuestion[key]}
                </button>
              </li>
            );
          }
          return null;
        })}
      </ul>
      <div className={styles.buttonsContainer}>
        <button
          className={styles.button}
          style={{ color: '#FFFFFF', backgroundColor: '#FEBB42', height: '52px', borderRadius: '10px', border: 'none' }}
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        {currentQuestionIndex === quizData.data.length - 1 && (
          <button
            className={styles.button}
            style={{ marginLeft: '50px', backgroundColor: '#8453FC', height: '52px', borderRadius: '10px', border: 'none', color: '#FFFFFF' }}
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
        <button
          className={styles.button}
          style={{ marginLeft: '50px', backgroundColor: '#8453FC', height: '52px', borderRadius: '10px', border: 'none', color: '#FFFFFF' }}
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === quizData.data.length - 1}
        >
          Next
        </button>
      </div>
    </div> */}

    {/* </div> */}
    <div className={styles.currentQuestion}>
      {currentQuestion && (
        <>
          {/* <div className={styles.imageContainer}> */}
            <div className={styles.textContainer}>
              <p>{`${currentQuestionIndex + 1}. ${currentQuestion.question_text}`}</p>
            </div>
          {/* </div> */}
          <div className={styles.boxesContainer}>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
      {sortedOptionKeys.map((key, index) => {
        const optionId = currentQuestion[key.replace('_text', '_id')];
        const optionLabel = optionLabels[index];
        const isSelected = selectedOptions[currentQuestionIndex] === optionId;

        return (
          <li key={optionId} style={{ marginBottom: '10px' }}>
            <button
              className={styles.box}
              onClick={() => handleOptionSelect(optionId)}
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'transparent',
                width: '100%',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '40px',
                marginRight: '10px',
                padding: '7px',
                textAlign: 'center',
                border: '1px solid #ccc',
                borderRadius: '5px',
                backgroundColor: '#f9f9f9',
              }}>{optionLabel}</div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: isSelected ? 'bold' : 'normal',
                backgroundColor: isSelected ? 'lightyellow' : 'transparent',
                width: '550px', // Ensure the button takes full width
                padding: '10px', // Adds padding for better click area
                border: isSelected ? '2px solid #FEBB42' : '1px solid #ccc', // Highlights selected option
                borderRadius: '5px', // Rounds corners of buttons
                textAlign: 'left', // Align text to the left for better readability
                fontSize: '12px',
              }}>{currentQuestion[key]}</div>
            </button>
          </li>
        );
      })}
    </ul>
          </div>
        </>
      )}
             <div className={styles.buttonsContainer}>
            {currentQuestionIndex > 0 && (
              <div className={styles.button1}>
                <button
                    className={styles.button}
                    style={{ color: '#FFFFFF', backgroundColor: '#FEBB42', height: '40px', borderRadius: '10px', border: 'none' }}
                    onClick={handlePreviousQuestion}
                >
                    Previous
                </button>
                </div>
            )}
            {currentQuestionIndex < quizData.questions.filter(item => item.question_id).length - 1 && (
               <div className={styles.button2}>
              <button
                    className={styles.button}
                    style={{ backgroundColor: '#8453FC', height: '40px', borderRadius: '10px', border: 'none', color: '#FFFFFF' }}
                    onClick={handleNextQuestion}
                >
                    Next
                </button>
                </div>
            )}
            {currentQuestionIndex === quizData.questions.filter(item => item.question_id).length - 1 && (
              <div className={styles.button3}>
             <button
                    className={styles.button}
                    style={{ marginLeft: '50px', backgroundColor: 'rgb(11 87 208)', height: '40px', borderRadius: '10px', border: 'none', color: '#FFFFFF' }}
                    onClick={handleSubmit}
                >
                    Submit
                </button>
                </div>
            )}
        </div>

     
    </div>
          </div>
          <div>
          <div className={styles.verticalLine}></div>
          </div>
      <div className={styles.Totaltimer}>
      <div className={styles.back1} onClick={Back}><MdOutlineCancel /></div>
      <div className={styles.sentence1} style={{ marginTop: "220px" }}>
        {`${currentQuestionIndex + 1} out of ${filteredQuizData.length}`}
      </div>
      <div className={styles.sentence2}>
       <span> Total timer:</span> <span className={styles.sentence3}>{formatTime(elapsedTime)}</span> 
      </div>
      </div>
      <div className={styles.sentence3} style={{ marginTop: "230px" }}>
        {/* {formatTime(elapsedTime)} */}
      </div>
          {/* <div className={styles.sentence4} style={{marginTop:"290px", marginLeft:"-140px"}}>Quiz timer: </div>
          <div className={styles.imageContainer} style={{marginTop: "350px", marginLeft: "-100px"}}>
    <img
      src={clockIcon} 
      alt="Icon"
      width={100}
      height={100}
      className={styles.clockIcon}
    />
  </div> */}

        <LogoutBar/>
      </div>
    
  );
};

export default QuizQuestions;
