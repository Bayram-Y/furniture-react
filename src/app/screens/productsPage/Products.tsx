import React, { PureComponent, useEffect } from "react";
import {
  Container,
  Button,
  Box,
  Stack,
  Typography,
  Card,
  CardMedia,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  CardActions,
  Collapse,
  CssVarsProvider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";
import { AspectRatio, CardOverflow } from "@mui/joy";
import { url } from "inspector";

import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./slice";
import { createSelector } from "@reduxjs/toolkit";
import { Product } from "../../../lib/types/product";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { log } from "console";
import { serverApi } from "../../../lib/config";

/** REDUX SLICE & SELECTOR  **/
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

export default function Products() {
  const { setProducts } = actionDispatch(useDispatch());

  const { products } = useSelector(productsRetriever);

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 8,
        order: "createdAt",
        productCollection: ProductCollection.DISH,
        search: "",
      })
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={"products"}>
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className="avatar-box">
            <div className="avatar-title">Burak Restaurant</div>
            <Stack className="search-big-box">
              <input
                type="search"
                className="search-input"
                placeholder="Type here"
              />
              <Button
                className="button-search"
                variant="contained"
                endIcon={<SearchIcon />}
              >
                Search
              </Button>
            </Stack>
          </Stack>

          <Stack className={"dishes-section-main"}>
            <Stack className={"dishes-filter"} justifyContent={"flex-end"}>
              <Button variant="contained" color={"primary"} className={"order"}>
                New
              </Button>
              <Button
                variant="contained"
                color={"secondary"}
                className={"order"}
              >
                Price
              </Button>
              <Button
                variant="contained"
                color={"secondary"}
                className={"order"}
              >
                Views
              </Button>
            </Stack>
          </Stack>

          <Stack className={"list-category-section"}>
            <Stack className={"category-wrap"}>
              <Stack className={"category-main"}>
                <Button
                  variant="contained"
                  color={"secondary"}
                  className={"dish"}
                >
                  OTHER
                </Button>
                <Button
                  variant="contained"
                  color={"secondary"}
                  className={"dish"}
                >
                  DESSERT
                </Button>
                <Button
                  variant="contained"
                  color={"secondary"}
                  className={"dish"}
                >
                  DRINK
                </Button>
                <Button
                  variant="contained"
                  color={"secondary"}
                  className={"dish"}
                >
                  SALAD
                </Button>
                <Button
                  variant="contained"
                  color={"primary"}
                  className={"dish"}
                >
                  DISH
                </Button>
              </Stack>
            </Stack>

            <Stack className="block-wrapper">
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productCollection === ProductCollection.DRINK
                      ? product.productVolume + " litre"
                      : product.productSize + " size";
                  return (
                    <Stack key={product._id} className="product-card">
                      <Stack
                        className={"product-img"}
                        sx={{ backgroundImage: `url(${imagePath})` }}
                      >
                        <div className="product-sale">{sizeVolume}</div>
                        <Button className="shop-btn">
                          <img
                            style={{ display: "flex" }}
                            src="/icons/shopping-cart.svg"
                            alt=""
                          />
                        </Button>
                        <Button className="view-btn" sx={{ right: "36px" }}>
                          <Badge
                            badgeContent={product.productViews}
                            color="secondary"
                          >
                            <RemoveRedEyeIcon
                              sx={{
                                color:
                                  product.productViews === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>
                      <div className="product-desc">
                        <span className="product-title">
                          {product.productName}
                        </span>
                        <div className="product-coin">
                          <MonetizationOnIcon />
                          <span>{product.productPrice}</span>
                        </div>
                      </div>
                    </Stack>
                  );
                })
              ) : (
                <Box className={"no-data"}>New products are not available!</Box>
              )}
            </Stack>
          </Stack>

          <Stack className="pagination-section">
            <Pagination
              count={3}
              page={1}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
            />
          </Stack>
        </Stack>
      </Container>

      <div className="brands-logo">
        <Container>
          <Stack className="brand-title">
            <Box className="brand-title-text">Our Family Brands</Box>
          </Stack>
          <Stack className="brand-logos">
            <Box className="logo-box">
              <img
                src="img/gurme.webp"
                style={{ width: "238px", height: "329px" }}
              />
            </Box>

            <Box className="logo-box">
              <img
                src="img/seafood.webp"
                style={{ width: "230px", height: "329px" }}
              />
            </Box>

            <Box className="logo-box">
              <img
                src="img/sweets.webp"
                style={{ width: "238px", height: "329px" }}
              />
            </Box>

            <Box className="logo-box">
              <img
                src="img/doner.webp"
                style={{ width: "238px", height: "329px" }}
              />
            </Box>
          </Stack>
        </Container>
      </div>

      <div className="address">
        <Container>
          <Stack className={"address-area"}>
            <div className="title">Our Address</div>
            <iframe
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12739.47668512789!2d127.13595307324173!3d35.82422338342881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357032c914f80a43%3A0x3ddf1224e55f7688!2sJeonju-si%2C%20Jeollabuk-do%2C%20South%20Korea!5e0!3m2!1sen!2sus!4v1697100252976!5m2!1sen!2sus"
              width="1300"
              height="500"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
