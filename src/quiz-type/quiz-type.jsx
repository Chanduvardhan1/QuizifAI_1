"use client";
import React, { useState, useEffect } from "react";
import Switch from "react-switch";
import Navigation from "../navbar/navbar";
import { useNavigate } from "react-router-dom";
// import { useHistory } from 'react-router-dom';

// Navbar-icons
import QuizifAilogo from "../assets/Images/images/home/Quizifai3.png";
import Dashboard from "../assets/Images/quiz-type/Dashboard.png";
import Quiz from "../assets/Images/quiz-type/Quiz.png";
import History from "../assets/Images/quiz-type/History.png";
import Schedule from "../assets/Images/quiz-type/Schedule.png";
import Notification from "../assets/Images/quiz-type/Notification.png";
import QuizAdmin from "../assets/Images/quiz-type/Quiz-admin.png";
import Profile from "../assets/Images/quiz-type/Profile.png";
import eye from "../assets/Images/dashboard/infoIcon.png";
// Main-Section-icons
import QuizTitle from "../assets/Images/quiz-type/Quiz-Title.png";
import QuizDiscription from "../assets/Images/quiz-type/Quiz-discription.png";
import Next from "../assets/Images/quiz-type/Next.png";
import { FiAlertCircle } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";

import CreateOrEdit from "../assets/Images/quiz-type/Create-Edit.png";
import Line from "../assets/Images/quiz-type/Line.png";
import Time from "../assets/Images/quiz-type/Time.png";
import Dropdown from "../assets/Images/quiz-type/Dropdown.png";
import A from "../assets/Images/quiz-type/A.png";
import RedToggle from "../assets/Images/quiz-type/Red-Toggle.png";
import B from "../assets/Images/quiz-type/B.png";
import C from "../assets/Images/quiz-type/C.png";
import D from "../assets/Images/quiz-type/D.png";
import Delete from "../assets/Images/quiz-type/Delete.png";
import Refresh from "../assets/Images/quiz-type/Refresh.png";
import RefreshOptions from "../assets/Images/quiz-type/Refresh-options.png";

// const options1 =[
//   {label: "Numbers"},
//   {label: "10-30"},
//   {label: "30-50"},
//   {label: "50-70"},
//   {label: "70-100"},
//   {label: "100-150"},

// ]
const options1 = [{ label: "Numbers" }];

for (let i = 1; i <= 300; i++) {
  options1.push({ label: i.toString() });
}

const options2 = [
  { label: "Pages for you" },
  {
    label: "Education",
    subCategories: ["Math", "Science", "History", "computer science"],
  },
  { label: "General", subCategories: ["Politics", "Technology", "Health"] },
  { label: "Creative", subCategories: ["Art", "Music", "Writing"] },
];

const options3 = [
  { label: "Division" },
  { label: "Group A" },
  { label: "Group B" },
  { label: "Group C" },
  { label: "Group D" },
  { label: "Group E" },
];

const options4 = [
  { label: "Classes" },
  { label: "Grade 1" },
  { label: "Grade 2" },
  { label: "Grade 3" },
  { label: "Grade 4" },
  { label: "Grade 5" },
  { label: "Grade 6" },
  { label: "Grade 7" },
  { label: "Grade 8" },
  { label: "Grade 9" },
  { label: "Grade 10" },
  { label: "Grade 11" },
  { label: "Grade 12" },
];

const options5 = [
  { label: "Percentage" },
  { label: 0 },
  { label: 5 },
  { label: 10 },
  { label: 15 },
  { label: 20 },
  { label: 25 },
  { label: 30 },
  { label: 35 }, // No quotation marks
  { label: 40 }, // No quotation marks
  { label: 45 },
  { label: 50 },
  { label: 55 },
  { label: 60 },
  { label: 65 },
  { label: 70 },
  { label: 75 },
  { label: 80 },
  { label: 85 },
  { label: 90 },
  { label: 95 },
  { label: 100 },
];

const options6 = [
  { label: "Complexity" },
  { label: "simple" },
  { label: "moderate" },
  { label: "Complex" },
];

const options7 = [
  { label: "Duration" },
  { label: 10 },
  { label: 20 },
  { label: 30 },
  { label: 40 },
  { label: 50 },
  { label: 60 },
  { label: 70 },
  { label: 80 },
  { label: 90 },
  { label: 100 },
  { label: 110 },
  { label: 120 },
  { label: 130 },
  { label: 140 },
  { label: 150 },
  { label: 160 },
  { label: 170 },
  { label: 180 },
];

const options8 = [
  { label: "Timings" },
  { label: "No" },
  { label: "All questions in same time" },
  { label: "Each questions different time" },
];

const options9 = [
  { label: "Minutes" },
  { label: "0.5 Min" },
  { label: "1 Min" },
  { label: "1.5 Min" },
  { label: "2 Min" },
  { label: "2.5 Min" },
];

