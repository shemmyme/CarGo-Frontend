import { useNavigate } from 'react-router-dom';
import image from '../../../public/happy-family-unloading-luggage-from-the-car-for-royalty-free-image-1656517251.jpg';
import image1 from '../../../public/banner2.jpg'
import img from '../../../public/car5.png'
import {useState} from 'react'

const Banner = () => {

  const navigate = useNavigate()
  const [startDate,setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const currentDate = new Date().toISOString().split('T')[0];


  const handleStartDateChange = (e)=>{
    setStartDate(e.target.value)
  }

  const handleEndDateChange=(e)=>{
    setEndDate(e.target.value)
  }

  const handleGo = () => {
    console.log('clicked');
    navigate(`/cars?start_date=${startDate}&end_date=${endDate}`);
  };
  
    return (
        <div className="h-[550px] md:flex brightness-75 " style={{ backgroundImage: `url(${image1})`,
        backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
           
            <div className='w-full md:flex space-x-36 '>
                <div className='text-white brightness-100  font-sans text-3xl  text-center w-full md:w-2/3 h-full '>
                    <p className='pt-28 brightness-100 font-bold text-4xl text-[50px] text-white  leading-'>Rent a car from best car rental -<br /> CarGo</p>
                    <p className='text-xl brightness-100 font-medium pt-5 '>CarGo is one of the most trusted car rental services. The rent-a-car service provider offers an outstanding model and a wide variety
 of vehicle options at the most competitive rates. At CarGo, we allow you to enjoy flexibility with
respect to start and endpoints. You can book cars on a daily, weekly, monthly basis.
Moreover, we provide door-step delivery, believe in complete transparency, and adhere strictly to
business ethics.</p>
                </div>
                <div>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm  w-full  bg-white rounded-xl">
          <div className='bg-[#f6f8e5] p-8 w-full h-20 rounded-xl'>
<div className='text-lg text-center -mt-5'>Find the right car now !</div>
<div className='flex justify-center'> 
  <div>
  <img className='h-16 w-16' src="/public/car5.png" alt="" />
  </div>
  </div>
          </div>
            {/* <div className='p-10 '>
            <h1 className="text-white bg-yellow-500 h-12 w-64 text-center pt-3  rounded-lg">Find the right car now</h1>

            </div> */}
          <form className="space-y-6 p-24  scroll   -mt-16" >
            <div className='w-full'>
            <div className='w-[100%] bg-blue-gray-600'>
             
              <div className="mt-6 ">
              <input
            type="date"
            value={startDate}
            min = {currentDate}
            onChange={handleStartDateChange}
                  className="block -ml-14 w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            </div>

            <div>
              <div className="flex items-center justify-between ">
               
              </div>
              <div className="mb-8">
              <input
            type="date"
            value={endDate}
            min={startDate}
            onChange={handleEndDateChange}
            className="block -ml-14 w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
              </div>
            </div>

            <div>
              <button
                onClick={handleGo}
                type="button"
                className="flex -ml-14 w-[300px] justify-center rounded-md bg-[#adb507] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                GOO...
              </button>
            </div>
          </form>
        
<div className='flex border border-solid border-l-0 border-b-0  '>

<div className='flex  ' >
<div><img src="" alt="img1" /></div>
<div><p>Doorstep delivery
Available in your city</p></div>

</div>
<div className='flex'>
<div><img src="" alt="img2" /></div>


<div>Choose your 
KM Package</div>



</div>

</div>



        </div>



      </div>
                </div>
            </div>
            
            
         </div>
    )
}


export default Banner;