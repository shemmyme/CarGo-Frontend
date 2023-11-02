import DetailBox from "./DashboardBox";
import { useUserContext } from "../context/UsersContext";
import { useState } from "react";
import Modal from "./VerificationModal";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../utils/Config";
import {toast,Toaster} from "react-hot-toast";

const Users = () => {

  const users = useUserContext();
  const [activeUserId, setActiveUserId] = useState(null);
  const [user,setUser] = useState([])

  const openUserModal = (userId) => {
    setActiveUserId(userId);
  };

  const closeUserModal = () => {
    setActiveUserId(null);
  };


  const [selectedUser,setSelectedUser] = useState();

    const handleVerification = async (userId) => {
      try {
        const response = await axios.patch(
          BACKEND_BASE_URL + `/api/verify/${userId}/`) 

        if (response.status ===200) {
          alert("User has been verified.");
          closeUserModal()
          
        } else {
          alert("Failed to verify user.");
        }
      } catch (error) {
        console.error("Error verifying user:", error);
      }
    };

    const handleBlockUser = (userId) => {
      axios
        .post(BACKEND_BASE_URL + `/api/block_user/${userId}/`)
        .then((response) => {
          console.log(response.data)
          toast.error("User has been Blocked");
          ;
  
          const updatedUsers = users.map((user) =>
            user.id === userId ? { ...user, isBlocked: true } : user
          );
          setUser(updatedUsers);
        })
        .catch((error) => {
          console.error("Error blocking the user:", error);
        });
    };
  
    const handleUnblockUser = (userId) => {
      axios
        .post(BACKEND_BASE_URL + `/api/unblock_user/${userId}/`)
        .then((response) => {
          console.log(response.data)
          toast.success("User has been Unblocked");
  
          const updatedUsers = users.map((user) =>
            user.id === userId ? { ...user, isBlocked: false } : user
          );
          setUser(updatedUsers);
        })
        .catch((error) => {
          console.error("Error unblocking the user:", error);
        });
    };
    
    

  
  return (
    <section className="container px-4 mx-auto mt-10">
      <Toaster/>
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
                  onClick={() => setSelectedUser(user) || openUserModal(user.id)}
                >
                  {/* ... (your existing code) */}
                </td>
                <td className="py-3.5 text-sm text-gray-800 dark:text-gray-400">
                  {user.email}
                </td>

                <td className="text-sm whitespace-nowrap h-20 w-20">
                  <div className="flex items-center gap-x-6">
                    {user.is_active ? (
                      <button
                        onClick={() => handleBlockUser(user.id)}
                        className="px-2 py-1 text-sm font-medium text-red-600 bg-red-200 rounded-full hover:bg-red-300 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUnblockUser(user.id)}
                        className="px-2 py-1 text-sm font-medium text-green-600 bg-green-200 rounded-full hover:bg-green-300 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        Unblock
                      </button>
                    )}
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
