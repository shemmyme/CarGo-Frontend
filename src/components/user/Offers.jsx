import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BACKEND_BASE_URL } from '../../utils/Config';

function Offers() {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BACKEND_BASE_URL + '/admin/listcoupon/');
        if (response.status === 200) {
          const data = response.data;
          setCoupons(data);
        } else {
          console.error('Failed to fetch coupon data.');
        }
      } catch (error) {
        console.log('Error fetching coupon data:', error);
      }
    };

    fetchData();
  }, []);

  const visibleCoupons = coupons.slice(0, 4); // Show up to 4 coupons

  return (
    <div>
      <div className="mx-auto text-center md:max-w-xl lg:max-w-3xl">
      <h3 className="mb-4 text-3xl font-bold text-neutral-800 dark:text-neutral-200">
        Offers
      </h3>
      <p className="mb-6 pb-2 md:mb-12 md:pb-0">
        With these Offers, you can have the best discount for the car you would love
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
      {visibleCoupons.length === 0 ? (
        <p>No offers right now</p>
      ) : (
        visibleCoupons.map((coupon) => (
          <div
            key={coupon.id}
            className="block rounded-lg bg-white shadow-md dark:bg-neutral-700 p-4"
          >
            <a>
              <img
                className="rounded-t-lg w-full h-40 object-cover"
                src={coupon.image_1}
                alt=""
              />
            </a>
            <div className="p-4">
  <h5 className="mb-2 text-lg font-semibold leading-tight text-primary dark:text-white">
    {coupon.coupon_code}
  </h5>
  <p className="mb-2 text-sm text-neutral-600 dark:text-neutral-300">
    {coupon.description}
  </p>
  <div className="text-xs text-neutral-600">
    <p className="mb-1 text-gray-500 dark:text-gray-400">
      Starting From: {coupon.start_date}
    </p>
    <p className="mb-1 text-gray-500 dark:text-gray-400">
      Ending On: {coupon.end_date}
    </p>
  </div>
</div>

          </div>
        ))
      )}
    </div>
    </div>
  );
}

export default Offers;
