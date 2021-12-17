import React from 'react';
// import { Button } from 'react-bootstrap';
// import { useSelector } from 'react-redux';
// import useFirebase from '../../../firebase/useFirebase';
import Banner from '../Banner/Banner';
import Description from '../Description/Description';
import Products from '../Products/Products';
import RattingSection from '../RattingSection/RattingSection';

const Home = () => {

    return (
        <div>
          <Banner/>
          <Products/>
          <RattingSection/>
          <Description/>
        </div>
    );
};

export default Home;