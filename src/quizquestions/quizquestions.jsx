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
import "react-toastify/dist/ReactToastify.css";

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
  // const [quizData, setQuizData] = useState({ questions: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const userId = localStorage.getItem("user_id");
 // Assuming quiz_id is 1592
  const [attemptNo, setAttemptNo] = useState(null);
  const [skippedQuestionsDisplay, setSkippedQuestionsDisplay] = useState([]);
  const { quizId } = useParams();
  const location = useLocation();
  const {quiz_title, quiz_description,quiz_duration,quiz_total_marks,num_questions,pass_percentage,quiz_complexity_name} = location.state;
  const [elapsedTime, setElapsedTime] = useState(quiz_duration * 60); 
  const timerRef = useRef(null);
  const [showWarning, setShowWarning] = useState(false);
  const lastVisitedQuestionRef = useRef(0);
  const selectedOptionsRef = useRef({});
  // const [skippedQuestions, setSkippedQuestions] = useState([]);
  // const [skippedQuestionsDisplay, setSkippedQuestionsDisplay] = useState([]);

  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

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

  const startIndex = Math.floor(currentQuestionIndex / 10) * 10; // Calculate startIndex based on currentQuestionIndex
  // const endIndex = Math.min(startIndex + 10, filteredQuizData.length);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const quizId = localStorage.getItem("quiz_id");
  //     try {
  //       const response = await fetch('https://quizifai.com:8010/get-questions', {
  //         method: 'POST',
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({
  //           quiz_id: quizId,
  //           user_id: userId
  //         })
  //       });

  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }

  //       const data = await response.json();
  //       console.log('Fetched data:', data);

  //       if (data && data.data && Array.isArray(data.data)) {
  //         const questions = data.data.filter(item => item.question_id !== undefined);
  //         const attemptData = data.data.find(item => item.quiz_level_attempt_id !== undefined);

  //         console.log('Setting quiz data:', questions);
  //         setQuizData({ questions });
  //         setIsLoading(false);

  //         if (attemptData) {
  //           setAttemptNo(attemptData.quiz_level_attempt_id);
  //           setQuizData(prevState => ({
  //             ...prevState,
  //             created_by: attemptData.created_by,
  //             created_on: attemptData.created_on
  //           }));
  //           console.log('Attempt No:', attemptData.quiz_level_attempt_id);
  //         } else {
  //           console.warn('No object with quiz_level_attempt_id found');
  //         }

  //         // Start the countdown timer only after data is set
  //         if (questions.length > 0) {
  //           timerRef.current = setInterval(() => {
  //             setElapsedTime(prevTime => {
  //               if (prevTime > 0) {
  //                 return prevTime - 1;
  //               } else {
  //                 clearInterval(timerRef.current);
  //                 handleSubmit(); // Auto-submit when timer runs out
  //                 return 0;
  //               }
  //             });
  //           }, 1000);
  //         }
  //       } else {
  //         throw new Error('Unexpected response format');
  //       }
  //     } catch (error) {
  //       console.error('There was a problem with your fetch operation:', error);
  //     }
  //   };

  //   fetchData();

  //   return () => {
  //     clearInterval(timerRef.current);
  //   };
  // }, [userId, quiz_duration]);

  useEffect(() => {
    const fetchData = async () => {
      const quizId = localStorage.getItem("quiz_id");
      try {
        const response = await fetch('https://quizifai.com:8010/get-questions', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
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
    if (elapsedTime <= 300 && !showWarning) { // 5 minutes = 300 seconds
      setShowWarning(true);
    }
  }, [elapsedTime, showWarning]);

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
      console.log('Updated selectedOptions in handleOptionSelect:', updatedOptions); // Log to check state
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

  const navigate = useNavigate();


  // const handleSubmit1 = (isAutoSubmit = false) => {
  //   clearInterval(timerRef.current);
  //   if (!quizData || !quizData.questions || quizData.questions.length === 0) {
  //     console.error('No quiz data available to submit');
  //     return;
  //   }

 
  //   const answers = Object.keys(selectedOptions).map(questionIndex => ({
  //     question_id: quizData.questions[questionIndex].question_id,
  //     options: {
  //       option_1: selectedOptions[questionIndex] === quizData.questions[questionIndex].quiz_ans_option_1_id,
  //       option_2: selectedOptions[questionIndex] === quizData.questions[questionIndex].quiz_ans_option_2_id,
  //       option_3: selectedOptions[questionIndex] === quizData.questions[questionIndex].quiz_ans_option_3_id,
  //       option_4: selectedOptions[questionIndex] === quizData.questions[questionIndex].quiz_ans_option_4_id
  //     }
  //   }));

  //   const quizId = localStorage.getItem("quiz_id");

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
  //     navigate(`/quizresults`, { state: { quizId, attemptNo } });
  //   })
  //   .catch(error => {
  //     console.error('There was a problem with your fetch operation:', error);
  //   });
  // };

 
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
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
    });
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

    const quizId = localStorage.getItem("quiz_id");

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
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
    });
  };

  // const handleSubmit = (isAutoSubmit = false) => {
  //   clearInterval(timerRef.current);
  //   const currentSelectedOptions = selectedOptions;

  //   console.log('Submitting selectedOptions in handleSubmit:', currentSelectedOptions); 
    
  //   if (!quizData || !quizData.questions || quizData.questions.length === 0) {
  //     console.error('No quiz data available to submit');
  //     return;
  //   }

  //   const unansweredQuestions = quizData.questions
  //     .map((question, index) => selectedOptions[index] === undefined ? index + 1 : null)
  //     .filter(questionNumber => questionNumber !== null);

  //   if (unansweredQuestions.length > 0 && !isAutoSubmit) {
  //     alert(`Please answer all questions before submitting. You have skipped questions: ${unansweredQuestions.join(', ')}`);
  //     setSkippedQuestionsDisplay(unansweredQuestions);
  //     return;
  //   }

  //   setValidationMessage('');
  //   const answers = Object.keys(selectedOptions).map(questionIndex => ({
  //     question_id: quizData.questions[questionIndex].question_id,
  //     options: {
  //       option_1: selectedOptions[questionIndex] === quizData.questions[questionIndex].quiz_ans_option_1_id,
  //       option_2: selectedOptions[questionIndex] === quizData.questions[questionIndex].quiz_ans_option_2_id,
  //       option_3: selectedOptions[questionIndex] === quizData.questions[questionIndex].quiz_ans_option_3_id,
  //       option_4: selectedOptions[questionIndex] === quizData.questions[questionIndex].quiz_ans_option_4_id
  //     }
  //   }));

  //   console.log('Submitting answers:', answers); // Log to check the answers array

  //   const quizId = localStorage.getItem("quiz_id");

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
  //     navigate(`/quizresults`, { state: { quizId, attemptNo } });
  //   })
  //   .catch(error => {
  //     console.error('There was a problem with your fetch operation:', error);
  //   });
  // };


  // const handleSubmit = () => {
  //   clearInterval(timerRef.current);
  //   if (!quizData || !quizData.questions || quizData.questions.length === 0) {
  //     console.error('No quiz data available to submit');
  //     return;
  //   }
  //   // const unansweredQuestions = quizData.questions.some((question, index) => {
  //   //   return selectedOptions[index] === undefined;
  //   // });
  
  //   // if (unansweredQuestions) {
  //   //   const skipped = quizData.questions.reduce((acc, question, index) => {
  //   //     if (selectedOptions[index] === undefined) {
  //   //       acc.push(index + 1); // Store 1-based index of skipped questions
  //   //     }
  //   //     return acc;
  //   //   }, []);
  
  //   //   setSkippedQuestions(skipped);
  //   //   alert(`You have skipped the following questions: ${skipped.join(', ')}. Please answer all questions before submitting the quiz.`);
  //   //   return;
  //   // }
  //   // const unansweredQuestions = quizData.questions.some((question, index) => {
  //   //   return selectedOptions[index] === undefined;
  //   // });
  //   // if (unansweredQuestions) {
  //   //   const skipped = quizData.questions.reduce((acc, question, index) => {
  //   //     if (selectedOptions[index] === undefined) {
  //   //       acc.push(index + 1); // Store 1-based index of skipped questions
  //   //     }
  //   //     return acc;
  //   //   }, []);
  //   //   setSkippedQuestions(skipped);
  //   //   alert(`You have skipped the following questions: ${skipped.join(', ')}. Please answer all questions before submitting the quiz.`);
  //   //   return;
  //   // }
  //   // const skippedQuestions = quizData.questions
  //   // .map((question, index) => selectedOptions[index] === undefined ? index + 1 : null)
  //   // .filter(questionNumber => questionNumber !== null);
  //   // const skippedQuestions = quizData.questions.reduce((acc, question, index) => {
  //   //   if (selectedOptions[index] === undefined) {
  //   //     acc.push(index + 1); // Store 1-based index of skipped questions
  //   //   }
  //   //   return acc;
  //   // }, []);

  //   // if (skippedQuestions.length > 0) {
  //   //   setSkippedQuestionsDisplay(skippedQuestions);
  //   //   setValidationMessage(`Please answer all questions. Skipped questions: ${skippedQuestions.join(', ')}`);
  //   //   return;
  //   // }
  //   const unansweredQuestions = quizData.questions
  //   .map((question, index) => selectedOptions[index] === undefined ? index + 1 : null)
  //   .filter(questionNumber => questionNumber !== null);

  // if (unansweredQuestions.length > 0) {
  //   alert(`Please answer all questions before submitting. You have skipped questions: ${unansweredQuestions.join(', ')}`);
  //   setSkippedQuestionsDisplay(unansweredQuestions);
  //   return;
  // }
  //   setValidationMessage(''); 
  //   const answers = Object.keys(selectedOptions).map(questionIndex => ({
  //     question_id: quizData.questions[questionIndex].question_id,
  //     options: {
  //       option_1: selectedOptions[questionIndex] === quizData.questions[questionIndex].quiz_ans_option_1_id,
  //       option_2: selectedOptions[questionIndex] === quizData.questions[questionIndex].quiz_ans_option_2_id,
  //       option_3: selectedOptions[questionIndex] === quizData.questions[questionIndex].quiz_ans_option_3_id,
  //       option_4: selectedOptions[questionIndex] === quizData.questions[questionIndex].quiz_ans_option_4_id
  //     }
  //   }));
  //   // const quizId = localStorage.getItem("quiz_id");

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
  //   //   const skippedQuestions = quizData.questions
  //   //   .map((question, index) => selectedOptions[index] === undefined ? index + 1 : null)
  //   //   .filter(questionNumber => questionNumber !== null);

  //   // setSkippedQuestions(skippedQuestions);
  //     navigate(`/quizresults`, { state: { quizId, attemptNo } });
  //     // Handle response if needed
  //   })
  //   .catch(error => {
  //     console.error('There was a problem with your fetch operation:', error);
  //   });
  // };

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
  // const skippedQuestionsDisplay = filteredQuizData
  //   .map((question, index) => selectedOptions[index] === undefined ? index + 1 : null)
  //   .filter(questionNumber => questionNumber !== null);
  // const skippedQuestions = filteredQuizData
  //   .map((question, index) => selectedOptions[index] === undefined ? index + 1 : null)
  //   .filter(questionNumber => questionNumber !== null);

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
  const endIndex = Math.min(startIndex + 10, filteredQuizData.length);


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
        {/* <div className={styles.Questionslines }>
        <div className={styles.Questions}>

        <span className={styles.Question} >Questions :</span>{" "}
          <span className={styles.username1} >{num_questions}</span>
        </div>
        <div>

        <span className={styles.Question} >Duration :</span>{" "}
          <span className={styles.username1} >{quiz_duration} min</span>
        </div>
        <div>

<span className={styles.Question} >Total Marks :</span>{" "}
  <span className={styles.username1} >{quiz_total_marks}</span>
</div>
<div>

<span className={styles.Question } >Pass Percentage :</span>{" "}
  <span className={styles.username1} >{pass_percentage}%</span>
</div>
        </div> */}
        {/* <div className={styles.Createdbyandupdated}>
        <div className={styles.Createdby}>

        <span className={styles.Created} style={{color:"#214082"}} >Created By :</span>{" "}
          <span className={styles.username} >{`${quizData.created_by}`}</span>
        </div>
        <div>

        <span className={styles.Created}style={{color:"#214082"}} >Created On :</span>{" "}
          <span className={styles.username} >{`${quizData.created_on}`}</span>
        </div>
        </div> */}
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
    <div className={styles.questionNumbersContainer}>
        {/* Previous Button */}
        {startIndex >= 10 && (
          <button onClick={handlePrevClick}>&lt;</button>
        )}

        {/* Question Numbers */}
        
        {filteredQuizData.slice(startIndex,endIndex ).map((_, index) => {
          const actualIndex = startIndex + index;
          const isSelected = selectedOptions[actualIndex] !== undefined;

          return (
            <div
              key={actualIndex}
              className={`${styles.questionNumber} ${isSelected ? styles.selected : ''}`}
              onClick={() => handleQuestionClick(actualIndex)}
            >
              {actualIndex + 1}
            </div>
          );
        })}


        {/* Next Button */}
        {startIndex + 10 < filteredQuizData.length && (
          <button onClick={handleNextClick}>&gt;</button>
        )}
        
      </div>
      {/* {skippedQuestionsDisplay.length > 0 && (
      <div className={styles.skippedQuestionsContainer}>
        <h3>Skipped Questions:</h3>
        {skippedQuestionsDisplay.map(questionNumber => (
          <div
            key={questionNumber}
            className={`${styles.questionNumber} ${styles.skipped}`}
            onClick={() => handleQuestionClick(questionNumber - 1)}
          >
            {questionNumber}
          </div>
        ))}
      </div>
    )} */}
       

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
             {currentQuestionIndex < filteredQuizData.length - 1 && (
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
          )}
           {currentQuestionIndex === filteredQuizData.length - 1 && (
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
          <div style={{ paddingRight:"5px"}}>
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
      {/* {visibleSkippedQuestions.length > 0 && (
        <div className={styles.skippedQuestionsContainer}>
          <h3>Skipped Questions:</h3>
          {visibleSkippedQuestions.map(questionNumber => (
            <div
              key={questionNumber}
              className={`${styles.questionNumber} ${styles.skipped}`}
              onClick={() => setCurrentQuestionIndex(questionNumber - 1)}
            >
              {questionNumber}
            </div>
          ))}
        </div>
      )} */}
      {/* {skippedQuestions.length > 0 && (
      <div className={styles.skippedQuestionsContainer}>
        <h3>Skipped Questions:</h3>
        {skippedQuestions.map(questionNumber => (
          <div
            key={questionNumber}
            className={`${styles.questionNumber} ${styles.skipped}`}
            onClick={() => handleQuestionClick(questionNumber - 1)}
          >
            {questionNumber}
          </div>
        ))}
      </div>
    )} */}
      {/* {validationMessage && <div className={styles.validationMessage}>{validationMessage}</div>} */}
      {/* {quizSubmitted && skippedQuestionsDisplay.length > 0 && (
        <div className={styles.skippedQuestionsContainer}>
          <h3>Skipped Questions:</h3>
          {skippedQuestionsDisplay.map(questionNumber => (
            <div
              key={questionNumber}
              className={`${styles.questionNumber} ${styles.skipped}`}
              onClick={() => handleQuestionClick(questionNumber - 1)}
            >
              {questionNumber}
            </div>
          ))}
        </div>
      )} */}
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
