import {
  ADD_NEW_USER,
  GET_USER_BY_ID,
  LOGIN_USER,
  REGISTER_USER,
  FORGOT_PASSWORD,
  GET_OTP,
  NEW_PASSWORD,
  PREFERENCES_SELECTION,
  LAST_ORDER,
  PRODUCT_TYPE,
  TOP_BRANDS,
  ACTIVE_CATEGORY,
  COMFI_PRODUCT,
  GET_PRODUCT,
  GET_CATEGORY_LIST,
  GET_HOME_PAGE,
  GET_DETAILS_SCREEN,
  HOME_SCREEN,
  GET_ACCOUNT_SCREEN,
  GET_ORDER_HISTORY,
  AUTO_REPLENISH,
  GET_BASKET,
  UPDATE_BASKET,
  DELETE_BASKET,
  ADD_TO_BASKET,
  PERSONAL_DETAILS,
  CHANGE_PASSWORD,
  GET_WISHLIST,
  ADD_WISHLIST,
  SUBMIT_REVIEW,
  VIEW_REVIEW,
  REWARD_POINT,
  CREDIT_SCORE,
  SECTION_ONE,
  SECTION_TWO,
  DELETE_ACCOUNT,
  SECTION_SECCOND_LIST,
  COMMUNICATION_PREFERENCES,
  COMMUNICATION,
  ADDRESS_BOOK,
  DEFAULT_ADDRESS,
  NEW_ADDRESS,
  UPDATE_ADDRESS,
  REMOVE_ADDRESS,
  POSTCODE_ADDRESS,
  SELECT_COUNTRY,
  GET_REMINDER_DETAIL,
  POST_REMINDER_DETAIL,
  GET_REMINDER_DATE,
  GET_CHECKOUT,
  MAKE_ORDERS,
  SCHEDULE_AUTO_DATE,
  CANCEL_AUTOREPLENISH,
  CHANGE_SCHEDULE_AUTO_DATE,
  CHANGE_AUTO_ADDRESS,
  GET_FILTER,
  GET_FILTERED_DATA,
  GET_CONTACT_DETAILS,
  CUSTOMER_FEEDBACK,
  REORDER_CALL,
  GET_STOCK,
  PAYMENT_CARD,
  DELETE_PAYMENT_CARD,
  UPGRADE_PRODUCT,
  SEARCH_PRODUCT,
  UPLOAD_PRESCRIPTION,
  SEARCH_PRODUCT_BY_TERM,
  GET_WISHLIST_COUNT,
  CANCEL_ORDER,
  RETURN_ORDER,
  GET_PRESCRIPTIONS,
  DELETE_PRESCRIPTION,
  GET_PRODUCT_ID
} from '../types/usersType';

export const getUserDetails = data => ({
  type: GET_USER_BY_ID,
  payload: data,
});

export const GetProductId = data => ({
  type: GET_PRODUCT_ID,
  payload: data,
});

export const addNewUser = data => ({
  type: ADD_NEW_USER,
  payload: data,
});

export const registerNewUser = data => ({
  type: REGISTER_USER,
  payload: data,
});

export const LoginUser = data => ({
  type: LOGIN_USER,
  payload: data,
});

export const ForgotPass = data => ({
  type: FORGOT_PASSWORD,
  payload: data,
});

export const GetOtp = data => ({
  type: GET_OTP,
  payload: data,
});

export const NewPass = data => ({
  type: NEW_PASSWORD,
  payload: data,
});

export const Preferences = data => ({
  type: PREFERENCES_SELECTION,
  payload: data,
});

export const lastOrder = data => ({
  type: LAST_ORDER,
  payload: data,
});

export const ProductType = () => ({
  type: PRODUCT_TYPE,
});

export const TopBrands = data => ({
  type: TOP_BRANDS,
  payload: data,
});

export const ActiveCategory = data => ({
  type: ACTIVE_CATEGORY,
  payload: data,
});

export const ComfiProduct = data => ({
  type: COMFI_PRODUCT,
  payload: data,
});

export const getProduct = data => ({
  type: GET_PRODUCT,
  payload: data,
});

export const getListProduct = data => ({
  type: GET_CATEGORY_LIST,
  payload: data,
});
export const getHomePage = data => ({
  type: GET_HOME_PAGE,
  payload: data,
});

export const getDetailsPage = (data, CustomerId) => ({
  type: GET_DETAILS_SCREEN,
  payload: data,
  CustomerId:CustomerId
});

export const getHomeScreen = data => ({
  type: HOME_SCREEN,
  payload: data,
});
export const getTabList = data => ({
  type: GET_TAB_LIST,
});
export const getAccountData = data => ({
  type: GET_ACCOUNT_SCREEN,
  payload: data,
});

export const getOrderHistory = data => ({
  type: GET_ORDER_HISTORY,
  payload: data,
});

export const getAutoReplenish = data => ({
  type: AUTO_REPLENISH,
  payload: data,
});

export const getBasket = data => ({
  type: GET_BASKET,
  payload: data,
});

export const updateBasket = data => ({
  type: UPDATE_BASKET,
  payload: data,
});

export const deleteBasket = data => ({
  type: DELETE_BASKET,
  payload: data,
});

