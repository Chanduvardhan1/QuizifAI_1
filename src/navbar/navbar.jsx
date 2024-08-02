import React, { useState,useEffect } from "react";
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

  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(
          `https://quizifai.com:8010/dashboard`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId }),
          }
        );
  
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
  
        const data = await response.json();
        console.log("Full API Response:", data);
  
        // Check the structure of data.data[0].audit_details
        const auditDetails = data.data[0]?.audit_details;
        console.log("Audit Details:", auditDetails);
  
        if (auditDetails) {
          setCountry(auditDetails.country_name || "");
          setGlobalRank(auditDetails.global_rank || "");
          setRegisteredOn(auditDetails.created_date || "");
          setLastLogin(auditDetails.last_login_timestamp || "");
          setPasswordChanged(auditDetails.user_password_change_date || "");
  
          const userDetails = auditDetails;
          setUserName(userDetails.full_name || "");
  
          const userProfileDetails = data.data[0]?.user_profile_details;
          console.log("User Profile Details:", userProfileDetails);
          
          setDistrict(userProfileDetails.district_name || "");
          setOccupation(userProfileDetails.occupation_name || "");
          setCity(userProfileDetails.location_name || "");
          setOtherOccupation(userProfileDetails.other_occupation_name || "");
  
          const subscriptionDetails = auditDetails.subscription_details?.[0];
          console.log("Subscription Details:", subscriptionDetails);
  
          setSubscriptionStartDate(subscriptionDetails?.start_date || "");
          setSubscriptionEndDate(subscriptionDetails?.end_date || "");
          setRemainingDays(subscriptionDetails?.remaining_days || "");
  
          const userMetrics = data.data[0]?.user_metrics;
          console.log("User Metrics:", userMetrics);
  
          setTotalQuizzes(userMetrics?.total_quizzes || 0);
          setTotalMinutes(userMetrics?.total_minutes || 0);
          setAverageScorePercentage(userMetrics?.average_total_percentage || 0);
          setGlobalRank(userMetrics?.global_rank || "");
        } else {
          console.error("No audit details found.");
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };
  
    fetchQuizData();
  }, [userId]);
  
  useEffect(() => {
    console.log("Registered On:", registeredOn);
    console.log("Last Login:", lastLogin);
    console.log("Password Changed:", passwordChanged);
  }, [registeredOn, lastLogin, passwordChanged]);


  const handleNavigation = (page) => {
    // Update the activePage state when a NavLink is clicked
    setActivePage(page);
  };

  const navigate = useNavigate();

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
          <img src={dashboardIcon} alt="Dashboard Icon" className={styles.pageIcon} />
          <span className={styles.pageLink}>Dashboard</span>
        </NavLink>
        <NavLink
          to="/quiz"
          className={`${styles.pageItem} ${activePage === '/quiz' ? styles.bold : ''}`}
          onClick={() => handleNavigation('/quiz')}
        >
          <img src={quizIcon} alt="Quiz Icon" className={styles.pageIcon} />
          <span className={styles.pageLink}>Quizzes</span>
        </NavLink>
        <NavLink
          to="/free-profile"
          className={`${styles.pageItem} ${activePage === '/free-profile' ? styles.bold : ''}`}
          onClick={() => handleNavigation('/free-profile')}
        >
          <img src={profileIcon} alt="Profile Icon" className={styles.pageIcon} />
          <span className={styles.pageLink}>Profile</span>
        </NavLink>
        <NavLink
          to="/configure"
          className={`${styles.pageItem} ${activePage === '/configure' ? styles.bold : ''}`}
          onClick={() => handleNavigation('/configure')}
        >
          <img src={Settings} alt="Settings Icon" className={styles.pageIcon} />
          <span className={styles.pageLink}>Settings</span>
        </NavLink>
        <NavLink
          to="/contact"
          className={`${styles.pageItem} ${activePage === '/contact' ? styles.bold : ''}`}
          onClick={() => handleNavigation('/contact')}
        >
          <img src={mail} alt="Settings Icon" className={styles.pageIcon} />
          <span className={styles.pageLink}>Contact US</span>
        </NavLink>
        {/* <img className="h-[122px] w-[60px] ml-[35px] mt-[50px]" src={rocket} alt="rocket"/> */}
      </div>
      </div>
      <div>
      <div className="h-[5px] w-full bg-white mt-[10px]"></div>

<div className="p-[10px] ml-2">
  <h1 className="font-semibold mt-[10px] text-[15px] text-[#002366]">Subscription Type : <span className=" text-black text-[12px] font-normal">Public</span> </h1>
  <h1 className=" mt-[5px] px-[1px] font-semibold text-[15px] text-[#002366]">Subscribed Date :
  <span className=" text-black text-[12px] font-normal">{subscriptionStartDate}</span> 
    </h1>
  <h1 className="font-semibold  text-[15px] text-[#002366]"> Days Remaining:
  </h1>
  <span className="text-black text-[12px] font-normal">
  {/* <span className="text-[25px] text-[#5E81F4] ml-[20px] mt-[10px] font-semibold"></span> */}
  {/* <span><img className=" w-[35px] " src={infinity} /></span> */}
  {remainingDays > 0 ?(
    <p className="text-[13px] text-red-500 ml-[20px] mt-[3px]">{remainingDays}</p> 
  ):(             
           
  <h1 className="mt-[2px] text-[13px] font-normal">Unlimited Days Remaining </h1>
  )}
  </span>
 


</div>
<div className="h-[5px] w-full bg-white mt-[10px]"></div>

<div className="mt-[15px] ml-2 p-[10px]">
      <h1 className="text-[13px] text-start">
        Registered On :
        <span className="text-[#5E81F4] pl-1">{registeredOn}</span>
      </h1>
      <h1 className="text-[13px] text-start">
        Last Login :
        <span className="text-[#5E81F4]">{lastLogin}</span>
      </h1>
      <h1 className="text-[13px] text-start">
        Password Changed :
        <span className="text-[#5E81F4]">{passwordChanged}</span>
      </h1>
    </div>
</div>
    </div>
  );
};

export default Navigation;
