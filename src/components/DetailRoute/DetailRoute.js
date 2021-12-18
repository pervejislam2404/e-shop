import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleProduct } from "../../Redux/slice/statesSlice";
import { useForm } from "react-hook-form";
import { Button, Card } from "react-bootstrap";
import Rating from "react-rating";
import swal from "sweetalert";

const DetailRoute = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const singleProduct = useSelector((state) => state.stateContainer.singleProduct);
  const token = useSelector((state) => state.stateContainer.token);
  const user = useSelector((state) => state.stateContainer.user);




  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
      const myProduct ={};
      myProduct.name= data.name;
      myProduct.price= data.price;
      myProduct.img= data.img;
      myProduct.description= data.description;
      myProduct.email= data.email;
      myProduct.address= data.address;
      myProduct.number= data.phone;
      myProduct.status= status;
      myProduct.stock= stock;



      axios.post(`https://guarded-ocean-40685.herokuapp.com/myProduct`,myProduct)
      .then(res=>{
          if(res?.data?.acknowledged){
            swal("Product added successful!", "successful", "success");
          }else{
            swal("Failed to add!", "Failed !", "warning");
          }
        })

    if(singleProduct?.stock !=='0') {

      const TotalStock = {stock:Number(singleProduct?.stock)-1,id:singleProduct?._id }

      axios.put(`https://guarded-ocean-40685.herokuapp.com/updateStock`,{TotalStock},{
          headers:{
            'authorization':`Bearer ${token}`,
            'content-type':'application/json'
          }
      })
      .then(res=>{
          if(res?.data?.acknowledged){
            swal("Product added successful!", "successful", "success");
          }else{
            swal("Failed to add!", "Failed !", "warning");
          }
        })
      }



  };

  useEffect(() => {
    axios(`https://guarded-ocean-40685.herokuapp.com/detailOne/${id}`).then((res) => {
     reset(dispatch(setSingleProduct(res.data)));
    });
  }, [id,reset]);

  const { name, price, rate, description, img, status, stock } = singleProduct || {};

  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <div className="container border bg-white p-5">
        <div className="row">

               {/* product-detail */}
               
          <div className="col-12 col-lg-6 p-2 bg-light">
            <Card className="bg-light border-0">
              <div className="text-center p-5">
                <Card.Img className="img-fluid mh-50"  variant="top" src={img} />
              </div>

              <Card.Body>
                <Card.Title className="fw-bold text-danger">{name}</Card.Title>
                <div className="d-flex py-2">                 
                  <Card.Text className="fw-bold">{price}$</Card.Text>
                </div>
                <Card.Text className="fw-bold">{description}$</Card.Text>

                {stock <='0' ?<Card.Title className="fw-light text-info">Out of stock</Card.Title>:
                <Card.Title className="fw-light text-secondary">In stock {stock}</Card.Title>}

                <div className=" pb-3">
                  <Rating
                    initialRating={rate}
                    emptySymbol={<i class="far fa-star fs-5 text-warning"></i>}
                    fullSymbol={<i class="fas fa-star text-warning fs-5"></i>}
                    readonly
                  />{" "}
                  ({rate})
                </div>
               
              </Card.Body>
            </Card>
          </div>

          {/* user-product-adding-form */}
          <div className="col-12 col-lg-6 d-flex flex-column justify-content-center align-items-center">
            <form className="gap-2 px-3" onSubmit={handleSubmit(onSubmit)}>
             
              <input
                className="bg-light p-3 w-100 fs-5 border-0 my-3"
                {...register("address", { required: true })}
                placeholder="Address"
              />

              <input
                className="bg-white border-1 p-3 w-100 fs-5 my-3"
                type="email"
                readOnly
                {...register("email", { required: true })}
                defaultValue={user?.email}
                placeholder="Email"
              />

              <input
                className="bg-light p-3 w-100 fs-5 border-0 my-3"
                type="text"
                {...register("phone", { required: true })}
                placeholder="Number"
              />

             <input
                className="bg-light w-100 p-3 fs-5 border-0"
                {...register("name", { required: true })}
                defaultValue={name}
                placeholder="Product"
              />

             <input
                className="bg-light p-3 w-100 fs-5 border-0 my-3"
                {...register("description", { required: true })}
                defaultValue={description}
                placeholder="Description"
              />


              <input
                className="bg-light p-3 w-100 fs-5 border-0 my-3"
                type="number"
                {...register("price", { required: true })}
                defaultValue={price}
                placeholder="price"
              />

              <input
                className="bg-light w-100 p-3 fs-5 border-0 my-3"
                type="text"
                {...register("img", { required: true })}
                defaultValue={img}
                placeholder="Image"
              />

             
              <Button
                variant="dark"
                className="p-2 w-100 text-white px-5 mx-auto fs-5 border-0"
                type="submit"
              >
               Add to cart
              </Button>
             
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailRoute;
