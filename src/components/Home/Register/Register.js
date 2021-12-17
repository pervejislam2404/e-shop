import React from "react";
import bg from "./registerBg.jpg";
import reg from './reg.png'
import "./Register.css";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import useFirebase from '../../../firebase/useFirebase';
import { useSelector } from "react-redux";

const registerStyle = {
  backgroundImage: `url(${bg})`,
  backgroundColor: "rgba(38, 55, 48, 0.62)",
  backgroundBlendMode: "darken, luminosity",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: '6rem !important'
};

const Register = () => {
  const error = useSelector((state)=> state.stateContainer.errorMsg);

  const {registerWithEmailPass} = useFirebase();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const fullName = data.firstName + " " + data.lastName;
    delete data.firstName
    delete data.lastName
    data.fullName= fullName;
    registerWithEmailPass(data.email, data.password, data.fullName)
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center py-5"
      style={registerStyle}
    >
      <div className="container border bg-white p-5">
      <div className="row">
          <div className="col-12 col-lg-6 p-2 bg-info">
            <img className="" src={reg} alt="" />
          </div>
          
           {/* user-registration-form */}
          <div className="col-12 col-lg-6 d-flex flex-column justify-content-center align-items-center">
            <form className="gap-2 px-3" onSubmit={handleSubmit(onSubmit)}>
              <input
                className="bg-light w-100 p-3 fs-5 border-0" 
                {...register("firstName", { required: true })}
                placeholder="First Name"
              />

              <input
                className="bg-light p-3 w-100 fs-5 border-0 my-3"
                {...register("lastName", { required: true })}
                placeholder="Last Name"
              />

              <input
                className="bg-light w-100 p-3 fs-5 border-0"
                type="email"
                {...register("email", { required: true })}
                placeholder="Email"
              />

              <input
                className="bg-light w-100 p-3 fs-5 border-0 my-3"
                type="password"
                {...register("password", { required: true,minLength:6 })}
                placeholder="password"
              />
              {/* <input type="number" {...register("age", { min: 18, max: 99 })} /> */}
              <Button variant="warning" className="p-2 w-100 px-5 mx-auto fs-5 border-0" type="submit">Register</Button>
              <div className="text-center p-3">
                  <h5 className="text-danger">{error}</h5>
                  <Link className="text-decoration-none fw-bold fs-5 text-danger" to="/login">Do you have account?<span className="text-primary"> Login</span></Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
