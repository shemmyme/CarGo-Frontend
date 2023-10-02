import { useState } from 'react';
import {FaUserSecret} from 'react-icons/fa'
import { useUserContext } from '../context/UsersContext';
import { useCarsContext } from '../context/CarsContext';

const DetailBox = () => {
    
    const users = useUserContext()
    const {cars} = useCarsContext()

    return (
        <>
            <div className="flex items-center px-6 py-8 bg-white rounded-lg shadow-md shadow-gray-200 ml-36 ">
                <div className="flex items-center -mx-2 ">
                   
                {/* <FaCircleUser/> */}

                    <div className="mx-2">
                        <h3 className="text-2xl font-medium text-gray-800 ml-2">{users.length}</h3>
                        <p className="mt-1 font-sans text-sm text-gray-500 ml-2 font-semibold">Users</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center px-6 py-8 bg-white rounded-lg shadow-md shadow-gray-200">
                <div className="flex items-center -mx-2">
                <div className="mx-2">
                        <h3 className="text-2xl font-medium text-gray-800 ml-2">{cars.length}</h3>
                        <p className="mt-1 font-sans text-sm text-gray-500 ml-2 font-semibold">Cars</p>
                    </div>

                    
                </div>
            </div>


            <div className="flex items-center px-6 py-8 bg-white rounded-lg shadow-md shadow-gray-200">
                <div className="flex items-center -mx-2">
                <div className="mx-2">
                        <h3 className="text-2xl font-medium text-gray-800 ml-2">100</h3>
                        <p className="mt-1 font-sans text-sm text-gray-500 ml-2 font-semibold">Sales</p>
                    </div>
                </div>
            </div>


        </>
    )
}

export default DetailBox;

