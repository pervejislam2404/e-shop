import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllProduct,
  setPage,
  setPageCount,
} from "../../../Redux/slice/statesSlice";
import { Card, Button, Carousel, InputGroup, FormControl } from 'react-bootstrap';
import Rating from "react-rating";
import { useNavigate } from "react-router-dom";
import loader from './loader.gif';
import './AllProduct.css';

import sliderOne from './slider-one.jpg';
import sliderTwo from './slider-two.jpg'
import sliderThree from './slider-three.jpg' 





const AllProducts = () => {
 const [rendarer,serRendarer] = useState(false)

  const allProducts = useSelector((state) => state.stateContainer.allProducts);
  const pageCount = useSelector((state) => state.stateContainer.pageCount);
  const page = useSelector((state) => state.stateContainer.page);
  const size = useSelector((state) => state.stateContainer.size);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios(`https://guarded-ocean-40685.herokuapp.com/allProducts?page=${page}&&size=${size}`).then(
      (res) => {
        dispatch(setAllProduct(res.data?.products));
        const count = res.data?.count;
        const pageNumber = Math.ceil(count / size);
        dispatch(setPageCount(pageNumber));
      }
    );
  }, [page,rendarer]);

 

  const handleSearch = (e)=>{
    const searchVal = e.target.value;
    if(e.nativeEvent.data == null){
      return serRendarer(true)
    }
    const filterProduct= allProducts.filter(product => product.name.toLowerCase().includes(searchVal.toLowerCase()));
    dispatch(setAllProduct(filterProduct));
  }
  
  
  const handleDetail = (id) => {    
    navigate(`/detail/${id}`);
  };
  
  return (
    <div>


 {/* carousel */}
 <div className="">
 <Carousel variant="dark">
  <Carousel.Item>
    <img
      className="d-block w-100  slide-img"
      // height="600"
      src={sliderOne}
      alt="First slide"
    />
    <Carousel.Caption>
      
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100 slide-img"
      // height="600"
      src={sliderTwo}
      alt="Second slide"
    />
    <Carousel.Caption>
      
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100 slide-img"
      // height="600"
      src={sliderThree}
      alt="Third slide"
    />
    <Carousel.Caption>
      
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
 </div>
{/* carousel */}




      <div className="container pt-5">



         {/* pagination */}
      <div className="d-flex justify-content-center py-5">
          {
            [...Array(pageCount).keys()]
                .map(number => <button
                    className={number === page ? 'border bg-info text-light ' : 'border-0'}
                    key={number}
                    onClick={() => dispatch(setPage(number))}
                ><div className="px-lg-5 px-md-5 px-3 fs-2 fs-lg-3">{number + 1}</div></button>)
          }
       </div>

       
<div className="box pb-5 mx-auto">
<InputGroup className="mb-3">
    <FormControl
    onChange={(e)=>handleSearch(e)}
      placeholder="Product Name"
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
    />
    <InputGroup.Text id="basic-addon2">search</InputGroup.Text>
  </InputGroup>
</div>


        <div className="row g-3">

        <div className="d-flex justify-content-center">
           {!allProducts.length && <img src={loader} alt="" />}
        </div>


          {allProducts.length &&
            allProducts.map((product, index) => {
              const { name, rate, price, img, _id, stock } = product || {};
              return (
                <div className="col-12 col-md-4 col-lg-3" key={index}>
                  <div className="">
                    <Card className="bg-light border-0">
                      <div className="text-center p-3">
                        <Card.Img
                          className=""
                          height="230"
                          variant="top"
                          src={img}
                        />
                      </div>
                      <Card.Body>
                        <Card.Title className="fw-bold text-danger">
                          {name}
                        </Card.Title>

                        <div className="d-flex py-2">
                          <strike
                            style={{ color: "gray" }}
                            className="d-inline-block pe-4 fw-bold"
                          >
                            {Math.floor(Math.random() * 10) + Number(price)}$
                          </strike>
                          <Card.Text className="fw-bold">{price}$</Card.Text>
                        </div>
                        {stock <='0' ?<Card.Title className="fw-light text-info">Out of stock</Card.Title>:
                         <Card.Title className="fw-light text-secondary">In stock {stock}</Card.Title>}


                        <div className=" pb-3">
                          <Rating
                            initialRating={rate}
                            emptySymbol={
                              <i class="far fa-star fs-5 text-warning"></i>
                            }
                            fullSymbol={
                              <i class="fas fa-star text-warning fs-5"></i>
                            }
                            readonly
                          />{" "}
                          ({rate})
                        </div>
                        {stock <='0' ? '' :<Button onClick={() =>handleDetail(_id)} variant="outline-info rounded text-black py-1 px-4 fw-bold w-100">Add</Button>}
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="pagination d-flex justify-content-center py-5">
      
          {
            [...Array(pageCount).keys()]
                .map(number => <button
                    className={number === page ? 'border bg-info text-light ' : 'border-0'}
                    key={number}
                    onClick={() => dispatch(setPage(number))}
                ><div className="px-lg-5 px-md-5 px-3 fs-2 fs-lg-3">{number + 1}</div></button>)
          }
          
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
