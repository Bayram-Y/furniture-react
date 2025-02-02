import { createSelector } from "reselect";
import { AppRootState, HomePageState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;
export const retrievePopularProduct = createSelector(
  selectHomePage, //(1)
  (homePage: HomePageState) => homePage.popularProduct //(2)
);

export const retrieveNewProduct = createSelector(
  selectHomePage,
  (homePage: HomePageState) => homePage.newProduct
);

export const retrieveTopUsers = createSelector(
  (state: AppRootState) => state.homePage, //(1)
  (homePage: HomePageState) => homePage.topUsers
);
