import { put, select, takeLatest } from "redux-saga/effects";
import {  REWARD_POINT} from "../types/usersType";
import {   getApiCallwithNew} from "../../utils/ApiHandler";
import { getRewardPointAction, getRewardPointErrorAction, getRewardPointSuccessAction } from "../slices/RewardPointSlice";

// Generator function

function* getRewardPointSaga(action) {
  console.log(' action getRewardPointSaga in saga------',action)
    
    yield put(getRewardPointAction(true));
    const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend :storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
  try {
const response = yield getApiCallwithNew({url:`${countryCode}/RewardPoints/`, json:action.payload})
    
// yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('getRewardPointSaga category in saga-----',response)
    yield put(getRewardPointSuccessAction(response));
    yield put(getRewardPointAction(false));

  } catch (error) {
    console.log("api error", error)

    yield put(getRewardPointErrorAction(error));
  }
}

// Generator function
export function* watchRewardPoint() {
  yield takeLatest(REWARD_POINT, getRewardPointSaga);
}