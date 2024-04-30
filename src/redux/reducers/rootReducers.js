import {combineReducers} from '@reduxjs/toolkit';
import registerUserSlice from '../slices/registerSlice';
import forgotPassSlice from '../slices/forgotPassSlice';
import getOtpSlice from '../slices/getOtpSlice';
import newPassSlice from '../slices/newPassSlice';
import preferencesSlice from '../slices/preferencesSlice';
import lastOrderSlice from '../slices/lastOrderSlice';
import productTypeSlice from '../slices/productTypeSlice';
import TopBrandSlice from '../slices/topBrandSlice';
import activeCategorySlice from '../slices/activeCategorySlice';
import comfiProductSlice from '../slices/comfiProductSlice';
import getProductSlice from '../slices/getProductSlice';
import CategoryListSlice from '../slices/categoryListSlice';
import DetailsSlice from '../slices/DetailsSlice';
import homeScreenSlice from '../slices/homeScreenSlice';
import loginUserSlice from '../slices/loginUserSlice';
import getAccountSlice from '../slices/getAccountSlice';
import getOrderHistorySlice from '../slices/getOrderHistorySlice';
import autoReplenishSlice from '../slices/autoReplenishSlice';
import getBasketSlice from '../slices/getBasketSlice';
import updateBasketSlice from '../slices/updateBasketSlice';
import deleteSlice from '../slices/deleteSlice';
import addToBasketSlice from '../slices/addToBasketSlice';
import personalDetailsSlice from '../slices/personalDetailsSlice';
import changePasswordSlice from '../slices/changePasswordSlice';
import WishlistSlice from '../slices/wishlistSlice';
import addWishlistSlice from '../slices/addWishlistSlice';
import submitReviewSlice from '../slices/submitReviewSlice';
import viewReviewSlice from '../slices/viewReviewSlice';
import RewardPointSlice from '../slices/RewardPointSlice';
import creditScoreSlice from '../slices/creditScoreSlice';
import chooseGlassOneSlice from '../slices/chooseGlassOneSlice';
import chooseGlassSecondSlice from '../slices/chooseGlassSecondSlice';
import deleteAccountSlice from '../slices/deleteAccountSlice';
import communicationPreferenceSlice from '../slices/communicationPreferenceSlice';
import communicationSlice from '../slices/communicationSlice';
import addressBookSlice from '../slices/addressBookSlice';
import defaultAddressSlice from '../slices/defaultAddressSlice';
import newAddressSlice from '../slices/newAddressSlice';
import updateAddressSlice from '../slices/addressUpdateSlice';
import removeAddressSlice from '../slices/addressRemoveSlice';
import postCodeAddressSlice from '../slices/addressPostCodeSlice';
import selectCountrySlice from '../slices/selectCountrySlice';
import getReminderDetailSlice from '../slices/getReminderDetailSlice';
import postReminderDetailSlice from '../slices/postReminderDetailSlice';
import getReminderDateSlice from '../slices/getReminderDateSlice';
import chooseSeccondListSlice from '../slices/chooseSeccondListSlice';
import checkoutSlice from '../slices/checkoutSlice';
import makeOrdersSlice from '../slices/makeOrdersSlice';
import scheduleDateSlice from '../slices/scheduleDateSlice';
import cancelAutoReplenishSlice from '../slices/cancelAutoReplenishSlice';
import changeScheduleDateSlice from '../slices/changeScheduleDateSlice';
import changeAutoAddressSlice from '../slices/changeAutoAddressSlice';
import getFilterSlice from '../slices/getFilterSlice';
import getFilteredDataSlice from '../slices/getFilteredDataSlice';
import getContactDetailsSlice from '../slices/getContactDetailsSlice';
import customerFeedbackSlice from '../slices/customerFeedbackSlice';
import reorderSlice from '../slices/reorderSlice';
import getStockSlice from '../slices/getStockSlice';
import paymentCardSlice from '../slices/paymentCardSlice';
import deletePaymentCardSlice from '../slices/deletePaymentCardSlice';
import upgradeProductSlice from '../slices/upgradeProductSlice';
import searchSlice from '../slices/searchSlice';
import uploadPrescriptionSlice from '../slices/uploadPrescriptionSlice';
import searchBytermSlice from '../slices/searchBytermSlice';
import wishlistCountSlice from '../slices/wishlistCountSlice';
import cancelOrderSlice from '../slices/cancelOrderSlice';
import returnOrderSlice from '../slices/returnOrderSlice';
import getPrescriptionSlice from '../slices/getPrescriptionSlice';
import deletePrescriptionSlice from '../slices/deletePrescriptionSlice';
import getProductIdSlice from '../slices/getProductIdSlice';

