import React from 'react'
import CarsList from '../../components/user/CarsList'
import Navbar from '../../components/user/Navbar'
import LiveCam from '../../components/user/LiveCam'

function Cars() {
  return (
    <div>
        <Navbar/>
        <CarsList/>
    </div>
  )
}

export default Cars