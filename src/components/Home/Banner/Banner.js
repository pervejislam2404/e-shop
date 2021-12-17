import React from "react";
import { Carousel } from "react-bootstrap";
import chair from './productImg/chair.png';
import shoe from './productImg/shoe.png';
import shirt from './productImg/shirt.png';
import beautiProduct from './productImg/beauti-product.png';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';

const Banner = () => {
  return (
    <div className="mb-5">
      <div style={{backgroundColor:'#EEEBDD',}} className="container border-0 rounded p-0 mt-0 mt-md-5 mt-lg-5">
        <Carousel variant="dark">

        <Carousel.Item>
              <div className="row">
                  <div className="col-12 col-md-6 col-6 d-flex align-items-center justify-content-center">
                          <div className="d-flex justify-content-center align-items-center flex-direction-column h-100 ps-5">
                                <div className="px-5">
                                      <h1>MES'S SPORT SHOES</h1>
                                      <h2>New arrival</h2>
                                      <h5>20% discount</h5>
                                </div>
                          </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                      <Fade top>
                    <img
                        height="600"
                        className="d-block w-100"
                        src={shoe}
                        alt="Second slide"
                    />
                    </Fade>
                  </div>
              </div>
          </Carousel.Item>


        <Carousel.Item>
              <div className="row">
                  <div className="col-12 col-md-6 col-6">
                         <div className="d-flex justify-content-center align-items-center flex-direction-column h-100 ps-5">
                                <div className="px-5 ps-5">
                                      <h1>SMART CHAIR,BUY FOUR GET ESPECIAL BONUS</h1>
                                      <h2>New trending</h2>
                                      <h5>30% discount</h5>
                                </div>
                          </div>
                  </div>
                  <div className="col-12 col-md-6 col-6">
                      <Fade right>
                    <img
                        height="600"
                        className="d-block w-100"
                        src={chair}
                        alt="Second slide"
                    />
                    </Fade>
                  </div>
              </div>
          </Carousel.Item>

          <Carousel.Item>
              <div className="row">
                  <div className="col-12 col-md-6 col-6">
                          <div className="d-flex justify-content-center align-items-center flex-direction-column h-100 ps-5">
                                <div className="px-5">
                                      <h1>MES'S T-Shirt</h1>
                                      <h2>New Fashion</h2>
                                      <h5>10% discount</h5>
                                </div>
                          </div>
                  </div>
                  <div className="col-12 col-md-6 col-6">
                      <Fade bottom>
                    <img
                        height="600"
                        className="d-block w-100"
                        src={shirt}
                        alt="Second slide"
                    />
                    </Fade>
                  </div>
              </div>
          </Carousel.Item>


          <Carousel.Item>
              <div className="row">
                  <div className="col-12 col-md-6 col-6">
                          <div className="d-flex justify-content-center align-items-center flex-direction-column h-100 ps-5">
                                <div className="px-5">
                                      <h1>SHINE YOUR SKIN</h1>
                                      <h2>Women's beauty products</h2>
                                      <h5>20% discount</h5>
                                </div>
                          </div>
                  </div>
                  <div className="col-12 col-md-6 col-6">
                      <Zoom>
                    <img
                        height="600"
                        className="d-block w-100"
                        src={beautiProduct}
                        alt="Second slide"
                    />
                    </Zoom>
                  </div>
              </div>
          </Carousel.Item>

        </Carousel>
      </div>
    </div>
  );
};

export default Banner;
