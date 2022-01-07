import React, { useEffect } from "react";
import axios from "axios";
import { Table, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { useDispatch, useSelector } from "react-redux";
import { setAllOrders,setPageRender } from "../../../Redux/slice/statesSlice";
import loader from '../../../loader.gif';
import { Link } from "react-router-dom";

const ManageAllOrders = () => {
    const allOrders = useSelector((state)=> state.stateContainer.allOrders);
    const token = useSelector((state)=> state.stateContainer.token);
    const dispatch = useDispatch();
    const pageRender = useSelector((state)=> state.stateContainer.pageRender);


  useEffect(() => {    
    axios(`https://guarded-ocean-40685.herokuapp.com/getAllOrders`,
    {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-type': 'application/json'
      }
    }
    )
    .then((res) => {
      dispatch(setAllOrders(res?.data));
    })
  },[pageRender,token]);
  


  const handleDelete = (id) => {
    swal({
        title: "Are you sure to delete?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            fetch(`https://guarded-ocean-40685.herokuapp.com/deleteOrder/${id}`,{
                method: "DELETE",
                headers: {
                    'authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                }
            })
            .then(res=>{
                if(res?.statusText==='OK'){
                    swal("Product has been deleted!", {
                        icon: "success",
                      });
                      const filter = allOrders.filter(pd =>pd._id !== id);
                      dispatch(setAllOrders(filter))
                }
            })             
        } else {
          swal("Your imaginary file is safe!");
        }
      });      
}

const handleStatus = id => {
    fetch(`https://guarded-ocean-40685.herokuapp.com/setStatus/${id}`,{
        method: 'PUT',
        headers: {
            'authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        }
    })
    .then(data=> data.json())
    .then(res => {
       if(res?.modifiedCount){
            swal({
                title: "Product has been approved!",
                icon: "success",
              });
             dispatch(setPageRender(Math.floor(Math.random()*20)));
        }
    })
}
  return (
    <div>
      <div className="container py-3 overflow-scroll">

        {/* spinner */}
      {!allOrders.length && <div className="text-center p-5">
                    <img src={loader} alt="" />
                </div>}




          
        {!allOrders?.length && <div className="d-flex justify-content-center align-items-center p-5">
                    <h3 className="p-2 bg-danger rounded text-white">Nothing...</h3>
                 </div>}


        {/* handle-all-ordered-products */}
                 
        <Table bordered hover>
         {allOrders?.length && <thead>
            <tr className="text-center text-primary">
              <th>Index</th>
              <th>Photo</th>
              <th>Product Name</th>
              <th>User Email</th>
              <th>User Phone</th>
              <th>User Address</th>
              <th>Price</th>
              <th>Action</th>
              <th>Manage Status</th>
            </tr>
          </thead>}


          {/* ordered-product-information */}
          <tbody>
            {allOrders?.map((product,index) => {
              return (
                <tr key={index} className="text-center">
                  <td className="fw-bold text-light">{index + 1}</td>
                  <td><img src={product?.img} height="50" width="60" alt="img" /></td>
                  <td className="fw-bold text-light">{product?.name}</td>
                  <td className="fw-bold text-light">{product?.email}</td>
                  <td className="fw-bold text-light">{product?.number}</td>
                  <td className="fw-bold text-light">{product?.address}</td>
                  <td className="fw-bold text-light">{product?.price}</td>
                  <td>
                    <Button 
                      onClick={()=>handleDelete(product._id)} 
                      variant="danger"
                      >
                        <i className="fas fa-trash-alt pe-2"></i>
                    </Button>
                  </td>

                  <td>
                    <Button 
                      onClick={()=>handleStatus(product._id)} 
                      variant={product?.status=== 'shipped'? 'info':'warning'}
                      >
                        {product?.status}
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

export default ManageAllOrders;