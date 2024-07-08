// profile.js
import React from "react";
//import { useRouter } from 'next/router';
import Navigation from "../navbar/navbar.jsx"
import LogoutBar from "../logoutbar/logoutbar.jsx"

import styles from "./profile.module.css";
//import Head from "next/head";
//import img from "next/img";
import searchIcon from "../assets/Images/images/dashboard/searchBar.png";
import profileimg from "../assets/Images/images/profile/profileImage.png";
import rankingimg from "../assets/Images/images/profile/ranking.png";
import infoph from "../assets/Images/images/profile/infoPh.png";
import infoIcon from "../assets/Images/images/dashboard/infoIcon.png";
import topicIcon from "../assets/Images/images/dashboard/topicNew.png";
import timerIcon from "../assets/Images/images/dashboard/timerNew.png";
import difficultyIcon from "../assets/Images/images/dashboard/difficultyLevelNew.png";
import logoutArrowIcon from "../assets/Images/images/dashboard/logoutArrow1.png";
import notifyIcon from "../assets/Images/images/dashboard/notify.png";
import img1Icon from "../assets/Images/images/dashboard/img1New.png";
import img2Icon from "../assets/Images/images/dashboard/img2New.png";
import img3Icon from "../assets/Images/images/dashboard/img3New.png";
import img4Icon from "../assets/Images/images/dashboard/newImg4.png";
import img5Icon from "../assets/Images/images/dashboard/img5New.png";
import timeSpentIcon from "../assets/Images/images/dashboard/timeSpent.png";
import todayTopicIcon from "../assets/Images/images/dashboard/todayTopic.png";
import subTopicIcon from "../assets/Images/images/dashboard/subTopic.png";
import ProgressBar from "@ramonak/react-progress-bar";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";



