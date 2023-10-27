import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../utils/Config';
import './CarDetails.css';  
import jwtDecode from "jwt-decode";
import StarRate from './StarRate';
import Spinner from './Spinner';




const CarDetails = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false); 
  const [userVerified, setUserVerified] = useState(false); 
  const [reviews,setReviews] = useState('')
  const [selectedCarId, setSelectedCarId] = useState(null);
  const token = localStorage.getItem("authToken");
  const decoded =  token ? jwtDecode(token) : '';
  
  
    const nav = useNavigate();
  
    useEffect(() => {
      const fetchCarDetails = async () => {
        try {
          const response = await axios.get(
            BACKEND_BASE_URL + `/api/cars/${carId}/`
          );
          setCar(response.data);
          setCurrentImage(response.data.image_1);
          setSelectedCarId(response.data.id);
        } catch (error) {
          console.error('Error fetching car details:', error);
        }
      };
  
      fetchCarDetails();
    }, [carId]);

    useEffect(() => {
      fetch(`http://localhost:8000/api/profile/${decoded.user_id}/`)
        .then((response) => response.json())
        .then((data) => {
          if (data){
            setUserLoggedIn(true)
          }
          if (data.is_verified) {
            setUserVerified(true);
          }
          console.log(data, 'indoooooooo nokkkkkkk');
        })
        .catch((error) => {
          console.log("error fetch", error);
        });
    }, []);
    
  
    useEffect(() => {
      const fetchReviews = async () => {
        try {
          const response = await axios.get(
            BACKEND_BASE_URL + `/rentals/reviews/list/${selectedCarId}`
          );
          setReviews(response.data);
        } catch (error) {
          console.error('Error getting reviews list', error);
        }
      };
  
      fetchReviews();
    }, [selectedCarId]);
  
    const handleImageClick = (imageUrl) => {
      setCurrentImage(imageUrl);
    };
  
    if (!car) {
      return <div className="h-screen flex items-center justify-center">
      <Spinner color="text-primary" />
      <Spinner color="text-secondary" />
      <Spinner color="text-success" />
      <Spinner color="text-danger" />
      <Spinner color="text-warning" />
      <Spinner color="text-info" />
      <Spinner color="text-neutral-100" />
    </div>
    }

  return (
    
    <Container maxWidth="lg" className="product-details-container">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined" className="w-full bg-red-6006">
            <CardContent>
              <div className="zoom-image">
                <img
                  src={BACKEND_BASE_URL + currentImage}
                  alt="loading"
                  className="img-fluid justify-center main-image" 
                />
              </div>
              <Grid container spacing={2} mt={4}>
                <Grid item xs={4}>
                  <img
                    src={BACKEND_BASE_URL + car.image_1}
                    alt=""
                    className="img-fluid sub-images" 
                    onClick={() => handleImageClick(car.image_1)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <img
                    src={BACKEND_BASE_URL + car.image_2}
                    alt="loading"
                    className="img-fluid sub-images" 
                    onClick={() => handleImageClick(car.image_2)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <img
                    src={BACKEND_BASE_URL + car.image_3}
                    alt="loading"
                    className="img-fluid sub-images" 
                    onClick={() => handleImageClick(car.image_3)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h4" component="div" className="product-name">
                {car.product_name}
              </Typography>
              <Typography variant="subtitle1" className="product-brand">
                Brand: {car.model}
              </Typography>
              <Typography variant="h5" className="product-price">
                Rs. {car.rent_amount}
              </Typography>
              <Typography variant="body1" className="product-description">
                {car.description}
              </Typography>
              <Grid container spacing={2} mt={4}>
                <Grid item xs={6}>
                {userLoggedIn ? (
  userVerified ? (
    <Button
      onClick={() => nav(`/cars/${car.id}/checkout/`)}
      variant="contained"
      color="primary"
      fullWidth
    >
      Book Now
    </Button>
  ) : (
    <Button
      variant="contained"
      color="primary"
      fullWidth
    >
      Not Verified Yet
    </Button>
  )
) : (
  <Button
    onClick={() => nav('/login')}
    variant="contained"
    color="primary"
    fullWidth
  >
    Login
  </Button>
)}
                </Grid>
                <Grid item xs={6}>
                   <Button onClick={()=> nav('/chat') } variant="contained" color="primary" fullWidth>
                    Chat To Know More
                  </Button>
                </Grid>
              </Grid>
              {reviews.length==0?(
          <p className="text-center">No Reviews Yets</p>

              ):(
                reviews.map((review)=>(
        <div key={review.id} className="max-w-3xl">
          <div className="m-4 block rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-800 dark:shadow-black/20">
            <div className="md:flex md:flex-row">
                  
              <div  className="md:ml-6">
                <p className="mb-6 font-light text-neutral-500 dark:text-neutral-300">
                 {review.comment}
                </p>
                <p className="mb-2 text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                <StarRate rating={review.rating} size="text-3xl" /> 
                </p>
                <p className="mb-0 text-lg font-medium text-gray-900 dark:text-white">
                {review.user.id === decoded.id ? "By Yourself" : review.user.username}
                </p>
              </div>
            </div>
          </div>
        </div>
        ))
        )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CarDetails;
