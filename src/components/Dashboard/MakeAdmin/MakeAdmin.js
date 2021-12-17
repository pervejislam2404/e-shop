import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import swal from 'sweetalert';


const MakeAdmin = () => {
  const { register, handleSubmit,reset } = useForm();
  const token = useSelector((state)=> state.stateContainer.token);

  const onSubmit = (data) => {
    fetch(`https://guarded-ocean-40685.herokuapp.com/makeAdmin/${data.email}`,{
      method: 'PUT',
      headers:{
        'authorization':`Bearer ${token}`,
        'content-type':'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(data=> data.json())
    .then(res=> {
        if(res?.modifiedCount){
            swal({
                title: "Good job,user has been admin!",
                icon: "success",
              });
              reset()
        }else{
            swal({
                title: "Failed!",
                text: "Please make the user loged in!",
                icon: "error",
              });
        }
    })
  };
  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center p-5">

        {/* adding-admin-with-email-address */}

        <form className="gap-2" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="bg-light p-2 fs-6 border-0 bg-white my-3 shadow"
            type="email"           
            {...register("email", { required: true })}
            placeholder="Make Admin with Email"
          />         
          <input className="bg-warning p-1 fs-6 border-0" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default MakeAdmin;