export const addBasket = (endPoint, data, from) => ({
  type: ADD_TO_BASKET,
  payload: data,
  endPoint: endPoint,
  from:from,
});

export const personDetails = (data, customerId) => ({
  type: PERSONAL_DETAILS,
  payload: data,
  customerId,
});

export const changePassword = data => ({
  type: CHANGE_PASSWORD,
  payload: data,
});
export const getWishlist = data => ({
  type: GET_WISHLIST,
  payload: data,
});
export const AddWishlist = data => ({
  type: ADD_WISHLIST,
  payload: data,
});

export const SubmitReview = data => ({
  type: SUBMIT_REVIEW,
  payload: data,
});

export const AllReview = data => ({
  type: VIEW_REVIEW,
  payload: data,
});

export const RewardPoint = data => ({
  type: REWARD_POINT,
  payload: data,
});

export const CreditScore = data => ({
  type: CREDIT_SCORE,
  payload: data,
});

export const SectionOne = () => ({
  type: SECTION_ONE,
});
export const SectionSeccond = data => ({
  type: SECTION_TWO,
  payload: data,
});

export const deleteAccount = customerId => ({
  type: DELETE_ACCOUNT,
  customerId,
});

export const SectionSeccondList = data => ({
  type: SECTION_SECCOND_LIST,
  payload: data,
});

export const communicationPreference = customerId => ({
  type: COMMUNICATION_PREFERENCES,
  customerId,
});

export const communication = (data, customerId) => ({
  type: COMMUNICATION,
  payload: data,
  customerId,
});

export const customerAddress = data => ({
  type: ADDRESS_BOOK,
  payload: data,
});

export const setAddress = data => ({
  type: DEFAULT_ADDRESS,
  payload: data,
});

export const addAddress = data => ({
  type: NEW_ADDRESS,
  payload: data,
});

export const updateAddress = data => ({
  type: UPDATE_ADDRESS,
  payload: data,
});

export const removeAddress = data => ({
  type: REMOVE_ADDRESS,
  payload: data,
});

export const postCodeAddress = data => ({
  type: POSTCODE_ADDRESS,
  payload: data,
});

export const selectCountry = data => ({
  type: SELECT_COUNTRY,
  payload: data,
});

export const getReminderDetail = customerId => ({
  type: GET_REMINDER_DETAIL,
  customerId,
});

export const postReminderDetail = (data, customerId) => ({
  type: POST_REMINDER_DETAIL,
  payload: data,
  customerId,
});

export const getReminderDate = data => ({
  type: GET_REMINDER_DATE,
  payload: data,
});

export const getCheckout = data => ({
  type: GET_CHECKOUT,
  payload: data,
});

export const getReorder = data => ({
  type: REORDER_CALL,
  payload: data,
});

export const MakeOrders = data => ({
  type: MAKE_ORDERS,
  payload: data,
});
export const postScheduleDate = data => ({
  type: SCHEDULE_AUTO_DATE,
  payload: data,
});

export const postCancelAutoReplenish = data => ({
  type: CANCEL_AUTOREPLENISH,
  payload: data,
});

export const postChangeScheduleDate = data => ({
  type: CHANGE_SCHEDULE_AUTO_DATE,
  payload: data,
});

export const postChangeAutoAddress = data => ({
  type: CHANGE_AUTO_ADDRESS,
  payload: data,
});

export const getFilter = (endPoint,data) => ({
  type: GET_FILTER,
  payload: data,
  endPoint: endPoint
});

export const getFilteredData = (endPoint,data) => ({
  type: GET_FILTERED_DATA,
  payload: data,
  endPoint: endPoint
});
export const getContactDetails = () => ({
  type: GET_CONTACT_DETAILS,
});

export const postCustomerFeedback = data => ({
  type: CUSTOMER_FEEDBACK,
  payload: data,
});

export const getStock = (endPoint, data) => ({
  type: GET_STOCK,
  payload: data,
  endPoint: endPoint,
});

export const getPaymentCard = customerId => ({
  type: PAYMENT_CARD,
  customerId,
});

export const postDeleteCard = data => ({
  type: DELETE_PAYMENT_CARD,
  payload: data,
});

export const upgradeProduct =data=>({
  type: UPGRADE_PRODUCT,
  payload: data,
})

export const getSearch = (data )=> ({
  type: SEARCH_PRODUCT,
  payload:data,
});

export const uploadPrescription = data => ({
  type: UPLOAD_PRESCRIPTION,
  payload:data,
});
export const getSearchbyTerm = (data )=> ({
  type: SEARCH_PRODUCT_BY_TERM,
  payload:data,
});
export const getWishlistCount = data => ({
  type: GET_WISHLIST_COUNT,
  payload: data,
})
export const getCancelOrder = (data)=> ({
  type: CANCEL_ORDER,
  payload:data,
});

export const getRetrunOrder = (data )=> ({
  type: RETURN_ORDER,
  payload:data,
});
export const getPrescriptions = (data)=> ({
  type: GET_PRESCRIPTIONS,
  payload:data,
});
export const deletePrescription = (data)=> ({
  type: DELETE_PRESCRIPTION,
  payload:data,
});