const Profile = () => {
  const getFormattedDate = () => {
    const currentDate = new Date();
    const options = {
      year: "numeric", 
      month: "short", 
      day: "numeric", 
      weekday: "long", 
    };
    return currentDate.toLocaleDateString("en-IN", options);
  };

  const currentValue1 = 50; 
  const maxValue1 = 100; 
  const currentValue2 = 30; 
  const maxValue2 = 80; 

  

 // const BasicProgressBar = ({ currentValue, maxValue }) => (
   // <progress value={currentValue} max={maxValue}>{currentValue}%</progress>
  //);

  const BasicProgressBar = ({ currentValue, maxValue }) => (
    <progress
      value={currentValue}
      max={maxValue}
      style={{ width: "100px" }} 
    >
      {currentValue}%
    </progress>
  );
  
  return (
    <div className={styles.container}>
      {/* <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head> */}
     <Navigation/>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          {/* Header content */}
          <p>Welcome Username</p>
          <div className={styles.headerRight}>
            <div>{getFormattedDate()}</div>
            <div className={styles.searchIconContainer}>
              <img
                src={searchIcon}
                alt="Search Icon"
                className={styles.searchIcon}
              />
            </div>
          </div>
        </div>
        <div className={styles.contentContainer} style={{marginLeft:"80px"}}>
    <div className={styles.imgAndTextContainer}>
    <div className={styles.profileimgContainer}>
  <img
    src={profileimg}
    alt="img"
    className={styles.profileimg} style={{width:"113px", height:"110px"}}
  />
</div>

  <div className={styles.contentContainer}>
  <div className={styles.textContainer} style={{marginLeft:"150px", marginTop:"-70px"}}>
        <div className={styles.textLine1}>Profession </div>
  <div className={styles.textLine2}>(Plan of the Subscription)  </div>
  <div className={styles.textLine3}>no. days left in Subscription/ free</div>
      </div>
    </div>
  </div>
  
  <div className={styles.additionalTextContainer1}>
  <div className={styles.contentContainer1} style={{marginTop:"20px" ,marginLeft:"40px"}} >
    <div className={styles.textAndimgContainer1}>
      <div className={styles.textContainer1}>
        <p className={styles.textLines1}>You Ranked</p>
    
      </div>
      <div className={styles.imgContainer2}>
  <img
    src={rankingimg} 
    alt="img"
    className={styles.Rankingimg} style={{width:"60px", height:"40px"}}
  />
</div>
    </div>
    <div className={styles.textAndimgContainer2}>
      <div className={styles.textContainer1}>
        <p className={styles.textLines3} style={{marginTop:"-20px"}}>002</p>
        <p className={styles.textLines4} style={{marginTop:"-20px"}}>in last 30 days</p>
      </div>
      
    </div>
    <div className={styles.imgContainer1}>
        <img
          src={infoph}
          alt="img" 
          className={styles.infoimg} style={{width:"10px", height:"10px"}}
        />
      </div>
    </div>
   </div>
  </div>
  <div className={styles.inputContainer}>
  <div className={styles.inputRow}>
    <div className={styles.inputGroup}>
      <label htmlFor="firstName">First Name</label>
      <input type="text" id="firstName" placeholder="First Name" />
    </div>
    <div className={styles.inputGroup}>
      <label htmlFor="lastName">Last Name</label>
      <input type="text" id="lastName" placeholder="Last Name" />
    </div>
  </div>
  <div className={styles.inputRow}>
    <div className={styles.inputGroup}>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" placeholder="mail@gmail.com" />
    </div>
    <div className={styles.inputGroup}>
      <label htmlFor="mobileNumber">Mobile Number</label>
      <input type="tel" id="mobileNumber" placeholder="9874563210" />
    </div>
  </div>
  <div className={styles.inputGroup}>
    <label htmlFor="dob">Date of Birth</label>
    <input type="date" id="dob" placeholder="Select your date of birth" />
  </div>
  <div className={styles.inputRow}>
    <div className={styles.inputGroup}>
      <label htmlFor="postalCode">Postal Code</label>
      <input type="text" id="postalCode" placeholder="Postal Code" />
    </div>
    <div className={styles.inputGroup}>
      <label htmlFor="city">City</label>
      <input type="text" id="city" placeholder="City Name" />
    </div>
  </div>
  <div className={styles.inputRow}>
    <div className={styles.inputGroup}>
      <label htmlFor="state">State</label>
      <input type="text" id="state" placeholder="State" />
    </div>
    <div className={styles.inputGroup}>
      <label htmlFor="country">Country</label>
      <input type="text" id="country" placeholder="Country" />
      <div className={styles.buttonContainer}>
    <button className={styles.customButton}>Save</button>
  </div>
    </div>
  </div>
</div>
        
        <div className={styles.horizontalBoxes}>
    <div className={styles.box}>
    <div className={styles.contentWrapper}>
          <div className={styles.resultWrapper}>
            <div className={styles.latestResult}>
              Latest Result
              <div className={styles.resultInfo}>
                <div className={styles.infoLine}>
                  <span
                    className={styles.info}
                    style={{ fontSize: "10px", color: "grey", marginTop:"20px" , marginLeft:"10px" }}
                  >
                    Date -<span className={styles.title}>Title</span> - Topic
                  </span>
                  <span
                    style={{
                      marginLeft: "10px",
                      
                      width: "100px",
                      height: "2px",
                      fontSize:"10px",
                    
                    }}
                  >
                    <Progress percent={25} />
                  </span>
                </div>
                <hr className={styles.divider} />
                <div className={styles.infoLine}>
                  <span
                    className={styles.info}
                    style={{ fontSize: "10px", color: "grey", marginTop:"5px" , marginLeft:"10px"}}
                  >
                    Date -<span className={styles.title}>Title</span> - Topic
                  </span>
                  <span
                    style={{
                      marginLeft: "10px",
                      marginTop:"-10px", 
                      width: "100px", 
                      height: "2px",
                      fontSize:"10px"
                
                    }}
                  >
                    <Progress percent={44} />
                  </span> 
                </div>
                <hr className={styles.divider} />
                <div className={styles.infoLine} style={{ fontSize: "10px" }}>
                  <span
                    className={styles.info}
                    style={{ fontSize: "10px", color: "grey", marginTop:"5px" , marginLeft:"10px" }}
                  >
                    Date -<span className={styles.title}>Title</span> - Topic
                  </span>
                  <span
                    style={{
                      marginLeft: "10px",
                      marginTop:"-10px",
                      width: "100px",
                      height: "2px",
                  
                      fontSize:"10px"
                    }}
                  >
                    <Progress percent={40} />
                  </span>
                </div>
              </div>
            </div>
          </div>
          </div>
    </div>
    <div className={styles.box}>
    <div className={styles.resultWrapper}>
            <div className={styles.timeSpent}>
              Time Spent on Quiz
              <span className={styles.moreButton}>
                Last week 
              </span>
              <div className={styles.progressBars}>
                <div className={styles.progressBar}>
                  <div className={styles.day}>Mon</div>
                  <div className={styles.progress}>
                    <div
                      className={styles.progressFill}
                      style={{ height: "20%" }}
                    ></div>
                  </div>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.day}>Tue</div>
                  <div className={styles.progress}>
                    <div
                      className={styles.progressFill}
                      style={{ height: "30%" }}
                    ></div>
                  </div>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.day}>Wed</div>
                  <div className={styles.progress}>
                    <div
                      className={styles.progressFill}
                      style={{ height: "50%" }}
                    ></div>
                  </div>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.day}>Thu</div>
                  <div className={styles.progress}>
                    <div
                      className={styles.progressFill}
                      style={{ height: "70%" }}
                    ></div>
                  </div>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.day}>Fri</div>
                  <div className={styles.progress}>
                    <div
                      className={styles.progressFill}
                      style={{ height: "40%" }}
                    ></div>
                  </div>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.day}>Sat</div>
                  <div className={styles.progress}>
                    <div
                      className={styles.progressFill}
                      style={{ height: "60%" }}
                    ></div>
                  </div>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.day}>Sun</div>
                  <div className={styles.progress}>
                    <div
                      className={styles.progressFill}
                      style={{ height: "80%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
    <div className={styles.box}>
    <div className={styles.resultWrapper}>
            <div className={styles.rewards}>
              Rewards
              
              </div>
              <div className={styles.sentencesWrapper}>
      {/* Add five <div> tags for the sentences */}
      <div className={styles.sentence}>1. Top Ranked in last week</div>
      <div className={styles.sentence}>2. Won four Vouchers</div>
      <div className={styles.sentence}>3. Won four Vouchers</div>
      <div className={styles.sentence}>4. Won four Vouchers</div>
      <div className={styles.sentence}>5. Won four Vouchers</div>
    </div>
    </div>
    </div>
    </div>



        <div className={styles.contentWrapper1}>
          <div className={styles.latestQuizHeader}>
            <p>Latest Attended Quiz</p>

            
          </div>
          <div className={styles.infoCards}>
            {/* Info cards content */}
            
            
            
            <div className={styles.card}>
              <span className={styles.title}>Python Beginners</span>
              <div className={styles.infoBox}>
                <span className={styles.description}>
                  Description of Topic Description of Topic Description of Topic
                  Description of Topic
                </span>
                <div className={styles.additionalInfo}>
                  <div className={styles.infoIcon}>
                  <img
                      src={infoIcon}
                      alt="Separate Icon"
                      width={10}
                      height={10}
                      style={{ marginLeft: "40px" }}
                    
                    />
                  </div>
                  <span className={styles.infoItem}>
                  <img
                      src={topicIcon}
                      alt="Topic Icon"
                      width={10}
                      height={10}
                    />{" "}
                    Topic
                  </span>
                  <span className={styles.infoItem1}>
                  <img
                      src={timerIcon}
                      alt="Time Icon"
                      width={10}
                      height={10}
                    />{" "}
                    180 mins
                  </span>
                  <span className={styles.infoItem2}>
                    <img
                      src={difficultyIcon}
                      alt="Easy Icon"
                      width={10}
                      height={10}
                    />{" "}
                    Easy
                  </span>
                  <div className={styles.iconContainer}>
                  <img src={img1Icon} alt="Icon 1" width={8} height={8} />
                    <img
                      src={img2Icon}
                      alt="Icon 2"
                      width={6}
                      height={6}
                      style={{ marginTop: "1px" }}
                    />
                    <img src={img3Icon} alt="Icon 3" width={8} height={8} />
                    <img src={img4Icon} alt="Icon 4" width={11} height={7} />
                    <img src={img5Icon} alt="Icon 5" width={7} height={8} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.card}>
              <span className={styles.title}>Python Beginners</span>
              <div className={styles.infoBox}>
                <span className={styles.description}>
                  Description of Topic Description of Topic Description of Topic
                  Description of Topic
                </span>
                <div className={styles.additionalInfo}>
                  <div className={styles.infoIcon}>
                  <img
                      src={infoIcon}
                      alt="Separate Icon"
                      width={10}
                      height={10}
                      style={{ marginLeft: "40px" }}
                    
                    />
                  </div>
                  <span className={styles.infoItem}>
                  <img
                      src={topicIcon}
                      alt="Topic Icon"
                      width={10}
                      height={10}
                    />{" "}
                    Topic
                  </span>
                  <span className={styles.infoItem1}>
                  <img
                      src={timerIcon}
                      alt="Time Icon"
                      width={10}
                      height={10}
                    />{" "}
                    180 mins
                  </span>
                  <span className={styles.infoItem2}>
                    <img
                      src={difficultyIcon}
                      alt="Easy Icon"
                      width={10}
                      height={10}
                    />{" "}
                    Easy
                  </span>
                  <div className={styles.iconContainer}>
                  <img src={img1Icon} alt="Icon 1" width={8} height={8} />
                    <img
                      src={img2Icon}
                      alt="Icon 2"
                      width={6}
                      height={6}
                      style={{ marginTop: "1px" }}
                    />
                    <img src={img3Icon} alt="Icon 3" width={8} height={8} />
                    <img src={img4Icon} alt="Icon 4" width={11} height={7} />
                    <img src={img5Icon} alt="Icon 5" width={7} height={8} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.card}>
              <span className={styles.title}>Python Beginners</span>
              <div className={styles.infoBox}>
                <span className={styles.description}>
                  Description of Topic Description of Topic Description of Topic
                  Description of Topic
                </span>
                <div className={styles.additionalInfo}>
                  <div className={styles.infoIcon}>
                  <img
                      src={infoIcon}
                      alt="Separate Icon"
                      width={10}
                      height={10}
                      style={{ marginLeft: "40px" }}
                    
                    />
                  </div>
                  <span className={styles.infoItem}>
                  <img
                      src={topicIcon}
                      alt="Topic Icon"
                      width={10}
                      height={10}
                    />{" "}
                    Topic
                  </span>
                  <span className={styles.infoItem1}>
                  <img
                      src={timerIcon}
                      alt="Time Icon"
                      width={10}
                      height={10}
                    />{" "}
                    180 mins
                  </span>
                  <span className={styles.infoItem2}>
                    <img
                      src={difficultyIcon}
                      alt="Easy Icon"
                      width={10}
                      height={10}
                    />{" "}
                    Easy
                  </span>
                  <div className={styles.iconContainer}>
                  <img src={img1Icon} alt="Icon 1" width={8} height={8} />
                    <img
                      src={img2Icon}
                      alt="Icon 2"
                      width={6}
                      height={6}
                      style={{ marginTop: "1px" }}
                    />
                    <img src={img3Icon} alt="Icon 3" width={8} height={8} />
                    <img src={img4Icon} alt="Icon 4" width={11} height={7} />
                    <img src={img5Icon} alt="Icon 5" width={7} height={8} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.topScoredHeader}>
            <p>Top Scored Quiz</p>
          </div>
          <div className={styles.infoCards}>
            {/* Info cards content */}
            
            <div className={styles.card}>
              <span className={styles.title}>Python Beginners</span>
              <div className={styles.infoBox}>
                <span className={styles.description}>
                  Description of Topic Description of Topic Description of Topic
                  Description of Topic
                </span>
                <div className={styles.additionalInfo}>
                  <div className={styles.infoIcon}>
                  <img
                      src={infoIcon}
                      alt="Separate Icon"
                      width={10}
                      height={10}
                      style={{ marginLeft: "40px" }}
                    
                    />
                  </div>
                  <span className={styles.infoItem}>
                  <img
                      src={topicIcon}
                      alt="Topic Icon"
                      width={10}
                      height={10}
                    />{" "}
                    Topic
                  </span>
                  <span className={styles.infoItem1}>
                  <img
                      src={timerIcon}
                      alt="Time Icon"
                      width={10}
                      height={10}
                    />{" "}
                    180 mins
                  </span>
                  <span className={styles.infoItem2}>
                    <img
                      src={difficultyIcon}
                      alt="Easy Icon"
                      width={10}
                      height={10}
                    />{" "}
                    Easy
                  </span>
                  <div className={styles.iconContainer}>
                  <img src={img1Icon} alt="Icon 1" width={8} height={8} />
                    <img
                      src={img2Icon}
                      alt="Icon 2"
                      width={6}
                      height={6}
                      style={{ marginTop: "1px" }}
                    />
                    <img src={img3Icon} alt="Icon 3" width={8} height={8} />
                    <img src={img4Icon} alt="Icon 4" width={11} height={7} />
                    <img src={img5Icon} alt="Icon 5" width={7} height={8} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.card}>
              <span className={styles.title}>Python Beginners</span>
              <div className={styles.infoBox}>
                <span className={styles.description}>
                  Description of Topic Description of Topic Description of Topic
                  Description of Topic
                </span>
                <div className={styles.additionalInfo}>
                  <div className={styles.infoIcon}>
                  <img
                      src={infoIcon}
                      alt="Separate Icon"
                      width={10}
                      height={10}
                      style={{ marginLeft: "40px" }}
                    
                    />
                  </div>
                  <span className={styles.infoItem}>
                  <img
                      src={topicIcon}
                      alt="Topic Icon"
                      width={10}
                      height={10}
                    />{" "}
                    Topic
                  </span>
                  <span className={styles.infoItem1}>
                  <img
                      src={timerIcon}
                      alt="Time Icon"
                      width={10}
                      height={10}
                    />{" "}
                    180 mins
                  </span>
                  <span className={styles.infoItem2}>
                    <img
                      src={difficultyIcon}
                      alt="Easy Icon"
                      width={10}
                      height={10}
                    />{" "}
                    Easy
                  </span>
                  <div className={styles.iconContainer}>
                  <img src={img1Icon} alt="Icon 1" width={8} height={8} />
                    <img
                      src={img2Icon}
                      alt="Icon 2"
                      width={6}
                      height={6}
                      style={{ marginTop: "1px" }}
                    />
                    <img src={img3Icon} alt="Icon 3" width={8} height={8} />
                    <img src={img4Icon} alt="Icon 4" width={11} height={7} />
                    <img src={img5Icon} alt="Icon 5" width={7} height={8} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.card}>
              <span className={styles.title}>Python Beginners</span>
              <div className={styles.infoBox}>
                <span className={styles.description}>
                  Description of Topic Description of Topic Description of Topic
                  Description of Topic
                </span>
                <div className={styles.additionalInfo}>
                  <div className={styles.infoIcon}>
                  <img
                      src={infoIcon}
                      alt="Separate Icon"
                      width={10}
                      height={10}
                      style={{ marginLeft: "40px" }}
                    
                    />
                  </div>
                  <span className={styles.infoItem}>
                  <img
                      src={topicIcon}
                      alt="Topic Icon"
                      width={10}
                      height={10}
                    />{" "}
                    Topic
                  </span>
                  <span className={styles.infoItem1}>
                  <img
                      src={timerIcon}
                      alt="Time Icon"
                      width={10}
                      height={10}
                    />{" "}
                    180 mins
                  </span>
                  <span className={styles.infoItem2}>
                    <img
                      src={difficultyIcon}
                      alt="Easy Icon"
                      width={10}
                      height={10}
                    />{" "}
                    Easy
                  </span>
                  <div className={styles.iconContainer}>
                  <img src={img1Icon} alt="Icon 1" width={8} height={8} />
                    <img
                      src={img2Icon}
                      alt="Icon 2"
                      width={6}
                      height={6}
                      style={{ marginTop: "1px" }}
                    />
                    <img src={img3Icon} alt="Icon 3" width={8} height={8} />
                    <img src={img4Icon} alt="Icon 4" width={11} height={7} />
                    <img src={img5Icon} alt="Icon 5" width={7} height={8} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
