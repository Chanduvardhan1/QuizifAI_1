import React, { useEffect } from "react";
import Navigation from "../navbar/navbar.jsx";
import LogoutBar from "../logoutbar/logoutbar.jsx";
import searchIcon from "../assets/Images/images/dashboard/Search.png";
import { useState } from "react";
import Select from 'react-select';
import Switch from "react-switch";
import { useNavigate } from "react-router-dom";
import cancel from "../assets/Images/images/dashboard/cancel.png";
import Plus from "../../src/assets/Images/dashboard/Plus.png";
import Edit from "../../src/assets/Images/Assets/Edit.png";
import Delete from "../../src/assets/Images/Assets/Delete.png";
import Line from "../../src/assets/Images/Assets/Line.png";
import { RiDeleteBinLine } from "react-icons/ri";

const UserAndGroups = () => {
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [groupId, setGroupId] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [activeFlag, setActiveFlag] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const userId = localStorage.getItem("user_id");
  const [options, setOptions] = useState([]);
  const [notification, setNotification] = useState(null);
  

  const fetchGroups = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("No authentication token found");
      return;
    }

    try {
      const [groupsResponse, usersResponse] = await Promise.all([
        fetch("https://quizifai.com:8010/groups/", {
          headers: { Authorization: `Bearer ${authToken}` },
        }),
        fetch("https://quizifai.com:8010/users/", {
          headers: { Authorization: `Bearer ${authToken}` },
        }),
      ]);

      if (!groupsResponse.ok || !usersResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const groupsData = await groupsResponse.json();
      const usersData = await usersResponse.json();
     
      const filteredUsers = usersData.data.filter(
        (user) => user.user_name && user.user_name.trim() !== ""
      );
      setGroups(groupsData.data);
      setUsers(filteredUsers);
      setOptions(filteredUsers.map((user) => ({ value: user.user_id, label: user.user_name })));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleCreateGroup = async () => {
    const groupData = {
      group_name: groupName, // Use appropriate state or variable
      group_description: groupDescription, // Ensure this matches the correct state
      active_flag: activeFlag,
      created_by: userId, // Replace with the user ID or relevant state
      user_ids: selectedUserIds, // Replace with the selected user IDs
    };

    try {
      const authToken = localStorage.getItem("authToken"); // Retrieve the auth token from localStorage

      if (!authToken) {
        console.error("No authentication token found");
        return;
      }

      const response = await fetch(
        "https://quizifai.com:8010/create_group/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(groupData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
            }

      const newGroup = await response.json();
      alert("Groups updated successfully");
      console.log("groups added successfully..", newGroup);
      fetchGroups(); // Refresh groups list afzter creation
      resetForm();
      // setIsNavbarOpen(false);
      // setGroupDescription("");
      // setSelectedUserIds([]);
      // setSelectedUserName("");
      // setGroupName("");
    } catch (error) {
      console.error("Error adding groups:", error);
    }
  };
  const updateGroup = async () => {
    const groupData = {
      group_id: groupId,
      group_name: groupName,
      group_description: groupDescription,
      updated_by: userId,
      user_ids: selectedUserIds,
    };
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        console.error("No authentication token found");
        return;
      }
      const response = await fetch(
        "https://quizifai.com:8010/edit_group/",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(groupData),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        if(errorData.response_message.includes("Unauthorized"))
        console.error("Error response from server:", errorData);
        throw new Error(`Failed to update group: ${errorData.response_message || 'Unknown error'}`);
      }
      const result = await response.json();
      alert("Groups updated successfully");
      console.log("Groups updated successfully", result);
      fetchGroups();
      resetForm();
    } catch (error) {
      console.error("Error", error);
    }
  };
  const handleSubmit = () => {
    if (isEditing) {
      updateGroup();
    } else {
      handleCreateGroup();
    }
  };

  const handleEdit = (group) => {
    setGroupId(group.group_id);
    setGroupName(group.group_name);
    setGroupDescription(group.group_description);
    setSelectedUserIds(group.user_ids);
    // setSelectedUserName(
    //   users.find((user) => user.user_id === group.user_ids[0])?.user_name || ""
    // );
    setIsNavbarOpen(true);
    setIsEditing(true);
    // setSelectedCategoryId(group.group_id);
  };
  const resetForm = () => {
    setGroupId("");
    setGroupName("");
    setGroupDescription("");
    setSelectedUserIds([]);
    // setSelectedUserName("");
    setIsEditing(false);
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const filteredGroups = groups.filter((group) =>
    group.group_name.includes(searchInput)
  );
  const filteredUsers = users.filter((user) =>
    filteredGroups.some((group) => group.user_ids.includes(user.user_id))
  );

  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="bg-yellow-300">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const navigate = useNavigate();
  const handleBanckToDashbaord = () => {
    navigate("/configure");
  };

  // const options = users.map(user => ({
  //   value: user.user_id,
  //   label: user.user_name
  // }));

  const handleChange = (selectedOptions) => {
    setSelectedUserIds(selectedOptions.map((option) => option.value));
  };
  return (
    <>
      <div className="flex w-full font-Poppins">
        <Navigation />
        <div className="flex w-full flex-col">
          <div className="flex justify-end mt-[30px]">
            <div className="w-[118px] h-[30px] rounded-[10px] bg-[#F7E0E3] mr-[10px]">
              <div className="flex" onClick={toggleNavbar}>
                <img
                  className="w-[20px] h-[20px] ml-2 mt-1"
                  src={Plus}
                  alt="Plus Icon"
                />
                <a className="hover:underline underline-offset-2 cursor-pointer font-Poppins font-medium text-[12px] leading-[18px] text-[#214082] ml-2 mt-1.5">
                  Groups
                </a>
              </div>
            </div>
            <img
              onClick={handleBanckToDashbaord}
              className="h-4 w-4 cursor-pointer mt-[6px] mr-6"
              title="close settings"
              src={cancel}
            />
          </div>
          {isNavbarOpen && (
            <div className="text-[10px] mx-[10px] text-[#214082] h-[50px] mt-[30px] rounded-md bg-[#CBF2FB] flex flex-row justify-around p-4">
              <input
                type="text"
                placeholder="Group ID"
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
                className=" w-[75px] -mt-[5px] text-center rounded-3xl py-[14px] pl-1 text-[#214082] placeholder:text-[#214082] outline-[#214082]"
                style={{ "::placeholder": { color: "#214082" } }}
                readOnly
              />
              <input
                type="text"
                placeholder="Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-[95px] rounded-3xl text-left pl-3 -mt-[5px]  py-[14px] text-[#214082] placeholder:text-[#214082] outline-[#214082]"
              />
              <input
                type="text"
                placeholder="Group Description"
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                className=" w-[115px] rounded-3xl text-left pl-3 -mt-[5px]  py-[14px] text-[#214082] placeholder:text-[#214082] outline-[#214082]"
              />

     <Select
      className="w-[200px] text-[#214082] -mt-[10px] rounded-3xl"
      isMulti
      value={options.filter(option => selectedUserIds.includes(option.value))}
      onChange={handleChange}
      options={options}
      closeMenuOnSelect={false} // Keeps dropdown open after each selection
      placeholder="Select User"
      hideSelectedOptions={false} // Shows selected options with a checkbox
    />


              <button
                onClick={handleSubmit}
                className="bg-[#214082] w-[80px] -mt-[10px] ml-[20px] py-[14px] rounded-3xl text-white flex items-center justify-center"
              >
                {isEditing ? "Update" : "Add"}
              </button>
            </div>
          )}

          <table className="h-[20px] table-auto mt-[30px] mx-[20px] rounded text-left bg-[#F7E0E3] text-[#2b51a1] text-[13px] font-light">
            <thead>
              <tr className="h-[50px]">
                <th className="px-4 py-2 text-nowrap">Group Id</th>
                <th className="pl-[10px] ml-[15px] py-2">Group Name</th>
                <th className="px-4 py-2 text-nowrap">Group Description</th>
                <th className="px-4 py-2 text-nowrap">Flag</th>
                <th className="px-2 py-2 text-nowrap">Users List</th>
                <div className="flex -mt-[5px]">
                  <input
                    className="mt-[15px] text-[10px] pl-[30px] pr-[10px] rounded-[20px] h-[28px] mr-[10px] w-fit bg-[#FFFFFF] text-left placeholder-[#214082] border-none focus:border-none outline-none"
                    type="text"
                    placeholder="Search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <img
                    className="h-[12px] w-[12px] relative top-[25px] right-[160px]"
                    src={searchIcon}
                  />
                </div>
              </tr>
            </thead>
            <tbody className="bg-white border-gray-500 ">
              {filteredGroups.map((group) => (
                <tr key={group.group_id}>
                  <td className="px-4 py-2 border text-[#214082] font-bold text-[10px] text-center">
                    {highlightText(group.group_id.toString(), searchInput)}
                  </td>

                  <td className="px-4 py-2 border text-[#214082] font-medium text-[10px]">
                    {highlightText(group.group_name, searchInput)}
                  </td>

                  <td className="px-4 py-2 border text-[#214082] font-medium text-[10px] w-[200px]">
                    <span className="relative group">
                      <span className="text-[10px] text-[#002366] absolute w-[170px] cursor-pointer z-0 truncate">
                      {highlightText(group.group_description, searchInput)
                     .toLowerCase()
                     .replace(/^\w/, (c) => c.toUpperCase())}
                      </span>
                      <span className="absolute -top-1 w-[170px] h-auto cursor-pointer hidden group-hover:inline-block text-wrap z-20 bg-black text-white px-2 py-1 border border-black-300 rounded leading-tight whitespace-nowrap">
                      {highlightText(group.group_description, searchInput)
                     .toLowerCase()
                     .replace(/^\w/, (c) => c.toUpperCase())}
                      </span>
                    </span>
                  </td>

                  <td className="px-4 py-2 border text-[#214082] font-medium text-[10px] text-center">
                    {highlightText(
                      group.active_flag ? "Active" : "Inactive",
                      searchInput
                    )}
                  </td>

  <td className="px-4 py-2 border text-[#214082] font-medium text-[10px] w-[200px]">
  <span className="relative group">
    <span className="text-[10px] text-[#002366] absolute w-[170px] cursor-pointer z-0 truncate">
      {filteredUsers
        .filter((user) => group.user_ids.includes(user.user_id))
        .map((user) => user.user_name)
        .join(", ")}
    </span>
    <span className="absolute -top-1 w-[170px] h-auto cursor-pointer hidden group-hover:inline-block text-wrap z-20 bg-black text-white px-2 py-1 border border-black-300 rounded leading-tight whitespace-nowrap">
      {filteredUsers
        .filter((user) => group.user_ids.includes(user.user_id))
        .map((user) => user.user_name)
        .join(", ")}
    </span>
  </span>
</td>
                  
                  <td className="h-full border text-[#214082] flex gap-2 pl-[40px] pt-2 text-[12px] cursor-pointer hover:font-medium hover:underline">
                    <img
                      className="h-[13px] w-[13px] mr-1 cursor-pointer"
                      src={Edit}
                      alt="Edit"
                      onClick={() => handleEdit(group)}
                    />
                    <button className="flex text-orange-500 w-[30px] h-[30px]">
                      <RiDeleteBinLine />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <LogoutBar />
      </div>
    </>
  );
};

export default UserAndGroups;
