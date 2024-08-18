import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navigation from "../navbar/navbar.jsx"
import LogoutBar from "../logoutbar/logoutbar.jsx";
import { useState } from 'react';
import searchIcon from "../assets/Images/images/dashboard/Search.png";
import cancel from "../assets/Images/images/dashboard/cancel.png";



const configure = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [userName, setUserName] = useState('');
  const [weeklyQuizCount, setWeeklyQuizCount] = useState(null);
  const [averageScorePercentage, setAverageScorePercentage] = useState(null);

  const handleInputChange = (event) => {
      setSearchQuery(event.target.value);
  };

  const navigate = useNavigate();
  const handleBanckToDashbaord = () =>{
    navigate('/dashboard');
  }
  const userRole = localStorage.getItem('user_role');
  const allowedRoles = ['Quiz Master']; // Roles allowed to access the pages

  const handleRestrictedClick = (navigateTo) => {
    if (allowedRoles.includes(userRole)) {
      navigate(navigateTo);
    } else {
      alert('You do not have permission to access this page.');
    }
  };
  const handleCategoriesClick = () => handleRestrictedClick('/category');
  const handleCoursesClick = () => handleRestrictedClick('/Course');
  const handleSpecialisationsClick = () => handleRestrictedClick('/specialisations');
  const handleClassesClick = () => handleRestrictedClick('/classes');
  const handleSubjectsClick = () => handleRestrictedClick('/Subjects');
  
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

  if (!authToken) {
    console.error('No authentication token found');
    return;
  }
        const response = await fetch(
          `https://quizifai.com:8010/dashboard`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({
              user_id: userId,         
            }),
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch header data');
        }
        const result = await response.json();
        console.log('configure data - ', result);
        
        const data = result.data[0];
        setWeeklyQuizCount(data.weekly_quiz_count || 0);
        setAverageScorePercentage(parseFloat(data.average_score_percentage) || 0);
  
       const userDetails = data.audit_details;
       setUserName(userDetails.full_name);
  
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };
  
    fetchQuizData();
  }, [userId]);

  const items = [
      { id: 1, title: 'Configuration', content: 'Categories, Courses, Specialisations, Classes, Subjects' },
      { id: 2, title: 'Organization', content: 'Profile, Manage Subscription, Performance Metrics, Marketing and Sales, Financial Information, Mission and Vision, Goals and Objectives' },
      { id: 3, title: 'Notification', content: 'Contact Information, Date and Time, Main Content, Additional Information' },
      { id: 4, title: 'User & Roles', content: 'User Information, Roles and Permissions, Communication, Responsibilities and Expectations' },
      { id: 5, title: 'Developer & Data', content: 'Developer Information, Data Information, Access and Permissions' },
      { id: 6, title: 'Preferences', content: 'User Information, Preference Categories, Default Settings, Subscription Preferences' },
  ];
  
  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.content.toLowerCase().includes(searchQuery.toLowerCase())
);

  const highlightText = (text, query) => {
      if (!query) return text;
      const parts = text.split(new RegExp(`(${query})`, 'gi'));
      return (
          <span>
              {parts.map((part, index) =>
                  part.toLowerCase() === query.toLowerCase() ? (
                      <span key={index} style={{ backgroundColor: 'lightblue' }}>{part}</span>
                  ) : (
                      part
                  )
              )}
          </span>
      );
  };

  return (
    <div className='flex font-Poppins'>
    <Navigation />
    <div className='flex-1 flex flex-col bg-[#F5F5F5]'>
    <div className="flex justify-between p-[20px] text-[20px] font-medium leading-7 text-left ml-[20px] mt-[10px] text-[#002366]">
          {/* Header content */}
          <p className='-mt-[5px]'>Welcome {userName}</p>
          <div className='flex -mt-[5px]'>
          <img
                className='h-[12px] w-[12px] relative top-[9px] left-[25px]'
                src={searchIcon}
                alt="Search Icon"
            />
            <input
                className='-mt-[5px] text-[10px] pl-[38px] pr-[10px] rounded-md h-[38px] mr-[10px] w-fit bg-[#FFFFFF] text-left placeholder-[#214082] border-none focus:border-none outline-none'
                type='text'
                placeholder='Search your settings'
                value={searchQuery}
                onChange={handleInputChange}
            />
          <img onClick={handleBanckToDashbaord} className='h-4 w-4 cursor-pointer mt-[5px] mr-1' title='close settings' src={cancel}/>            
          </div>
         
          {/* <div className={styles.headerRight}>
          <div className="w-[99px] h-[41px] absolute mr-[170px] -mt-2 rounded-[10px] bg-[#f3d0d5]">
            <div className="flex">
              <img
                className="w-[25px] h-[25px] ml-2 mt-2"
                src={Plus}
                alt="Plus Icon"
              />
              <a href="./create-quiz" className="hover:underline underline-offset-2 cursor-pointer font-Poppins font-medium text-[12px] leading-[18px] text-[#214082] ml-2 mt-3">
                Quiz
              </a>
            </div>
          </div>
            <div className={styles.searchIconContainer}>
              <img
                src={searchIcon}
                alt="Search Icon"
                className={styles.searchIcon}
              />
            </div>
          </div> */}
        </div>
        <div className=" h-[41px] mx-[20px] pl-[23px] text-[15px] font-Poppins font-medium flex items-center -mt-[10px] leading-6 text-left justify-left
         text-[#002366] rounded-md" style={{ background: "#30CDF040" }}>
          You've completed {weeklyQuizCount} Quizzes this week with an average score of {averageScorePercentage}%
       </div>

        <div className='flex bg-[#F3D0D5] h-[41px] mt-[20px] rounded-md ml-[20px] mr-[20px]'>     
            <h1 className='mt-[10px] ml-[20px] font-Poppins font-semibold text-[#214082] text-[16px]'>All Settings</h1>
            <div className='flex gap-1 h-[30px] p-2 ml-auto mr-[2%] mt-[1%] rounded'>
                {/* <h1 className='text-[10px]'>Cancel settings</h1> */}
                {/* <img onClick={handleBanckToDashbaord} className='h-4 w-4 cursor-pointer mt-[1px]' title='close settings' src={cancel}/>  */}
            </div>
        </div>

        <div className='flex flex-wrap gap-[20px] mt-[20px] ml-[15px] mr-[10px] justify-center'>
         {filteredItems.map(item => (
        <div
            key={item.id}
            className='h-auto pb-[20px] w-[calc((100%-80px)/4)] bg-white rounded-md shadow-xl transition-transform duration-300 transform scale-95 hover:scale-100 flex-none'
        >
            <h1 className='text-[12px] font-semibold text-[#EF5130] cursor-pointer text-center pt-2'>
                {highlightText(item.title, searchQuery)}
            </h1>
            {item.content.split(', ').map((contentItem, index) => (
                 <p
                 key={index} 
                 className={`mt-3 text-[10px] ml-[20px] font-semibold cursor-pointer ${item.title === 'Configuration' && 'text-[#3340AF]'} ${item.title === 'Configuration' ? 'hover:underline hover:underline-offset-2' : 'text-gray-500'}`} 
                 onClick={
                  contentItem === 'Categories' ? handleCategoriesClick : 
                  contentItem === 'Courses' ? handleCoursesClick : 
                  
                  contentItem === 'Specialisations' ? handleSpecialisationsClick :
                  contentItem === 'Classes' ? handleClassesClick :
                  contentItem === 'Subjects' ? handleSubjectsClick :

                  null
                }
             >
                 {highlightText(contentItem, searchQuery)}
             </p>
            ))}
        </div>
    ))}
          </div>       
    </div>
    <LogoutBar />
</div>
  )
}

export default configure