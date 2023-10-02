import React, { useState } from 'react';
import { BACKEND_BASE_URL } from '../../utils/Config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddCars() {
  const initialProduct = {
    product_name: '',
    model: '',
    rent_amount: '',
    description: '',
    image_1: [],
    image_2: [],
    image_3: [],
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
        } else {
          formData.append(key, product[key]);
        }
      }

      const response = await axios.post(
        BACKEND_BASE_URL + '/admin/addcar/',
        formData
      );

      if (response.status === 201) {
        alert('Car added successfully!');
        navigate('/admin/listcar/');
        setProduct(initialProduct);
      } else {
        alert('Failed to add car.');
      }
    } catch (error) {
      console.log(error, 'errrrrrrrrrrrrrrrrrrrrrrrrorrrrrrrrrrrrrr');
    }
  };

  return (
    <div className="p-32 flex justify-center w-full">
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
