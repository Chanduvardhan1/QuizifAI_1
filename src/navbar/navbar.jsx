import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import styles from "./dashboard.module.css";
import quizifailogo from "../assets/Images/images/home/Quizifai3.png";
import dashboardIcon from "../assets/Images/images/dashboard/dashboard1.png";
import quizIcon from "../assets/Images/images/dashboard/quiz1.png";
import profileIcon from "../assets/Images/images/dashboard/profile1.png";
import Settings from "../assets/Images/images/dashboard/Settings1.png";
import rocket from "../assets/Images/images/dashboard/rocket.png";

const Navigation = () => {
  // Initialize activePage state to the current pathname
  const [activePage, setActivePage] = useState(window.location.pathname);

  const handleNavigation = (page) => {
    // Update the activePage state when a NavLink is clicked
    setActivePage(page);
  };

  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };
  
  return (
    <div className={styles.navigation}>
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
        {/* <img className="h-[122px] w-[60px] ml-[35px] mt-[50px]" src={rocket} alt="rocket"/> */}
      </div>
    </div>
  );
};

export default Navigation;
