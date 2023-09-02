import image from '../../public/happy-family-unloading-luggage-from-the-car-for-royalty-free-image-1656517251.jpg';

const Banner = () => {
    return (
        <div className="h-96 md:flex" style={{ backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
           
            <div className='w-full md:flex '>
                <div className='text-white font-sans text-3xl  text-center w-full md:w-2/3 h-full '>
                    <h1 className='pt-28'>Rent a car from best car rental - CarGo</h1>
                    <p className='text-sm'>CarGo is one of the most trusted car rental services. The rent-a-car service provider offers an outstanding model and a wide variety
 of vehicle options at the most competitive rates. At CarGo, we allow you to enjoy flexibility with
respect to start and endpoints. You can book cars on a daily, weekly, monthly basis.
Moreover, we provide door-step delivery, believe in complete transparency, and adhere strictly to
business ethics.</p>
                </div>
                <div>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
            <div>
            <h1 className="text-white bg-yellow-500 h-12 w-64 text-center pt-3 rounded-lg">Find the right car now</h1>

            </div>
          <form className="space-y-6" >
            <div>
             
              <div className="mt-6">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
               
              </div>
              <div className="mb-8">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                GOO...
              </button>
            </div>
          </form>
        </div>
      </div>
                </div>
            </div>
            
            
        </div>
    )
}


export default Banner;