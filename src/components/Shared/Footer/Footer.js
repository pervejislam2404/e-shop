import React from 'react';

const Footer = () => {
    return (
        <div className="bg-dark">
           <div className="container text-white">
               <div className="row py-5">
                   <div className="col-lg-3 col-md-3 col-12">
                         <h3>E-SHOP</h3>
                         <p style={{color:'lightgray'}} className="py-2">© Copyright pervej islam</p>
                         <img src="https://bazaar.qodeinteractive.com/wp-content/uploads/2017/06/footer-img-2.png" alt="" />
                   </div>

                    <div className="col-lg-3 col-md-3 col-12">
                         <h4>CONTACT WITH US</h4>
                         <div style={{color:'lightgray'}} className="ps-2 pt-3">
                            <p>28 Bartholomeo street, NY, NY</p>
                            <p>phone: 0035 265 244 58</p>
                            <p>phone: 0035 244 58 265</p>
                            <p>e-mail: e-shop@qode.com</p>
                         </div>
                   </div>

                   <div className="col-lg-3 col-md-3 col-12">
                     <h4>PROFILE</h4>
                    <div style={{color:'lightgray'}} className="ps-2 pt-3">
                        <p><i style={{color:'lightgray'}} className="far fa-user pe-3"></i>My account</p>
                        <p><i style={{color:'lightgray'}} className="fas fa-search pe-3"></i>Checkout</p>
                        <p><i style={{color:'lightgray'}} className="fas fa-home pe-3"></i>Order tracking</p>
                        <p><i style={{color:'lightgray'}} className="fas fa-headset pe-3"></i>Help and support</p>
                    </div>
                   </div>
                   <div className="col-lg-3 col-md-3 col-12">
                         <div className="">
                              <input type="email" className="text-white w-100 p-2" style={{background:'transparent', border:'2px solid white'}} placeholder="email"/>
                              <textarea style={{background:'transparent', border:'2px solid white'}} className="w-100 my-2 bg-none p-2" rows="2" placeholder="comment"></textarea>
                              <input type="submit" className="text-white w-100 p-2" style={{background:'transparent', border:'2px solid red'}} placeholder="email"/>
                         </div>
                   </div>
                  
               </div>
            </div> 
        </div>
    );
};

export default Footer;