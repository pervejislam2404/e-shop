import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import success from './success.png';
import { Spinner, Button } from 'react-bootstrap';
import { setPayClientSecret, setPayError, setPayProcessing, setPaySuccess } from '../../../Redux/slice/statesSlice';

const CheckoutForm = ({ singleProductToPay }) => {
    const { price, _id } = singleProductToPay;
    const stripe = useStripe();
    const elements = useElements();

    const user = useSelector((state) => state.stateContainer.user);
    const paySuccess = useSelector((state) => state.stateContainer.paySuccess);
    const payError = useSelector((state) => state.stateContainer.payError);
    const payProcessing = useSelector((state) => state.stateContainer.payProcessing);
    const payClientSecret = useSelector((state) => state.stateContainer.payClientSecret);

    const dispatch = useDispatch();

    useEffect(() => {
        fetch('https://guarded-ocean-40685.herokuapp.com/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => dispatch(setPayClientSecret(data.clientSecret)));
    }, [price]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        setPayProcessing(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
           dispatch(setPayError(error.message));
            dispatch(setPaySuccess(''));
        }
        else {
            dispatch(setPayError(''));
        }

        // payment intent
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            payClientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user.email
                    },
                },
            },
        );

        if (intentError) {
            dispatch(setPayError(intentError.message));
            dispatch(setPaySuccess(''));
        }
        else {
            dispatch(setPayError(''));
            dispatch(setPaySuccess('Your payment processed successfully.'))
            dispatch(setPayProcessing(false));
            // save to database
            const payment = {
                amount: paymentIntent.amount,
                created: paymentIntent.created,
                last4: paymentMethod.card.last4,
                transaction: paymentIntent.client_secret.slice('_secret')[0]
            }
            const url = `https://guarded-ocean-40685.herokuapp.com/paidProduct/${_id}`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data =>{});
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className="container text-center text-white pt-5">{payProcessing ? <Spinner animation="grow" variant="warning" /> : <Button variant="danger" type="submit" className="px-5" disabled={!stripe || paySuccess}>
                    Pay ${price}
                </Button>}</div>
            </form>
            {
                payError && <p className="fw-bold pt-5" style={{ color: 'red' }}>{payError}</p>
            }
            {
                paySuccess && <div className="container text-center">
                    <p className="fw-bold pt-5" style={{ color: 'green' }}>{paySuccess}</p>
                     <img className="img-fluid" src={success} alt="" />
                </div>
            }
        </div>
    );
};

export default CheckoutForm;