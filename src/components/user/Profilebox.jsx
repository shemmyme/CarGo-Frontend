import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LiveCam from "./LiveCam";
import jwtDecode from "jwt-decode";
import { BACKEND_BASE_URL } from "../../utils/Config";

const Profilebox = () => {
  const token = localStorage.getItem("authToken");
  const decoded = jwtDecode(token);

  const initialUser = {
    licenseFront: null,
    licenseBack: null,
  };

  const [user, setUser] = useState(initialUser);
  const [photo, setPhoto] = useState([]);
  
  useEffect(() => {
    fetch(BACKEND_BASE_URL + `/api/profile/${decoded.user_id}/`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.log("error fetch", error);
      });
  }, []);

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

  const handleSubmit = async () => {
  try {
    const formData = new FormData();
    formData.append('licenseFront', user.licenseFront);
    formData.append('licenseBack', user.licenseBack);
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
      alert('License images uploaded successfully!');
    } else {
      alert('Failed to upload license images.');
    }
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error uploading license images:', error);
  }
};

  
  return (
    <div className="w-full border rounded-xl shadow-md h-fit m-5">
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
                <img
                  src={BACKEND_BASE_URL + user.profile_img}
                  className="rounded-full w-24 h-24 "
                  alt="profile"
                />
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
                        value={decoded.username}
                        type="text"
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
            </div>
          </div>
          <form onSubmit={handleSubmit}>
          <div className="lg:flex  ">
            <div className="lg:w-1/2 h-full pr-8 lg:pr-0  m-2 rounded-md">
              {user.licenseFront?.length >= 1 && user.licenseFront ? (
                <div class="w-full rounded overflow-hidden ">
                <img
                  class=" h-64 w-full lg:ml-10  rounded overflow-hidden shadow-lg"
                  src={ BACKEND_BASE_URL+user.licenseFront}
                  alt="License Front"
                />
              </div>
              ) : (
                
                <div className="flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 h-64">
                <div className="text-center">
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="license-front"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload License Front</span>
                      <input
                        id="license-front"
                        name="license-front"
                        type="file"
                        onChange={handleLicenseFrontChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              )}
            </div>
            <div className="lg:w-1/2 h-full pr-8 lg:pr-0  m-2 rounded-md">

            {user.licenseBack?.length >= 1 && user.licenseBack ? (
               
              <div class="w-full rounded overflow-hidden ">
                <img
                  class=" h-64 w-full lg:ml-10  rounded overflow-hidden shadow-lg"
                  src={ BACKEND_BASE_URL+user.licenseFront}
                  alt="License Back"
                />
              </div>
            ) : (
             
              <div className="flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 h-64">
                <div className="text-center">
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="license-back"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload License Back</span>
                      <input
                        id="license-back"
                        name="license-back"
                        type="file"
                        onChange={handleLicenseBackChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            )}
          </div>
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
          </form>
          <div>
              {
                
                user.livePhoto ? 
                <img
                className="h-56 rounded-lg ml-10"
                src={BACKEND_BASE_URL +`${user.livePhoto}`}
                alt="Hello"
              />
                :
                <LiveCam  />

              }
            </div>

        </div>
      </div>
    </div>
  );
};

export default Profilebox;
