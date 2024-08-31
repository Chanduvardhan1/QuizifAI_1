import React, { useState,useEffect,useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import styles from "./dashboard.module.css";
import quizifailogo from "../assets/Images/images/home/Quizifai3.png";
import dashboardIcon from "../assets/Images/images/dashboard/dashboard1.png";
import quizIcon from "../assets/Images/images/dashboard/quiz1.png";
import profileIcon from "../assets/Images/images/dashboard/profile1.png";
import Settings from "../assets/Images/images/dashboard/Settings1.png";
import rocket from "../assets/Images/images/dashboard/rocket.png";
import infinity from "../assets/Images/images/dashboard/infinity.png";
import mail from "../assets/Images/images/dashboard/mail.png";
import history from "../assets/Images/images/dashboard/history.png";
import { AuthContext } from "../Authcontext/AuthContext.jsx"


const Navigation = () => {
  // Initialize activePage state to the current pathname
  const [activePage, setActivePage] = useState(window.location.pathname);
  const [registeredOn, setRegisteredOn] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [passwordChanged, setPasswordChanged] = useState("");
  const [country, setCountry] = useState("");
  const [globalRank, setGlobalRank] = useState("");
  const [userName, setUserName] = useState("");
  const [district, setDistrict] = useState("");
  const [occupation, setOccupation] = useState("");
  const [city, setCity] = useState("");
  const [otherOccupation, setOtherOccupation] = useState("");
  const [subscriptionStartDate, setSubscriptionStartDate] = useState("");
  const [subscriptionEndDate, setSubscriptionEndDate] = useState("");
  const [remainingDays, setRemainingDays] = useState("");
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [averageScorePercentage, setAverageScorePercentage] = useState(0);
  const { isAuthenticated, authToken, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
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
          // setGlobalRank(auditDetails.global_score_rank || "");
          // setGlobalscore(auditDetails.global_score || "");
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
  }, [userId,authToken, isAuthenticated, navigate]); 

  useEffect(() => {
    console.log("Registered On:", registeredOn);
    console.log("Last Login:", lastLogin);
    console.log("Password Changed:", passwordChanged);
  }, [registeredOn, lastLogin, passwordChanged]);


  const handleNavigation = (page) => {
    // Update the activePage state when a NavLink is clicked
    setActivePage(page);
  };


  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };
  
  return (
    <div  className={styles.navigation}>
    <div className={styles.navbar}>
      <img
        src={quizifailogo}
        alt="Logo"
        width={180}
        height={160}
        className="cursor-pointer"
        onClick={handleBackToDashboard}
      />
      <div className={styles.pageList}>
        <NavLink
          to="/dashboard"
          className={`${styles.pageItem} ${activePage === '/dashboard' ? styles.bold : ''}`}
          onClick={() => handleNavigation('/dashboard')}
        >
          <img src={dashboardIcon} alt="Dashboard Icon" 
            className={`${styles.pageIcon} ${activePage === '/dashboard' ? styles.activeIcon : ''}`}/>
          <span className={styles.pageLink}>Dashboard</span>
        </NavLink>
        <NavLink
          to="/quiz"
          className={`${styles.pageItem} ${activePage === '/quiz' ? styles.bold : ''}`}
          onClick={() => handleNavigation('/quiz')}
        >
          <img src={quizIcon} alt="Quiz Icon" 
            className={`${styles.pageIcon} ${activePage === '/quiz' ? styles.activeIcon : ''}`} />
          <span className={styles.pageLink}>Quizzes</span>
        </NavLink>
        <NavLink
          to="/free-profile"
          className={`${styles.pageItem} ${activePage === '/free-profile' ? styles.bold : ''}`}
          onClick={() => handleNavigation('/free-profile')}
        >
          <img src={profileIcon} alt="Profile Icon" 
            className={`${styles.pageIcon} ${activePage === '/free-profile' ? styles.activeIcon : ''}`} />
          <span className={styles.pageLink}>Profile</span>
        </NavLink>
        <NavLink
          to="/configure"
          className={`${styles.pageItem} ${activePage === '/configure' ? styles.bold : ''}`}
          onClick={() => handleNavigation('/configure')}
        >
          <img src={Settings} alt="Settings Icon" 
            className={`${styles.pageIcon} ${activePage === '/configure' ? styles.activeIcon : ''}`} />
          <span className={styles.pageLink}>Settings</span>
        </NavLink>
        <NavLink
          to="/contact"
          className={`${styles.pageItem} ${activePage === '/contact' ? styles.bold : ''}`}
          onClick={() => handleNavigation('/contact')}
        >
          <img src={mail} alt="Settings Icon" 
            className={`${styles.pageIcon} ${activePage === '/contact' ? styles.activeIcon : ''}`} />
          <span className={styles.pageLink}>Contact US</span>
        </NavLink>
        <NavLink
          to="/myhistory"
          className={`${styles.pageItem} ${activePage === '/myhistory' ? styles.bold : ''}`}
          onClick={() => handleNavigation('/myhistory')}
        >
         <img
        src={history}
        alt="Settings Icon"
        className={`${styles.pageIcon} ${activePage === '/myhistory' ? styles.activeIcon : ''}`}
      />
          <span className={styles.pageLink}>My History</span>
        </NavLink>
        {/* <img className="h-[122px] w-[60px] ml-[35px] mt-[50px]" src={rocket} alt="rocket"/> */}
      </div>
      </div>
      <div>
      <div className="h-[5px] w-full bg-white mt-[10px]"></div>

<div className="p-[10px] ml-2 font-bold">
  <h1 className="text-[14px] text-[#002366]">Subscription</h1>
  <h1 className="font-semibold mt-[10px] text-[13px] text-[#002366]">Type : <span className=" text-black text-[12px] font-normal">Public</span> </h1>
  <h1 className="mt-[3px] px-[1px] font-semibold text-[13px] text-[#002366]">Date :
  <span className=" text-black text-[12px] font-normal">{subscriptionStartDate}</span> 
    </h1>
    <div className="flex">
    <h1 className="mt-[3px] px-[1px] font-semibold text-[13px] text-[#002366]">Days :</h1>
  <span className="text-black text-[12px] font-normal">
  {remainingDays > 0 ?(
    <p className="text-[13px] text-red-500 ml-[20px] mt-[3px]">{remainingDays}</p> 
  ):(                       
  <h1 className="mt-[2px] text-[12px] font-normal pl-[2px] pt-[2px]">Unlimited</h1>
  )}
  </span>
    </div>
 


</div>
<div className=" flex items-center justify-center z-50 ">
              <img src={rocket} alt="" className=" w-[49px] h-[112px] z-50"/>
            </div>
          <div className=" flex flex-col justify-center items-center p-[10px] bg-white rounded-[25px] w-[90%] ml-[10px] pt-[80px] relative top-[-75px]">
         
            <div>
              <p className=" text-[#9696BB] text-[13px]">Upgrade to <span className=" text-black font-bold">Pro</span>  for more resources</p>
            </div>
            <button className=" bg-[#5E81F4] p-[5px] px-[20px] rounded-[10px] text-white text-[13px] mt-2">Upgrade</button>
          </div>
</div>
    </div>
  );
};

export default Navigation;
