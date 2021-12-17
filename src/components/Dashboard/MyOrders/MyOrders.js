import React, { useEffect } from "react";
import axios from "axios";
import { Card, Button, Table } from 'react-bootstrap';
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { setSingleUserProducts } from "../../../Redux/slice/statesSlice";
import loader from "../../../loader.gif";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const dispatch = useDispatch();
  const singleUserProducts = useSelector(
    (state) => state.stateContainer.singleUserProducts
  );
  const token = useSelector((state) => state.stateContainer.token);
  const user = useSelector((state) => state.stateContainer.user);

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
    console.log(stock);

      axios.put(`https://guarded-ocean-40685.herokuapp.com/updateStockWithDes`,{stock},{
          headers:{
            'authorization':`Bearer ${token}`,
            'content-type':'application/json'
          }
      })
      .then(res=>{
          console.log(res.data);
        })    
  };





  return (
    <div>
      <div className="container py-3 overflow-scroll">
        {/* spinner */}
        {/* {!singleUserProducts.length && (
          <div className="text-center p-5">
            <img src={loader} alt="" />
          </div>
        )} */}

        {!singleUserProducts?.length && (
          <div className="d-flex justify-content-center align-items-center p-5">
            <h3 className="p-2 bg-danger rounded text-white">Nothing...</h3>
          </div>
        )}

        {/* handle-all-ordered-products */}

        <Table striped bordered hover>
          {singleUserProducts?.length && (
            <thead>
              <tr className="text-center">
                <th>Index</th>
                <th>Photo</th>
                <th>Product Name</th>
                <th>User Phone</th>                
                <th>Status</th>                
                <th>Price</th>
                <th>Payment</th>
                <th>Action</th>
                {/* <th>Manage Status</th> */}
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
                  <td>{product?.name}</td>
                  <td>{product?.number}</td>
                  <td className="pt-2"><span className="bg-info text-white px-4 py-2 rounded ">{product?.status}</span></td>
                  <td>{product?.address}</td>
                  <td>{product?.price}</td>
                  <td>{product?.payment ? 'paid': 
                     <Link to={`/dashboard/payment/${product?._id}`} className="text-white text-decoration-none bg-info px-4 py-2">Pay</Link>}
                  </td>
                  <td>
                    <Button
                      onClick={() => handleDelete(product._id)}
                      variant="danger"
                    >
                      <i className="fas fa-trash-alt pe-2"></i>
                      {/* Delete */}
                    </Button>
                  </td>

                  {/* <td>
                    <Button
                      onClick={() => handleStatus(product._id)}
                      variant={
                        product?.status === "shipped" ? "info" : "warning"
                      }
                    >
                      {product?.status}
                    </Button>
                  </td> */}
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
