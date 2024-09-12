// LogoutBar.js

import React , { useContext }from "react";
//import Image from "next/image";
import { useNavigate } from "react-router-dom";
import { useState,useEffect,useRef } from "react";
import styles from "./dashboard.module.css";
import LogoutIcon from "../assets/Images/images/dashboard/logout.png";
import user2Icon from "../assets/Images/images/dashboard/user2.png";
import userIcon from "../assets/Images/images/dashboard/user.png";
import expand from "../assets/Images/images/dashboard/expand.png";
import ranks from "../assets/Images/images/dashboard/ranks.png";
import infinity from "../assets/Images/images/dashboard/infinity.png"
import questionmark from "../assets/Images/images/dashboard/questionmark.png";
import profileimg from "../assets/Images/images/profile/profileImage.png";
import Camera from "../assets/Images/images/profile/Camera.png";
import rocket from "../assets/Images/images/dashboard/rocket.png";
import { AuthContext } from "../Authcontext/AuthContext.jsx";
import ReactCrop from "react-image-crop";
import 'react-image-crop/dist/ReactCrop.css';


const currentValue1 = 50; 
  const maxValue1 = 100; 
  const currentValue2 = 30; 
  const maxValue2 = 80; 


const BasicProgressBar = ({ currentValue, maxValue }) => (
    <progress
      value={currentValue}
      max={maxValue}
      style={{ width: "100px" }} 
    >
      {currentValue}%
    </progress>
  );

  

const LogoutBar = (data) => {
   const hasData = data && data.id;
  const navigate = useNavigate();


  // const handleBackToLogin = () => {
  //   navigate("/login");
  // };
 const navigateToMyHistory = () =>{
  navigate("/myhistory")
 }
 const handleBackToglobalLeaderboard =() =>{
  navigate("/globalleaderboard");
 }

 const handleToProfile =() =>{
  navigate("/free-profile");
 } 
  
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [userName, setUserName] = useState('');
  // const [occupation, setOccupation] = useState(localStorage.getItem("occupation_name"));
  const [city, setCity] = useState("");
  const [occupation, setOccupation] = useState("");
  const [country, setCountry] = useState("");
  const [district, setDistrict] = useState("")
  const [globalRank, setGlobalRank] = useState("");
  const [globalscore, setGlobalscore] = useState("");
  const [totalQuizzes, setTotalQuizzes] = useState("");
  const [totalMinutes, setTotalMinutes] = useState("");
  const [averageScorePercentage, setAverageScorePercentage] = useState("");
  const [registeredOn, setRegisteredOn] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [passwordChanged, setPasswordChanged] = useState("");
  const [subscriptionStartDate, setSubscriptionStartDate] = useState('');
  const [subscriptionEndDate, setSubscriptionEndDate] = useState('');
  const [remainingDays, setRemainingDays] = useState('');
  const [otherOccupation, setOtherOccupation] = useState("");
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [image, setImage] = useState(profileimg || '');
  const [crop, setCrop] = useState({unit: '%', width:30, aspect: 1});
   const[modalVisible, setModalVisible] = useState(false);
  const [src, setSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const { isAuthenticated, authToken, logout } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }
    const fetchQuizData = async () => {
      console.log("User ID:", userId);

      try {
       
        const response = await fetch(
          `https://quizifai.com:8010/dashboard`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${authToken}`,
            },
            body: JSON.stringify({
               user_id: userId
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("Data:", data);

        const auditDetails = data.data[0].audit_details;
        if (auditDetails) {
          // setCity(auditDetails.location_name || "");
          setCountry(auditDetails.country_name || "");
          setGlobalRank(auditDetails.global_score_rank || "");
          setGlobalscore(auditDetails.global_score || "");
          setRegisteredOn(auditDetails.created_date || "");
          setLastLogin(auditDetails.last_login_timestamp || "");
          setPasswordChanged(auditDetails.user_password_change_date || "");

          const userDetails = auditDetails;
          setUserName(userDetails.full_name);

          const UserProfileDetails = data.data[0].user_profile_details;
          setDistrict(UserProfileDetails.district_name);
          setOccupation(UserProfileDetails.occupation_name);
          setCity(UserProfileDetails.location_name);
          setOtherOccupation(UserProfileDetails.other_occupation_name);

          const subscriptionDetails = auditDetails.subscription_details && auditDetails.subscription_details[0];
          if (subscriptionDetails) {
            setSubscriptionStartDate(subscriptionDetails.start_date || "");
            setSubscriptionEndDate(subscriptionDetails.end_date || "");
            setRemainingDays(subscriptionDetails.remaining_days || "");
          } else {
            console.error("No subscription details found.");
          }
        } else {
          console.error("No user details found.");
        }

        const usermetrics = data.data[0].user_metrics;
        if (usermetrics) {
          setTotalQuizzes(usermetrics.countofquizes || 0);
          setTotalMinutes(usermetrics.total_minutes || 0);
          setAverageScorePercentage(usermetrics.average_total_percentage || 0);
          // setGlobalRank(usermetrics.global_score_rank || "");
        } else {
          console.error("No user metrics found.");
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, [userId,isAuthenticated,authToken]); 

  useEffect(() => {
    const handleWindowClose = () => {
      fetch("https://quizifai.com:8010/usr_logout/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: localStorage.getItem("user_id") }),
      })
        .then((response) => response.json())
        .then((data) => console.log("Logout successful:", data))
        .catch((error) => console.error("Error:", error));
    };

    // Add the event listener
    window.addEventListener("beforeunload", handleWindowClose);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
    };
  }, []);

  const handleBackToLogin = () => {
    // Retrieve the authentication token from AuthContext or localStorage
    const authToken = localStorage.getItem('authToken') || null;
  
    fetch('https://quizifai.com:8010/usr_logout/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`, // Include the authentication token
      },
      body: JSON.stringify({
        user_id: userId, // Ensure user.userId is available
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Logout response:', data);
        if (data.response === 'success') {
          localStorage.removeItem('authToken');
          localStorage.removeItem('user_id');
          localStorage.removeItem('user_role');
          localStorage.removeItem('password');
          logout(); // Clear the token from AuthContext
          navigate("/login");// Redirect to login page
        } else {
          console.error('Logout failed:', data.response_message);
          // Handle unsuccessful logout (optional)
        }
      })
      .catch(error => {
        console.error('Error logging out:', error);
        // Handle errors appropriately
      });
  };

   useEffect(() =>{
  const savedImage = localStorage.getItem('savedImage');
  if(savedImage){
    setImage(savedImage);
  }
},[]);

const handleImageClick = () => {
  if (inputRef.current) {
    inputRef.current.click();
  }
};

const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setSrc(reader.result);
      setModalVisible(true);
    };
    reader.readAsDataURL(file);
  }
};

