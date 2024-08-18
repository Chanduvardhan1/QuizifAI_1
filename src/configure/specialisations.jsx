import React, { useEffect } from 'react'
import Navigation from "../navbar/navbar.jsx"
import LogoutBar from "../logoutbar/logoutbar.jsx";
import searchIcon from "../assets/Images/images/dashboard/Search.png";
import { useState } from 'react';
import Switch from "react-switch";
import { useNavigate } from 'react-router-dom';
import cancel from "../assets/Images/images/dashboard/cancel.png";
import Plus from "../../src/assets/Images/dashboard/Plus.png";
import Edit from "../../src/assets/Images/Assets/Edit.png"
import Delete from "../../src/assets/Images/Assets/Delete.png"
import Line from "../../src/assets/Images/Assets/Line.png"
import { RiDeleteBinLine } from "react-icons/ri";

const specialisations = () => {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryFlag, setParentCategoryFlag] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [isToggleEnabled, setIsToggleEnabled] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [courseName, setCourseName] = useState('');
  const [courseShortName, setCourseShortName] = useState('');
  const [parentCategories, setParentCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [specializationId, setSpecializationId] = useState('');

  const [courses, setCourses] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [specializationName, setSpecializationName] = useState('');
  const [specializationShortName, setSpecializationShortName] = useState('');
  const [courseId, setCourseId] = useState(0);
  const userId = localStorage.getItem("user_id");
  const [updatedBy, setUpdatedBy] = useState('');

  const navigate = useNavigate();
  const handleBanckToDashbaord = () =>{
    navigate('/dashboard');
  }

  const handleSubmit1 = async () => {



    const data = {
      specialization_name: specializationName,
      specialization_short_name: specializationShortName,
      course_id: courseId,
      created_by: userId
    };

    try {
        const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage
  
        if (!authToken) {
          console.error('No authentication token found');
          return;
        }
      const response = await fetch('https://quizifai.com:8010/adding_specialization/', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Specialization added successfully:', result);
        fetchCourses();
        setIsNavbarOpen(false);
        setSpecializationName('');
        setSpecializationShortName('');
        setCourseId('');
      } else {
        console.error('Failed to add specialization:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const updateSpecialization = async () => {
  
    const specializationData = {
      specialization_name:specializationName,
      specialization_short_name: specializationShortName,
      course_id: courseId,
      specialization_id: specializationId,
      updated_by: userId
    };
  
    try {
      const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage
  
      if (!authToken) {
        console.error('No authentication token found');
        return;
      }
      const response = await fetch('https://quizifai.com:8010/update_specialization/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(specializationData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to update specialization');
      }
  
      const result = await response.json();
      console.log('Specialization updated successfully:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleSubmit = () => {
    if (isEditing) {
      updateSpecialization();
    } else {
        handleSubmit1();
    
    }
  };
  
  const fetchCourses = async () => {
    try {
      const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage
  
      if (!authToken) {
        console.error('No authentication token found');
        return;
      }
  
      const response = await fetch('https://quizifai.com:8010/courses-clsses/', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch courses data');
      }
  
      const data = await response.json();
      if (data.response === "success") {
        setCourses(data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchCourses();
  }, []);
  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };
  const handleEdit = (course) => {
    if (selectedCategoryId === course.course_id) {
      // Toggle the form visibility if the same course ID is clicked
      setIsNavbarOpen(!isNavbarOpen);
    } else {
      // Set state with the course details to edit
      setCourseId(course.course_id);
      setCourseName(course.course_name);
      setCourseShortName(course.course_short_name);
      
      // If the course has specializations, pick the first one to edit (or customize as needed)
      if (course.specializations && course.specializations.length > 0) {
        const specialization = course.specializations[0]; // Assuming you want the first specialization
        setSpecializationName(specialization.specialization_name);
        setSpecializationShortName(specialization.specialization_short_name);
        setSpecializationId(specialization.specialization_id);
      } else {
        setSpecializationName('');
        setSpecializationShortName('');
        setSpecializationId('');
      }
  
      setUpdatedBy(''); // Set the updated_by field appropriately
  
      setIsNavbarOpen(true); // Open the form
      setIsEditing(true); // Mark the form as being in edit mode
      setSelectedCategoryId(course.course_id); // Update the selected course ID
    }
  };
  
  return (
    <>
    <div className='flex w-full font-Poppins'>
    <Navigation/> 
    <div className='flex w-full flex-col'>
    <div className='flex justify-end mt-[30px]'>
        <div className='w-[137px] h-[30px] rounded-[10px] bg-[#F7E0E3] mr-[10px]'>
          <div className="flex"onClick={toggleNavbar} >
            <img className="w-[20px] h-[20px] ml-2 mt-1" src={Plus} alt="Plus Icon" />
            <a className="hover:underline underline-offset-2 cursor-pointer font-Poppins font-medium text-[12px] leading-[18px] text-[#214082] ml-2 mt-1.5">
            Specialization
            </a>
          </div>
        </div>
        <img onClick={handleBanckToDashbaord} className='h-4 w-4 cursor-pointer mt-[6px] mr-6' title='close settings' src={cancel} />
      </div>
      {isNavbarOpen && (
        <div className='text-[10px] mx-[10px] text-[#214082] h-[50px] mt-[30px] rounded-md bg-[#CBF2FB] flex flex-row justify-around p-4'>
          <input
            type='text'
            placeholder='Specialization ID'
            value={specializationId}
            onChange={(e) => setSpecializationId(e.target.value)}
            className=' w-[100px] -mt-[10px] text-center rounded-3xl py-[14px] pl-1 text-[#214082] placeholder:text-[#214082] outline-[#214082]'
            style={{ '::placeholder': { color: '#214082' } }} 
          />
          <input
            type='text'
            placeholder='Specialization Name'
            value={specializationName}
            onChange={(e) => setSpecializationName(e.target.value)}
            className=' w-[120px] rounded-3xl text-center -mt-[10px]  py-[14px] text-[#214082] placeholder:text-[#214082] outline-[#214082]'
          />
           <input
        type='text'
        placeholder='Specialization Short Name'
        value={specializationShortName}
        onChange={(e) => setSpecializationShortName(e.target.value)}
        className='w-[150px] rounded-3xl text-center -mt-[10px] py-[14px] text-[#214082] placeholder:text-[#214082] outline-[#214082]'
        
      />
       <select
  className="rounded-3xl text-center -mt-[10px] w-[150px] text-[#214082] placeholder:text-[#214082] outline-[#214082]"
  value={courseId}
  onChange={(e) => setCourseId(e.target.value)}
>
  <option value="">Select a course</option>
  {courses.map((course) => (
    <option key={course.course_id} value={course.course_id}>
      {course.course_name}
    </option>
  ))}
</select>
         
         <button
onClick={handleSubmit}
  className='bg-[#214082] w-[80px] -mt-[10px] ml-[20px] py-[14px] rounded-3xl text-white flex items-center justify-center'
>
  {isEditing ? 'Update' : 'Add'}
</button>
        </div>
      )}
      

      <table className='h-[20px] table-auto mt-[30px] mx-[20px] rounded text-left bg-[#F7E0E3] text-[#2b51a1] text-[13px] font-light'>
        <thead>
          <tr className='h-[50px]'>
            <th className='px-4 py-2 text-nowrap'>Specialization ID</th>
            <th className='pl-[10px] ml-[15px] py-2'>Specialization Name</th>
            <th className='px-4 py-2 text-nowrap'>Specialization Short Name</th>
            <th className='px-2 py-2 text-wrap'>Courses</th>
            <div className='flex -mt-[5px]'>
            <input
                className='mt-[15px] text-[10px] pl-[30px] pr-[10px] rounded-[20px] h-[28px] mr-[10px] w-fit bg-[#FFFFFF] text-left placeholder-[#214082] border-none focus:border-none outline-none'
                type='text'
                placeholder='Search'
                value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
            <img
                className='h-[12px] w-[12px] relative top-[25px] right-[160px]'
                src={searchIcon}
               />
          </div>
          </tr>
        </thead>
        <tbody  className='bg-white border-gray-500 '>
          {courses.map((course) => (
            <tr key={course.course_id}>
              <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-center'>    {course.specializations.map((spec) => (
                  <div key={spec.specialization_id}>
                    {spec.specialization_id}
                  </div>
                ))}</td>
              <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-center'>
              {course.specializations.map((spec) => (
                  <div key={spec.specialization_id}>
                    {spec.specialization_name}
                  </div>
                ))}
              </td>
              <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-center'>{course.specializations.map((spec) => (
                  <div key={spec.specialization_id}>
                    {spec.specialization_short_name}
                  </div>
                ))}</td>

                <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-center'>{course.course_name}</td>
              {/* <td  className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-center'>
              {course.classes.map((cls) => (
                  <div key={cls.class_id}>{cls.class_name}</div>
                ))}
              </td> */}
              <td className='h-full border text-[#214082] flex gap-2 pl-[40px] pt-2 text-[12px] cursor-pointer hover:font-medium hover:underline'>         
              <img
                className='h-[13px] w-[13px] mr-1 cursor-pointer'
                src={Edit}
                alt="Edit"
                onClick={() => handleEdit(course)}
              />
             <button className='flex text-orange-500 w-[30px] h-[30px]' ><RiDeleteBinLine/></button>

            </td>
            </tr>
          ))}
        </tbody>
      </table>
    
     
    </div>
    
     

   
    <LogoutBar />
    </div>
    </>
    
    

    
  )
}

export default specialisations