// import { PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
// import { put, select, takeLatest } from "redux-saga/effects";
// import {GET_USER_BY_ID } from "../types/usersType";
// import { getUserAction, getUserErrorAction, getUserSuccessAction } from "../slices/userSlice";
// import { postApiCallWithNewParams } from "../../utils/ApiHandler";

// // Generator function
// function* getUserSaga(action) {
//   console.log('action-9999------',action)
    
//     yield put(getUserAction(true));
//     const storeState = yield select();
//     let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend :storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
//   try {
// const response = yield postApiCallWithNewParams({url:`${countryCode}/AddAccount`, json:action.payload})

//     console.log('response---43 saga----',response)
//     yield put(getUserSuccessAction(response));
//     yield put(getUserAction(false));

//   } catch (error) {
//     console.log("api error", error)

//     yield put(getUserErrorAction(error));
//   }
// }

// // Generator function
// export function* watchGetUser() {
//   yield takeLatest(GET_USER_BY_ID, getUserSaga);
// }