import { put, select, takeLatest } from "redux-saga/effects";
import { UPGRADE_PRODUCT} from "../types/usersType";
import {  postApiCallWithNewParams } from "../../utils/ApiHandler";
import { upgradeProductAction, upgradeProductErrorAction, upgradeProductSuccessAction } from "../slices/upgradeProductSlice";

// Generator function

function* getUpgradeProduct(action) {
  console.log(' action getUpgradeProduct-----',action)
    
    yield put(upgradeProductAction(true));
    const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend :storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
    
  try {
const response = yield  yield postApiCallWithNewParams({url:`${countryCode}/UpgradeProductDetail`, json:action.payload})
    

    console.log(' getUpgradeProduct in success-----',response)
    yield put(upgradeProductSuccessAction(response));
    yield put(upgradeProductAction(false));

  } catch (error) {
    console.log("api getUpgradeProduct error", error)

    yield put(upgradeProductErrorAction(error));
  }
}

// Generator function
export function* watchGetUpgradeProduct() {
  yield takeLatest(UPGRADE_PRODUCT, getUpgradeProduct);
}