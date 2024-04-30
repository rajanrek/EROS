import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const InitialState = {
homeScreenType: {
  homeScreenData: '',
    homeisLoading: false,
    errors: '',
  }
}

const HomeScreenSlice = createSlice({
  name: 'homeScreen',
  initialState: InitialState,
  reducers: {
    getHomeScreenAction: (state, action) => {
      console.log("action category 17---", action)
      state.homeScreenType.isLoading = action.payload;
      state.homeScreenType.errors = '';
    },
    getHomeScreenSuccessAction: (state, action) => {
      console.log("category Success---", action)
      state.homeScreenType.isLoading = false;
      state.homeScreenType.homeScreenData = action.payload;
    },
    getHomeScreenErrorAction: (state, action) => {
      state.homeScreenType.isLoading = false;
      state.homeScreenType.errors = action.payload;
    },
  }
});

export const {
    getHomeScreenAction,
    getHomeScreenSuccessAction,
    getHomeScreenErrorAction,
} = HomeScreenSlice.actions;

export default HomeScreenSlice.reducer;
