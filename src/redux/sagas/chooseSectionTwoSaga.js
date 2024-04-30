import { put, select, takeLatest } from "redux-saga/effects";
import { SECTION_TWO} from "../types/usersType";
import { postApiCallWithNewParams } from "../../utils/ApiHandler";
import { getChooseSecondAction, getChooseSecondErrorAction, getChooseSecondSucessAction } from "../slices/chooseGlassSecondSlice";

// Generator function

function* getChooseSectionTwoSagas(action) {
  console.log('getChooseSectionTwoSagas in saga------',action)
    
    yield put(getChooseSecondAction(true));
    const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend :storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
    
  try {
const response = yield postApiCallWithNewParams({url:`${countryCode}/EyeGlassTypes`, json:action.payload})
    
// yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('getChooseSectionTwoSagas SUCCESS in saga-----',response)
    yield put(getChooseSecondSucessAction(response));
    yield put(getChooseSecondAction(false));

  } catch (error) {
    console.log("api error", error)

    yield put(getChooseSecondErrorAction(error));
  }
}

// Generator function
export function* watchChooseSectionTwo() {
  yield takeLatest(SECTION_TWO, getChooseSectionTwoSagas);
}