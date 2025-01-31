import { ChangeEvent, useEffect, useState } from "react";
import { Container, Button, Box, Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setRestaurant } from "./slice";
import { createSelector } from "@reduxjs/toolkit";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { retrieveProducts, retrieveFirm } from "./selector";
import ProductService from "../../services/ProductService";
import { FurnitureCategory } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

/** REDUX SLICE & SELECTOR  **/
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
  setRestaurant: (data: null) => dispatch(setRestaurant(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

const restaurantRetriever = createSelector(retrieveFirm, (retrieveFirm) => ({
  retrieveFirm,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts, setRestaurant } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const { retrieveFirm } = useSelector(restaurantRetriever);

  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    order: "createdAt",
    page: 1,
    limit: 8,
    productCollection: FurnitureCategory.SOFA,
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /** HANDLERS **/

  const searchCollectionHandler = (collection: FurnitureCategory) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chooseDisheHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className={"products"}>
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className="avatar-box">
            <div className="avatar-title">Panto Company </div>
            <Stack className="search-big-box">
              <input
                type="search"
                className="search-input"
                placeholder="Type here"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") searchProductHandler();
                }}
              />
              <Button
                className="button-search"
                variant="contained"
                endIcon={<SearchIcon />}
                onClick={searchProductHandler}
              >
                Search
              </Button>
            </Stack>
          </Stack>

          <Stack className={"sort-box"}>
            <Stack className={"category-wrap"}>
              <Stack className={"category-main"}>
                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === FurnitureCategory.SOFA
                      ? "inherit"
                      : "secondary"
                  }
                  className={"dish"}
                  onClick={() =>
                    searchCollectionHandler(FurnitureCategory.SOFA)
                  }
                >
                  SOFA
                </Button>
                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === FurnitureCategory.BED
                      ? "inherit"
                      : "secondary"
                  }
                  className={"dish"}
                  onClick={() => searchCollectionHandler(FurnitureCategory.BED)}
                >
                  BED
                </Button>
                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === FurnitureCategory.TABLE
                      ? "inherit"
                      : "secondary"
                  }
                  className={"dish"}
                  onClick={() =>
                    searchCollectionHandler(FurnitureCategory.TABLE)
                  }
                >
                  TABLE
                </Button>
                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === FurnitureCategory.CHAIR
                      ? "inherit"
                      : "secondary"
                  }
                  className={"dish"}
                  onClick={() =>
                    searchCollectionHandler(FurnitureCategory.CHAIR)
                  }
                >
                  CHAIR
                </Button>
                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection ===
                    FurnitureCategory.AQUARIUM
                      ? "inherit"
                      : "secondary"
                  }
                  className={"dish"}
                  onClick={() =>
                    searchCollectionHandler(FurnitureCategory.AQUARIUM)
                  }
                >
                  AQUARIUM
                </Button>
                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === FurnitureCategory.OTHER
                      ? "inherit"
                      : "secondary"
                  }
                  className={"dish"}
                  onClick={() =>
                    searchCollectionHandler(FurnitureCategory.OTHER)
                  }
                >
                  OTHER
                </Button>
              </Stack>
            </Stack>
            <Stack className={"dishes-section-main"}>
              <Stack className={"dishes-filter"} justifyContent={"flex-end"}>
                <Button
                  variant={"contained"}
                  className={"order"}
                  color={
                    productSearch.order === "createdAt"
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => searchOrderHandler("createdAt")}
                >
                  New
                </Button>
                <Button
                  variant="contained"
                  className={"order"}
                  color={
                    productSearch.order === "productPrice"
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => searchOrderHandler("productPrice")}
                >
                  Price
                </Button>
                <Button
                  variant="contained"
                  className={"order"}
                  color={
                    productSearch.order === "productViews"
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => searchOrderHandler("productViews")}
                >
                  Views
                </Button>
              </Stack>
            </Stack>
          </Stack>

          <Stack className={"list-category-section"}>
            <Stack className="block-wrapper">
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productCollection === FurnitureCategory.AQUARIUM
                      ? product.productVolume + " litre"
                      : product.productSize + " size";
                  return (
                    <Stack
                      key={product._id}
                      className="product-card"
                      onClick={() => chooseDisheHandler(product._id)}
                    >
                      <Stack
                        className={"product-img"}
                        sx={{ backgroundImage: `url(${imagePath})` }}
                      >
                        <div className="product-sale">{sizeVolume}</div>
                        <Button
                          className="shop-btn"
                          onClick={(e) => {
                            onAdd({
                              _id: product._id,
                              quantity: 1,
                              name: product.productName,
                              price: product.productPrice,
                              image: product.productImages[0],
                            });
                            e.stopPropagation();
                          }}
                        >
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
                          {product.productCollection}
                        </span>
                        <span className="product-title">
                          {product.productName}
                        </span>
                        <div className="product-coin">
                          <MonetizationOnIcon color={"disabled"} />
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
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
              page={productSearch.page}
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
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>

      <div className={"ads-restaurant-frame"}>
        <video
          className={"ads-video"}
          autoPlay={true}
          loop
          muted
          playsInline
          data-video-media=""
        >
          <source type="video/mp4" src="video/adv2.mp4" />
        </video>
      </div>

      <div className="brands-logo">
        <Container>
          <Stack className="brand-title">
            <Box className="brand-title-text">Our Panto Company</Box>
          </Stack>
          <Stack className="brand-logos">
            <Box className="logo-box">
              <h2>Free Delivery</h2>
              <Typography>
                "Enjoy free delivery on all orders over $50! We strive to make
                your shopping experience as convenient and enjoyable as
                possible. Take advantage of fast delivery and top-quality
                service!"
              </Typography>
            </Box>

            <Box className="logo-box">
              <h2>90 Days Return</h2>
              <Typography>
                "90-Day Hassle-Free Returns! We understand that sometimes things
                don't go as planned, so we offer a straightforward return
                policy. Shop with confidence knowing you have up to 90 days to
                return your items for a full refund or exchange!"
              </Typography>
            </Box>

            <Box className="logo-box">
              <h2>Secure Payment</h2>
              <Typography>
                "Secure Payment Guaranteed! Shop with peace of mind knowing your
                transactions are protected with the latest security measures.
                Your privacy and safety are our top priorities, ensuring a
                seamless and trustworthy payment experience."
              </Typography>
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
