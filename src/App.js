import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router ,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home/Home/Home';
import Header from './components/Shared/Header/Header';
import Login from './components/Home/Login/Login';
import Register from './components/Home/Register/Register';
import PrivateRoute from './components/Shared/PrivateRoute/PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard';
import MyOrders from './components/Dashboard/MyOrders/MyOrders';
import Payment from './components/Dashboard/Payment/Payment';
import MakeAdmin from './components/Dashboard/MakeAdmin/MakeAdmin';
import ManageAllOrders from './components/Dashboard/ManageAllOrders/ManageAllOrders';
import Review from './components/Dashboard/Review/Review';
import ManageProducts from './components/Dashboard/ManageProducts/ManageProducts';
import AddProduct from './components/Dashboard/AddProduct/AddProduct';
import NotFound from './components/Dashboard/NotFound/NotFound';
import Shoes from './components/Home/Products/Shoes/Shoes';
import Furniture from './components/Home/Products/Furniture/Furniture';
import Cloths from './components/Home/Products/Cloths/Cloths';
import BeautyProducts from './components/Home/Products/BeautyProducts/BeautyProducts';
import DetailRoute from './components/DetailRoute/DetailRoute';
import AllProducts from './components/Home/AllProducts/AllProducts';
import Footer from './components/Shared/Footer/Footer';
import Contact from './components/Contact/Contact';


function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}>
              <Route path="/" element={<Shoes/>}/>
              <Route path="/furniture" element={<Furniture/>}/>
              <Route path="/cloths" element={<Cloths/>}/>
              <Route path="/beauty" element={<BeautyProducts/>}/>
          </Route>

          <Route path="/home" element={<Home/>}/>

          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/allProducts" element={<AllProducts/>}/>
          <Route path="/contact" element={<Contact/>}/>


          <Route path="/dashboard" element={<Dashboard/>}>
              <Route path="/dashboard/" element={<MyOrders/>}/>            
              <Route path="/dashboard/payment/:id" element={<Payment/>}/>
              <Route path="/dashboard/makeAdmin" element={<MakeAdmin/>}/>
              <Route path="/dashboard/manageAllOrders" element={ <ManageAllOrders/>} />
              <Route path="/dashboard/review" element={<Review/>} />
              <Route path="/dashboard/manageProducts" element={<ManageProducts/>} />
              <Route path="/dashboard/addProduct" element={<AddProduct/>} />
              <Route path="/dashboard/*" element={<NotFound/>} />
          </Route>

          <Route path="/detail/:id" element={<PrivateRoute>
            <DetailRoute/>                 
          </PrivateRoute>}/>

        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
