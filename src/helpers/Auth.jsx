import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default async function login(e) {
  let response = await fetch("http://localhost:8000/api/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: e.target.username.value,
      password: e.target.password.value,
    }),
  });

  let data = await response.json();
  console.log("data from auth", data);

  if (response.status === 200) {
    // Store the token and user ID in localStorage
    localStorage.setItem("authToken", data.refresh);
    localStorage.setItem("userId", data.id);
    
    toast.success("Login Success");
    return data;
  } else {  
    // Handle login failure here, e.g., show an error message
  }
}

export function getLocal() {
  let response = localStorage.getItem("authToken");
  return response;
}
