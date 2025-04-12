import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footers = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  background:#d8d8d8;
  background-size: cover;
`;

export default function Footer() {
  const authMember = null;

  return (
    <Footers>
      <Container>
        <Stack flexDirection={"row"} sx={{ mt: "94px" }}>
          <Stack flexDirection={"column"} style={{ width: "340px" }}>
            <Box className={"title"}>Panto</Box>
            <Box className={"foot-desc-txt"}>
              The advantage of hiring a workspace with us is that gives you
              comfortable service and all-around facilities.
            </Box>
          </Stack>
          <Stack
            sx={{ ml: "288px" }}
            flexDirection={"row"}
            className={"footer-helps"}
          >
            <Stack>
              <Box className={"foot-category-title"}>Services</Box>
              <Box className={"foot-category-link"}>
                <span>Email Marketing</span>
                <span>Company</span>
                <span>Branding</span>
              </Box>
            </Stack>
            <Stack>
              <Box className={"foot-category-title"}>Furniture</Box>
              <Box className={"foot-category-link"}>
                <Link to="/products">Beds</Link>
                {authMember && <Link to="/orders">Orders</Link>}
                <Link to="/orders">Chair</Link>
                <Link to="/">All</Link>
              </Box>
            </Stack>
            <Stack sx={{ ml: "100px" }}>
              <Box className={"foot-category-title"}>Follow Us</Box>
              <Box className="follow-us">
                <Box className="sns-context">
                  <img src={"/icons/facebook.svg"} />
                  <span>Facebook</span>
                </Box>
                <Box className="sns-context">
                  <img src={"/icons/twitter.svg"} />
                  <span>Twitter</span>
                </Box>
                <Box className="sns-context">
                  <img src={"/icons/instagram.svg"} />
                  <span>Instagramm</span>
                </Box>
                <Box className="sns-context">
                  <img src={"/icons/youtube.svg"} />
                  <span>YouTube</span>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          style={{ border: "2px solid #C5C8C9", width: "100%", opacity: "0.7" }}
          sx={{ mt: "80px" }}
        ></Stack>
        <Stack className={"copyright-txt"}>
          <Box className={"boxes"}>
            <Typography>© Copyright, All rights reserved.</Typography>
            <Box className={"box"}>
              <Typography>Terms & Conditions</Typography>
              <Typography> Privacy Policy</Typography>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Footers>
  );
}
