import React from "react";
import { Card, Button } from "react-bootstrap";
import Rating from 'react-rating'
import { useNavigate } from "react-router-dom";

const SingleProduct = ({ product }) => {
    const { name, rate, price, img, _id, stock } = product || {};
    const navigate = useNavigate()

    const handleDetail = (id) => {
           navigate(`/detail/${id}`);
    }

  return (
    // every-single-product-detail
    <div className="col-12 col-md-6 col-lg-4">
      <Card className="bg-light border-0">
        <div className="text-center p-3">
          <Card.Img className="" height="230" variant="top" src={img} />
        </div>
        <Card.Body>         
                <Card.Title className="fw-bold text-danger">{name}</Card.Title>

                {stock <='0' ?<Card.Title className="fw-light text-info">Out of stock</Card.Title>:
                <Card.Title className="fw-light text-secondary">In stock {stock}</Card.Title>}

              <div className="d-flex py-2">
                <strike style={{color:'gray'}} className="d-inline-block pe-4 fw-bold">{ Math.floor(Math.random()*10) + Number(price)}$</strike>
                <Card.Text className="fw-bold">{price}$</Card.Text>
              </div>            
          <div className=" pb-3">
          <Rating
            initialRating={rate}
            emptySymbol={<i class="far fa-star fs-5 text-warning"></i>}
            fullSymbol={<i class="fas fa-star text-warning fs-5"></i>}
            readonly
          /> ({rate})
          </div>
          {stock <='0' ? '' :<Button onClick={() =>handleDetail(_id)} variant="outline-info rounded text-black py-1 px-4 fw-bold w-100">Add</Button>}
         
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
