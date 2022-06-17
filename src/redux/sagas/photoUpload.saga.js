import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';


function* postPicture(action) {
    try{
        console.log('in PostPicture', action.payload);

        yield axios.post(`api/user/photo`, action.payload)

        yield put({type: 'GET_PHOTO'})
        
    } catch (error) {
        console.log('Photo upload failed hehehe', error);
        
    }
}

function* photoUploadSaga() {
    yield takeLatest('POST_PHOTO', postPicture)
}

export default photoUploadSaga