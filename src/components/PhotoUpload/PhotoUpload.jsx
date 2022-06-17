import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';




function PhotoUpload() {

    const dispatch = useDispatch();
    const [picture, setPicture] = useState();
    const image2 = useSelector((store) => store.photoReducer)
    console.log('what is image2:', image2)

    function onSubmit(event) {
        // prevent default
        event.preventDefault();
        //form data
        const formData = new FormData();
        // create object
        formData.append('picture', picture)

        dispatch({
            type: 'POST_PHOTO',
            payload: formData
        })

        swal("Added!", "The photo has been uploaded!", "success")
        setPicture('')
    }
    // end function onSubmit

    useEffect(() => {
        // dispatch to fetch photo
        dispatch({ type: 'GET_PHOTO'})
    }, [])


    return (
        <>
        <h2> In photo upload</h2>
        <form onSubmit={onSubmit}>
            <input type="file" name="photo" 
            onChange= {(evt) => setPicture(evt.target.files[0])}
            />
            <input type="submit" value="Submit" />
        </form>
            <img src={image2.path} height="400px" width="400px"/>
        
        </>
    )
}

export default PhotoUpload