const onImageLoaded = (image) => {
  imageRef.current = image;
  return false; // Prevent auto cropping
};

const handleCropComplete = (crop) => {
  if (src && crop.width && crop.height) {
    const image = document.createElement('img');
    image.src = src;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
      setCroppedImage(canvas.toDataURL());
    };
  }
};

const handleSubmit = () => {
  if (croppedImage) {
    setImage(croppedImage);
    localStorage.setItem('savedImage', croppedImage);
    setModalVisible(false);
  }
};

const handleDeleteImage = () => {
  localStorage.removeItem('savedImage');
  setImage('');
};


function handleReplaceImage(event) {
  event.stopPropagation(); // Prevent the click from triggering the parent div's click event
  handleImageClick(); // Open file dialog
}

// function handleDeleteImage(event) {
//   event.stopPropagation();
//   localStorage.removeItem('savedImage'); 
//   setImage(""); 
// }

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
};

  return (
    <div className={styles.logout}>
     <div style={{ marginTop: "-20px", display: "flex", alignItems: "center" , marginLeft:"20px",position:"relative",top:"25px"}}> 
       <div>
       <img
    src={LogoutIcon}
    onClick={handleBackToLogin}
    alt="Logout Icon"
    style={{ width: "20px",
             height: "20px",
             cursor:"pointer",
            marginLeft:"155px",
          cursor:"pointer" }}
  />
  <span style={{ marginRight: "5px",fontSize:"10px",position:"relative",left:"150px",top:"-5px" }}>Logout</span>
</div>

  </div>
        {/* profile image ------------------------ */}
        <div className="relative">
      <div className="rounded-full w-[100px] h-[100px]">
        <img
          className="w-[100px] h-[100px] rounded-full border-2 border-white ml-12"
          src={image || 'default-image.png'}
          alt="Uploaded"
        />
        <input
          type="file"
          ref={inputRef}
          onChange={handleImageChange}
          className="hidden"
        />
        <div className="absolute right-[74px] bottom-[15px] bg-[#C3EAF3] rounded-full w-fit h-[24px] px-[4px] mt-1 py-[1px] pt-1">
          <div className="relative flex items-center justify-center group">
            <img
              className="h-4 w-4 cursor-pointer"
              src={Camera}
              alt="Camera"
              onClick={handleImageClick}
            />
            <div className="absolute bottom-full left-0 bg-white text-black rounded-sm text-xs w-max h-max px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="cursor-pointer text-[10px]" onClick={() => setModalVisible(true)}>Replace Image</p>
              <p className="text-[10px] cursor-pointer" onClick={() => window.open(image, '_blank')}>View Image</p>
              <p className="text-[10px] cursor-pointer" onClick={handleDeleteImage}>Delete Image</p>
            </div>
          </div>
        </div>
      </div>

      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-[90%] max-w-lg relative">
            {src && (
              <div className="mb-4">
                <ReactCrop  crop={crop} onChange={c => setCrop(c)}>
                <img 
                  src={src}
                  alt="Selected"
                  className=" max-h-[300px] object-contain border border-gray-300 rounded"
                />
                </ReactCrop>
              </div>
            )}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
              onClick={() => fileInputRef.current.click()}
            >
              Upload Image
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={() => setModalVisible(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "15px", marginBottom: "5px", fontWeight: 600 ,color:"#002366"}}>
            {userName.charAt(0).toUpperCase()+userName.slice(1)}
          </p>
          <p
            style={{
              fontSize: "12px",
              margin: "0",
              fontWeight: 500,
              color:"#EF5130",
              marginTop:"-5px",
            }}
          >
                 {occupation === "Other" ? otherOccupation : occupation}

          </p>

          <div className="flex">
          <p
          style={{
            fontSize: "12px",
            margin: "0",
            fontWeight: 500,
            color: "#5E81F4",
            marginLeft: "75px",
          }}>
            User ID : {userId}
          </p>
          <div className="relative group inline-block">
          <img 
          src={questionmark}
          alt="question mark icon"
          style={{
            height: "15px",
            width: "15px",
            cursor:"pointer",
            marginLeft:"5px",
          }}
          />
         <span className="hidden group-hover:inline-block h-[70px] absolute -left-[150px] -top-[15px] -translate-x-1/2 bottom-full mb-1 w-[300px] px-2 py-1 bg-black text-white text-xs rounded">
          This is your unique identification number. It will help our support team to identify your account when you need assistance through QuizifAI's support channels.</span>
          </div>
          </div>
         

          <div className="text-[13px] ml-[30px] text-[#002366] mx-5">
          <p>{city}</p><br/>
          <div className="flex -mt-[20px] pl-2">
          <p className="pl-4">{district} ,</p>
          <p className="pl-1">{country}</p>
          </div>
          </div>
         
         <div className="h-[15px] w-[15px] rotate-[90deg] cursor-pointer ml-[195px]">
          <img className="-mt-1" onClick={handleToProfile} src={expand}/>
         </div>

         
          <div className="h-[5px] w-full bg-white mt-2"></div>

          <div style={{ marginTop: "0px" }}>
            
            <div className="flex justify-center">
              <img className="h-[60px] w-[60px]  mt-1" src={ranks}/>
              <div className=" flex flex-col">
              <div className=" flex items-center gap-[5px]">
              <p className="text-[25px] text-[#5E81F4]  text-start mt-1 font-bold">{globalRank}</p>
              <h1 className="relative font-Poppins text-[13px]">Global rank</h1>
              </div>
              <div className="flex items-center gap-[5px]">
              <p className="text-[20px] text-[#5E81F4]  text-start  font-bold">{globalscore}</p>
              <h1 className="relative font-Poppins text-[13px]">Global Score</h1>
              </div>
              <div className="text-xs text-[#002366] text-start -ml-12 mt-1">
              <p onClick={handleBackToglobalLeaderboard}>Click <span className="text-[#E97132] underline underline-offset-1 cursor-pointer font-bold">here</span> to view global score leaderboard</p>
              </div>
              </div>
            </div>
            <div className="h-[5px] w-full bg-white mt-[10px]"></div>

          <div className="flex">
            <span className="text-[20px] text-[#E97132] ml-[15px] mt-[5px] font-semibold">{totalQuizzes}</span>
            <h1 className="text-[12px] mt-[13px] ml-[5px] font-medium cursor-pointer" onClick={navigateToMyHistory}>Quizzes</h1>
          </div>
          <div className="flex -mt-[15px]">
            <span className="text-[20px] text-[#E97132] ml-[15px] mt-[10px] font-semibold text-nowrap">{totalMinutes}</span>
            <h1 className="mt-[20px] ml-[5px] text-[12px] text-nowrap font-normal">Total Minutes</h1>

          </div><div className="flex -mt-[15px]">
            <span className="text-[20px] text-[#E97132] ml-[15px] mt-[10px] font-semibold">{averageScorePercentage}%</span>
            <h1 className="mt-[20px] ml-[5px] text-[12px] font-normal">Average</h1>
          </div>
        
          <div className="h-[5px] w-full bg-white mt-[10px]"></div>       
          <div className="mt-[220px] ml-2">
            <h1 className="text-[13px] text-start text-[#002366] font-semibold">Registered On :<span className="pl-1 font-normal text-[12px]">{registeredOn}</span></h1>
            <h1 className="text-[13px] text-start text-[#002366] font-semibold">Last Login : <span className="font-normal text-[12px]">{lastLogin}</span></h1>
            <h1 className="text-[13px] text-start text-[#002366] font-semibold">Password Changed : <span className="font-normal text-[12px]">{passwordChanged}</span></h1>
          </div>               
            
          </div>
        </div>
      </div>
  );
};

export default LogoutBar;
