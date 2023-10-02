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




const CarDetails = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false); 
  const [userVerified, setUserVerified] = useState(false);  

  const nav = useNavigate();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(
          BACKEND_BASE_URL + `/api/cars/${carId}/`
        );
        setCar(response.data);
        setCurrentImage(response.data.image_1);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarDetails();

    const token = localStorage.getItem("authToken");

if (token) {
  setUserLoggedIn(true);
  const decoded = jwtDecode(token);
  if (decoded && decoded.is_verified) {
    setUserVerified(true);
  } else {
    setUserVerified(false);
  }
  console.log(decoded,'nokkkye');
  console.log(userVerified,'verified aano nok');
} else {
  setUserLoggedIn(false);
  setUserVerified(false);
}
  }, [carId]);
  

  const handleImageClick = (imageUrl) => {
    setCurrentImage(imageUrl);
  };

  if (!car) {
    return <div>Loading...</div>;
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
                    Chat with Owner
                  </Button>
                </Grid>
              </Grid>
              <ul className="reviews-list h-25 my-4">No reviews uploaded</ul>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CarDetails;
