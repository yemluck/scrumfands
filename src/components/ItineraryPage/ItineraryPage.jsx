import './ItineraryPage.css'
import { useHistory, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ItineraryForm from '../ItineraryForm/ItineraryForm';



function Itinerary (){
    const user = useSelector(store=>store.user)
    return( 
        <>
        <h1> This is the Itinerary page </h1>
        <h3> Welcome {user.first_name} </h3>
        <ItineraryForm />
            <Link to="/userF"><button>cancel</button></Link>
        </>
    )
}

export default Itinerary