import React from 'react'
import { Navigate } from 'react-router-dom'

function RefreshSetup(props) {
    const auth = localStorage.getItem('authToken')
    if (auth){
        return <Navigate to='/' />
    }
        return props.children   
}
export default RefreshSetup