import React, { useEffect } from "react";
import "./RattingSection.css";
import Rating from "react-rating";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setReview } from "../../../Redux/slice/statesSlice";
import loader from '../../../loader.gif';
import { Card } from 'react-bootstrap';

const RattingSection = () => {
  const token = useSelector((state)=> state.stateContainer.token);
  const review = useSelector((state)=> state.stateContainer.review);
  const dispatch = useDispatch();

  useEffect(() => {
    axios('https://guarded-ocean-40685.herokuapp.com/getAllReview')
    .then((res) => {
        dispatch(setReview(res.data));
    });
  }, [token]);

 
  return (
    <div className="bg-light">

      <div className="container py-5">
      {!review && <div className="text-center fw-bold text-danger p-5">
                <img src={loader} alt="" /> 
                </div>}
          <div className="row g-4">

          {/* showing-all-user-review */}
          {review?.map((review, index) => {
            return (
              <div key={index} className="col-lg-3 col-12">
                <Card className="border-0 rounded">

                  <Card.Body className="p-3 cart">
                    <div className="d-flex justify-content-start align-items-center">
                      <img className="rounded-pill me-3" height="70" width="70"  src={`data:image/png;base64,${review?.img}`} alt="" /> 
                      <Card.Title>{review?.name}</Card.Title>
                    </div>

                    <div className=" py-3">
                    <Rating
                        initialRating={review?.ratting}
                        emptySymbol={<i class="far fa-star fs-5 text-warning"></i>}
                        fullSymbol={<i class="fas fa-star text-warning fs-5"></i>}
                        readonly
                    /> ({review?.ratting})
                    </div>

                    <Card.Text className="text-muted">{review?.description}</Card.Text>
                  </Card.Body>

                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RattingSection;