import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import profile from './myP.png'
import { Button } from 'react-bootstrap';
import useFirebase from '../../../firebase/useFirebase';
import { useSelector } from "react-redux";

const Login = () => {
  const {googleSign, signWithEmailPass} = useFirebase(); 
  const { register, handleSubmit,reset } = useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const error = useSelector((state)=> state.stateContainer.googleSignInError)


  const onSubmit = (data) => {
    signWithEmailPass(data.email, data.password, location, navigate);
    reset()
  };


  const handleGoogleSign= ()=>{
    googleSign(location,navigate)
  }

  return (
      <div className="">
    <div className="mt-5">
      <div className="container bg-light rounded">
        <div  className="row p-4">
          <div style={{backgroundColor:'#1DB9C3'}} className="col-12 col-md-6 col-lg-6 text-center">
             <img className="img-fluid" alt="" src={profile}/>
             <h1 className="fw-bold text-danger text-uppercase">Make you identity</h1>
          </div>
       
          {/* user-login-form */}
          <div className="col-12 col-md-6 col-lg-6 p-5 bg-white">
                <form className="d-flex flex-column gap-3 p-lg-5" onSubmit={handleSubmit(onSubmit)}>
                   
                    <input 
                    className="bg-light p-3 w-100 fs-5 border-0 my-3"
                    {...register("email",{required: true})} placeholder="Email"/>
                    <input 
                    className="bg-light p-3 w-100 fs-5 border-0 my-3"
                    type="password" {...register("password",{required: true,minLength: 6 })} placeholder="password"/>
                    <input 
                    className="bg-danger p-3 w-100 fs-5 border-0 my-3"
                    type="submit" />
                </form>
           
                <div className="text-center">
                   <h1>------------or------------</h1>
                   <Button onClick={handleGoogleSign} className="fs-4 px-5 w-50" variant="warning">google</Button>
                </div>

                <div className="text-center p-3">
                  <h5 className="text-danger">{error}</h5>
                  <Link className="text-decoration-none fw-bold fs-5 text-secondary" to="/register">Don't you have account?<span className="text-primary">Register</span></Link>
              </div>
          </div>

        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