export default function quiztype() {
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [multiAnswer, setMultiAnswer] = useState(false);

  const [percentage, setPercentage] = useState("");
  const [Complexity, setComplexity] = useState("");
  const [retakeOption, setRetakeOption] = useState("");
  const [retake, setRetake] = useState(0);
  const [duration, setDuration] = useState("");
  const [timings, setTimings] = useState();
  const [minutes, setMinutes] = useState("");
  const [availablefrom, setavailablefrom] = useState("");
  const [disabledon, setdisabledon] = useState("");

  const [publicAccess, setPublicAccess] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isRetakeOn, setIsRetakeOn] = useState(false);
  const [selectedValue, setSelectedValue] = useState("0");
  const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false);

  const [quiztotalmarks, setquiztotalmarks] = useState("");
  const [questionWeightage, setquestionWeightage] = useState("");
  const [multiAnswerFlag, setmultiAnswerFlag] = useState("");

  const [optionsArray, setoptionsArray] = useState("");
  const [questionsData, setquestionsData] = useState("");
  const [numQuestions, setNumQuestions] = useState();
  const [questionDuration, setQuestionDuration] = useState(0);
  const [questions, setQuestions] = useState(
    Array.from({ length: numQuestions }, () => ({
      question_text: "",
      options: [
        { answer_option_text: "" },
        { answer_option_text: "" },
        { answer_option_text: "" },
        { answer_option_text: "" },
      ],
    }))
  );
  const [courseOptions, setCourseOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [coursename, setcoursename] = useState("");

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [quizCategory, setQuizCategory] = useState("");
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [complexities, setComplexities] = useState([]);
  const [selectedComplexity, setSelectedComplexity] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [classes, setClasses] = useState([]);

 
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://quizifai.com:8010/categories&sub_categories/');
      const data = await response.json();
      if (data.response === 'success') {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Handle category selection
  const handleSelectCategory = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    // Filter subcategories based on the selected category
    const category = categories.find(cat => cat.category_name === selectedCategory);
    if (category) {
      setSubCategories(category.sub_categories.map(subCat => subCat.sub_category_name));
    }
  };
  const sortedCategories = [...categories].sort((a, b) =>
    a.category_name.localeCompare(b.category_name)
  );
  // Handle subcategory selection
  const handleSelectSubCategory = (event) => {
    const selectedSubCategory = event.target.value;
    setSelectedSubCategory(selectedSubCategory);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('https://quizifai.com:8010/courses-clsses/');
      const data = await response.json();
      if (data.response === 'success') {
        setCourses(data.data);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };
  useEffect(() => {
    const generalCourse = courses.find(course => course.course_name === 'General');
    if (generalCourse) {
      setSelectedCourse(generalCourse.course_name);
      setClasses(generalCourse.classes.map(cls => cls.class_name));
    }
  }, [courses]);

  useEffect(() => {
    if (classes.length > 0) {
      const generalClass = classes.find(className => className === 'General');
      if (generalClass) {
        setSelectedClass(generalClass);
      }
    }
  }, [classes]);
  // Handle course selection
  const handleSelectCourse = (event) => {
    const selectedCourse = event.target.value;
    setSelectedCourse(selectedCourse);
    setcoursename(selectedCourse);
    // Find the selected course and set its classes
    const course = courses.find(course => course.course_name === selectedCourse);
    if (course) {
      setClasses(course.classes.map(cls => cls.class_name));
    }
    setSelectedClass('');
  };

  // Handle class selection
  const handleSelectClass = (event) => {
    const selectedClass = event.target.value;
    setSelectedClass(selectedClass);
  };


  useEffect(() => {
    fetchComplexities();
  }, []);

  const fetchComplexities = async () => {
    try {
      const response = await fetch('https://quizifai.com:8010/complexities/');
      const data = await response.json();
      if (data.response === 'success') {
        setComplexities(data.data.map(complexity => complexity.complexity_name));
      }
    } catch (error) {
      console.error('Error fetching complexities:', error);
    }
  };

  // Handle complexity selection
  const handleSelectComplexity = (event) => {
    setSelectedComplexity(event.target.value);
  };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("https://quizifai.com:8010/complexities/", {
  //       method: "GET",
  //       headers: {
  //         accept: "application/json",
  //       },
  //     });
  //     const responseData = await response.json();
  //     if (responseData.response === "success") {
  //       setComplexities(responseData.data);
  //     } else {
  //       console.error("Response was not successful:", responseData);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   // Fetch categories
  //   fetch("https://quizifai.com:8010/categories/", {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch categories");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       // Check if data is an array
  //       if (Array.isArray(data.data)) {
  //         setCategoryOptions(data.data);
  //       } else {
  //         throw new Error("Invalid data format for categories");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching categories:", error);
  //       // Handle error, e.g., setCategoryOptions([]) to clear any existing data
  //       setCategoryOptions([]);
  //     });
  // }, []);

  // useEffect(() => {
  //   if (quizCategory !== "") {
  //     // Fetch subcategories based on selected category
  //     fetch("https://quizifai.com:8010/get_categories/", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ category_name: quizCategory }),
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error("Failed to fetch subcategories");
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         if (data.response === "success" && Array.isArray(data.data)) {
  //           setSubCategoryOptions(data.data);
  //         } else {
  //           throw new Error("Invalid data format for subcategories");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching subcategories:", error);
  //         // Handle error
  //       });
  //   }
  // }, [quizCategory]);

  // const handleSelectCategory = (e) => {
  //   const selectedCategory = e.target.value;
  //   setQuizCategory(selectedCategory);
  //   // Reset subcategory when category changes
  //   setSubCategory("");
  // };

  // const handleSelectSubCategory = (e) => {
  //   setSubCategory(e.target.value);
  // };

  // useEffect(() => {
  //   // Fetch courses
  //   fetch("https://quizifai.com:8010/courses/")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch courses");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.response === "success") {
  //         setCourseOptions(data.data);
  //       } else {
  //         throw new Error("Failed to fetch courses");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching courses:", error);
  //     });
  // }, []);

  // useEffect(() => {
  //   // Fetch classes based on selected course name
  //   if (coursename !== "") {
  //     fetch("https://quizifai.com:8010/get_class_name/", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ course_name: coursename }),
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error("Failed to fetch classes: " + response.statusText);
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         if (data.response === "success" && Array.isArray(data.data)) {
  //           setClassOptions(data.data);
  //         } else {
  //           throw new Error(
  //             "Invalid data format for classes: " + JSON.stringify(data)
  //           );
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching classes:", error);
  //       });
  //   }
  // }, [coursename]);
  // const handleSelectCourse = (e) => {
  //   const selectedCourse = e.target.value;
  //   setcoursename(selectedCourse);
  //   // Reset classes when course changes
  //   setClasses("");
  // };

  // const handleSelectClass = (e) => {
  //   setClasses(e.target.value);
  // }; // Dependency on coursename ensures this effect runs whenever coursename changes

  const navigate = useNavigate();
  const handleNext1 = () => {
    setShowRegistrationSuccess(true);
  };
  const handleNext2 = () => {
    setShowRegistrationSuccess(false);
  };
  // const handleCheckboxChange = (questionIndex, optionIndex) => {
  //   const newOptions = [...questions[questionIndex].options].map(
  //     (option, index) => ({
  //       ...option,
  //       correct_answer_flag: index === optionIndex ? true : false, // Set only the clicked option to true, rest to false
  //     })
  //   );
  //   const newQuestions = [...questions];
  //   newQuestions[questionIndex].options = newOptions;
  //   setQuestions(newQuestions);
  // };
  // const handleToggleButton = (questionIndex, optionIndex) => {
  //   const newOptions = [...questions[questionIndex].options].map(
  //     (option, index) => ({
  //       ...option,
  //       correct_answer_flag: multiAnswer
  //         ? index === optionIndex
  //           ? !option.correct_answer_flag
  //           : option.correct_answer_flag
  //         : index === optionIndex
  //         ? true
  //         : false,
  //       // If multiAnswer is true, toggle the clicked option, else set only the clicked option to true, rest to false
  //     })
  //   );
  //   const newQuestions = [...questions];
  //   newQuestions[questionIndex].options = newOptions;
  //   setQuestions(newQuestions);
  // };
  const handleToggleButton = (questionIndex, optionIndex) => {
    const newOptions = questions[questionIndex].options.map(
      (option, index) => ({
        ...option,
        correct_answer_flag: multiAnswer
          ? index === optionIndex
            ? !option.correct_answer_flag
            : option.correct_answer_flag
          : index === optionIndex,
        // If multiAnswer is true, toggle the clicked option, else set only the clicked option to true, rest to false
      })
    );

    // If multiAnswer is true, explicitly set unselected options to false
    if (multiAnswer) {
      newOptions.forEach((option, index) => {
        if (index !== optionIndex && !option.correct_answer_flag) {
          newOptions[index].correct_answer_flag = false;
        }
      });
    }

    const newQuestions = questions.map((question, idx) => ({
      ...question,
      options: idx === questionIndex ? newOptions : question.options,
    }));
    setQuestions(newQuestions);
  };
  const handleNext = async () => {
    try {
         const user_id = localStorage.getItem('user_id');

      // Check if user_id is retrieved successfully
      if (!user_id) {
        setErrorMessage("User ID not found. Please log in again.");
        return;
      }
      const questionDuration = calculateQuizDuration();
      
      const response = await fetch(`https://quizifai.com:8010/crt_quiz_mnlly`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quiz_title: title,
          num_questions: numQuestions,
          quiz_description: description,
          quiz_category_name: selectedCategory,
          multi_answer: multiAnswer,
          quiz_sub_category_name: selectedSubCategory,
          class_name: selectedClass,
          pass_percentage: percentage,
          quiz_complexity_name: selectedComplexity,
          retake_flag: selectedValue,
          quiz_duration: duration,
          course_name: selectedCourse,
          quiz_time_bounded_questions: timings,
          quiz_public_access: publicAccess,
          available_from: availablefrom,
          disabled_on: disabledon,
          quiz_total_marks: quiztotalmarks,
          user_id:user_id,
          questions: questions.map((question) => ({
            question_text: question.question_text,
            question_weightage: calculateWeightage(numQuestions, quiztotalmarks),
            multi_answer_flag: multiAnswer,
            question_duration: questionDuration,
            options: question.options.map((option) => ({
              answer_option_text: option.answer_option_text,
              correct_answer_flag: option.correct_answer_flag,
            })),
          })),
        }),
      });
      const responseData = await response.json();
      console.log(responseData, "data");
  
      if (response.ok && responseData.response === "success") {
        // Assuming router and state setter are defined properly
     
        navigate("/quizcreated", { state: { quizData: responseData } });
      } else {
        if (responseData.detail && responseData.detail[0].type === "missing" && responseData.detail[0].loc[1] === "body" && responseData.detail[0].loc[2] === "num_questions") {
          setErrorMessage("Please provide the number of questions for the quiz.");
        } else {
          setErrorMessage(responseData.detail);
        }
      }
    } catch (error) {
      console.error("Type-Quiz failed:", error);
      setErrorMessage("An error occurred while choosing the type of the quiz");
    }
  };

  const calculateWeightage = (numQuestions, quiztotalmarks) => {
    return numQuestions > 0 ? Math.ceil(quiztotalmarks / numQuestions) : 0;
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
  };
  const toggler1 = (checked) => {
    setMultiAnswer(checked);
  };

  const toggler2 = () => {
    setIsRetakeOn((prevState) => !prevState);
    if (!isRetakeOn) {
      // If the switch is turned on, set the selected value to '1'
      setSelectedValue("1");
    } else {
      // If the switch is turned off, reset the selected value to '0'
      setSelectedValue("0");
    }
  };
  // const handleInputChange = (e) => {
  //   if (isRetakeOn) {
  //     setRetake(e.target.value);
  //   }
  // };

  const handleDropdownChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const toggler3 = (checked) => {
    setPublicAccess(checked);
  };

  function handleSelect1(event) {
    setNumber(event.target.value);
  }

  // function handleSelect2(e) {
  //   const selectedCategory = e.target.value;
  //   setQuizCategory(selectedCategory);

  //   // Find the selected category object
  //   const selectedCategoryObj = options2.find(
  //     (option) => option.label === selectedCategory
  //   );

  //   if (selectedCategoryObj && selectedCategoryObj.subCategories) {
  //     // If the selected category has sub-categories, update the sub-category state
  //     setSubCategory(selectedCategoryObj.subCategories[0]); // Set the first sub-category as default
  //   } else {
  //     // If the selected category does not have sub-categories, reset the sub-category state
  //     setSubCategory("");
  //   }
  // }

  // function handleSelect3(e) {
  //   setSubCategory(e.target.value);
  // }

  function handleSelect4(event) {
    setClasses(event.target.value);
  }

  function handleSelect5(event) {
    const selectedValue = event.target.value.replace("::", "");
    setPercentage(selectedValue);
  }

  function handleSelect6(event) {
    setSelectedComplexity(event.target.value);
  }

  const handleSelect7 = (e) => {
    const selectedValue = e.target.value;
    setDuration(selectedValue);
  };

  const handleSelect8 = (e) => {
    const selectedValue = e.target.value;
    setTimings(selectedValue);
  };

  function handleSelect9(event) {
    setMinutes(event.target.value);
  }

  const calculateQuizDuration = () => {
    if (numQuestions <= 0 || duration <= 0) {
      return 0;
    }
    return Math.ceil(duration / numQuestions) * 60;
  };
  const Back = () => {
    
    navigate("/create-quiz");
  
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
          <Navigation />
        </header>
        <div className="absolute top-[30px] left-[1260px] cursor-pointer text-[#eeb600f0] " onClick={Back}><MdOutlineCancel /></div>
        {!showRegistrationSuccess && (
          <main className="w-max-auto">
            <div className="w-[719px] h-[48px] absolute top-[30px] left-[200px] rounded-[10px] bg-[#fee2e2] z-0">
              <h className="font-Poppins font-semibold text-[25px] leading-[37.5px] text-[#214082] flex justify-center items-center mt-1l">
                Configure and click next to type in your Quiz
              </h>
            </div>
            <div className="flex">
              {/* <div className="w-[51px] h-[37px] absolute top-[102px] left-[284px]">
              {/* <img src={QuizTitle} alt="QuizTitle icon" /> */}
              {/* </div>  */}

              <div className="w-[201px] h-[22px] absolute top-[111px] left-[284px]">
                <h1 className="font-Poppins text-[#214082] font-medium text-[15px] leading-[22.5px]">
                  Quiz Title<span className="required ml-[1px] text-red-500">*</span>
                </h1>
              </div>

              <div className="">
                <input
                  className="w-[420px] h-[35px] absolute top-[99px] left-[498px] rounded-[10px] border  p-3"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </div>

              <div className="w-[210px] h-[23px] absolute top-[110px] left-[941px] mb-10 justify-center items-center grid">
                <h1 className="font-Poppins text-[#214082] font-medium text-[15px] leading-[22.5px]">
                  Number of Questions<span className="required ml-[1px] text-red-500">*</span>
                </h1>
                {/* <h1 className="font-Poppins text-[#214082] font-semibold text-[15px] ml-5 leading-[22.5px]">
                  of
                </h1>
                <h1 className="font-Poppins text-[#214082] font-semibold text-[15px] leading-[22.5px]">
                  Question
                </h1> */}
              </div>

              <div className=" rounded-lg absolute top-[99px] left-[1144px]">
                <input
                  type="number"
                  className="w-[135px] h-[35px] border-solid border-[#B8BBC2] border-[1.8px] px-3 py-3 rounded-md text-[12px] font-medium leading-[18px] cursor-pointer"
                  placeholder="No of question "
                  value={numQuestions}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setNumQuestions(value);
                    setQuestions(
                      Array.from({ length: value }, () => ({
                        question_text: "",
                        options: [
                          { answer_option_text: "" },
                          { answer_option_text: "" },
                          { answer_option_text: "" },
                          { answer_option_text: "" },
                        ],
                      }))
                    );
                  }}
                />
              </div>
              {/* <div className=" rounded-lg absolute top-[99px] left-[1200px]">
              <select className="w-[135px] border-solid border-[#B8BBC2] border-[1.8px] px-3 py-3 rounded-md text-[12px] font-medium leading-[18px] cursor-pointer" 
              onChange={handleSelect1} value={number}>
                {options1.map(options1 =>(
                <option className="border-grey-400 leading-[18px] text-[12px] font-medium"
                 >{options1.label}</option>
                  ))}
              </select>
              </div> */}
            </div>

            <div className="flex">
              {/* <div className="w-[43px] h-[43px] absolute top-[166px] left-[283px]">
              <img src={QuizDiscription} alt="QuizDiscription icon" />
            </div> */}

              <div className="w-[201px] h-[22px] absolute top-[174px] left-[284px]">
                <h1 className="font-Poppins text-[#214082] font-medium text-[15px] leading-[22.5px]">
                  Quiz Description<span className="required ml-[1px] text-red-500">*</span>
                </h1>
              </div>

              <div className="">
                <input
                  className="w-[780px] h-[35px] absolute top-[163px] left-[498px] rounded-[10px] border  p-3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="flex">
              <div className="w-[201px] h-[27px] absolute top-[248px] left-[284px]">
                <h1 className="font-Poppins text-[#214082] font-medium text-[15px] leading-[22.5px]">
                  Quiz Category<span className="required ml-[1px] text-red-500">*</span>
                </h1>
              </div>

              <div className="  absolute top-[240px] left-[498px]">
                {/* <select
                  className="w-[260px] h-[41.6px] border-solid border-[2px] border-[#B8BBC2] p-2 rounded-md cursor-pointer text-[12px]"
                  value={quizCategory}
                  onChange={handleSelectCategory}
                >
                  <option value="" disabled>Select a category</option>
  {/* Populate options with categories sorted alphabetically */}
  {/* {categoryOptions.sort().map((category, index) => (
    <option key={index} value={category}>
      {category}
    </option>
  ))}
                </select>  */}
                      <select
        className="w-[260px] h-[35px] border-solid border-[1px] border-[#B8BBC2] p-2 rounded-md cursor-pointer text-[12px]"
        value={selectedCategory}
        onChange={handleSelectCategory}
      >
        <option value="" disabled>Select a category</option>
        {sortedCategories.map((category) => (
    <option key={category.category_id} value={category.category_name}>
      {category.category_name}
    </option>
  ))}
      </select>

              </div>

              <div className="w-[164px] h-[30px] absolute top-[458px] left-[820px]">
                <h1 className="font-Poppins text-[#214082] font-medium text-[15px] leading-[22.5px]">
                  Multiple Answers<span className="required ml-[1px] text-red-500">*</span>
                </h1>
              </div>

              {/* <div className="w-[36px] h-5 absolute top-[251px] left-[935px]">
              <img src={Toggle} />
            </div> */}

              <div className="w-[36px] h-5 absolute top-[458px] left-[1020px]">
                <Switch
                  onChange={toggler1}
                  checked={multiAnswer}
                  className="react-switch"
                />
              </div>
            </div>

            <div className="flex">
              <div className="w-[201px] h-[27px] absolute top-[248px] left-[820px]">
                <h1 className="font-Poppins text-[#214082] font-medium text-[15px] leading-[22.5px]">
                  Sub Category<span className="required ml-[1px] text-red-500">*</span>
                </h1>
              </div>

              <div className=" rounded-lg w-[260px] flex border-solid border-[#B8BBC2] border-[1.8px] text-[12px]  leading-[18px] absolute top-[240px] left-[1020px]">
                {/* <select
                  className="w-[260px] text-[12px]  border-solid border-[#B8BBC2] px-3 py-3 rounded-md cursor-pointer"
                  onChange={handleSelectSubCategory}
                  value={subCategory}
                >
                  <option value="" disabled>Select a subcategory</option>
                  {/* Populate options with subcategories */}
                  {/* {subCategoryOptions.map((subCategory, index) => (
                    <option key={index} value={subCategory}>
                      {subCategory}
                    </option>
                  ))}
                </select>  */}
                  <select
        className="w-[260px] h-[35px] text-[12px]  border-solid border-[#B8BBC2] px-3 rounded-md cursor-pointer"
        onChange={handleSelectSubCategory}
        value={selectedSubCategory}
      >
        <option value="" disabled>Select a subcategory</option>
        {subCategories.map((subCategory, index) => (
          <option key={index} value={subCategory}>
            {subCategory}
          </option>
        ))}
      </select>
              </div>
            </div>

            <div className="w-[164px] h-[30px] absolute top-[314px] left-[284px]">
              <h1 className="font-Poppins text-[#214082] font-medium text-[15px] leading-[22.5px]">
                Course{" "}
              </h1>
            </div>

            {/* <div className="w-[36px] h-5 absolute top-[251px] left-[935px]">
              <img src={Toggle} />
            </div> */}

            <div className="w-[260px]  absolute top-[309px] left-[500px]">
              {/* <select
                className="w-[260px] h-[41.6px] border-solid p-2  text-[12px] border-[2px] border-[#B8BBC2] p-2 rounded-md cursor-pointer"
                value={coursename}
                onChange={handleSelectCourse}
              >
                <option value="" disabled>Select a course</option>
                {/* Populate options with courses */}
                {/* {courseOptions.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
              </select>  */}
      <select
        className="w-[260px] h-[35px] border-solid  text-[12px] border-[1px] border-[#B8BBC2] p-2 rounded-md cursor-pointer"
        value={selectedCourse}
        onChange={handleSelectCourse}
      >
        <option value="" disabled>Select a course</option>
        {courses.map(course => (
          <option key={course.course_id} value={course.course_name}>
            {course.course_name}
          </option>
        ))}
      </select>

            </div>

            <div className="w-[109px] h-[27px] absolute top-[320px] left-[820px]">
              <h1 className="font-Poppins text-[#214082] font-medium text-[15px] leading-[22.5px]">
                Classes
              </h1>
            </div>

            <div className=" rounded-lg w-[260px] flex border-solid border-[#B8BBC2] border-[1.8px] text-[12px]  leading-[18px] absolute top-[306px] left-[1020px]">
              {/* <select
                className="w-[260px] border-solid border-[#B8BBC2] px-3 py-3  text-[12px] rounded-md cursor-pointer"
                onChange={handleSelectClass}
                value={classes}
              >
                <option value="" disabled>Select a class</option>
                {classOptions.map((classOption, index) => (
                  <option key={index} value={classOption}>
                    {classOption}
                  </option>
                ))}
              </select> */}
         <select
        className="w-[260px] h-[35px] border-solid border-[#B8BBC2] px-3  text-[12px] rounded-md cursor-pointer"
        onChange={handleSelectClass}
        value={selectedClass}
        disabled={classes.length === 0}
      >
        <option value="" disabled>Select a class</option>
        {classes.map((className, index) => (
          <option key={index} value={className}>
            {className}
          </option>
        ))}
      </select>
            </div>

            <div className="flex">
              <div className="w-[164px] h-[30px] absolute top-[383px] left-[284px]">
                <h1 className="font-Poppins text-[#214082] font-medium text-[15px] leading-[22.5px]">
                  Pass percentage<span className="required ml-[1px] text-red-500">*</span>
                </h1>
              </div>

              <div className=" rounded-lg w-[129px] flex border-solid border-[#B8BBC2] border-[1.8px] absolute top-[376px] left-[498px]">
                <select
                  className="w-[264px] h-[35px] p-2 rounded-md cursor-pointer text-[12px]"
                  onChange={handleSelect5}
                  value={percentage}
                >
                  {options5.map((options5) => (
                    <option className="border-grey-400 leading-[18px] font-medium rounded">
                      {options5.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-[164px] h-[30px] absolute top-[383px] left-[820px]">
                <h1 className="font-Poppins text-[#214082] font-medium text-[15px] leading-[22.5px]">
                  Complexity<span className="required ml-[1px] text-red-500">*</span>
                </h1>
              </div>

              <div className=" rounded-lg w-[129px] flex border-solid border-[#B8BBC2] border-[1.8px] absolute top-[376px] left-[1020px]">
                {/* <select
                  className="w-[264px] p-2 rounded-md cursor-pointer text-[12px]"
                  onChange={handleSelect6}
                  value={selectedComplexity}
                >
                    <option value="" disabled>Complexities</option>
                  {complexities.map((complexity, index) => (
                    <option key={index} value={complexity}>
                      {complexity}
                    </option>
                  ))}
                </select> */}
                    <select
        className="w-[264px] h-[35px] p-2 rounded-md cursor-pointer text-[12px]"
        onChange={handleSelectComplexity}
        value={selectedComplexity}
      >
        <option value="" disabled>Complexities</option>
        {complexities.map((complexity, index) => (
          <option key={index} value={complexity}>
            {complexity}
          </option>
        ))}
      </select>
              </div>
            </div>

            <div className="flex">
              <div className="w-[164px] h-[30px] absolute top-[458px] left-[284px]">
                <h1 className="font-Poppins text-[#214082] font-medium text-[15px] leading-[22.5px]">
                  Retake Option<span className="required ml-[1px] text-red-500">*</span>
                </h1>
              </div>

              <div className="w-[36px] h-5 absolute top-[458px] left-[505px]">
                <Switch onChange={toggler2} checked={isRetakeOn} />
              </div>
              <div className="">
                {isRetakeOn ? (
                  <select
                    className="w-[48px] h-[35px] absolute top-[455px] left-[568px] rounded-[10px] border-[1.8px] bg-[#F4F4F4]"
                    value={selectedValue}
                    onChange={handleDropdownChange}
                  >
                     <option value="" disabled>select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                ) : (
                  <input
                    className="w-[48px] h-[35px] absolute top-[455px] p-2 pl-4 left-[568px] rounded-[10px] border-[1.8px] bg-[#F4F4F4]"
                    value={selectedValue}
                    readOnly
                  />
                )}
              </div>
            </div>

            <div className="flex">
              <div className="w-[166px] h-[30px] absolute top-[527px] left-[284px]">
                <h1 className="font-Poppins text-[#214082] font-medium text-[15px] leading-[22.5px]">
                  Quiz Duration<span className="required ml-[1px] text-red-500">*</span>
                </h1>
                
              </div>

              <div className=" rounded-lg w-[166px] flex border-solid border-[#B8BBC2] border-[1.8px] absolute top-[520px] left-[498px]">
                <select
                  className="w-[166px] h-[35px] px-3  rounded-md cursor-pointer text-[12px]"
                  onChange={handleSelect7}
                  value={duration}
                >
                  {options7.map((option, index) => (
                    <option
                      key={index}
                      className="border-grey-400 leading-[18px] font-medium rounded"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                {/* <input type="text"className="w-[166px] px-3 py-3 rounded-md  text-[12px]" onChange={handleSelect7} value={duration} 
              placeholder="Duration"/> */}
                {/* <TiEyeOutline  className=" absolute left-[165px] top-[15px] " /> */}
                <div className="relative">
                  <button
                    onClick={() => setIsOpen(true)}
                    className="absolute left-[10px] top-[15px]"
                  >
                    <FiAlertCircle />
                  </button>
                  {isOpen && (
                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 p-4 rounded shadow-md w-[350px] ">
                      <p>The maximum duration time is 180 mints.</p>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-[238px] h-[30px] absolute top-[527px] left-[820px]">
                <h1 className="font-Poppins text-[#214082] font-medium text-[15px] leading-[22.5px]">
                  Time bounded Questions<span className="required ml-[1px] text-red-500">*</span>
                </h1>
              </div>

              <div className=" rounded-lg w-[260px] flex border-solid border-[#B8BBC2] border-[1.8px] absolute top-[520px] left-[1020px]">
              <select
        className="w-[260px] h-[35px] px-3 rounded-md cursor-pointer text-[12px]"
        onChange={handleSelect8}
        value={timings}
      >
        {options8.map((options8, index) => (
          <option key={index}>{options8.label}</option>
        ))}
      </select>
              </div>
            </div>

            <div className="w-[253px] h-[30px] absolute top-[590px] left-[284px]">
              <h1 className="font-Poppins text-[#214082] font-medium text-[15px] leading-[22.5px]">
                Quiz will be available from<span className="required ml-[1px] text-red-500">*</span>
              </h1>
            </div>

            <div className="absolute top-[584px] left-[498px]">
              <input
              type="date"
                className="rounded-lg w-[166px] h-[35px]  border-solid border-[#B8BBC2] border-[1.8px]
              text-[#9696BB] leading-[22.5px] text-[15px] font-medium  px-4"
                placeholder="YYYY-MM-DD"
                value={availablefrom}
                onChange={(e) => setavailablefrom(e.target.value)}
              ></input>
            </div>

            <div className="w-[233px] h-[30px] absolute top-[590px] left-[820px]">
              <h1 className="font-Poppins text-[#214082] font-medium text-[15px] leading-[22.5px]">
                Quiz must be disable on
              </h1>
            </div>

            <div className=" absolute top-[584px] left-[1020px]">
              <input
              type="date"
                className="rounded-lg w-[156px] h-[35px]  border-solid border-[#B8BBC2] border-[1.8px]
              text-[#9696BB] leading-[22.5px] text-[15px] font-medium  px-4"
                placeholder="YYYY-MM-DD"
                value={disabledon}
                onChange={(e) => setdisabledon(e.target.value)}
              ></input>
            </div>

            <div className="flex">
              <div className="w-[156px] h-[30px] absolute top-[660px] left-[284px]">
                <h1 className="font-Poppins text-[#214082] font-medium text-[15px] leading-[22.5px]">
                  Public access<span className="required ml-[1px] text-red-500">*</span>
                </h1>
              </div>

              <div className="w-[36px] h-5 absolute top-[660px] left-[504px]">
                <Switch onChange={toggler3} checked={publicAccess} />
              </div>

              {/* <div className="w-[174px] h-[30px] absolute top-[660px] left-[568px]">
              <h1 className="font-Poppins text-[#214082] font-semibold text-[15px] leading-[22.5px]">
                Time per question{" "}
              </h1>
            </div>

            <div className=" rounded-lg w-[110px] flex border-solid border-[#B8BBC2] border-[1.8px] absolute top-[653px] left-[754px]">
            <select className="w-[110px] px-3 py-3 rounded-md cursor-pointer text-[12px]" onChange={handleSelect9} value={minutes}>
                {options9.map(options9 =>(
                <option className="border-grey-400 leading-[18px] font-medium rounded"
                 >{options9.label}</option>
                 
                  ))}
              </select>
            </div> */}
              <div className="w-[174px] h-[30px] absolute top-[660px] left-[820px]">
                <h1 className="font-Poppins text-[#214082] font-medium text-[15px] leading-[22.5px]">
                  Quiz total marks<span className="required ml-[1px] text-red-500">*</span>
                </h1>
              </div>

              <div className="absolute top-[653px] left-[1020px]">
                <input
                  className="rounded-lg w-[156px] h-[35px] flex border-solid border-[#B8BBC2] border-[1.8px]
               text-[12px]  px-3 py-3 cursor-pointer "
                  placeholder="Total marks"
                  value={quiztotalmarks}
                  onChange={(e) => setquiztotalmarks(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="w-[98px] h-[32px] absolute top-[734px] left-[1182px] rounded-[10px] bg-[#1E4DE9]">
              <button
                href="./enter-quiz"
                onClick={handleNext1}
                className="font-Poppins font-medium text-[15px] leading-[22.5px] flex justify-start px-4 py-1 text-white"
              >
                Next
                <img
                  className="w-[24px] h-[24px] ml-4"
                  alt="next icon"
                  src={Next}
                />
              </button>
            </div>
          </main>
        )}
        {showRegistrationSuccess && (
          <main className="w-max-auto">
            <div className="w-[848px] h-[44px] absolute top-[90px] left-[298px]">
              <h1 className="font-Poppins font-bold text-[30px] leading-[45px] text-orange-400">
                Create / Edit your Quiz
              </h1>
              <h1 className="font-Poppins font-medium text-[12px] text-[#214082] leading-[18px]">
                Enter all your questions, options, and answers
              </h1>
            </div>

            {/* Questions and options */}
            <div className="absolute top-[210px] left-[298px] w-[1212px] h-[450px] ">
            {questions.map((question, questionIndex) => (
  <div key={questionIndex} className="mb-8 ">
    {/* Input field for question */}
    <div className="flex items-center mb-4">
      <div className="mr-2 text-xl font-bold text-[#214082]">
        {questionIndex + 1}.
      </div>
      <input
        type="text"
        placeholder={`Question`}
        className="w-[70%] h-[35px] text-[#214082] font-bold rounded-[10px] border-solid border-[#B8BBC2] border-[1.8px] p-[15px] "
        value={question.question_text}
        onChange={(e) => {
          const newQuestions = [...questions];
          newQuestions[questionIndex].question_text = e.target.value;
          setQuestions(newQuestions);
        }}
      />
 
    {/* Input field for question weightage */}
    <input
        type="number"
        placeholder="Marks"
        className="w-[85px] h-[35px] rounded-[10px] border-solid border-[#B8BBC2] border-[1.8px] mx-2 p-[10px] font-normal"
        value={calculateWeightage(numQuestions, quiztotalmarks)}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          // Update the question_weightage in all questions
          const updatedQuestions = questions.map(question => ({
            ...question,
            question_weightage: value
          }));
          setQuestions(updatedQuestions);
        }}
      />
    {/* Input field for question duration */}
    {/* <input
      type="number"
      placeholder="Duration"
      className="w-[130px] h-[37px] rounded-[10px] border-solid border-[#B8BBC2] border-[1.8px] mr-2 p-[10px] font-normal"
      value={question.question_duration}
      onChange={(e) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].question_duration = parseInt(e.target.value);
        setQuestions(newQuestions);
      }}
    /> */}
      {timings === "No" ? (
        <input
      
          type="number"
          placeholder="Duration"
          className="w-[130px] h-[35px] rounded-[10px] border-solid border-[#B8BBC2] border-[1.8px] mr-2 p-[10px] font-normal hidden"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
          disabled
        />
      ) : timings === "All questions in same time" ? (
        // Calculate and prepopulate quiz duration
        <input
          type="number"
          placeholder="Duration"
          className="w-[130px] h-[35px] rounded-[10px] border-solid border-[#B8BBC2] border-[1.8px] mr-2 p-[10px] font-normal"
          value={calculateQuizDuration()}
          onChange={() => {}}
          disabled
        />
      ) : (
        // Each question has different time
        <select
        className="w-[130px] h-[35px] rounded-[10px] border-solid border-[#B8BBC2] border-[1.8px] mr-2 p-[2px] font-normal"
        value={questionDuration}
        onChange={(e) => {
          const newQuestionDuration = parseInt(e.target.value);
          setQuestionDuration(newQuestionDuration); // Update questionDuration state
          // Update the corresponding question's duration in the questions array
          const updatedQuestions = questions.map((question, index) => {
            if (index === questionIndex) {
              return { ...question, question_duration: newQuestionDuration };
            }
            return question;
          });
          setQuestions(updatedQuestions);
        }}
      >
        {[...Array(60)].map((_, index) => ( // Create options for 10 to 600 seconds
          <option key={index} value={(index + 1) * 5}>{(index + 1) * 5} seconds</option>
        ))}
      </select>
        
      )}
       </div>
    {/* Input fields for options */}
    {question.options.map((option, optionIndex) => (
      <div key={optionIndex} className="flex items-center mb-2 ">
        <div className="mr-2 text-xl font-normal w-[25px] rounded-[10px] p-2 border-[1px] border-solid border-[#B8BBC2] flex justify-center text-center h-[35px] justify-items-center items-center">
          {String.fromCharCode(97 + optionIndex)}.
        </div>
        <input
          type="text"
          placeholder={`Option Text`}
          className="w-[70%] h-[35px] rounded-[10px] border-solid border-[#B8BBC2] border-[1.8px] mr-2 p-[15px] font-normal"
          value={option.answer_option_text}
          onChange={(e) => {
            const newOptions = [...questions[questionIndex].options];
            newOptions[optionIndex].answer_option_text = e.target.value;
            const newQuestions = [...questions];
            newQuestions[questionIndex].options = newOptions;
            setQuestions(newQuestions);
          }}
        />
        {/* Add correct answer flag input */}
        <button
          className={`mr-2 ${
            option.correct_answer_flag ? "bg-green-500" : "bg-gray-300"
          } rounded-full w-10 h-[20px] transition-colors duration-300 focus:outline-none`}
          onClick={() =>
            handleToggleButton(questionIndex, optionIndex)
          }
        >
          <span
            className={`block ${
              option.correct_answer_flag ? "translate-x-5" : "translate-x-0"
            } transform -translate-y-1.5 w-[18px] h-[18px] relative top-[6px] bg-white rounded-full shadow-md transition-transform duration-300`}
          ></span>
        </button>
      </div>
    ))}
  </div>
))}

<div className=" flex justify-between items-center pr-[330px] ">
                <button
                  className="w-[123px] h-[32px] rounded-[10px] bg-[#1E4DE9] text-white  hover:bg-[rgb(239,81,48)] transform hover:scale-105 transition duration-200"
                  onClick={handleNext2}
                >
                  Back
                </button>

                <button
                  className="w-[123px] h-[32px] rounded-[10px] bg-[#1E4DE9] text-white  hover:bg-[rgb(239,81,48)] transform hover:scale-105 transition duration-200"
                  onClick={handleNext}
                >
                  Save
                </button>
              </div>
            </div>
          </main>
        )}
      </div>
    </>
  );
}
