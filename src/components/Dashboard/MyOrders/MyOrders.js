import React, { useEffect } from "react";
import axios from "axios";
import { Card, Button, Table } from 'react-bootstrap';
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { setPaySuccess, setSingleUserProducts } from "../../../Redux/slice/statesSlice";
import loader from "../../../loader.gif";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const dispatch = useDispatch();
  const singleUserProducts = useSelector(
    (state) => state.stateContainer.singleUserProducts
  );
  const token = useSelector((state) => state.stateContainer.token);
  const user = useSelector((state) => state.stateContainer.user);



  dispatch(setPaySuccess(''));

  useEffect(() => {
    axios(`https://guarded-ocean-40685.herokuapp.com/singleUserOrders/${user?.email}`).then(
      (res) => {
        dispatch(setSingleUserProducts(res.data));
      }
    );
  }, [user?.email]);



  const handleDelete = (id) => {
    swal({
      title: "Are you sure to delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`https://guarded-ocean-40685.herokuapp.com/deleteOrder/${id}`, {
            headers: {
              authorization: `Bearer ${token}`,
              "Content-type": "application/json",
            },
          })
          .then((res) => {
            if (res?.data?.deletedCount) {
              swal("Product has been deleted!", {
                icon: "success",
              });
              const filter = singleUserProducts.filter(
                (product) => product._id !== id
              );
              dispatch(setSingleUserProducts(filter));
            }
          });
      } else {
        swal("Your imaginary file is safe!");
      }
    });


    const findData = singleUserProducts.find(
      (product) => product._id === id
    );

    

    // updating-stock
    const stock = {stock:Number(findData?.stock),description:findData?.description}

      axios.put(`https://guarded-ocean-40685.herokuapp.com/updateStockWithDes`,{stock},{
          headers:{
            'authorization':`Bearer ${token}`,
            'content-type':'application/json'
          }
      })
      .then(res=>{
        })    
  };





  return (
    <div>
      <div className="container py-3 overflow-scroll">

        {!singleUserProducts?.length && (
          <div className="d-flex justify-content-center align-items-center p-5">
            <h3 className="p-2 bg-danger rounded text-white">Nothing...</h3>
          </div>
        )}

        {/* handle-all-ordered-products */}

        <Table >
          {singleUserProducts?.length && (
            <thead>
              <tr className="text-center">
                <th>Index</th>
                <th>Photo</th>
                <th>Product Name</th>
                <th>Status</th>                
                <th>Address</th>                
                <th>Price</th>
                <th>Payment</th>
                <th>Action</th>
              </tr>
            </thead>
          )}

          {/* ordered-product-information */}
          <tbody>
            {singleUserProducts?.map((product, index) => {
              return (
                <tr key={index} className="text-center">
                  <td>{index + 1}</td>

                  <td>
                    <img src={product?.img} height="50" width="60" alt="img" />
                  </td>

                  <td className="fw-bold text-secondary">{product?.name}</td>

                  <td className="text-dark pt-4">
                    <span className="bg-info px-4 py-2 text-black rounded fw-bold">{product?.status}</span>
                  </td>

                  <td className="fw-bold text-secondary">{product?.address}</td>

                  <td className="fw-bold text-secondary">{product?.price}</td>

                  <td className="text-dark fw-bold text-dark pt-4 ">
                    {product?.payment ? <p className="">paid</p>: 
                     <Link to={`/dashboard/payment/${product?._id}`} className="text-dark text-decoration-none bg-info px-4 rounded py-2">Pay</Link>}
                  </td>

                  <td className="pt-3">
                    <Button
                      onClick={() => handleDelete(product._id)}
                      variant="danger"
                    >
                      <i className="fas fa-trash-alt pe-2"></i>
                      {/* Delete */}
                    </Button>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default MyOrders;
