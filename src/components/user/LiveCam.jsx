import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios"; 
import { BACKEND_BASE_URL } from "../../utils/Config";
import jwtDecode from "jwt-decode";

function LiveCam() {
    const token = localStorage.getItem("authToken");
    const decoded = jwtDecode(token);
    const webcamRef = useRef(null);
    const [img, setImg] = useState(null);
  
    const capture = async () => {
      const imgSrc = webcamRef.current.getScreenshot();
      setImg(imgSrc);
  
      
      try {
        const formData = new FormData();
        formData.append("livePhoto", dataURItoBlob(imgSrc));
        
  
        const response = await axios.patch(
            BACKEND_BASE_URL + `/api/profileup/${decoded.user_id}/`,
            formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        if (response.status === 201) {
          console.log("Live photo uploaded successfully!");
        } else {
          console.error("Failed to upload live photo.");
        }
      } catch (error) {
        console.error("Error uploading live photo:", error);
      }
    };
  
    // Function to convert data URI to Blob
    function dataURItoBlob(dataURI) {
      const splitDataURI = dataURI.split(",");
      const byteString = atob(splitDataURI[1]);
      const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    }
  
    return (
      <>
        <div className="flex ml-5">
          <div>
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="h-56"
            />
            <button
              className="flex btn bg-indigo-500 text-white h-10 text-center text-sm ml-20 mt-3 rounded-lg pt-2"
              onClick={capture}
            >
              Capture Photo
            </button>
          </div>
          <br />
          {img && (
            <img
              className="h-56 rounded-lg ml-10"
              src={img}
              alt="Hello"
            />
          )}
        </div>
      </>
    );
  }
  
  export default LiveCam;