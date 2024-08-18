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
import { toast, ToastContainer } from "react-toastify";
// import useBlocker from '../useBlocker/useBlocker.jsx';

import "react-toastify/dist/ReactToastify.css";
// import useBlocker from '../useBlocker/useBlocker.jsx';
// import usePrompt from '../usePrompt/usePrompt.jsx';
const QuizQuestions = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const userId = localStorage.getItem("user_id");
  const [attemptNo, setAttemptNo] = useState(null);
  const [skippedQuestionsDisplay, setSkippedQuestionsDisplay] = useState([]);
  const { quizId } = useParams();
  
  const timerRef = useRef(null);
  const [showWarning, setShowWarning] = useState(false);
  const lastVisitedQuestionRef = useRef(0);
  const selectedOptionsRef = useRef({});
  const [isNavigating, setIsNavigating] = useState(false);
  // const prevLocation = useRef(location.pathname);

  const {quiz_title, quiz_description,quiz_duration,quiz_total_marks,num_questions,pass_percentage,quiz_complexity_name} = location.state || {};
  const [elapsedTime, setElapsedTime] = useState(quiz_duration * 60); 
  // const isSubmitting = useRef(false);
  const submittedRef = useRef(false);
  const [submitted, setSubmitted] = useState(false); // Track if the quiz is submitted
  const [shouldSubmitOnLeave, setShouldSubmitOnLeave] = useState(false);
  const [confirmNavigation, setConfirmNavigation] = useState(false);
  const [isBlocking, setIsBlocking] = useState(true);
  const isSubmitting = useRef(false); // To track if the quiz is being submitted


  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const initialRender = useRef(true);

  const markPreviousQuestionsAsSkipped = (targetIndex) => {
    const newSkippedQuestions = [];
    for (let i = 0; i < targetIndex; i++) {
      if (selectedOptions[i] === undefined && !skippedQuestionsDisplay.includes(i + 1)) {
        newSkippedQuestions.push(i + 1);
      }
    }
    setSkippedQuestionsDisplay((prev) => [...new Set([...prev, ...newSkippedQuestions])]);
  };

  const handleNextClick = () => {
    markPreviousQuestionsAsSkipped();
    if (currentQuestionIndex + 1 < filteredQuizData.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      lastVisitedQuestionRef.current = currentQuestionIndex + 1;
    }
  };


  const handlePrevClick = () => {
    markPreviousQuestionsAsSkipped();
    if (currentQuestionIndex - 1 >= 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      lastVisitedQuestionRef.current = currentQuestionIndex - 1;
    }
  };

  const startIndex = Math.floor(currentQuestionIndex / 50) * 10; // Calculate startIndex based on currentQuestionIndex

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

      if (!authToken) {
        console.error('No authentication token found');
        return;
      }
      const quizId = localStorage.getItem("quiz_id");
      try {
        const response = await fetch('https://quizifai.com:8010/get-questions', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            quiz_id: quizId,
            user_id: userId
          })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Fetched data:', data);

        if (data && data.data && Array.isArray(data.data)) {
          const questions = data.data.filter(item => item.question_id !== undefined);
          const attemptData = data.data.find(item => item.quiz_level_attempt_id !== undefined);

          console.log('Setting quiz data:', questions);
          setQuizData({ questions });
          setIsLoading(false);

          if (attemptData) {
            setAttemptNo(attemptData.quiz_level_attempt_id);
            setQuizData(prevState => ({
              ...prevState,
              created_by: attemptData.created_by,
              created_on: attemptData.created_on
            }));
            console.log('Attempt No:', attemptData.quiz_level_attempt_id);
          } else {
            console.warn('No object with quiz_level_attempt_id found');
          }
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (quizData && quizData.questions && quizData.questions.length > 0) {
      timerRef.current = setInterval(() => {
        setElapsedTime(prevTime => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(timerRef.current);
            handleSubmit1(true); // Auto-submit when timer runs out
            return 0;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [quizData]);

  useEffect(() => {
    if (elapsedTime <= 120 && !showWarning) { // 5 minutes = 300 seconds
      setShowWarning(true);
    }
  }, [elapsedTime, showWarning]);

  useEffect(() => {
    if (showWarning) {
      toast.error("You have 2 minutes left!");
    }
  }, [showWarning]);

  useEffect(() => {
    selectedOptionsRef.current = selectedOptions;
    console.log('Updated selectedOptions:', selectedOptions);
  }, [selectedOptions]);

  const handleOptionSelect = (optionId) => {
    setSelectedOptions((prev) => {
      const updatedOptions = {
        ...prev,
        [currentQuestionIndex]: optionId,
      };
      // console.log('Updated selectedOptions in handleOptionSelect:', updatedOptions); // Log to check state
      updateSkippedQuestions(currentQuestionIndex, updatedOptions);
      return updatedOptions;
    });
  };

  const updateSkippedQuestions = (questionIndex, updatedOptions = selectedOptions) => {
    const isAnswered = updatedOptions[questionIndex] !== undefined;
    const isAlreadySkipped = skippedQuestionsDisplay.includes(questionIndex + 1);

    if (!isAnswered && !isAlreadySkipped) {
      setSkippedQuestionsDisplay((prev) => [...prev, questionIndex + 1]);
    } else if (isAnswered && isAlreadySkipped) {
      setSkippedQuestionsDisplay((prev) =>
        prev.filter((qNum) => qNum !== questionIndex + 1)
      );
    }
  };

 
  const handleNextQuestion = () => {
    updateSkippedQuestions(currentQuestionIndex);
    if (currentQuestionIndex < quizData.questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      lastVisitedQuestionRef.current = nextIndex;
    }
  };

  const handlePreviousQuestion = () => {
    updateSkippedQuestions(currentQuestionIndex);
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      lastVisitedQuestionRef.current = prevIndex;
    }
  };



  const handleSubmit = () => {
    clearInterval(timerRef.current);
    if (!quizData || !quizData.questions || quizData.questions.length === 0) {
      console.error('No quiz data available to submit');
      return;
    }

    const unansweredQuestions = quizData.questions
      .map((question, index) => selectedOptions[index] === undefined ? index + 1 : null)
      .filter(questionNumber => questionNumber !== null);

    // if (unansweredQuestions.length > 0) {
    //   toast.error(`Please answer all questions before submitting. You have skipped questions: ${unansweredQuestions.join(', ')}`);
    //   setSkippedQuestionsDisplay(unansweredQuestions);
    //   return;
    // }

    setValidationMessage('');
    const answers = Object.keys(selectedOptions).map(questionIndex => ({
      question_id: quizData.questions[questionIndex].question_id,
      options: {
        option_1: selectedOptions[questionIndex] === quizData.questions[questionIndex].quiz_ans_option_1_id,
        option_2: selectedOptions[questionIndex] === quizData.questions[questionIndex].quiz_ans_option_2_id,
        option_3: selectedOptions[questionIndex] === quizData.questions[questionIndex].quiz_ans_option_3_id,
        option_4: selectedOptions[questionIndex] === quizData.questions[questionIndex].quiz_ans_option_4_id
      }
    }));
    const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

    if (!authToken) {
      console.error('No authentication token found');
      return;
    }
    const quizId = localStorage.getItem("quiz_id");

    fetch('https://quizifai.com:8010/submit', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
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
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
    });
  };
 
  const handleSubmit1 = (isAutoSubmit = false) => {
    clearInterval(timerRef.current);

    // Capture the most recent selectedOptions state
    const currentSelectedOptions = selectedOptionsRef.current;

    console.log('Submitting selectedOptions in handleSubmit:', currentSelectedOptions); // Log to check state before submitting

    if (!quizData || !quizData.questions || quizData.questions.length === 0) {
      console.error('No quiz data available to submit');
      return;
    }

    const unansweredQuestions = quizData.questions
      .map((question, index) => currentSelectedOptions[index] === undefined ? index + 1 : null)
      .filter(questionNumber => questionNumber !== null);

    if (unansweredQuestions.length > 0 && !isAutoSubmit) {
      toast.error(`Please answer all questions before submitting. You have skipped questions: ${unansweredQuestions.join(', ')}`);
      setSkippedQuestionsDisplay(unansweredQuestions);
      return;
    }

    setValidationMessage('');
    const answers = Object.keys(currentSelectedOptions).map(questionIndex => ({
      question_id: quizData.questions[questionIndex].question_id,
      options: {
        option_1: currentSelectedOptions[questionIndex] === quizData.questions[questionIndex].quiz_ans_option_1_id,
        option_2: currentSelectedOptions[questionIndex] === quizData.questions[questionIndex].quiz_ans_option_2_id,
        option_3: currentSelectedOptions[questionIndex] === quizData.questions[questionIndex].quiz_ans_option_3_id,
        option_4: currentSelectedOptions[questionIndex] === quizData.questions[questionIndex].quiz_ans_option_4_id
      }
    }));

    console.log('Submitting answers:', answers); // Log to check the answers array

    const quizId = localStorage.getItem("quiz_id");
    const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

    if (!authToken) {
      console.error('No authentication token found');
      return;
    }

    fetch('https://quizifai.com:8010/submit', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
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
      console.log('Quiz submitted');
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
    });
  };
  const handleSubmit2 = (isAutoSubmit = false) => {
    clearInterval(timerRef.current);

    const currentSelectedOptions = { ...selectedOptions };

    if (!quizData || !quizData.questions || quizData.questions.length === 0) {
      console.error('No quiz data available to submit');
      return;
    }

    const unansweredQuestions = quizData.questions
      .map((question, index) => currentSelectedOptions[index] === undefined ? index + 1 : null)
      .filter(questionNumber => questionNumber !== null);

    if (unansweredQuestions.length > 0 && !isAutoSubmit) {
      toast.error(`Please answer all questions before submitting. You have skipped questions: ${unansweredQuestions.join(', ')}`);
      return;
    }

    const answers = Object.keys(currentSelectedOptions).map(questionIndex => ({
      question_id: quizData.questions[questionIndex].question_id,
      options: {
        option_1: currentSelectedOptions[questionIndex] === quizData.questions[questionIndex].quiz_ans_option_1_id,
        option_2: currentSelectedOptions[questionIndex] === quizData.questions[questionIndex].quiz_ans_option_2_id,
        option_3: currentSelectedOptions[questionIndex] === quizData.questions[questionIndex].quiz_ans_option_3_id,
        option_4: currentSelectedOptions[questionIndex] === quizData.questions[questionIndex].quiz_ans_option_4_id
      }
    }));

    const authToken = localStorage.getItem('authToken');
    const userId = localStorage.getItem("user_id");

    if (!authToken) {
      console.error('No authentication token found');
      return;
    }

    fetch('https://quizifai.com:8010/submit', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        user_id: userId,
        quiz_id: quizId,
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
      navigate('/quizresults', { state: { quizId } });
      submittedRef.current = true;

    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
    });
  };
  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     if (!submittedRef.current) {
  //       handleSubmit2(true); // Auto-submit when page is refreshed
  //       event.preventDefault(); // Show browser's confirmation dialog
  //       event.returnValue = ''; // Required for showing confirmation dialog in some browsers
  //     }
  //   };
  
  //   window.addEventListener('beforeunload', handleBeforeUnload);
  
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);
  // useEffect(() => {
  //   const handleNavigation = (location, action) => {
  //     if (action === 'POP' || action === 'PUSH') {
  //       handleSubmit2(true); // Auto-submit on navigation
  //     }
  //   };
  
  //   const unblock = navigate.block(handleNavigation);
  
  //   return () => {
  //     unblock();
  //   };
  // }, []);
  
  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     if (!submittedRef.current) {
  //       event.preventDefault();
  //       event.returnValue = '';
  //       handleSubmit2(true); // Auto-submit on page unload
  //     }
  //   };

  //   const handleNavigation = () => {
  //     if (!submittedRef.current) {
  //       handleSubmit2(true); // Auto-submit on route change
  //     }
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   navigate(handleNavigation);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //     navigate(handleNavigation);
  //   };
  // }, [navigate]);
  // useEffect(() => {
  //   if (quizData && quizData.questions && quizData.questions.length > 0) {
  //     console.log('QuizData available for submission:', quizData); // Log the data
  //   }
  // }, [quizData]);
  
  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     if (!submittedRef.current) {
  //     // Required for Chrome
  //       handleSubmit2(true); // Auto-submit when page is refreshed
  //     }
  //   };
  
  //   window.addEventListener('beforeunload', handleBeforeUnload);
  
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);
  

  const handleQuestionClick = (index) => {
    markPreviousQuestionsAsSkipped(index);
    setCurrentQuestionIndex(index);
    lastVisitedQuestionRef.current = index;
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
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const filteredQuizData = quizData.questions.filter(item => item.question_id);
  const currentQuestion = filteredQuizData[currentQuestionIndex];
  const optionLabels = ['A', 'B', 'C', 'D'];
  const optionKeys = ['quiz_ans_option_1_text', 'quiz_ans_option_2_text', 'quiz_ans_option_3_text', 'quiz_ans_option_4_text'];

  const visibleSkippedQuestions = skippedQuestionsDisplay.filter(questionNumber => {
    const actualIndex = questionNumber - 1;
    return actualIndex >= startIndex && actualIndex < startIndex + 10;
  });
  const sortedOptionKeys = [...optionKeys].sort((a, b) => {
    const optionA = currentQuestion[a];
    const optionB = currentQuestion[b];
  
    // Define your special options
    const specialOptions = ["All of the above", "None of the above","All the above","None the above"    ,"All of the Above", "None of the Above","All The above","None The above","All Of The Above", "None Of The Above","All The Above","None The bove"];
  
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
  const endIndex = Math.min(startIndex + 50, filteredQuizData.length);


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
      <ToastContainer/>
      <div className={styles.mainContent}>
      <div>
        <h1 className={styles.quiztitle} style={{color:"#214082"}}>{quiz_title}</h1>
        <p className={styles.quizdescription}>{quiz_description}</p>
      
      
           <div className={styles.flexrow}>
          <div className={styles.Createdbyandupdated}>
          <div className={styles.Questions}>

<span className={styles.Question} >Questions&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</span>{" "}
<span></span>
  <span className={styles.username1} > {num_questions}</span>
</div>
<div>

<span className={styles.Question} >Total Marks&nbsp;&nbsp;:</span>{" "}
  <span className={styles.username1} >{quiz_total_marks}</span>
</div>
        <div className={styles.Createdby}>

        <span className={styles.Question} >Created By &nbsp;&nbsp;&nbsp;:</span>{" "}
          <span className={styles.username} >{`${quizData.created_by}`}</span>
        </div>
        
        <div>

        <span className={styles.Question} >Created On&nbsp;&nbsp;&nbsp;:</span>{" "}
          <span className={styles.username} >{`${quizData.created_on}`}</span>
        </div>
        </div>
        <div className={styles.Questionslines }>
      
        <div>

        <span className={styles.Question} >Duration :</span>{" "}
          <span className={styles.username1} >{quiz_duration} min</span>
        </div>
       
<div>

<span className={styles.Question } >Pass Percentage :</span>{" "}
  <span className={styles.username1} >{pass_percentage}</span>
</div>

        </div>
        <div className={styles.Questionslines }>
      
    

<div>

<span className={styles.Question } >Complexity :</span>{" "}
  <span className={styles.username1} >{quiz_complexity_name} </span>
</div>
        </div>
        </div>
      </div>
        
       
   

   
 

   
   <div>
    <h1 className={styles.sentence1}>Question <span> {`${currentQuestionIndex + 1} of ${filteredQuizData.length}`}</span></h1>
    <h1 className={styles.Question}>Choose the correct answer then click the <span className={styles.sentence1}>"Next"</span> button</h1>
   </div>
    

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
                    disabled={currentQuestionIndex === 0}
                >
                    Previous
                </button>
                </div>
            )}
             {/* {currentQuestionIndex < filteredQuizData.length - 1 && ( */}
            <div className={styles.button2}>
              <button
                className={styles.button}
                style={{ backgroundColor: '#8453FC', height: '40px', borderRadius: '10px', border: 'none', color: '#FFFFFF' }}
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === filteredQuizData.length - 1}
              >
                Next
              </button>
            </div>
          {/* )} */}
         
        
        </div>
        <div className={styles.button3}>
              <button
                className={styles.button}
                style={{marginTop: '-53px', backgroundColor: '#15c51596', height: '40px', borderRadius: '10px', border: 'none', color: '#FFFFFF',marginRight:'-165px',zIndex:"1" }}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
     
    </div>
          </div>
          <div style={{ paddingRight:"5px"}}>
          <div className={styles.verticalLine}></div>
          </div>
      <div className={styles.Totaltimer}>
      <div className={styles.back1} onClick={Back}><MdOutlineCancel /></div>
      <div className={styles.sentence1} style={{ marginTop: "140px" }}>
        {/* {`${currentQuestionIndex + 1} out of ${filteredQuizData.length}`} */}
      </div>
      <div className={styles.sentence2}>
       <span> Total timer:</span> <span className={styles.sentence3}>{formatTime(elapsedTime)}</span> 
      </div>
      <div className={styles.questionNumbersContainer}>
        {/* Previous Button */}
        {startIndex >= 50 && (
          <button onClick={handlePrevClick}>&lt;</button>
        )}

        {/* Question Numbers */}
        
        {filteredQuizData.slice(startIndex,endIndex ).map((_, index) => {
          const actualIndex = startIndex + index;
          const isSelected = selectedOptions[actualIndex] !== undefined;
          const isSkipped = skippedQuestionsDisplay.includes(actualIndex + 1);
          return (
            <div
              key={actualIndex}
              className={`${styles.questionNumber} ${isSelected ? styles.selected : ''} ${isSkipped ? styles.skipped1 : ''}`}

              onClick={() => handleQuestionClick(actualIndex)}
            >
              {actualIndex + 1}
            </div>
          );
        })}


        {/* Next Button */}
        {startIndex + 50 < filteredQuizData.length && (
          <button onClick={handleNextClick}>&gt;</button>
        )}
        
      </div>
      {/* {showWarning && <div className={styles.warningMessage}>Warning: You have 5 minutes left!</div>} */}

      {skippedQuestionsDisplay.length > 0 && (
        <div className={styles.skippedQuestionsContainer}>
          <div className={styles.backgroundbox}>

         
            <div  className={styles.innerbox}>
          {skippedQuestionsDisplay.map(questionNumber => (
          
            <div
              key={questionNumber}
              className={`${styles.questionNumber1} ${styles.skipped}`}
              onClick={() => handleQuestionClick(questionNumber - 1)}
            >
              {questionNumber}
            </div>
          ))}
          </div>
           <h3 className={styles.skipped}>You skipped these questions; please ensure you review them carefully before finalizing the quiz</h3>
           </div>
        </div>
      )}
      
      
      </div>
      <div className={styles.sentence3} style={{ marginTop: "230px" }}>
        {/* {formatTime(elapsedTime)} */}
      </div>
        

        <LogoutBar/>
      </div>
    
  );
};

export default QuizQuestions;
