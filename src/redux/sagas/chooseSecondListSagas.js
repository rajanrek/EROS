import { put, select, takeLatest } from "redux-saga/effects";
import { SECTION_SECCOND_LIST} from "../types/usersType";
import { postApiCallWithNewParams } from "../../utils/ApiHandler";
import { getChooseSecondListAction, getChooseSecondListErrorAction, getChooseSecondListSucessAction } from "../slices/chooseSeccondListSlice";

// Generator function

function* getChooseSecondListSagas(action) {
  console.log('getChooseSecondListSagas in saga------',action)
    
    yield put(getChooseSecondListAction(true));
    const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend :storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
    
  try {
const response = yield postApiCallWithNewParams({url:`${countryCode}/EyeGlassAttributes`, json:action.payload})
    
// yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('getChooseSecondListSagas SUCCESS in saga-----',response)
    yield put(getChooseSecondListSucessAction(response));
    yield put(getChooseSecondListAction(false));

  } catch (error) {
    console.log("api getChooseSecondListSagas error", error)

    yield put(getChooseSecondListErrorAction(error));
  }
}

// Generator function
export function* watchChooseSecondList() {
  yield takeLatest(SECTION_SECCOND_LIST, getChooseSecondListSagas);
}