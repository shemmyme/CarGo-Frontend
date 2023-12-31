import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../utils/Config";
import {Cloudinary} from "@cloudinary/url-gen";
import {toast,Toaster} from "react-hot-toast";



function AddCars() {
  const cloudinaryConfig = new Cloudinary({
    cloud_name: 'dom0eathi',
    api_key: '692764988371741',
  });


  const initialProduct = {
    coupon_code: "",
    discount_perc: "",
    description: "",
    start_date: "",
    end_date: "",
    image_1: [],
    max_uses: [],
  };

  const [product, setProduct] = useState(initialProduct);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      for (const key in product) {
        if (Array.isArray(product[key])) {
          for (const image of product[key]) {
            formData.append(key, image);
          }
          console.log(formData, "formdata");
        } else {
          formData.append(key, product[key]);
        }
      }

      const response = await axios.post(
        BACKEND_BASE_URL + "/admin/addcar/",
        formData
      );

      if (response.status === 201) {
        toast.success("Succesfully added a new car")
        setTimeout(()=>{
          navigate("/admin/listcar/");
        },1500)
        setProduct(initialProduct);
      } else {
        toast.error("Failed to add car.");
      }
    } catch (error) {
      toast.error("Complete all the fields")

      console.log(error, "errrrrrrrrrrrrrrrrrrrrrrrrorrrrrrrrrrrrrr");
    }
  };

  return (
    <div className="p-32 flex justify-center w-full">
      <Toaster/>
      <form>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Cars Listing
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Add the cars you wish to list in the user's side
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="product_name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Product Name
              </label>
              <div className="mt-2">
                <input
                  name="product_name"
                  onChange={(e) =>
                    setProduct({ ...product, [e.target.name]: e.target.value })
                  }
                  type="text"
                  id="product_name"
                  className="form-control"
                  value={product.product_name}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="model"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Model
              </label>
              <div className="mt-2">
                <input
                  name="model"
                  onChange={(e) =>
                    setProduct({ ...product, [e.target.name]: e.target.value })
                  }
                  type="text"
                  id="model"
                  className="form-control"
                  value={product.model}
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
                    setProduct({ ...product, [e.target.name]: e.target.value })
                  }
                  id="description"
                  rows="3"
                  value={product.description}
                  className="block w-full h-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label className="form-label" htmlFor="rent_amount">
                Rent Amount <br />
              </label>
              <input
                value={product.rent_amount}
                name="rent_amount"
                onChange={(e) => {
                  !isNaN(e.target.value) &&
                    setProduct({
                      ...product,
                      [e.target.name]: e.target.value,
                    });
                }}
                type="text"
                id="rent_amount"
                className="form-control"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="form-label" htmlFor="rental_place">
                Rental Place <br />
              </label>
              <input
                name="rental_place"
                onChange={(e) =>
                  setProduct({ ...product, [e.target.name]: e.target.value })
                }
                type="text"
                id="rental_place"
                className="form-control"
                value={product.rental_place}
              />
            </div>

            <div className="sm:col-span-3">
              <label className="form-label" htmlFor="image_1">
                Images
              </label>
              <br />
              <input
                multiple
                name="image_1"
                onChange={(e) =>
                  setProduct({
                    ...product,
                    [e.target.name]: Array.from(e.target.files),
                  })
                }
                type="file"
                id="image_1"
                className="form-control"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="form-label" htmlFor="image_2">
                Image 2
              </label>
              <br />
              <input
                multiple
                name="image_2"
                onChange={(e) =>
                  setProduct({
                    ...product,
                    [e.target.name]: Array.from(e.target.files),
                  })
                }
                type="file"
                id="image_2"
                className="form-control"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="form-label" htmlFor="image_3">
                Image 3
              </label>
              <br />
              <input
                multiple
                name="image_3"
                onChange={(e) =>
                  setProduct({
                    ...product,
                    [e.target.name]: Array.from(e.target.files),
                  })
                }
                type="file"
                id="image_3"
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
export default AddCars;
