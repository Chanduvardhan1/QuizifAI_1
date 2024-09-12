import React, { useState,useRef, useEffect ,useContext} from 'react'
import LogoutBar from './logoutbar';
import Navigation from '../navbar/navbar';
import { AuthContext } from '../Authcontext/AuthContext';
import ReactCrop, { makeAspectCrop } from "react-image-crop";
import profileimg from "../assets/Images/images/profile/profileImage.png";
import Camera from "../assets/Images/images/profile/Camera.png";
import searchIcon from "../assets/Images/images/dashboard/Search.png";
import GreaterThan from "../assets/Images/images/dashboard/greaterthan.png";

const Globalleaderboard = () => {
  const inputReff = useRef(null);
  const [image, setImage] = useState("");
  const [crop, setCrop] = useState({ aspect: 1 });
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [userName, setUserName] = useState("");
  const [globalRank, setGlobalRank] = useState("");
  const [globalScore, setGlobalScore] = useState("");
  const [attempts, setAttempts] = useState("");
  const [duration, setDuration] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const { isAuthenticated, authToken } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [allUsersData, setAllUsersData] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const rowsPerPage = 25;
  const [sortOption, setSortOption] = useState("latest");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect (() =>{
    const fetchQuizData = async () =>{
        try{
            const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage
            if (!authToken) {
              console.error('No authentication token found. Please log in again.');
              return;
            } 
            const response = await fetch(`https://quizifai.com:8010/global_score/`,{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                    user_id: userId,
                  }),
            });
            if(!response.ok){
                throw new Error("Failed to fetch history quiz data");   
            }
            const result = await response.json();
            console.log("Quiz data :", result);
        
        const data = result.data;
        setUserName(data.user_data.full_name || "");
        setGlobalRank(data.user_data.global_score_rank || "");
        setGlobalScore(data.user_data.global_score || "");
        setAttempts(data.user_data.total_quizzes_attempted || "");
        setDuration(data.user_data.total_duration || "");
        setCity(data.user_data.city || "");
        setCountry(data.user_data.country_name || "");

        setAllUsersData(data.all_users_data || []);
        }catch(error){
            console.error("Error fetching username data:", error.message);
            
        }
    };
    if(isAuthenticated){
    fetchQuizData();
    }
  },[authToken, isAuthenticated,userId]);

