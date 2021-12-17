import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom';

const Products = () => {
    return (
        <div className="my-5">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-3 col-lg-3 px-0 p-3">
                        <nav className="d-flex flex-row flex-column flex-md-column flex-lg-column fs-4 gpa-4">
                            <NavLink  className={({ isActive }) => (isActive ? 'd-block text-decoration-none text-light bg-danger  ps-5 py-1 mt-2' : 'd-block text-decoration-none text-dark bg-light ps-5 py-1 mt-2')}  to="/">Shoes</NavLink>


                            <NavLink  className={({ isActive }) => (isActive ? 'd-block text-decoration-none text-light bg-danger  ps-5 py-1 mt-2' : 'd-block text-decoration-none text-dark bg-light ps-5 py-1 mt-2')} to="/beauty">Beauty products</NavLink> 

                            <NavLink  className={({ isActive }) => (isActive ? 'd-block text-decoration-none text-light bg-danger  ps-5 py-1 mt-2' : 'd-block text-decoration-none text-dark bg-light ps-5 py-1 mt-2')} to="/furniture">Furniture</NavLink>

                            <NavLink  className={({ isActive }) => (isActive ? 'd-block text-decoration-none text-light bg-danger  ps-5 py-1 mt-2' : 'd-block text-decoration-none text-dark bg-light ps-5 py-1 mt-2')} to="/cloths">Cloths</NavLink>
                        </nav>
                    </div>

                    <div className="col-12 col-md-9 col-lg-9">
                            <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;