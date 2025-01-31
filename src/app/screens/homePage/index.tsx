import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewProduct, setPopularProduct, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { FurnitureCategory } from "../../../lib/enums/product.enum";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import ActiveUsers from "./ActiveUsers";
import "../../../css/home.css";
import Materials from "./Materials";

/** REDUX SLICE & SELECTOR  **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularProduct: (data: Product[]) => dispatch(setPopularProduct(data)),
  setNewProduct: (data: Product[]) => dispatch(setNewProduct(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {
  const { setPopularProduct, setNewProduct, setTopUsers } = actionDispatch(
    useDispatch()
  );

  useEffect(() => {
    //Backend server data fetch => DATA (1)
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productCollection: FurnitureCategory.SOFA,
      })
      .then((data) => {
        setPopularProduct(data);
      })
      .catch((err) => console.log(err));

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        productCollection: FurnitureCategory.SOFA,
      })
      .then((data) => {
        setNewProduct(data);
      })
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getTopUsers()
      .then((data) => setTopUsers(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <Materials />
      <ActiveUsers />
    </div>
  );
}
