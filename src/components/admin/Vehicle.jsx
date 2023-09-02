const Vehicle = () => {
    return (
      <section className="container px-4 mx-auto mt-10">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            Total Vehicles
          </h2>
  
          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            100 Vehicles
          </span>
        </div>
  
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Name</span>
                        </div>
                      </th>
  
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Status</span>
                        </button>
                      </th>
  
                      <th
                        scope="col"
                        className="p-3  text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Image
                      </th>
                      <th
                        scope="col"
                        className="p-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="p-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="ptext-sm pr-20 font-normal text-right text-gray-500 dark:text-gray-400"
                      >
                        Edit
                      </th>
                      
                    </tr>
                  </thead>
  
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800">
                    {/* Mapping through team members */}
                    {/* Replace this part with your dynamic data */}
                    <tr>
                      <td className="py-3 px-4 text-sm font-medium text-gray-800 dark:text-white">
                        John Doe
                      </td>
                      <td className="px-12 text-sm font-medium text-green-600">
                        Active
                      </td>
                      <td className=" p-3 text-sm text-gray-800 dark:text-gray-400">
                        <img className="w-40 h-32 rounded-lg" src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80" alt="" />
                      </td>
                      <td className="p-3 text-sm text-gray-800 dark:text-gray-400">
                        3000
                      </td>
                      <td className="p-3  w-96 text-sm text-gray-800 dark:text-gray-400">
                      A car, or an automobile, is a motor vehicle with wheels. Most definitions of cars say that they run primarily on roads, seat one to eight people, have four wheels, and mainly transport people, not cargo.
                      </td>
                      
                      <td className=" text-sm whitespace-nowrap  h-20 w-20">
                        <div className="flex items-center gap-x-6">
                          <button className=" text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
  
                          <button className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                    {/* More team members */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Vehicle;
  