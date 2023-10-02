import DetailBox from "./DashboardBox";
import { useUserContext } from "../context/UsersContext";
import { useState } from "react";
import Modal from "./VerificationModal";
import { BACKEND_BASE_URL } from "../../utils/Config";
import axios from "axios";
import jwtDecode from "jwt-decode";

const Users = () => {

  const users = useUserContext();
  const [activeUserId, setActiveUserId] = useState(null);

  const openUserModal = (userId) => {
    setActiveUserId(userId);
  };

  const closeUserModal = () => {
    setActiveUserId(null);
  };

  const handleRemoveUser = async (userId) => {  
  };

  const [selectedUser,setSelectedUser] = useState();

    const handleVerification = async (userId) => {
      try {
        const response = await axios.patch(
          BACKEND_BASE_URL + `/api/verify/${userId}/`) 

        if (response.status ===200) {
          alert("User has been verified.");
        } else {
          alert("Failed to verify user.");
        }
      } catch (error) {
        console.error("Error verifying user:", error);
      }
    };

  
  return (
    <section className="container px-4 mx-auto mt-10">
    <div className="flex items-center gap-x-3">
      <h2 className="text-lg font-medium text-gray-800 dark:text-white">
        Total Users
      </h2>

      <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
        {users.length} Users
      </span>
    </div>

    <div className="flex flex-col mt-6">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    <div className="flex items-center gap-x-3">
                      <span>Name</span>
                    </div>
                  </th>

                  <th
                    scope="col"
                    className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    <button className="flex items-center gap-x-2">
                      <span>Status</span>
                    </button>
                  </th>

                  <th
                    scope="col"
                    className="py-3.5  text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="ptext-sm pr-20 font-normal text-right text-gray-500 dark:text-gray-400"
                  >
                    Edit
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="py-3.5 px-4 text-sm font-medium text-gray-800 dark:text-white">
                      {user.username}
                    </td>
                    <td className="px-12 py-3.5 text-sm font-medium text-green-600">
                      {user.is_active ? "Active" : "Inactive"}
                    </td>
                    <td
                      className="text-sm text-gray-800 dark:text-gray-400"
                      onClick={() =>setSelectedUser(user) ||openUserModal(user.id)} 
                    >
                      <img
                        className="w-40 h-32 cursor-pointer"
                        src="https://media.istockphoto.com/id/612650934/vector/id-card-isolated-on-white-background-business-identification-icon.jpg?s=612x612&w=0&k=20&c=byimQb2_LJydS803qrpYKk-80dIC4HEp-BidObosij0="
                        alt=""
                      />
                    </td>
                      <td className="py-3.5 text-sm text-gray-800 dark:text-gray-400">
                        {user.email}
                      </td>

                      <td className=" text-sm whitespace-nowrap  h-20 w-20">
                        <div className="flex items-center gap-x-6">
                          <button onClick={()=> handleRemoveUser } className=" text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      {activeUserId !== null && (
        <Modal
        showModal={true} 
        onClose={closeUserModal} 
        selectedUser={selectedUser.username}
        licenseFront={selectedUser.licenseFront}
        licenseBack={selectedUser.licenseBack}
        livePhoto={selectedUser.livePhoto}
        verify={() => handleVerification(selectedUser.id)}
        user={selectedUser} 
      />
      
      )}
                    </tr>
                    
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
       
    </section>
  );
};

export default Users;
