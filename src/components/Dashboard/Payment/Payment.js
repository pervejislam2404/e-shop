import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleProductToPay } from '../../../Redux/slice/statesSlice';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';




const stripePromise = loadStripe('pk_test_51JvnhxBuOIwwk0eFAB1kLMPddNVEIsNPQ8Jz2LlxTJGVx90fwGBJV6sqJH7x1c47tSp2TXYJWSwbTmAf4x5ZR995004vng2fcJ')

const Payment = () => {
    let { id } = useParams();
    const singleProductToPay = useSelector((state)=> state.stateContainer.singleProductToPay);
    const dispatch = useDispatch()

    // getting-specific-product-to-pay
    
    useEffect(() => {
        axios(`https://guarded-ocean-40685.herokuapp.com/paymentProduct/${id}`)
            .then(data => {
                dispatch(setSingleProductToPay(data.data));
            });
    }, [id]);

    return (
        <div>
           <div className="w-50 mx-auto p-5">
             <h2 className="fw-bold">Product Name <span className="text-info">{singleProductToPay?.name}</span></h2>
            <h4 className="fw-bold">Pay: <span className="text-primary">${singleProductToPay?.price}</span></h4>
            {singleProductToPay?.price && <Elements stripe={stripePromise}>
                <CheckoutForm
                    singleProductToPay={singleProductToPay}
                />
            </Elements>}
        </div>
        </div>
    );
};

export default Payment;