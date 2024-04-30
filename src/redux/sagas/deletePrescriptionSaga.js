
import { put, select, takeLatest } from "redux-saga/effects";
import { DELETE_PRESCRIPTION} from "../types/usersType";
import { postApiCallWithNewParams } from "../../utils/ApiHandler";
import { deletePrescriptionAction, deletePrescriptionErrorAction, deletePrescriptionSuccessAction } from "../slices/deletePrescriptionSlice";


// Generator function

function* deletePrescriptionSagas(action) {
  console.log(' action deletePrescriptionSagas in saga------',action)
    
    yield put(deletePrescriptionAction(true));
    const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend :storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
    
  try {
const response = yield postApiCallWithNewParams({url:`${countryCode}/DeleteSavedPrescription`, json:action.payload})


    console.log('active deletePrescriptionSagas in saga-----',response)
    yield put(deletePrescriptionSuccessAction(response));
    yield put(deletePrescriptionAction(false));

  } catch (error) {
    console.log("api error", error)

    yield put(deletePrescriptionErrorAction(error));
  }
}

// Generator function
export function* watchdeletePrescription() {
  yield takeLatest(DELETE_PRESCRIPTION, deletePrescriptionSagas);
}