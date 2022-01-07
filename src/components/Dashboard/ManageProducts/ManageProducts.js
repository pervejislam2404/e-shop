import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { Spinner, Table, Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import  swal from 'sweetalert';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setAllProductsToManage, setIdToStock, setPageRender, setStock } from '../../../Redux/slice/statesSlice';

const ManageProducts = () => {
    const [smShow, setSmShow] = useState(false);
    // const [allProducts,setAllProducts] = useState([]);
    const token = useSelector((state)=> state.stateContainer.token);
    const allProductsToManage = useSelector((state)=> state.stateContainer.allProductsToManage);
    const stock = useSelector((state)=> state.stateContainer.stock);
    const idToStock = useSelector((state)=> state.stateContainer.idToStock);
    const pageRender = useSelector((state)=> state.stateContainer.pageRender);
    const dispatch = useDispatch()


    useEffect(() => {
        axios("https://guarded-ocean-40685.herokuapp.com/getAllProducts").then((res) => {
            dispatch(setAllProductsToManage(res.data));
        });
      }, [pageRender]);



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
                          const filter = allProductsToManage.filter(product =>product._id !== id);
                          dispatch(setAllProductsToManage(filter));
                    }
                })             
            } else {
              swal("Your imaginary file is safe!");
            }
          });      
    }


    const setModalVal = (stockNumber,id) => {
      setSmShow(true)
      dispatch(setStock(stockNumber));
      dispatch(setIdToStock(id));
    }



    const { register, handleSubmit} = useForm();
    const onSubmit = data => {
      const info={id: idToStock, stock:data?.stock};
        
      // updating-stock
      axios.put(`https://guarded-ocean-40685.herokuapp.com/setStock`,{info})
      .then((res) => {
         if(res.data?.modifiedCount){
          setSmShow(false)
          swal("stock has been set!", {
            icon: "success",
          });
          dispatch(setPageRender(Math.random()*20));
         }else{
          swal("Failed to set!", {
            icon: "warning",
          });
         }
        
      })
    };


    // search-function

    const handleSearch = (e)=>{
      const searchVal = e.target.value;
      if(e.nativeEvent.data == null){
        dispatch(setPageRender(Math.random()*20));
      }
      const filterProduct= allProductsToManage.filter(product => product.name.toLowerCase().includes(searchVal.toLowerCase()));
      dispatch(setAllProductsToManage(filterProduct));
    }

    return (
        <div>
             
              <div className="box pt-3  w-75 mx-auto">
                      <InputGroup className="mb-3">
                          <FormControl
                          onChange={(e)=>handleSearch(e)}
                          placeholder="Product Name"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          />
                          <InputGroup.Text id="basic-addon2 bg-primary">search</InputGroup.Text>
                      </InputGroup>
                  </div>
          

            <div className="container py-3">

      {!allProductsToManage && <div className="text-center p-5">
                    <Spinner animation="grow" variant="info" />
                </div>}
        <Table striped bordered hover>
          <thead>
            <tr className="text-center text-primary">
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
                  <td className="fw-bold text-light">{index + 1}</td>
                  <td className="fw-bold text-light">{product?.name}</td>
                  <td className="fw-bold text-light">{product?.price}</td>
                  <td  className="fw-bold text-light"><Button variant="info" className="shadow text-dark fw-bold" onClick={() =>setModalVal(product?.stock, product?._id)}>{product?.stock}</Button></td>
                  <td><Button onClick={()=>handleDelete(product._id)} variant="danger"><i className="fas fa-trash-alt pe-2"></i>Delete</Button></td>
                </tr>
              );
            })}

            
          </tbody>
        </Table>
      </div>


      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
           <p className="text-secondary fw-bold">Set stock</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
           <div className="d-flex gap-2">
           <input className="border-1 ps-2 bg-light fw-bold" defaultValue={stock} {...register("stock")} />
            <Button variant="danger" className="border-none" type="submit">set</Button>
           </div>
        </form>          
        </Modal.Body>
      </Modal>


        </div>
    );
};

export default ManageProducts;