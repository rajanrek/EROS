import { all, fork } from "redux-saga/effects";
// import { watchGetUser } from "./usersSagas";
import { watchGetRegistertUser } from "./registerSagas";
import { watchGetLoginUser } from "./loginSagas";
import { watchGetForgotpass } from "./forgotPassSagas";
import { watchGetOtp } from "./getOtpSagas";
import { watchNewPass } from "./newPassSagas";
import { watchPreferences } from "./preferencesSagas";
// import { watchGetLastOrder } from "./lastOrderSagas";
import { watchGetProductType } from "./productTypeSagas";
// import { watchGetTopBrands } from "./topBrandSagas";
import { watchGetActiveCategory } from "./activeCategorySagas";
// import { watchGetComfiProduct } from "./comfiProductSagas";
import { watchGetProduct } from "./getProductSagas";
import { watchGetListCategory } from "./categoryListSagas";
import { watchGetDetails } from "./detailsSagas";
import { watchHomeScreen } from "./homeScreenSagas";
import { watchGetAccount } from "./getAccountSagas";
import { watchGetOrderHistory } from "./getOrderHistorySagas";
import { watchGetAutoReplenish } from "./autoReplenishSagas";
import { watchGetBasket } from "./getBasketSagas";
import { watchUpdateBasket } from "./updateBasketSagas";
import { watchDeleteBasket } from "./deleteBasketSagas";
import { watchAddBasket } from "./addBasketSagas";
import { watchPersonalDetails } from "./personalDetailsSagas";
import { watchchangePassword } from "./changePasswordSagas";

const rootSaga = function* () {
  yield all([
    fork(watchGetRegistertUser),
    fork(watchGetLoginUser),
    fork(watchGetForgotpass),
    fork(watchGetOtp),
    fork(watchNewPass),
    fork(watchPreferences),
    fork(watchGetActiveCategory),
    fork(watchGetProduct),
    fork(watchGetProductType),
    fork(watchGetListCategory),
    fork(watchGetDetails),
    fork(watchHomeScreen),
    fork(watchGetAccount),
    fork(watchGetOrderHistory),
    fork(watchGetAutoReplenish),
    fork(watchGetBasket),
    fork(watchUpdateBasket),
    fork(watchDeleteBasket),
    fork(watchAddBasket),
    fork(watchPersonalDetails),
    fork(watchchangePassword),










    // Other forks
  ]);
};

export default rootSaga;