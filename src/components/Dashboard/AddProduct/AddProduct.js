import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import { useSelector } from "react-redux";



const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const token = useSelector((state)=> state.stateContainer.token);

  // adding-new-product-to-database 

  const onSubmit = (data) => {
      console.log(data);
    axios.post(`https://guarded-ocean-40685.herokuapp.com/addProduct`, data,{
      headers:{
        'authorization':`Bearer ${token}`,
        'content-type':'application/json'
      }
    })
      .then((res) => {
        if (res?.data?.insertedId) {
          swal({
            title: "Product has been added!",
            icon: "success",
          });
          reset();
        } else {
          swal({
            title: "Oops something happend!",
            icon: "error",
          });
        }
      });
  };


  return (
    <div>
      <div className="container p-4 rounded">
        <div className="d-flex flex-column justify-content-center align-items-center bg-white p-4">
          
          {/* adding-product-with-information */}
          <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="text-center text-danger fw-bold">
              <h3 className="fw-bold">Add A Product</h3>
            </div>

            <div className="d-flex gap-2 direction-lg-column direction-row ">
                    <input
                    style={{ background: "rgb(238 238 238)" }}
                    className="w-100 d-block p-3 fs-5 border-0 my-3 rounded"
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Product Name"
                    />

                <input
                    style={{ background: "rgb(238 238 238)" }}
                    className=" w-100 p-3 fs-5 border-0 my-3 rounded"
                    type="number"
                    {...register("rate", { required: true,minLength:0,maxLength:5 })}
                    placeholder="Rating"
                    />
            </div>

            <div className="d-flex gap-2">
                    <input
                    style={{ background: "rgb(238 238 238)" }}
                    className="w-100 p-3 fs-5 border-0 my-3 rounded"
                    type="number"
                    {...register("price", { required: true })}
                    placeholder="Price"
                    />

                  <select
                    style={{ background: "rgb(238 238 238)" }}
                    className=" w-100 p-3 fs-5 border-0 my-3 rounded "
                     {...register("status")}>
                        <option value="pending">pending</option>
                    </select>
            </div>


           <div className="d-flex gap-2">
                  <input
                    style={{ background: "rgb(238 238 238)" }}
                    className=" w-100 p-3 fs-5 border-0 my-3 rounded"
                    type="number"
                    {...register("stock", { required: true })}
                    placeholder="Stock"
                    />

                    <select
                    style={{ background: "rgb(238 238 238)" }}
                    className=" w-100 p-3 fs-5 border-0 my-3 rounded "
                     {...register("category")}>
                        <option value="shoes">Shoe</option>
                        <option value="furniture">Furniture</option>
                        <option value="cloths">Cloths</option>
                        <option value="beautyProduct">Beauty products</option>
                    </select>
            </div>
 
                  <input
                    style={{ background: "rgb(238 238 238)" }}
                    className=" w-100 p-3 fs-5 border-0 my-3 rounded"
                    type="text"
                    {...register("img", { required: true })}
                    placeholder="Image link"
                    />

            <textarea
              style={{ background: "rgb(238 238 238)" }}
              className="p-3 w-100 fs-5 border-0 mb-3 rounded"
              rows="5"
              {...register("description", { required: true })}
              placeholder="Description"
            />

            <div className="text-center">
              <Button
                variant="warning"
                className="bg-warning p-2 px-4 fs-5 border-0"
                type="submit"
              >
                Add Product
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;