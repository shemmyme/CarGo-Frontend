import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment"; // Import the moment library
import { useParams } from "react-router-dom";
import { DialogCustomAnimation } from "./ConfirmModal";
import Navbar from "../../components/user/Navbar";
import jwtDecode from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_BASE_URL } from "../../utils/Config";
import Paypal from "./Paypal";
import useRazorpay from 'react-razorpay';


const Checkout = () => {
  const initialOptions = {
    clientId:
      "ARZWhEaMFhfAyhGiTUChP6jZktzp2M07CUtlYL6soCCFU3xcU1FZHIqKI3SHWVRj3A_Z9oXkt3lHKglw",
    currency: "USD",
    intent: "capture",
  };

  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [totalCost, setTotalCost] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [bookinstatus, setBookingStatus] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showPayPalButton, setShowPayPalButton] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [user,setUser] = useState()
  const token = localStorage.getItem('authToken')
  const decoded = jwtDecode(token)  
  const [amount, setAmount] = useState(500);
  const [Razorpay] = useRazorpay();


  useEffect(() => {
    fetch(BACKEND_BASE_URL + `/api/profile/${decoded.user_id}/`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
  }, []);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(
          BACKEND_BASE_URL + `/api/cars/${carId}/`
        );
        setCar(response.data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchCarDetails();
  }, [carId]);

  const calculateDropOffTime = () => {
    const dropOffDateTime = moment(startDate + " " + startTime).add(24, "hours");
    setEndTime(dropOffDateTime.format("HH:mm"));
  };

  const currentDate = new Date().toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(startDate);


  
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    calculateTotalCost(e.target.value, endDate);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    calculateTotalCost(startDate, e.target.value);
  };

  // const handleSelectedPlace = (e) => {
  //   setSelectedPlace(e.target.value);
  // };

  const handleStartTime = (e) =>{
    setStartTime(e.target.value)
  }

  const calculateTotalCost = (start, end) => {
    if (car) {
      const startMoment = moment(start);
      const endMoment = moment(end);
      const numberOfDays = endMoment.diff(startMoment, "days") + 1;
      const cost = car.rent_amount * numberOfDays;
      const total = cost + 450;
      setTotalCost(cost);
      setGrandTotal(total);
      setTotalDays(numberOfDays);
    }
  };

  const handleCheckout = async () => {
    // Check if the 'car' object is defined
    if (!car || !car.id) {
      toast.error('Car information is missing');
      return;
    }

    // Check if the ending date is greater than or equal to the starting date
    if (new Date(endDate) < new Date(startDate)) {
      toast.error('Ending date must be equal to or later than the starting date');
      return;
    }

    calculateDropOffTime();
    try {
      const response = await axios.post(
        BACKEND_BASE_URL + `/rentals/car-booking/`,
        {
          car: car.id,
          start_date: startDate,
          end_date: endDate,
          user: user.id,
          start_time: startTime,
          end_time: endTime,
          total_cost: grandTotal,
        }
      );
      console.log(car,'car in post');
      console.log(user,'user in post');
  
      if (response.status === 200) {
        setBookingStatus("success");
        toast.success('Success');
      } else {
        setBookingStatus("error");
      }
    } catch (error) {
      console.error("Error booking the car:", error);
      toast.error('Slot is not available');
      console.error("Response data:", error.response);
      setBookingStatus("error");
      console.log(
        carId,
        car,
        user,
        car.id,
        user.id,
        "Enthenkilu indaaaaaaaaaaaa data in post"
      );
    }
  };
  const handlePayment = () => {
    setShowPayPalButton(true)
  };

  
  if (!car) {
    return <div>Loading...</div>; // Render a loading indicator while fetching data
  }

  const complete_payment = (payment_id,order_id,signature) => {
  
    axios
    .post(BACKEND_BASE_URL + `/rentals/order/complete/${decoded.user_id}/`, {
      "payment_id": payment_id,
      "order_id": order_id,
      "signature": signature,
      "amount": grandTotal,
      "currency": 'INR',
    })
    .then((response) => {

      if (response.status === 201) {
        handleCheckout();
      } else if (response.status === 400) {
        // Slot is not available, display an error message
        // You might use a toast or an alert to show the message to the user
        // For example:
        alert('Slot not available');
      }
    })
    .catch((error) => {
      console.log(error.response);
    });
};
  const razorpayPayment = (payment_id,order_id,signature) => {
  
    axios
    .post(BACKEND_BASE_URL + `/rentals/order/create/${decoded.user_id}/`, {
      // "payment_id": payment_id,
      // "order_id": order_id,
      // "signature": signature,
      "amount": grandTotal,
      "currency": 'INR',
      "start_date": startDate, 
      "end_date": endDate,
      "car": car.id,

    }, {
      
    })
    .then(function (response) {
        const order_id = response.data.data.id;

        const options = {
          key: 'rzp_test_BBvPci4QCLpdZs',
          name: 'Cargo',
          description: 'To GO payment',
          order_id: order_id,
          handler: function (response) {
            complete_payment(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature
            );
          },
          prefill: {
            name: 'Cargo',
            email: 'cargo.rentals123@gmail.com',
            contact: '9999999999',
          },
          notes: {
            address: 'Cargo Rentals',
          },
          theme: {
            color: '#3399cc',
          },
        };

        const rzp1 = new Razorpay(options);

        rzp1.on('payment.failed', function (response) {
          alert(response.error.code);
          // alert(response.error.description);
          // alert(response.error.source);
          // alert(response.error.step);
          // alert(response.error.reason);
          // alert(response.error.metadata.order_id);
          // alert(response.error.metadata.payment_id);
        });

        rzp1.open();
      
    })
    .catch(function (error) {
      toast.error(error.response.data.message)
      console.log(error);
    });
};



  return (
    <>
      <Navbar />
      <ToastContainer/>
      <div className="container mx-auto mt-20 rounded-xl shadow-sm shadow-black p-10 ">
        <div className="flex ">
          <div className="w-40 h-28">
            <div className="w-full h-full">
              <img
                src={BACKEND_BASE_URL+car.image_1}
                alt="..."
                className="w-40 h-28"
                width="160"
                height="112"
              />
            </div>
          </div>
          <div className="ml-10">
            <h2 className="text-lg font-medium">{car.product_name}</h2>
            <div className="flex mt-1 text-sm items-center flex-wrap text-gray-500">
              <span className="text-sm">
                {car.model},{car.fuel}
              </span>
            </div>
          </div>
        </div>
        <div className="px-6">
          <div className="text-xs mt-4 text-gray-500">
            <p className="mt-2">Extra Kms @ 9/km</p>
            <p className="mt-2">Total travel Days: {totalDays}</p>
          </div>

          <div className="flex mt-6 rounded-lg shadow-sm shadow-black p-8 ">
            <div className="w-full border-l border-y py-2 px-4 rounded-l-lg">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Pick up date</h4>
                <input
                  type="date"
                  selected={startDate}
                  onChange={ (e) => handleStartDateChange(e)}
                  min={currentDate}
                  className="text-sm text-pistachio"
                />
              </div>
            </div>

            <div className="border my-2"></div>
            <div className="w-full border-r border-y py-2 px-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Drop off date</h4>
                <input
                  type="date"
                  selected={endDate}
                  onChange={ (e) => handleEndDateChange(e)}
                  min={startDate}
                  className="text-sm text-pistachio"
                />
              </div>
            </div>
            {/* <div className="border my-2"></div>
            <div className="w-full border-r border-y py-2 px-4">
              <div className="flex justify-between items-center">
                <select
                  id="dropdown"
                  value={selectedPlace}
                  onChange={handleSelectedPlace}
                >
                  <option value="">Select an option</option>
                  <option key={car.id}>{car.rental_place}</option>
                </select>
                {selectedPlace && <p>Selected option: {selectedPlace}</p>}
              </div>
            </div> */}
            <div className="border my-2"></div>

            <div className="w-full border-l border-y py-2 px-4 rounded-l-lg">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Pickup TIme</h4>
                <input
                  type="time"
                  value={startTime}
                  onChange={handleStartTime}
                />
              </div>
            </div>
          </div>

          <div className="border rounded-xl mt-6 px-4 py-2  rounded-r-lg  border-gray-600 p-20 ">
            <h4 className="font-medium mb-2">Price Details</h4>
            <div className="px-3">
              <div>
                <div className="flex justify-between text-sm text-gray-600 my-1">
                  <div className="flex items-center">
                    <span>Base Fare</span>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 16 16"
                      className=" text-pistachio ml-2 cursor-pointer"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    ></svg>
                  </div>
                  <div>
                    <span className="text-pistachio">{car.rent_amount}</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 my-1">
                  <div className="flex items-center">
                    <span>Fare for Selected No. of Days</span>
                  </div>
                  <div>
                    <span className="text-pistachio">{totalCost}</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 my-1">
                  <div className="flex items-center">
                    <span>Taxes and Fees</span>
                  </div>
                  <div>
                    <span className="text-pistachio">₹450</span>
                  </div>
                </div>
                <div className="border-b mt-2"></div>
                <div className="flex justify-between text-sm font-medium my-2">
                  <div className="flex items-center">
                    <span>Total Amount</span>
                  </div>
                  <div>
                    <span className="text-pistachio">{grandTotal}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-between p-1 mt-6 rounded-xl shadow-sm shadow-black ">
            <div className="flex flex-col items-center justify-center p-10 ">
              <h2 className="font-bold ">{grandTotal}</h2>
              <p className=" ">for 57 kms without fuel</p>
            </div>

            <div className="flex items-center justify-center p-10 ">
              <button
                className="bg-yellow-600 px-5 py-3 rounded-lg "
                onClick={razorpayPayment}
>
                Book Now
              </button>
            </div>
          </div>
        </div>
        

        <DialogCustomAnimation
          open={isDialogOpen}
          handler={() => setIsDialogOpen(false)}
          onConfirm={handleCheckout}
          totalCost={totalCost}
          grandTotal={grandTotal}
          totalDays={totalDays}
          showPayPalButton={showPayPalButton}
          handlePayment={handlePayment}
          initialOptions={initialOptions}
          handleCheckout={handleCheckout}
        />        
      </div>
    </>
  );
};

export default Checkout;

