import React from "react";
import useFirebase from '../../firebase/useFirebase';
import { Button } from 'react-bootstrap';
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";





const Dashboard = () => {
const admin = useSelector((state)=> state.stateContainer.admin);
const {googleSingOut} = useFirebase()


// className={({ isActive }) => (isActive ? 'text-decoration-none text-secondary' : 'text-decoration-none text-dark bg-light')}


  return (
    <div>
      <div className="container py-5">
        <div className="row my-4">
          <div className="col-12 col-lg-3">
            <ul className="list-group border-0">
              
             {/* all-dashboard's-route */}
              <li className="list-group-item border-0 fs-5" aria-current="true">       
                 <i className="fas fa-user px-2"></i>           
                 <NavLink className={({ isActive }) => (isActive ? 'text-decoration-none text-light px-5 py-1 bg-primary' : 'text-decoration-none text-dark bg-dark')} to="">My Orders</NavLink>
              </li>

              {/* <li className="list-group-item border-0 fs-5">  
                 <i className="fas fa-money-bill-wave px-2"></i>               
                 <NavLink className={({ isActive }) => (isActive ? 'text-decoration-none text-light px-5 py-1 bg-dark' : 'text-decoration-none text-dark bg-light')} to="/dashboard/payment">Payment</NavLink>
              </li> */}

             {admin && <li className="list-group-item border-0 fs-5">      
             <i className="fas fa-user-lock px-2"></i>          
                 <NavLink className={({ isActive }) => (isActive ? 'text-decoration-none text-light px-5 py-1 bg-dark' : 'text-decoration-none text-dark bg-light')} to="/dashboard/makeAdmin">Make Admin</NavLink>
              </li>}

             {admin && <li className="list-group-item border-0 fs-5">  
                  <i className="fas fa-tasks px-2"></i>                
                  <NavLink className={({ isActive }) => (isActive ? 'text-decoration-none text-light px-3 py-1 bg-dark' : 'text-decoration-none text-dark bg-light')} to="/dashboard/manageAllOrders">Manage All Orders</NavLink>
              </li>}
              

              <li className="list-group-item border-0 fs-5">
              <i className="fas fa-mouse px-2"></i>                  
                  <NavLink className={({ isActive }) => (isActive ? 'text-decoration-none text-light px-5 py-1 bg-dark' : 'text-decoration-none text-dark bg-light')} to="/dashboard/review">Review</NavLink>
              </li>

             {admin && <li className="list-group-item border-0 fs-5">  
             <i className="fas fa-list-alt px-2"></i>                
                  <NavLink className={({ isActive }) => (isActive ? 'text-decoration-none text-light px-3 py-1 bg-dark' : 'text-decoration-none text-dark bg-light')} to="/dashboard/manageProducts">Manage Products</NavLink>
              </li>}

              {admin && <li className="list-group-item border-0 fs-5">    
              <i className="fas fa-plus-circle px-2"></i>              
                  <NavLink className={({ isActive }) => (isActive ? 'text-decoration-none text-light px-5 py-1 bg-dark' : 'text-decoration-none text-dark bg-light')} to="/dashboard/addProduct">Add Product</NavLink>
              </li>}


              <li className="list-group-item border-0 fs-5">      
                         
                  <Button onClick={googleSingOut} variant="danger"><i className="fas fa-sign-out-alt px-2 fs-5"></i> Logout</Button>
              </li>

            </ul>
          </div>
          <div style={{backgroundColor:'#F9F9F9'}} className="col-12 col-lg-9">
                 <Outlet/>
                
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;