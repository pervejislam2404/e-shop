import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setContainer } from '../../../../Redux/slice/statesSlice';
import SingleProduct from '../SingleProduct/SingleProduct';
import loader from '../../../../loader.gif'

const BeautyProducts = () => {
    const dispatch = useDispatch()
    const Container = useSelector((state)=> state.stateContainer.Container)
    
    // getting-all-beauty-product-from-database
    
    useEffect(() => {
        axios(`https://guarded-ocean-40685.herokuapp.com/products/beautyProduct`)
        .then((response) => {
            dispatch(setContainer(response.data));
        })
    },[])

    return (
        <div>
            <div className="d-flex justify-content-center">
               {!Container.length && <img src={loader} alt="" />}
            </div>

           <div className="row g-4 p-4">
                {
                Container.length && Container.map((item,index)=><SingleProduct key={index} product={item}/>)
                }
           </div>
        </div>
    );
};

export default BeautyProducts;