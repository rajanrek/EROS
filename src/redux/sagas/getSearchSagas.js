import { put, select, takeLatest } from "redux-saga/effects";
import {SEARCH_PRODUCT} from "../types/usersType";
import {getApiCallwithNew} from "../../utils/ApiHandler";
import { getSearchAction, getSearchErrorAction, getSearchSuccessAction, getSearchSuccessAllDataAction } from "../slices/searchSlice";

// Generator function

function* getSearchSagas(action) {
  console.log(' action getSearchSagas in saga------',action)
    
    yield put(getSearchAction(true));
    const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend :storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
    
  try {
const response = yield getApiCallwithNew({url:`${countryCode}/SearchProduct/`, json:action.payload})
    

    console.log('getSearchSagas success in saga-----',response)

      yield put(getSearchSuccessAction(response));

    yield put(getSearchAction(false));

  } catch (error) {
    console.log("api error", error)

    yield put(getSearchErrorAction(error));
  }
}

// Generator function
export function* watchGetSearch() {
  yield takeLatest(SEARCH_PRODUCT, getSearchSagas);
}