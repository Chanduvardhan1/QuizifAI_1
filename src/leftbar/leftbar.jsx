// LeftNavigationBar.js

import React from "react";
import { useNavigate } from "react-router-dom";

//import img from "next/image";
// import styles from './quizresults1.module.css'
// import quizifaiDashboardLogo from '../assets/Images/images/dashboard/quizifaiDashboard.png';
// import dashboardIcon from '../assets/Images/images/dashboard/dashboard.png';
// import quizIcon from '../assets/Images/images/dashboard/quiz.png';
// import historyIcon from '../assets/Images/images/dashboard/history.png';
// import scheduleIcon from '../assets/Images/images/dashboard/schedule.png';
// import notificationIcon from '../assets/Images/images/dashboard/notification.png';
// import profileIcon from '../assets/Images/images/questions/profile1.png';



// import Image from "next/image";
import styles from './quizresults1.module.css';
import quizifaiDashboardLogo from "../assets/Images/images/home/Quizifai3.png";
import dashboardIcon from '../../src/assets/Images/images/dashboard/dashboard.png';
import quizIcon from '../../src/assets/Images/images/dashboard/quiz.png';
import historyIcon from '../../src/assets/Images/images/dashboard/history.png';
import scheduleIcon from '../../src/assets/Images/images/dashboard/schedule.png';
import notificationIcon from '../../src/assets/Images/images/dashboard/notification.png';
import profileIcon from '../../src/assets/Images/images/questions/profile1.png';
import configure from '../../src/assets/Images/images/dashboard/configure.png'

const leftBar = () => {

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.leftBar}>
    {/* Navigation content */}
    <img
      src={quizifaiDashboardLogo}
      alt="Logo"
      width="34"
      height="35"
      className={styles.dashboardLogo}
      style={{ marginTop: "60px", marginLeft: "30px" }}
    />
    <div className={styles.pageList}>
      <div className={styles.pageItem} onClick={() => handleNavigation('/dashboard')}>
        <img
          src={dashboardIcon}
          alt="Icon 1"
          className={styles.pageIcon}
          width="20"
          height="20"
        />
      </div>
      {/* <div className={styles.pageItem} onClick={() => handleNavigation('/quiz')}>
        <img
          src={quizIcon}
          alt="Icon 2"
          className={styles.pageIcon}
          width="20"
          height="20"
        />
      </div> */}
      <div className={styles.pageItem} onClick={() => handleNavigation('/history')}>
        <img
          src={quizIcon}
          alt="Icon 1"
          className={styles.pageIcon}
          width="20"
          height="20"
        />
      </div>
      {/* <div className={styles.pageItem} onClick={() => handleNavigation('/schedule')}>
        <img
          src={scheduleIcon}
          alt="Icon 2"
          className={styles.pageIcon}
          width="20"
          height="20"
        />
      </div> */}
     
      <div className={styles.pageItem} onClick={() => handleNavigation('/free-profile')}>
        <img
          src={profileIcon}
          alt="Icon 2"
          className={styles.pageIcon}
          width="20"
          height="20"
        />
      </div>
      <div className={styles.pageItem} onClick={() => handleNavigation('/notification')}>
        <img
          src={configure}
          alt="Icon 1"
          className={styles.pageIcon}
          width="20"
          height="20"
        />
      </div>
    </div>
  </div>
  );
};


export default leftBar;



