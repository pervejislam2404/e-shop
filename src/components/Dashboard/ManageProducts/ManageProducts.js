import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner, Table, Button } from 'react-bootstrap';
import  swal from 'sweetalert';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setAllProductsToManage } from '../../../Redux/slice/statesSlice';

const ManageProducts = () => {
    const [allProducts,setAllProducts] = useState([]);
    const token = useSelector((state)=> state.stateContainer.token);
    const allProductsToManage = useSelector((state)=> state.stateContainer.allProductsToManage);
    const dispatch = useDispatch()


    useEffect(() => {
        axios("https://guarded-ocean-40685.herokuapp.com/getAllProducts").then((res) => {
            dispatch(setAllProductsToManage(res.data));
        });
      }, []);


      const handleDelete = (id) => {
        swal({
            title: "Are you sure to delete?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(`https://guarded-ocean-40685.herokuapp.com/deleteProduct/${id}`,{
                  headers:{
                     'authorization': `Bearer ${token}`,
                     'Content-type': 'application/json'
                  }
                })
                .then(res=>{
                    if(res?.data?.deletedCount){
                        swal("Product has been deleted!", {
                            icon: "success",
                          });
                          const filter = allProducts.filter(product =>product._id !== id);
                          setAllProducts(filter)
                    }
                })             
            } else {
              swal("Your imaginary file is safe!");
            }
          });      
    }


    return (
        <div>
            <div className="container py-3">
      {!allProductsToManage && <div className="text-center p-5">
                    <Spinner animation="grow" variant="info" />
                </div>}
        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Index</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          {/* all-products-information */}
          <tbody>
            {allProductsToManage.map((product,index) => {
              return (
                <tr key={index} className="text-center">
                  <td className="fw-bold text-secondary">{index + 1}</td>
                  <td className="fw-bold text-secondary">{product?.name}</td>
                  <td className="fw-bold text-secondary">{product?.price}</td>
                  <td  className="fw-bold text-secondary">{product?.stock}</td>
                  <td><Button onClick={()=>handleDelete(product._id)} variant="danger"><i className="fas fa-trash-alt pe-2"></i>Delete</Button></td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
        </div>
    );
};

export default ManageProducts;