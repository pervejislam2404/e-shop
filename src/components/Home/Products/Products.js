import React from 'react';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { InputGroup, FormControl } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setContainer } from '../../../Redux/slice/statesSlice';

const Products = () => {
    const dispatch = useDispatch()
    const Container = useSelector((state)=> state.stateContainer.Container);

    const handleSearch = (e)=>{
        const searchVal = e.target.value;
        console.log(e);
        if(e.nativeEvent.data == null){
        //   return serRendarer(true)
        // handleSearch()
        }
        console.log(searchVal)
        const filterProduct= Container.filter(product => product.name.toLowerCase().includes(searchVal.toLowerCase()));
        console.log(filterProduct);
        dispatch(setContainer(filterProduct));
      }



    return (

        // every-category-product-route
        <div className="my-5">

        <div className="box pb-2 w-50 mx-auto">
        <InputGroup className="mb-3">
            <FormControl
            onChange={(e)=>handleSearch(e)}
            placeholder="Product Name"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            />
            <InputGroup.Text id="basic-addon2 bg-primary">search</InputGroup.Text>
        </InputGroup>
        </div>



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