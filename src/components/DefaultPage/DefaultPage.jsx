import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';


function DefaultPage () {
    const history = useHistory();

   
    // this function redirects user to the flyer's page
    const onSelectFlyer = () => {
        console.log('in onSelectFlyer');
        history.push("/LandingPageF")
    }

    // this function redirects user to the shipper's page
    const onSelectShipper = () => {
        console.log('in onSelectShipper');
        
        history.push("/LandingPageS")
    }

    return(
        <>
        <h1> Ready to save money?</h1>
            <h4> Frequent flyers, ready to cut down on the price of expensive air tickets? Make money shipping directly for clients to subsidize air fare...


                Need instant shipment with guaranteed delivery? Try out our service ...</h4>

                <button onClick={onSelectFlyer}> Flyer </button>

                <button onClick={onSelectShipper}> shipper </button>

                <p>or <Link to="/login">login</Link> to an existing account</p>



        </>
    )
}

export default DefaultPage;