// Handle pagination next/previous
const handleNext = () => {
    if (indexOfLastRow < sortedQuizzes.length) {
      setCurrentPage(currentPage + 1);
    }
  };

   // Handle search change
   const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);  // Reset to the first page when search changes
  };
   // Filter quizzes based on search term
   const filteredQuizzes = allUsersData.filter((quiz) => {
    return (
      quiz.full_name.toLowerCase().includes(searchTerm.toLowerCase()) 
    //   quiz.time.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   quiz.month.toLowerCase().includes(searchTerm.toLowerCase())||
    //   quiz.attempt_duration_mins.toLowerCase().includes(searchTerm.toLowerCase)
      // quiz.score_rank.toLowerCase().includes(searchTerm.toLowerCase())||
      // quiz.attained_percentage.toLowerCase().includes(searchTerm.toLowerCase())||
      // quiz.quiz_grade.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
   // Sort and filter quizzes based on selected option
   const filteredByDate = filteredQuizzes.filter((quiz) => {
    const quizDate = new Date(quiz.date);
    if (sortOption === "ThisMonth") {
      return quizDate >= firstDayOfMonth;
    } else if (sortOption === "ThisWeek") {
      return quizDate >= startOfWeek;
    }
    return true;  // Show all quizzes if "Latest" is selected
  });

  // Sort quizzes if "Latest" is selected
  const sortedQuizzes = sortOption === "latest" 
      ? filteredByDate.sort((a, b) => new Date(b.date) - new Date(a.date))
      : filteredByDate;

const indexOfLastRow = currentPage * rowsPerPage;
const indexOfFirstRow = indexOfLastRow - rowsPerPage;
const currentRows = sortedQuizzes.slice(indexOfFirstRow, indexOfLastRow);
  
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

// Image handling and crop logic
useEffect(() => {
    const savedImage = localStorage.getItem('savedImage');
    if (savedImage) {
      setImage(savedImage);
    }
  }, []);
  
  function handleImageClick() {
    if (inputReff.current && typeof inputReff.current.click === 'function') {
      inputReff.current.click(); // Open file dialog
    } else {
      console.error('click method is not available on inputReff.current');
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
   } 
  function handleReplaceImage(event) {
    event.stopPropagation(); // Prevent the click from triggering the parent div's click event
    handleImageClick(); // Open file dialog
  }
  
  function handleDeleteImage(event) {
    event.stopPropagation(); // Prevent the click from triggering the parent div's click event
    localStorage.removeItem('savedImage'); // Remove from local storage
    setImage(""); // Reset to default image
  }
  
  function handleViewImage(event) {
    event.stopPropagation(); // Prevent the click from triggering the parent div's click event
    if (image) {
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = image;
      link.target = '_blank'; // Open in a new tab
      link.click(); // Simulate click to open the image
    } else {
      console.error('No image available to view');
    }
  }
   const onImageLoad = (e) =>{
    const {width,height} = e.currentTarget;
    const crop = makeAspectCrop(
      {
        unit : '%',
        width : 25,
      },
      ASPECT_RATIO,
        width,
        height
    );
    setCrop(crop);
   }
    
    const handleToggle = () => {
      setIsExpanded(!isExpanded);
    };

  return (
    <div className='flex h-screen font-Poppins'>
        <Navigation/>
        <div className='full mt-6'>
        <h1 className='text-center text-lg text-[#E97132] font-bold text-[35px]'>Global Score Leader Board</h1>
        <h1 className='text-[20px] text-[#002366] font-medium ml-5 mt-10'>Welcome {userName.charAt(0).toUpperCase() + userName.slice(1)}</h1>
        <div className='flex justify-between mt-2  bg-green-100 border-2 mx-5'>
        <div className="flex ml-5 mt-5 relative top-5">
        <div className="rounded-full w-[100px] ml-[5px] h-[100px] -mt-[38px]" style={{ position: "relative" }}>
      {image ? (
        <img className="w-[80px] h-[80px] rounded-full border-2 border-white" src={image} alt="Uploaded" />
      ) : (
        <img className="w-[80px] h-[80px] rounded-full border-2 border-white" src={profileimg} alt="Default" />
      )}
      <input type="file" ref={inputReff} onChange={handleImageChange} style={{ display: "none" }} />
    </div>

  <div className="-mt-4 -ml-3 text-[13px] text-[#002366] font-semibold">
<span >Name : </span>
<span>{userName.charAt(0).toUpperCase() + userName.slice(1)}</span><br/>
<span className=" text-[#002366]">User id : </span>
<span className=" font-normal">{userId}</span>
</div>
  </div>

  <div className='flex-col text-[12px] text-[#002366] font-semibold relative top-[25px] -ml-2'>
    <p>Global Rank : {globalRank}</p>
    <p>Global Score : {globalScore}</p>
  </div>

  <div className='flex-col text-[12px] text-[#002366] font-semibold -ml-4 relative top-[25px]'>
    <p>Quizzes Attempts : {attempts}</p>
    <p>QuizifAi Time : {duration}</p>
  </div>

  <div className='text-[12px] text-[#002366] text-nowrap font-semibold mr-[30px] relative top-[25px]'>
    <p>City : {city},</p>
    <p className='text-center pl-1'>{country}</p>
  </div>

        </div>
        

        <div className="text-[#002366] mx-5 text-[13px] mt-7">
      <p>
        The Global Score Leaderboard is designed to showcase your quiz achievements and compare them with users worldwide.
        It provides an up-to-date ranking, reflecting your cumulative scores from various quizzes. 
        {isExpanded && (
          <>
            This feature not only highlights your strengths but also helps you identify areas for improvement.
            By seeing your position on the leaderboard, you can set personal goals and stay motivated to climb higher.
            Competing with others adds an exciting element to your learning experience, encouraging continuous growth.
            The leaderboard is regularly refreshed, ensuring that your hard work is always visible.
            Engage with this dynamic tool to challenge yourself, track your progress, and strive for excellence in every quiz you take.
          </>
        )}
      </p>
      <button onClick={handleToggle} className="text-blue-500 text-[12px] underline underline-offset-1 hover:no-underline">
        {isExpanded ? 'Show Less' : 'Show More'}
      </button>
    </div>

         <div className='flex justify-between'>
            <h1 className='text-[#E97132] ml-5 mt-4 pt-4 font-semibold'>Global Scores:</h1>
            <div className="flex mt-4 pt-2">
       <input 
        type="search" 
        className="border-black p-1 border-2 rounded-lg bg-[url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke=%27currentColor%27%3e%3cpath stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M21 21l-4.35-4.35M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z%27 /%3e%3c/svg%3e')] bg-no-repeat bg-left-3 bg-center" 
        placeholder="search"
        value={searchTerm}
        onChange={handleSearchChange}
        />
        <img className="h-4 w-4 relative top-[10px] right-9" src={searchIcon} alt="search icon"/>
      </div>
            </div>

         <div className='overflow-y-auto mt-2 mx-5'>
        <table className='min-w-full bg-gray-100 border border-gray-200 rounded-lg border-spacing-y-2'>
        <thead className='bg-[#CBF2FB]'>
        <tr className='text-[12px] text-[#002366]'>
        <th className='py-2 px-2 border-b'>Seq</th>
         <th className='py-2 px-2 border-b text-start'>User Name</th>
         <th className='py-2 px-2 border-b'>Rank</th>
         <th className='py-2 px-2 border-b'>Global Score</th>
         <th className='py-2 px-2 border-b'>Attempted</th>
         <th className='py-2 px-2 border-b text-start'>QuizifAi Time</th>
         <th className='py-2 px-2 border-b text-start'>City</th>
        </tr>
        </thead>

        <tbody className='space-y-4'>
            {currentRows.map((user, index) =>(
              <tr key={user.user_id} className="bg-white hover:bg-gray-100 active:bg-green-200 text-[12px] text-[#002366] font-medium border-black">
              <th className='py-2 px-2 border-b'>{indexOfFirstRow + index + 1}</th>
              <th className='py-2 px-2 border-b text-start'>
              {user.full_name.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
              </th>
              <th className='py-2 px-2 border-b'>{user.global_score_rank}</th>
              <th className='py-2 px-2 border-b'>{user.global_score !== null ? user.global_score : '-'}</th>
              <th className='py-2 px-2 border-b'>{user.total_quizzes_attempted}</th>
              <th className='py-2 px-2 border-b text-start'>{user.total_duration}</th>
              <th className='py-2 px-2 border-b text-start'>{user.city || '-'}</th>
             </tr>
            ))}
        </tbody>
        </table>
        <div className="flex justify-between mt-4">
      <button
          className="flex gap-1 items-center cursor-pointer"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          <img className="h-3 w-3 rotate-180" src={GreaterThan} alt="Previous icon"/>
          <h1 className="text-[#F17530] font-bold">Previous</h1>
        </button>
        <span>Page {currentPage} of {Math.ceil(sortedQuizzes.length / rowsPerPage)}</span>
      <button
          className="flex gap-1 items-center cursor-pointer"
          onClick={handleNext}
          disabled={indexOfLastRow >= allUsersData.length}
        >
          <h1 className="text-[#F17530] font-bold">Next</h1>
          <img className="h-3 w-3" src={GreaterThan} alt="Next icon"/>
        </button>
      </div>
        </div>
        </div>

        <LogoutBar/>
    </div>
  )
}

export default Globalleaderboard;