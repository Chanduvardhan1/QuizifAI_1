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
const category = () => {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryFlag, setParentCategoryFlag] = useState('Parent Category Flag');
  const [parentCategory, setParentCategory] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [isToggleEnabled, setIsToggleEnabled] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [createdBy, setCreatedBy] = useState(0);

  const navigate = useNavigate();
  const handleBanckToDashbaord = () =>{
    navigate('/dashboard');
  }
  
  // toggle button for parent category 
  useEffect(() => {
    fetch('https://quizifai.com:8010/categories/')
      .then(response => response.json())
      .then(data => {
        if (data.response === "success") {
          setData(data.data);
          setParentCategories(data.data.filter(category => category.parent_category_flag === 'Y'));
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleToggleChange = (checked) => {
    setIsToggleEnabled(checked);
    setParentCategoryFlag(checked ? 'Y' : 'N');
    if (!checked) {
      setParentCategoryId(''); // Clear parent category ID if toggle is off
    }
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  useEffect(() => {
    if (isToggleEnabled) {
      setParentCategory('YES');
      setParentCategoryId(null);
    } else if (parentCategory !== '') {
      setParentCategory('NO');
    }
  }, [isToggleEnabled]);

  const handleAddOrUpdateCategory = async () => {
    const categoryData = {
      parent_category_flag: parentCategoryFlag,
      category_name: categoryName,
      parent_category_id: parentCategoryId,
      user_id: createdBy,
    };

    if (isEditing) {
      const updatedCategories = categories.map((category, index) =>
        index === editIndex
          ? { ...categoryData, category_id: categoryId }
          : category
      );
      setCategories(updatedCategories);
      setIsEditing(false);
      setEditIndex(null);
      try {
        await fetch('https://quizifai.com:8010/update_category/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(categoryData),
        });
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      try {
        const response = await fetch('https://quizifai.com:8010/create_category/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(categoryData),
        });

        if (response.ok) {
          const newCategory = { category_id: categoryId, ...categoryData };
          setCategories([...categories, newCategory]);
        } else {
          console.error('Failed to create category');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    setCategoryId('');
    setCategoryName('');
    setParentCategoryFlag('');
    setParentCategory('');
    setIsNavbarOpen(false);
  };

  const handleEdit = (index) => {
    const category = categories[index];
    setCategoryId(category.category_id);
    setCategoryName(category.category_name);
    setParentCategory(category.parent_category_flag);
    setParentCategoryId(category.parent_category_id);
    setCreatedBy(category.user_id);
    setIsEditing(true);
    setEditIndex(index);
    setIsNavbarOpen(true);
  };

  const filteredData = data.filter(category => 
    category.category_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <div className='flex w-full font-Poppins'>
    <Navigation/> 
    <div className='flex w-full flex-col'>
    <div className='flex justify-end mt-[30px]'>
        <div className='w-[118px] h-[30px] rounded-[10px] bg-[#F7E0E3] mr-[10px]'>
          <div className="flex" onClick={toggleNavbar}>
            <img className="w-[20px] h-[20px] ml-2 mt-1" src={Plus} alt="Plus Icon" />
            <a className="hover:underline underline-offset-2 cursor-pointer font-Poppins font-medium text-[12px] leading-[18px] text-[#214082] ml-2 mt-1.5">
              Category
            </a>
          </div>
        </div>
        <img onClick={handleBanckToDashbaord} className='h-4 w-4 cursor-pointer mt-[6px] mr-6' title='close settings' src={cancel} />
      </div>
      {isNavbarOpen && (
        <div className='text-[10px] mx-[10px] text-[#214082] h-[50px] mt-[30px] rounded-md bg-[#CBF2FB] flex flex-row justify-around p-4'>
          <input
            type='text'
            placeholder='Category ID'
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className=' w-[75px] -mt-[10px] text-center rounded-3xl py-[14px] pl-1 text-[#214082] placeholder:text-[#214082] outline-[#214082]'
            style={{ '::placeholder': { color: '#214082' } }}
            readOnly
          />
          <input
            type='text'
            placeholder='Category Name'
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className=' w-[95px] rounded-3xl text-center -mt-[10px]  py-[14px] text-[#214082] placeholder:text-[#214082] outline-[#214082]'
          />
           <input
        type='text'
        placeholder='Parent Category Flag'
        value={parentCategoryFlag}
        onChange={(e) => setParentCategoryFlag(e.target.value)}
        className='w-[120px] rounded-3xl text-center -mt-[10px] py-[14px] text-[#214082] placeholder:text-[#214082] outline-[#214082]'
        readOnly
      />
          <div className='h-[2px] w-[2px] -mt-[10px] -ml-[40px] mr-[20px]'>
          <Switch
              onChange={handleToggleChange}
              checked={isToggleEnabled}
              offColor="#888"
              onColor="#008800"
              checkedIcon={<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: "white" }}>✔</span>}
              uncheckedIcon={<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: "white" }}>✖</span>}
            />
           </div>
        <input
        type='text'
        placeholder='Parent Category Name'
        value={parentCategoryId}
        onChange={(e) => setParentCategoryId(e.target.value)}
        className={`rounded-3xl text-center -mt-[10px] py-[14px] text-[#214082] placeholder:text-[#214082] outline-[#214082] ${parentCategoryFlag === 'Y' ? 'hidden' : ''}`}
        disabled={parentCategoryFlag === 'Y'}
      />
          
         <button
  onClick={handleAddOrUpdateCategory}
  className='bg-[#214082] w-[80px] -mt-[10px] ml-[20px] py-[14px] rounded-3xl text-white flex items-center justify-center'
>
  {isEditing ? 'Update' : 'Add'}
</button>
        </div>
      )}

      <table className='h-[20px] table-auto mt-[30px] mx-[20px] rounded text-left bg-[#F7E0E3] text-[#2b51a1] text-[13px] font-light'>
        <thead>
          <tr className='h-[50px]'>
            <th className='px-4 py-2 text-nowrap'>Category Id</th>
            <th className='pl-[10px] ml-[15px] py-2'>Category Name</th>
            <th className='px-4 py-2 text-nowrap'>Parent Category Flag</th>
            <th className='px-2 py-2 text-wrap'>Parent Category Name</th>
            <div className='flex -mt-[5px]'>
            <input
                className='mt-[15px] text-[10px] pl-[30px] pr-[10px] rounded-[20px] h-[28px] mr-[10px] w-fit bg-[#FFFFFF] text-left placeholder-[#214082] border-none focus:border-none outline-none'
                type='text'
                placeholder='Search'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
            />
            <img
                className='h-[12px] w-[12px] relative top-[25px] right-[160px]'
                src={searchIcon}
               />
          </div>
          </tr>
        </thead>
        <tbody className='bg-white border-gray-500 '>
          {filteredData.map(category => (
              <tr key={category.category_id}>
              <td className='px-4 py-2 border text-[#214082] font-bold text-[10px] text-center'>{category.category_id}</td>
              <td className='px-4 py-2 border text-[#214082] font-medium text-[10px]'>{category.category_name}</td>
              <td className='px-4 py-2 border text-[#214082] font-medium text-[10px] text-center'>{category.parent_category_flag}</td>
              <td className='px-4 py-2 border text-[#214082] font-medium text-[10px]'>
              {category.parent_category_name ? category.parent_category_name : ''}
              </td>
              <td className='h-full border text-[#214082] flex gap-2 pl-[40px] pt-2 text-[12px] cursor-pointer hover:font-medium hover:underline'>
                Edit
                <img
                  className='h-[13px] w-[13px] mr-1 cursor-pointer'
                  src={Edit}
                  alt="Edit"
                  onClick={() => handleEdit(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
        
        <tbody>
          {categories.map((category, index) => (
            <tr key={index} className='bg-white text-[#214082] font-medium text-[10px]'>
              <td className='px-4 py-2 border '>{category.id}</td>
              <td className='px-4 py-2 border '>{category.category}</td>
              <td className='px-4 py-2 border '>{category.parent_category_flag}</td>
              <td className='px-4 py-2 border '>{category.parent_category}</td>
              <td className='border px-4 py-2 flex gap-2'>
                <img
                  className='h-[20px] w-[20px] mr-1 cursor-pointer'
                  src={Edit}
                  alt="Edit"
                  onClick={() => handleEdit(index)}
                />
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

export default category