<div className={styles.logout}>
        <div style={{ marginTop: "60px", display: "flex", alignItems: "center" , marginLeft:"20px"}}>
  <span style={{ marginRight: "10px" }}>Logout</span>
  <img
    src={logoutArrowIcon}
    alt="Logout Icon"
    style={{ width: "30px", height: "20px", marginLeft:"130px" }}
  />
  </div>
  <div style={{ textAlign: "left", marginTop: "30px", fontFamily: "Poppins", fontSize: "15px", fontWeight: 700, lineHeight: "23px", letterSpacing: "0em" , color:"#214082", marginLeft:"20px"}}>
    You’ve completed 10 <br></br>Quiz’s this week of <br></br>average score of 85%
  </div>
  <div style={{ textAlign: "left", marginLeft: "20px" }}>
    <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
      <span style={{ fontSize: "15px", color: "#000000", fontWeight: 500, marginRight: "10px" }}>Notification</span>
      <img
        src={notifyIcon}
        alt="Notify Icon"
        className={styles.notifyIcon}
        style={{ marginLeft: "120px" }}
      />
    </div>
    <div style={{ marginTop: "20px", }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "5px",
        }}
      >
        <div
          style={{
            backgroundColor: "#FFE8EE",
            width: "30px",
            height: "30px",
            borderRadius: "5px",
            marginRight: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={todayTopicIcon}
            alt="Scored Icon"
            style={{ width: "15px", height: "15px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "15px",
              fontWeight: 500,
              marginRight: "15px",
            }}
          >
            Today - Topic
          </span>
          <span
            style={{
              fontSize: "10px",
              color: "#9696BB",
              marginTop: "3px",
            }}
          >
            23 Jan 2024, Tuesday
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            backgroundColor: "#E4EBFF",
            width: "30px",
            height: "30px",
            borderRadius: "5px",
            marginRight: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={subTopicIcon}
            alt="Time Spent Icon"
            style={{ width: "17px", height: "13px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "15px", fontWeight: 500 }}>
            Topic - Sub Topic Title
          </span>
          <span
            style={{
              fontSize: "10px",
              color: "#9696BB",
              marginTop: "3px",
              marginRight: "30px",
            }}
          >
            24 Jan 2024, Wednesday
          </span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            backgroundColor: "#E4EBFF",
            width: "30px",
            height: "30px",
            borderRadius: "5px",
            marginRight: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={subTopicIcon}
            alt="Time Spent Icon"
            style={{ width: "17px", height: "13px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "15px", fontWeight: 500 }}>
            Topic - Sub Topic Title
          </span>
          <span
            style={{
              fontSize: "10px",
              color: "#9696BB",
              marginTop: "3px",
              marginRight: "30px",
            }}
          >
            24 Jan 2024, Wednesday
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
  );
};

export default Profile;
