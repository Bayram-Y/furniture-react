import { createSelector } from "reselect";
import { AppRootState, HomePageState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;
export const retrievePopularDishes = createSelector(
  selectHomePage, //(1)
  (homePage: HomePageState) => homePage.popularDishes //(2)
);

export const retrieveNewDishes = createSelector(
  selectHomePage,
  (homePage: HomePageState) => homePage.newDishes
);

export const retrieveTopUsers = createSelector(
  (state: AppRootState) => state.homePage, //(1)
  (homePage: HomePageState) => homePage.topUsers
);
