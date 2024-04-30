// import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// const usersInitialState = {
//   user: {
//     data: null,
//     registerData:null,
//     isLoading: false,
//     errors: '',
//   }
// }

// const usersSlice = createSlice({
//   name: 'users',
//   initialState: usersInitialState,
//   reducers: {
//     getUserAction: (state, action) => {
//       console.log("action 17---", action)
//       state.user.isLoading = action.payload;
//       state.user.errors = '';
//     },
//     getUserSuccessAction: (state, action) => {
//       console.log("action user Success---", action)

//       state.user.isLoading = false;
//       state.user.data = action.payload;
//     },
//     getUserRegisterAction: (state, action) => {
//       console.log("action Register---", action)

//       state.user.isLoading = false;
//       state.user.registerData = action.payload;
//     },
//     getUserErrorAction: (state, action) => {
//       state.user.isLoading = false;
//       state.user.errors = action.payload;
//     },
//   }
// });

// export const {
//   getUserAction,
//   getUserSuccessAction,
//   getUserErrorAction,
//   getUserRegisterAction
// } = usersSlice.actions;

// export default usersSlice.reducer;
