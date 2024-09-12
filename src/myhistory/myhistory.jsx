import React from "react";
import Navigation from "../navbar/navbar";
import LogoutBar from "../logoutbar/logoutbar";
import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Authcontext/AuthContext";
import searchIcon from "../assets/Images/images/dashboard/Search.png";
import GreaterThan from "../assets/Images/images/dashboard/greaterthan.png";
import ReactCrop, { makeAspectCrop } from "react-image-crop";
import profileimg from "../assets/Images/images/profile/profileImage.png";
import Easy from "../assets/Images/history/Easy.png"; 
import Moderate from "../assets/Images/history/Moderate.png"; 
import Complex from "../assets/Images/history/Complex.png"; 
const myhistory = () => {
  const [userName, setUserName] = useState("");
  const [globalRank, setGlobalRank] = useState("");
  const [globalScore, setGlobalScore] = useState("");
  const [noOfQuizzes, setNoOfQuizzes] = useState("");
  const [noOfMinutes, setNoOfMinutes] = useState("");
  const [noOfAttempts, setNoOfAttempts] = useState("");
  const [simpleCount, setSimpleCount] = useState("");
  const [moderateCount, setModerateCount] = useState("");
  const [complexCount, setComplexCount] = useState("");
  const [passCount, setPassCount] = useState("");
  const [FailCount, setFailCount] = useState("");
  const [quizDetails, setQuizDetails] = useState([]);
  const [NoOfScore, setNoOfScore] = useState("");
  const [historyData, setHistoryData] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const navigate = useNavigate();
  const { isAuthenticated, authToken } = useContext(AuthContext);
  const inputReff = useRef(null);
  const [image, setImage] = useState("");
  const [date, setDate] = useState('');

  const [crop, setCrop] = useState({ aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 25;

    useEffect(() => {
      const fetchQuizData = async () => {
        try {
          const authToken = localStorage.getItem("authToken"); // Retrieve the auth token from localStorage
          if (!authToken) {
            console.error("No authentication token found. Please log in again.");
            return;
          }
          const response = await fetch(
            `https://quizifai.com:8010/history_Page/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
              },
              body: JSON.stringify({
                user_id: userId,
              }),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch history quiz data");
          }
          const result = await response.json();
          console.log("History data :", result);
  
          const data = result.data;
          setUserName(data.user_name || "");
          setNoOfQuizzes(data.total_no_of_quizzes);
          setNoOfAttempts(data.total_no_of_attempts);
          setGlobalRank(data.global_score_rank);
          setGlobalScore(data.global_score);
          setNoOfMinutes(data.total_duration);
          setSimpleCount(data.simple_count);
          setModerateCount(data.moderate_count);
          setComplexCount(data.complex_count);
          setPassCount(data.pass_count);
          setFailCount(data.fail_count);
  
          // Set quiz details if needed
          // const quizDate = data.quiz_details;
          setQuizDetails(data.quiz_details);
          // setDate(quizDate.month);
        } catch (error) {
          console.error("Error fetching history quiz data:", error);
        }
      };
      fetchQuizData();
    }, [authToken, isAuthenticated, navigate, userId]);

  // Handle sort change
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    setCurrentPage(1); // Reset to the first page when sort changes
  };

  // Handle search change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when search changes
  };

  // Get the current date for filtering
const today = new Date();
const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
const startOfWeek = new Date(today);
startOfWeek.setDate(today.getDate() - today.getDay()); // Start of the week

// Filter quizzes based on search term
const filteredQuizzes = quizDetails.filter((quiz) => {
  return (
    quiz.quiz_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.time.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.month.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.attempt_duration_mins
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
});

// Sort and filter quizzes based on selected option
const filteredByDate = filteredQuizzes.filter((quiz) => {
  const quizDate = new Date(quiz.month);
  if (sortOption === "This Month") {
    return quizDate >= firstDayOfMonth;
  } else if (sortOption === "This Week") {
    return quizDate >= startOfWeek;
  } else if (sortOption === "Today") {
    return quizDate.toDateString() === today.toDateString();
  }
  return true; // Show all quizzes if "All" is selected
});

// Sort quizzes if "Latest" is selected
const sortedQuizzes =
  sortOption === "All"
    ? filteredByDate.sort((a, b) => new Date(b.date) - new Date(a.date))
    : filteredByDate;

// Pagination logic
const indexOfLastRow = currentPage * rowsPerPage;
const indexOfFirstRow = indexOfLastRow - rowsPerPage;
const currentRows = sortedQuizzes.slice(indexOfFirstRow, indexOfLastRow);

// Show message if no quizzes are found
const noQuizzesMessage = () => {
  if (sortOption === "Today") return "No quizzes attempted on today.";
  if (sortOption === "This Week") return "No quizzes attempted this week.";
  if (sortOption === "This Month") return "No quizzes attempted this month.";
  return "No quizzes available.";
};
// Handle pagination next/previous
const handleNext = () => {
  if (indexOfLastRow < sortedQuizzes.length) {
    setCurrentPage(currentPage + 1);
  }
};

const handlePrevious = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};

  // Image handling and crop logic
  useEffect(() => {
    const savedImage = localStorage.getItem("savedImage");
    if (savedImage) {
      setImage(savedImage);
    }
  }, []);

  function handleImageClick() {
    if (inputReff.current && typeof inputReff.current.click === "function") {
      inputReff.current.click(); // Open file dialog
    } else {
      console.error("click method is not available on inputReff.current");
    }
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        // localStorage.setItem('savedImage', imageDataUrl);
        setImage(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  }

  const handleCropComplete = (crop) => {
    setCompletedCrop(crop);
  };
  function handleReplaceImage(event) {
    event.stopPropagation(); // Prevent the click from triggering the parent div's click event
    handleImageClick(); // Open file dialog
  }

  function handleDeleteImage(event) {
    event.stopPropagation(); // Prevent the click from triggering the parent div's click event
    localStorage.removeItem("savedImage"); // Remove from local storage
    setImage(""); // Reset to default image
  }

  function handleViewImage(event) {
    event.stopPropagation(); // Prevent the click from triggering the parent div's click event
    if (image) {
      // Create a temporary link element
      const link = document.createElement("a");
      link.href = image;
      link.target = "_blank"; // Open in a new tab
      link.click(); // Simulate click to open the image
    } else {
      console.error("No image available to view");
    }
  }
  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const crop = makeAspectCrop(
      {
        unit: "%",
        width: 25,
      },
      ASPECT_RATIO,
      width,
      height
    );
    setCrop(crop);
  };

  const leaderboard = (quizId, attemptId) => {
    localStorage.setItem("quiz_id", quizId);
    navigate("/leaderboard", {
      state: {
        quizId,
        attemptId,
      },
    });
  };
  return (
    <>
      <div className="flex w-full">
        <Navigation />
        <div className="w-full p-[10px] text-[14px] font-Poppins text-[#214082] font-bold">
          <div className="flex justify-center p-[5px] text-[24px]">
            <h1 className="text-[#F17530]">My History</h1>
          </div>

          <div className="py-[20px] my-[10px]">
            <div className="flex flex-col gap-5">
              <div className="flex -gap-3">
                <div
                  className="rounded-full w-[100px] ml-[5px] h-[100px] -mt-[38px]"
                  style={{ position: "relative" }}
                >
                  {image ? (
                    <img
                      className="w-[80px] h-[80px] rounded-full border-2 border-white"
                      src={image}
                      alt="Uploaded"
                    />
                  ) : (
                    <img
                      className="w-[80px] h-[80px] rounded-full border-2 border-white"
                      src={profileimg}
                      alt="Default"
                    />
                  )}
                  <input
                    type="file"
                    ref={inputReff}
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </div>

                <div className="-mt-4">
                  <span className="text-[15px]">Welcome </span>
                  <span className="text-[15px]">
                    {userName.charAt(0).toUpperCase() + userName.slice(1)}
                  </span>
                  <br />
                  <span className="text-[13px]">User id : </span>
                  <span className=" font-normal text-[12px]">{userId}</span>
                </div>
              </div>
              </div>
              <div className="flex justify-evenly gap-3 border-2 px-2 py-2 bg-[#DCFCE7] w-full">
              <div>
                  <div>
                    <span>Total no.of Attempts : </span>
                    <span className=" font-normal">{noOfAttempts}</span>
                  </div>

                  <div>
                    <span>Total no.of Quizzes </span>
                    <span className="pl-[14px] font-normal">
                      <span className="font-bold">:</span> {noOfQuizzes}
                    </span>
                  </div>

                  <div className="text-nowrap">
                    <span>Total no.of min </span>
                    <span className="pl-[41px] font-normal">
                      <span className="font-bold">:</span> {noOfMinutes}
                    </span>
                  </div>

                  <div>
                    <span>Total Score </span>
                    <span className="pl-[68px] font-normal">
                      <span className="font-bold">:</span> {globalScore}
                    </span>
                  </div>
                </div>

                              <div>
                  <div>
                    <span>Global Rank </span>
                    <span className="pl-1 font-normal">
                      <span className="font-bold">:</span> {globalRank}
                    </span>
                  </div>
                  <div className="text-nowrap">
                    <span>Global Score </span>
                    <span className="font-normal">
                      <span className="font-bold">:</span> {globalScore}
                    </span>
                  </div>         
                </div>
                
                <div className="flex">
                    <div className="font-bold">
                      <span>Complexity</span>
                      <span className="px-1">:</span>
                    </div>
                    <div className="flex-col">
                    <span>
                      <p className="text-normal text-nowrap flex font-semibold">
                        Simple <span className="pl-[23px]">:</span><span className="px-1 font-normal">{simpleCount}</span>
                      </p>
                       </span>

                      <p className="text-nowrap flex font-semibold">
                       Moderate :<span className=" px-1 font-normal">{moderateCount}</span>
                      </p>
                      
                      <p className="text-nowrap flex font-semibold">
                       Complex <span className="pl-2">:</span><span className=" px-1 font-normal">{complexCount}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <span className="pl-5 text-nowrap">Pass/Fail : </span>
                    <span className=" font-semibold pl-1">
                      <p className="text-nowrap"> Pass : <span className="font-normal">{passCount}</span></p>
                      <p className="text-nowrap pl-[2px]">Fail <span className="pl-[6px]">:</span> <span className="font-normal">{FailCount}</span></p>
                    </span>
                  </div>
              </div>
              
            </div>
          <div className=" flex  justify-between p-[5px] mb-3">
            <div>
              <h1 className="text-[#F17530] pt-3">Quizzes History : </h1>
            </div>

            <div className="flex gap-[5px] justify-center items-center">
              <div className="flex">
                <input
                  type="search"
                  className="p-1 border-2 border-black rounded-lg bg-[url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke=%27currentColor%27%3e%3cpath strokeLinecap=%27round%27 strokeLinejoin=%27round%27 strokeWidth=%272%27 d=%27M21 21l-4.35-4.35M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z%27 /%3e%3c/svg%3e')] bg-no-repeat bg-left-3 bg-center"
                  placeholder="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <img
                  className="h-4 w-4 relative top-[9px] right-9"
                  src={searchIcon}
                  alt="search icon"
                />
              </div>

              <span className="text-[#F17530]">Sort by : </span>
              <span>
                <select className="py-1 px-2 rounded-md"
                 value={sortOption} onChange={handleSortChange}>
                  <option value="All">All</option>
                  <option value="This Day">This Day</option>
                  <option value="This Week">This Week</option>
                  <option value="This Month">This Month</option>
                </select>
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            {sortedQuizzes.length === 0?(
              <div className="text-center text-red-500 my-4">{noQuizzesMessage()}</div>
            ):(
              <table className="min-w-full bg-gray-100 border border-gray-200 rounded-lg border-spacing-y-2">
              <thead className="bg-[#CBF2FB]">
                <tr className="text-[14px]">
                  <th className="py-2 px-4 border-b">Seq</th>
                  <th className="py-2 px-4 border-b text-start">Date</th>
                  <th className="py-2 px-4 border-b">Time</th>
                  <th className="py-2 px-4 border-b text-start">Quiz Title</th>
                  <th className="py-2 px-4 border-b text-start">Duration</th>
                  <th className="py-2 px-4 border-b">Rank</th>
                  <th className="py-2 px-4 border-b text-nowrap">Pass %</th>
                  <th className="py-2 px-4 border-b">Grade</th>
                  <th className="py-2 px-4 border-b">Pass/Fail</th>
                </tr>
              </thead>
              <tbody className="space-y-4">
                {currentRows.map((quiz, index) => (
                  <tr
                    key={index}
                    className="bg-white hover:bg-gray-100 active:bg-green-200 text-[12px]"
                     >
                    <td className="py-2 px-4 border-b text-center">
                      {indexOfFirstRow + index + 1}
                    </td>
                    <td
                      onClick={() =>
                        leaderboard(quiz.quiz_id, quiz.quiz_level_attempt_id)
                      }
                      className="cursor-pointer py-2 px-2 border-b text-center text-nowrap"
                    >
                      {quiz.month}
                    </td>
                    <td
                      onClick={() =>
                        leaderboard(quiz.quiz_id, quiz.quiz_level_attempt_id)
                      }
                      className="cursor-pointer py-2 px-4 border-b text-center text-nowrap"
                    >
                      {quiz.time}
                    </td>

                    <td
                      onClick={() =>
                        leaderboard(quiz.quiz_id, quiz.quiz_level_attempt_id)
                      }
                      className="cursor-pointer py-2 px-4 border-b text-start"
                    >
                      {quiz.quiz_name}
                    </td>

                    <td
                      onClick={() =>
                        leaderboard(quiz.quiz_id, quiz.quiz_level_attempt_id)
                      }
                      className="cursor-pointer py-2 px-4 border-b text-left text-nowrap"
                    >
                      {quiz.attempt_duration_mins}
                    </td>

                    <td
                      onClick={() =>
                        leaderboard(quiz.quiz_id, quiz.quiz_level_attempt_id)
                      }
                      className="cursor-pointer py-2 px-4 border-b text-center"
                    >
                      {quiz.score_rank}
                    </td>

                    <td
                      onClick={() =>
                        leaderboard(quiz.quiz_id, quiz.quiz_level_attempt_id)
                      }
                      className="cursor-pointer py-2 px-4 border-b text-center"
                    >
                      {quiz.attained_percentage}
                    </td>
                    <td
                      onClick={() =>
                        leaderboard(quiz.quiz_id, quiz.quiz_level_attempt_id)
                      }
                      className="cursor-pointer py-2 px-4 border-b text-center"
                    >
                      {quiz.quiz_grade}
                    </td>
                    <td
                      onClick={() =>
                        leaderboard(quiz.quiz_id, quiz.quiz_level_attempt_id)
                      }
                      className="cursor-pointer py-2 px-4 border-b text-center"
                    >
                      {quiz.pass_flag}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
        
            <div className="flex justify-between mt-4">
              <button
                className="flex gap-1 items-center cursor-pointer"
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                <img
                  className="h-3 w-3 rotate-180"
                  src={GreaterThan}
                  alt="Previous icon"
                />
                <h1 className="text-[#F17530]">Previous</h1>
              </button>
              <span>
                Page {currentPage} of{" "}
                {Math.ceil(sortedQuizzes.length / rowsPerPage)}
              </span>
              <button
                className="flex gap-1 items-center cursor-pointer"
                onClick={handleNext}
                disabled={indexOfLastRow >= quizDetails.length}
              >
                <h1 className="text-[#F17530]">Next</h1>
                <img className="h-3 w-3" src={GreaterThan} alt="Next icon" />
              </button>
            </div>
          </div>
        </div>
        <LogoutBar />
      </div>
    </>
  );
};

export default myhistory;
