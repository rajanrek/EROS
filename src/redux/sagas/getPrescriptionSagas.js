
import { put, select, takeLatest } from "redux-saga/effects";
import { GET_PRESCRIPTIONS} from "../types/usersType";
import { postApiCallWithNewParams } from "../../utils/ApiHandler";

import { getPrescriptionAction, getPrescriptionErrorAction, getPrescriptionSuccessAction } from "../slices/getPrescriptionSlice";

// Generator function

function* getPrescriptionSagas(action) {
  console.log(' action getPrescriptionSagas in saga------',action)
    
    yield put(getPrescriptionAction(true));
    const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend :storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
    
  try {
const response = yield postApiCallWithNewParams({url:`${countryCode}/GetGlassSavedPrescription`, json:action.payload})


    console.log('active getPrescriptionSagas in saga-----',response)
    yield put(getPrescriptionSuccessAction(response));
    yield put(getPrescriptionAction(false));

  } catch (error) {
    console.log("api error", error)

    yield put(getPrescriptionErrorAction(error));
  }
}

// Generator function
export function* watchGetPrescription() {
  yield takeLatest(GET_PRESCRIPTIONS, getPrescriptionSagas);
}