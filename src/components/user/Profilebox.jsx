import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LiveCam from "./LiveCam";
import jwtDecode from "jwt-decode";
import { BACKEND_BASE_URL } from "../../utils/Config";
import {toast,Toaster} from "react-hot-toast";

const Profilebox = () => {
  const token = localStorage.getItem("authToken");
  const decoded = jwtDecode(token);
  const [username, setUsername] = useState('');
  const [selectedProfilePhoto, setSelectedProfilePhoto] = useState(null);

  const initialUser = {
    licenseFront: null,
    licenseBack: null,
  };

  const [user, setUser] = useState(initialUser);


  
  useEffect(() => {
    fetch(BACKEND_BASE_URL + `/api/profile/${decoded.user_id}/`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setUsername(data.username)
        setSelectedProfilePhoto(BACKEND_BASE_URL + data.profile_img);
      })
      .catch((error) => {
        console.log("error fetch", error);
      });
  }, []);

  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    setSelectedProfilePhoto(file);
    // setSelectedProfilePhoto(URL.createObjectURL(file));
  };
  

  const handleLicenseFrontChange = (e) => {
    const file = e.target.files[0];
    setUser({
      ...user,
      licenseFront: file,
    });
  };

  const handleLicenseBackChange = (e) => {
    const file = e.target.files[0];
    setUser({
      ...user,
      licenseBack: file,
    });
  };

  const nav = useNavigate();

  // const handelEdit = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append('username', username); // Add the updated username to the FormData
  //     if (selectedProfilePhoto) {
  //       formData.append('profile_img', selectedProfilePhoto); // Add the profile photo to FormData
  //     }

  //     const response = await axios.patch(
  //       `${BACKEND_BASE_URL}/api/profileup/${decoded.user_id}/`,
  //       formData,
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       }
  //     );

  //     if (response.status === 201) {
  //       toast.success('Your Profile is successully edited')
  //     } else {
  //       alert('Failed to update profile.');
  //     }
  //   } catch (error) {
  //     console.error('Error updating profile:', error);
  //   }
  // };

  const handleSubmit = async () => {
  try {
    const formData = new FormData();
    formData.append('licenseFront', user.licenseFront);
    formData.append('licenseBack', user.licenseBack);
    formData.append("username", username); // Add the updated name to the FormData
    if (selectedProfilePhoto) {
      formData.append("profile_img", selectedProfilePhoto);
    }
    console.log(token,'tokeeeeeeeeeeeeeeeeeeeeeen');


    const response = await axios.patch(
      BACKEND_BASE_URL + `/api/profileup/${decoded.user_id}/`,
      formData,
      {
        headers: {
          // Authorization: `Bearer ${token.access}`, 
          'Content-Type': 'multipart/form-data', 
        },
      }
    );

    if (response.status === 201) {
      toast.success('Chages saved successfully!');
      window.location.reload();
    } else {
      toast.error('Failed to save changes');
    }
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error uploading license images:', error);
  }
};

  
  return (
    <div className="w-full border rounded-xl shadow-md h-fit m-5">
      <Toaster/>
      <div style={{ opacity: 1 }}>
        <div className="section-container ">
          <div className="md:block hidden">
            <h2 className="py-2  pl-3 text-base font-semibold leading-7 text-gray-900">
              My Profile
            </h2>
            <hr />
          </div>
          <div className="md:flex">
            <div className="avatar md:ml-6  ml-36 mt-3 mb-3  ">
              <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <label>
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePhotoChange}
          style={{ display: 'none' }}
        />
        {selectedProfilePhoto ?(
          <img
          src={selectedProfilePhoto || BACKEND_BASE_URL + user.profile_img}
          alt=""
          className="w-24 h-24 rounded-full object-cover cursor-pointer"
        />
        ):''}
        
      </label>
              </div>
            </div>
            <div className="w-full bg-red- md:ml-24 pr-6">
              <div className=" pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Username
                    </label>
                    <div className="mt-2">
                      <input
                        value={username}
                        type="text"
                        onChange={handleNameChange}
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email
                    </label>
                    <div className="mt-2">
                      <input
                        value={decoded.email}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  
                </div>
              </div>
              {/* <button  onClick={handelEdit}>Update Profile</button> */}

            </div>
          </div>
          <form onSubmit={handleSubmit}>
  <div className="text-center">
    <p className="font-body pt-6 text-[25px]">Upload Your License to be able to Book a Car</p>
  </div>
  <div className="lg:flex">
    <div className="lg:w-1/2 h-full pr-8 lg:pr-0 m-2 rounded-md">
      <div className="w-full rounded overflow-hidden">
        <label htmlFor="license-front" className="relative cursor-pointer rounded-md">
          <img
            className="h-64 w-full lg:ml-10 rounded overflow-hidden shadow-lg"
            src={user.licenseFront ? `${BACKEND_BASE_URL}${user.licenseFront}` : ''}
            alt="License Front"
          />
          <input
            id="license-front"
            name="license-front"
            type="file"
            onChange={handleLicenseFrontChange}
            className="hidden"
          />
        </label>
      </div>
    </div>
    <div className="lg:w-1/2 h-full pr-8 lg:pr-0 m-2 rounded-md">
      <div className="w-full rounded overflow-hidden">
        <label htmlFor="license-back" className="relative cursor-pointer rounded-md">
          <img
            className="h-64 w-full lg:ml-10 rounded overflow-hidden shadow-lg"
            src={user.licenseBack ? `${BACKEND_BASE_URL}${user.licenseBack}` : ''}
            alt="License Back"
          />
          <input
            id="license-back"
            name="license-back"
            type="file"
            onChange={handleLicenseBackChange}
            className="hidden"
          />
        </label>
      </div>
    </div>
  </div>
</form>

          <div className="justify-center  flex ">
              {
                
                user.livePhoto ? 
                <img
                className="h-56 rounded-lg ml-10"
                src={BACKEND_BASE_URL +`${user.livePhoto}`}
                alt="Hello"
              />
                :
                <LiveCam />

              }
            </div>
            <div className="col-span-full flex py-2 justify-center">
            <div>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 w-28 bg-blue-600 hover:bg-blue-400 text-white rounded-lg"
            >
              Save
            </button> 
            </div>
            
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profilebox;
