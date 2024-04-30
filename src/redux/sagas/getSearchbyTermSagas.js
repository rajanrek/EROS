import { put, select, takeLatest } from "redux-saga/effects";
import {SEARCH_PRODUCT_BY_TERM} from "../types/usersType";
import {getApiCallwithNew} from "../../utils/ApiHandler";
import { getSearchByTermAction, getSearchByTermErrorAction, getSearchByTermSuccessAction } from "../slices/searchBytermSlice";

// Generator function

function* getSearchByTermSagas(action) {
  console.log('action getSearchSagas term in saga------',action)
    
    yield put(getSearchByTermAction(true));
    const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend :storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
    
  try {
const response = yield getApiCallwithNew({url:`${countryCode}/GetProducts/`, json:action.payload})

    console.log('getSearchSagas term success in saga-----',response)

      yield put(getSearchByTermSuccessAction(response));

    yield put(getSearchByTermAction(false));

  } catch (error) {
    console.log("api error", error)

    yield put(getSearchByTermErrorAction(error));
  }
}

// Generator function
export function* watchGetSearchByTerm() {
  yield takeLatest(SEARCH_PRODUCT_BY_TERM, getSearchByTermSagas);
}