const rootReducers = combineReducers({
  newuser: registerUserSlice,
  loginuser: loginUserSlice,
  forgotPass: forgotPassSlice,
  getOtp: getOtpSlice,
  newPass: newPassSlice,
  preferences: preferencesSlice,
  getlastOrder: lastOrderSlice,
  getproductType: productTypeSlice,
  topBrands: TopBrandSlice,
  activeCategory: activeCategorySlice,
  comfiProduct: comfiProductSlice,
  getProduct: getProductSlice,
  listCategory: CategoryListSlice,
  details: DetailsSlice,
  homeScreen: homeScreenSlice,
  accountData: getAccountSlice,
  orderHistory: getOrderHistorySlice,
  autoReplenish: autoReplenishSlice,
  myBasket: getBasketSlice,
  updateBasketQuantity: updateBasketSlice,
  deleteBasketItems: deleteSlice,
  addToBasket: addToBasketSlice,
  personDetails: personalDetailsSlice,
  changePass: changePasswordSlice,
  wishlist: WishlistSlice,
  addWishlist: addWishlistSlice,
  reviewSubmit: submitReviewSlice,
  reviewView: viewReviewSlice,
  rewardPoint: RewardPointSlice,
  creditScore: creditScoreSlice,
  chooseSection: chooseGlassOneSlice,
  choooseSecond: chooseGlassSecondSlice,
  accountDelete: deleteAccountSlice,
  communicationPreference: communicationPreferenceSlice,
  communication: communicationSlice,
  customerAddress: addressBookSlice,
  setAddress: defaultAddressSlice,
  addAddress: newAddressSlice,
  updateAddress: updateAddressSlice,
  removeAddress: removeAddressSlice,
  postCodeAddress: postCodeAddressSlice,
  countrySelect: selectCountrySlice,
  reminderDetail: getReminderDetailSlice,
  reorderReminder: postReminderDetailSlice,
  reminderDate: getReminderDateSlice,
  checkout: checkoutSlice,
  ordersMake: makeOrdersSlice,
  dateSchedule: scheduleDateSlice,
  autoReplenishCancel: cancelAutoReplenishSlice,
  scheduleDateChange: changeScheduleDateSlice,
  autoAddressChange: changeAutoAddressSlice,
  getFilter: getFilterSlice,
  getFilteredData: getFilteredDataSlice,
  secondList: chooseSeccondListSlice,
  checkout: checkoutSlice,
  ordersMake: makeOrdersSlice,
  dateSchedule: scheduleDateSlice,
  autoReplenishCancel: cancelAutoReplenishSlice,
  scheduleDateChange: changeScheduleDateSlice,
  autoAddressChange: changeAutoAddressSlice,
  customerDetails: getContactDetailsSlice,
  feedbackDetails: customerFeedbackSlice,
  reorderCall: reorderSlice,
  stocksSlice: getStockSlice,
  cardDetails: paymentCardSlice,
  deleteCard: deletePaymentCardSlice,
  upgradeProdcut:upgradeProductSlice,
  searchTerm:searchBytermSlice,
  searchProduct: searchSlice,
  uploadPrescriptionData: uploadPrescriptionSlice,
  wishlistcounts:wishlistCountSlice,
  cancelOrder: cancelOrderSlice,
  returnOrder: returnOrderSlice,
  savedPrescription:getPrescriptionSlice,
  deletePres:deletePrescriptionSlice,
  productId:getProductIdSlice

});

export default rootReducers;
