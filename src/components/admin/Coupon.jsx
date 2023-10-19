import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../utils/Config";
import axios from "axios";

const Coupon = () => {
  const nav = useNavigate();
  const [coupons, setCoupons] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          BACKEND_BASE_URL + "/admin/listcoupon/",
          {
            params: {
              search: search,
            },
          }
        );
        if (response.status === 200) {
          const data = response.data;
          setCoupons(data);
        } else {
          console.error("Failed to fetch car data.");
        }
      } catch (error) {
        console.log("Error fetching car data:", error);
      }
    };

    fetchData();
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <section className="container px-4 mx-auto mt-10">
      <div className="relative mt-4 md:mt- w-1/2 ">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="w-5 h-5 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <input
          type="text"
          className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          Total Coupon
        </h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
          {coupons.length} Coupon
        </span>
      </div>

        <div className="pt-2">
          <button
            onClick={() => nav("/admin/addcoupons")}
            className="px-3 py-2 text-xs text-blue-600 bg-yellow-100 dark:bg-gray-800 opacity-80"
          >
            Add Coupons
          </button>
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
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Status</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="p-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Image
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
                  {coupons.length == 0 ? (
                    <p className="text-center">No Coupons found</p>
                  ) : (
                    coupons.map((coupon) => (
                      <tr>
                        <td className="py-3.5 px-4 text-sm font-medium text-gray-800 dark:text-white">
                          {coupon.coupon_code}
                        </td>
                        <td className="px-12 py-3.5 text-sm font-medium text-green-600">
                          {coupon.active}
                        </td>
                        <td className="  text-sm text-gray-800 dark:text-gray-400">
                          <img
                            className="w-28 h-24 rounded-lg m-3"
                            src={coupon.image_1}
                            alt=""
                          />
                        </td>
                        <td class="p-3 md:w-96  text-sm text-gray-800 dark:text-gray-400 sm:block sm:h-auto sm:w-full sm:p-1">
                          {coupon.description}
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
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coupon;
