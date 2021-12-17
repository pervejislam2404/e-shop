import React from 'react';
import './Description.css'

const Description = () => {
    return (
        <div className="my-5">
            <div className="container">
                <div className="row g-4">
                    <div className="col-12 col-md-6 col-lg-3">
                        <div className="border px-5 py-4 text-center">
                        <i class="myFont fas fa-plane pb-2"></i>
                               <h3>Free shipping</h3>
                               <p style={{color:'gray'}} className="">Free shipping on all US order or order above 1500$</p>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-3">
                        <div className="border px-5 py-4 text-center">
                        <i class="myFont fas fa-headset pb-2"></i>
                                <h3>24x7 Support</h3>
                                <p style={{color:'gray'}} className="">Contact 24 hours a day and 7 days in a week</p>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-3">
                        <div className="border px-5 py-4 text-center">
                        <i class="myFont fas fa-box-open pb-2"></i>
                               <h3>20 Days Return</h3>
                               <p style={{color:'gray'}} className="">Shipping return in within 20 days for an exchange</p>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-3">
                        <div className="border px-5 py-4 text-center">
                        <i class="myFont fas fa-id-card-alt pb-2"></i>
                               <h3>Payment Secure</h3>
                               <p style={{color:'gray'}} className="">Contact 24 hours a day and 7 days in a week</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Description;