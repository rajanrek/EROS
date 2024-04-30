import {all, fork} from 'redux-saga/effects';
// import { watchGetUser } from "./usersSagas";
import {watchGetRegistertUser} from '../registerSagas';
import {watchGetLoginUser} from '../loginSagas';
import {watchGetForgotpass} from '../forgotPassSagas';
import {watchGetOtp} from '../getOtpSagas';
import {watchNewPass} from '../newPassSagas';
import {watchPreferences} from '../preferencesSagas';
// import { watchGetLastOrder } from "./lastOrderSagas";
import {watchGetProductType} from '../productTypeSagas';
// import { watchGetTopBrands } from "./topBrandSagas";
import {watchGetActiveCategory} from '../activeCategorySagas';
// import { watchGetComfiProduct } from "./comfiProductSagas";

import {watchChooseSecondList} from '../chooseSecondListSagas';
import {watchGetProduct} from '../getProductSagas';
import {watchGetListCategory} from '../categoryListSagas';
import {watchGetDetails} from '../detailsSagas';
import {watchHomeScreen} from '../homeScreenSagas';
import {watchGetAccount} from '../getAccountSagas';
import {watchGetOrderHistory} from '../getOrderHistorySagas';
import {watchGetAutoReplenish} from '../autoReplenishSagas';
import {watchGetBasket} from '../getBasketSagas';
import {watchUpdateBasket} from '../updateBasketSagas';
import {watchDeleteBasket} from '../deleteBasketSagas';
import {watchAddBasket} from '../addBasketSagas';
import {watchGetWishlist} from '../getWishlistSagas';
import {watchAddWishlist} from '../addWishlistSagas';
import {watchSubmitReview} from '../submitReviewSagas';
import {watchViewReview} from '../viewReviewSagas';
import {watchPersonalDetails} from '../personalDetailsSagas';
import {watchchangePassword} from '../changePasswordSagas';
import {watchRewardPoint} from '../rewardPointsSaga';
import {watchCreditScore} from '../storeCreditSaga';
import {watchGetChooseSection} from '../chooseSectionOneSagas';
import {watchChooseSectionTwo} from '../chooseSectionTwoSaga';
import {watchDeleteAccount} from '../deleteAccountSagas';
import {watchCommunication} from '../communicationPreferenceSagas';
import {watchCommunicationPreference} from '../communicationSagas';
import {watchAddressBook} from '../addressBookSagas';
import {watchDefaultAddress} from '../defaultAddressSagas';
import {watchNewAddress} from '../newAddressSagas';
import {watchUpdateAddress} from '../updateAddressSagas';
import {watchRemoveAddress} from '../removeAddressSagas';
import {watchPostCodeAddress} from '../postCodeAddressSagas';
import {watchSelectCountry} from '../selectCountrySagas';
import {watchGetReminderDetail} from '../getReminderDetailSagas';
import {watchPostReminderDetail} from '../postReminderDetailSagas';
import {watchGetReminderDate} from '../getReminderDateSagas';
import {watchCheckout} from '../checkoutSaga';
import {watchGetMakeOrders} from '../makeOrdersSagas';
import {watchScheduleDate} from '../scheduleDateSagas';
import {watchCancelAutoReplenish} from '../cancelAutoReplenishSagas';
import {watchChangeScheduleDate} from '../changeScheduleDateSagas';
import {watchChangeAutoAddress} from '../changeAutoAddressSagas';
import {watchGetFilter} from '../getFilterSaga';
import {watchGetFiltered} from '../getFilteredDataSaga';
import {watchContactDetails} from '../getContactDetailsSagas';
import {watchCustomerFeedback} from '../customerFeedbackSagas';
import {watchReorder} from '../reorderSaga';
import {watchGetStock} from '../getStockSagas';
import { watchGetWishlistCount } from '../getWishlistCountSagas';
import {watchPaymentCard} from '../paymentCardSagas';
import {watchDeletePaymentCard} from '../deletePaymentCardSagas';
import {watchGetUpgradeProduct} from '../upgradeProductSagas';
import {watchGetSearch} from '../getSearchSagas';
import {watchGetUploadPrescription} from '../uploadPrescriptionSaga';
import {watchGetSearchByTerm} from '../getSearchbyTermSagas';
import {watchCancelRequest} from '../cancelRequestSagas';
import { watchReturnRequest } from '../returnOrderSagas';
import { watchGetPrescription } from '../getPrescriptionSagas';
import { watchdeletePrescription } from '../deletePrescriptionSaga';
import { watchGetProductId } from '../getProductIdSaga';

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
    fork(watchGetWishlist),
    fork(watchAddWishlist),
    fork(watchSubmitReview),
    fork(watchViewReview),
    fork(watchPersonalDetails),
    fork(watchchangePassword),
    fork(watchRewardPoint),
    fork(watchCreditScore),
    fork(watchGetChooseSection),
    fork(watchChooseSectionTwo),
    fork(watchDeleteAccount),
    fork(watchChooseSecondList),
    fork(watchCommunication),
    fork(watchCommunicationPreference),
    fork(watchAddressBook),
    fork(watchDefaultAddress),
    fork(watchNewAddress),
    fork(watchUpdateAddress),
    fork(watchRemoveAddress),
    fork(watchPostCodeAddress),
    fork(watchSelectCountry),
    fork(watchGetReminderDetail),
    fork(watchPostReminderDetail),
    fork(watchGetReminderDate),
    fork(watchCheckout),
    fork(watchGetMakeOrders),
    fork(watchScheduleDate),
    fork(watchCancelAutoReplenish),
    fork(watchChangeScheduleDate),
    fork(watchChangeAutoAddress),
    fork(watchGetFilter),
    fork(watchGetFiltered),
    fork(watchContactDetails),
    fork(watchCustomerFeedback),
    fork(watchReorder),
    fork(watchGetStock),
    fork(watchPaymentCard),
    fork(watchDeletePaymentCard),
    fork(watchGetUpgradeProduct),
    fork(watchGetSearch),
    fork(watchGetUploadPrescription),
    fork(watchGetSearchByTerm),
    fork(watchGetWishlistCount),
    fork(watchCancelRequest),
    fork(watchReturnRequest),
    fork(watchGetPrescription),
    fork(watchdeletePrescription),
    fork(watchGetProductId)

    // Other forks
  ]);
};

export default rootSaga;
