import React from 'react';
import { Accordion, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const Contact = () => {

    const { register, handleSubmit } = useForm();


    const onSubmit = (data) => {
        console.log(data);
    }


    return (
        <div>
            <div className="container py-4">
                <h4 className="text-center fs-2 fw-bold p-5">Contact information</h4>
                <div className="row">
                    <div className="col-12 col-md-3 col-lg-3">
                        <div className=" px-5 py-4 text-center">
                               <i class="far fa-envelope myFont pb-4"></i>
                               <h3>E-Mail Address</h3>
                               <p style={{color:'gray'}} className="">e-shop@qode.com</p>
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-lg-3">
                         <div className=" px-5 py-4 text-center">
                               <i class="myFont fas fa-headphones-alt pb-4"></i>
                               <h3>Phone Number</h3>
                               <p style={{color:'gray'}} className="">0035 265 244 58</p>
                        </div> 
                    </div> 

                    <div className="col-12 col-md-3 col-lg-3">
                        <div className=" px-5 py-4 text-center">
                              <i class="myFont fas fa-map-marker-alt pb-4"></i>
                               <h3>Address</h3>
                               <p style={{color:'gray'}} className="">28 Bartholomeo street, NY</p>
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-lg-3">
                        <div className=" px-5 py-4 text-center">
                                <i class="myFont far fa-file-alt pb-4"></i>
                               <h3>Fax</h3>
                               <p style={{color:'gray'}} className="">0035 244 58 265</p>
                        </div>
                    </div>
                </div>
            </div>



            <div className="container py-5">
                <div className="row"> 
                    <div className="col-12 col-md-6 col-ld-6">
                <h2 className="text-center fw-bold py-4">MOST ASKED QUESTIONS</h2>
                    <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>How i can control my order?</Accordion.Header>
                                <Accordion.Body>
                                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                est laborum.
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Why is my registration delayed?</Accordion.Header>
                                <Accordion.Body>
                                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                est laborum.
                                </Accordion.Body>
                            </Accordion.Item>


                            <Accordion.Item eventKey="2">
                                <Accordion.Header>What do i need to buy products?</Accordion.Header>
                                <Accordion.Body>
                                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                est laborum.
                                </Accordion.Body>
                            </Accordion.Item>


                            <Accordion.Item eventKey="3">
                                <Accordion.Header>How i can track my order?</Accordion.Header>
                                <Accordion.Body>
                                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                est laborum.
                                </Accordion.Body>
                            </Accordion.Item>


                            <Accordion.Item eventKey="4">
                                <Accordion.Header>How i can get back my money?</Accordion.Header>
                                <Accordion.Body>
                                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                    </Accordion>
                    </div>


                    <div className="col-12 col-md-6 col-ld-6">
                <h2 className="text-center fw-bold py-4">CONTACT FORM</h2>

                    <form className="gap-2 px-3" onSubmit={handleSubmit(onSubmit)}>
                            <input
                                style={{border: '2px solid lightgray'}}
                                className="w-100 p-3 fs-5"
                                {...register("name", { required: true })}
                                placeholder="Name"
                            />

                            <input
                                style={{border: '2px solid lightgray'}}
                                type="email"
                                className="p-3 w-100 fs-5 my-3"
                                {...register("email", { required: true })}
                                placeholder="Email"
                            />

                            <textarea
                                style={{border: '2px solid lightgray'}}
                                className="w-100 p-3 fs-5 mb-3"
                                rows="3"
                                type="email"
                                {...register("email", { required: true })}
                                placeholder="Email"
                            ></textarea>

                           
                            {/* <input type="number" {...register("age", { min: 18, max: 99 })} /> */}
                            <Button variant="dark" className="p-2 w-100 text-white px-5 mx-auto fs-5 border-0" type="submit">Register</Button>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;