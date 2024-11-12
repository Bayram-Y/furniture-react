import { createSelector } from "reselect";
import { AppRootState, OrdersPageState } from "../../../lib/types/screen";

const selectOrdersPage = (state: AppRootState) => state.ordersPage;

export const retrievePausedOrders = createSelector(
  selectOrdersPage, //(1)
  (ordersPage: OrdersPageState) => ordersPage.pausedOrders //(2)
);

export const retrieveProcessOrders = createSelector(
  selectOrdersPage, //(1)
  (ordersPage: OrdersPageState) => ordersPage.processOrders //(2)
);

export const retrieveFinishedOrders = createSelector(
  selectOrdersPage, //(1)
  (ordersPage: OrdersPageState) => ordersPage.finishedOrders //(2)
);
