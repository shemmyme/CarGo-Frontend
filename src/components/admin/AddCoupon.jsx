import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../utils/Config";
import {toast,Toaster} from 'react-hot-toast'

function AddCoupons() {
  const initialCoupon = {
    coupon_code: "",
    end_date: "",
    discount_perc: "",
    start_date: "",
    description: "",
    image_1: [],
    max_use : '',
    uses_remaining:''
  };

  const [coupon, setCoupon] = useState(initialCoupon);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      for (const key in coupon) {
        if (Array.isArray(coupon[key])) {
          for (const image of coupon[key]) {
            formData.append(key, image);
          }
          console.log(formData, "formdata");
        } else {
          formData.append(key, coupon[key]);
        }
      }

      const response = await axios.post(
        BACKEND_BASE_URL + "/admin/addcoupon/",
        formData
      );

      if (response.status === 201) {
        toast.success('"Coupon added successfully')
        setTimeout(()=>{
          navigate("/admin/coupon/");
        },1500)
        setCoupon(initialCoupon);
      }else if (response.status == 208){
        toast.error('Coupon with the same Code exists')
      } else {
        alert("Failed to add coupon.");
      }
    } catch (error) {
      console.log(error, "errrrrrrrrrrrrrrrrrrrrrrrrorrrrrrrrrrrrrr");
    }
  };

  return (
    <div className="p-32 flex justify-center w-full">
      <Toaster/>
      <form>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Coupon Listing
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Add the coupons you wish to make applicable users
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="coupon_code"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Coupon Name
              </label>
              <div className="mt-2">
                <input
                  name="coupon_code"
                  onChange={(e) =>
                    setCoupon({ ...coupon, [e.target.name]: e.target.value })
                  }
                  type="text"
                  id="coupon_code"
                  className="form-control"
                  value={coupon.coupon_code}
                />
              </div>
              <label
                htmlFor="uses_remaining"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Uses Remaining
              </label>
              <div className="mt-2">
                <input
                  name="uses_remaining"
                  onChange={(e) =>
                    setCoupon({ ...coupon, [e.target.name]: e.target.value })
                  }
                  type="text"
                  id="uses_remaining"
                  className="form-control"
                  value={coupon.uses_remaining}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="discount_perc"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Discount Percentage 
              </label>
              <div className="mt-2">
                <input
                  name="discount_perc"
                  onChange={(e) =>
                    setCoupon({ ...coupon, [e.target.name]: e.target.value })
                  }
                  type="text"
                  id="discount_perc"
                  className="form-control"
                  value={coupon.discount_perc}
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className=" h-24 mt-2">
                <input
                  name="description"
                  onChange={(e) =>
                    setCoupon({ ...coupon, [e.target.name]: e.target.value })
                  }
                  id="description"
                  rows="3"
                  value={coupon.description}
                  className="block w-full h-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="form-label" htmlFor="start_date">
                Start Date <br />
              </label>
              <input
              
                name="start_date"
                onChange={(e) =>
                  setCoupon({ ...coupon, [e.target.name]: e.target.value })
                }
                type="date"
                id="start_date"
                className="form-control"
                value={coupon.start_date}
              />
            </div>

            <div className="sm:col-span-3">
              <label className="form-label" htmlFor="end_date">
                End Date <br />
              </label>
              <input
              
                name="end_date"
                onChange={(e) =>
                  setCoupon({ ...coupon, [e.target.name]: e.target.value })
                }
                type="date"
                id="end_date"
                className="form-control"
                value={coupon.end_date}
              />
            </div>

            <div className="sm:col-span-4">
              <label className="form-label" htmlFor="max_uses">
                Max usage<br />
              </label>
              <input
                value={coupon.max_uses}
                name="max_uses"
                onChange={(e) => {
                  !isNaN(e.target.value) &&
                    setCoupon({
                      ...coupon,
                      [e.target.name]: e.target.value,
                    });
                }}
                type="text"
                id="max_uses"
                className="form-control"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="form-label" htmlFor="image_1">
                Image
              </label>
              <br />
              <input
                multiple
                name="image_1"
                onChange={(e) =>
                  setCoupon({
                    ...coupon,
                    [e.target.name]: Array.from(e.target.files),
                  })
                }
                type="file"
                id="image_1"
                className="form-control"
              />
            </div>

          </div>

          <div className="pt-11 text-center">
            <button
              onClick={handleSubmit}
              className="btn btn-outline-dark"
              type="button"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default AddCoupons;
