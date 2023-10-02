import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment'; // Import the moment library
import { useParams } from 'react-router-dom';
import { BACKEND_BASE_URL } from '../../utils/Config';

const Checkout = () => {
  const { carId } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [car, setCar] = useState(null);
  const [totalCost, setTotalCost] = useState(0); 
  const [grandTotal,setGrandTotal] = useState(0)
  const [totalDays,setTotalDays] = useState(0)
  const [bookinstatus,setBookingStatus] = useState('')

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(
          BACKEND_BASE_URL + `/api/cars/${carId}/`
        );
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarDetails();
  }, [carId]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    calculateTotalCost(date, endDate);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    calculateTotalCost(startDate, date);
  };

  const calculateTotalCost = (start, end) => {
    if (car) {
      const startMoment = moment(start);
      const endMoment = moment(end);
      const numberOfDays = endMoment.diff(startMoment, 'days') + 1;
      const cost = car.rent_amount * numberOfDays;
      const total = cost + 450
      setTotalCost(cost);
      setGrandTotal(total)
      setTotalDays(numberOfDays)
    }
  };

  const handleCheckout = async (car) => {
    try {
      const response = await axios.post(
        BACKEND_BASE_URL + `/booking/cars/${carId}/checkout`, 
        {
          carId: car.id,
          startDate: startDate.toISOString(), // Convert to ISO string format
          endDate: endDate.toISOString(), // Convert to ISO string format
        }
      );
      console.log(response,'reszzzzzzzzponsnnse');
  
      if (response.status === 201) {
        setBookingStatus('success');
      } else {
        setBookingStatus('error');
      }
    } catch (error) {
      console.error('Error booking the car:', error);
      setBookingStatus('error');
    }
  };
  

  if (!car) {
    return <div>Loading...</div>; // Render a loading indicator while fetching data
  }
  return (
    <div className="sm:px-6 px-4 py-4 lg:px-2">
      <div className="flex">
        <div className="w-40 h-28">
          <div className="w-full h-full">
            <img
              src={car.image_1}
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
            <span className="text-sm">{car.model},{car.fuel}</span>
          </div>
        </div>
      </div>
      <div className="px-6">
        <div className="text-xs mt-4 text-gray-500">

          <p className="mt-2">Extra Kms @ 9/km</p>
          <p className="mt-2">Total travel Days: {totalDays}</p>
        </div>
        <div className="flex mt-6">
        <div className="w-full border-l border-y py-2 px-4 rounded-l-lg">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">Pick up date</h4>
          {/* Display the DatePicker component */}
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            minDate={new Date()} // Prevent selecting past dates
            className="text-sm text-pistachio"
          />
        </div>
      </div>
          
          <div className="border my-2"></div>
          <div className="w-full border-r border-y py-2 px-4 rounded-r-lg">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">Drop off date</h4>
          {/* Display the DatePicker component */}
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            minDate={startDate} // Prevent selecting a date before the start date
            className="text-sm text-pistachio"
          />
        </div>

          </div>
        </div>
        <div className="border rounded-lg mt-6 px-4 py-2">
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
                  >
                  </svg>
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
        <div>
          <button onClick={handleCheckout}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};


export default Checkout;
