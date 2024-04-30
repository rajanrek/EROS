// import { PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
// import { put, takeLatest } from "redux-saga/effects";
// import { GET_HOME_PAGE, GET_LIST} from "../types/usersType";
// import {   postApiCallWithNewParams } from "../../utils/ApiHandler";
// import { getCategoryListAction, getCategoryListErrorAction, getCategoryListSuccessAction } from "../slices/categoryListSlice";

// // Generator function

// function* getHomeSagas(action) {
//   
    
//     yield put(getCategoryListAction(true));

//   try {
// const response = yield postApiCallWithNewParams({url:'GetProductTypeForCustomer', json:action.payload})
    
// // yield AsyncStorage.setItem('token', JSON.stringify(response));

//     console.log('active category in saga-----',response)
//     yield put(getCategoryListSuccessAction(response));
//     yield put(getCategoryListAction(false));

//   } catch (error) {
//     console.log("api error", error)

//     yield put(getCategoryListErrorAction(error));
//   }
// }

// // Generator function
// export function* watchGetHome() {
//   yield takeLatest(GET_HOME_PAGE, getHomeSagas);
// }