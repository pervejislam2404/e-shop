import React from "react";
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { HashLink } from 'react-router-hash-link';
import useFirebase from '../../../firebase/useFirebase';


const Header = () => {
    const user = useSelector((state)=> state.stateContainer.user);
    const {googleSingOut} = useFirebase();

    const singleUserProducts = useSelector(
      (state) => state.stateContainer.singleUserProducts
    );



    const handleLogOut = ()=>{
        googleSingOut();
    }

  return (
    <div style={{backgroundColor:'#EAEAEA'}}>
    <div className="container mx-auto">
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">
              <img className="" width="50" height="50" src="" alt="" />
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0 fs-5"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {/* all-navigation */}
              <Nav.Link className="text-dark" as={HashLink} to="/">Home</Nav.Link>

              <Nav.Link className="text-dark" as={HashLink} to="/allProducts">
                All Products
              </Nav.Link>
              <Nav.Link className="text-dark" as={HashLink} to="/dashboard">
                Dashboard
              </Nav.Link>

              <Nav.Link className="text-dark" as={HashLink} to="/contact">
                Contact
              </Nav.Link>

             {user?.email &&  <Nav.Link className="text-info fw-bold fs-6">
               <img height="30" className="rounded-pill mx-2" width="30" src={user.photoURL} alt="" />
                {user.email}
              </Nav.Link>}

              {!user?.email && <Nav.Link className="text-dark" as={HashLink} to="/register">Register</Nav.Link> }             
              {!user?.email && <Nav.Link className="text-white bg-dark px-3 fs-5 rounded" as={HashLink} to="/login"><i className="fas fa-user pe-2"></i>Login</Nav.Link>}   
                         
              {user?.email && <Button className="px-2" onClick={handleLogOut} variant="danger"><i className="fas fa-sign-out-alt px-2 fs-6"></i> logOut</Button>}

              <button type="button" class="btn  position-relative mx-4">
               <i class="fas fa-cart-plus fs-2 text-primary"></i>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {singleUserProducts?.length}
                  {/* <span class="visually-hidden">unread messages</span> */}
                </span>
              </button>
             
            </Nav>           
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
    </div>
  );
};

export default Header;