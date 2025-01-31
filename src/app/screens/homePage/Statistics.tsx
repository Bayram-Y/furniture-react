import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Divider from "../../components/divider";
import { NavLink } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export default function Statistics() {
  return (
    <div className={"static-frame"}>
      <Container>
        <Stack className={"info"}>
          <Stack className={"static-box"}>
            <Box className={"static-num"}>Why Choosing Us</Box>
          </Stack>

          <Divider height="64" width="2" bg="#1E1E1E" />

          <Stack className={"static-box"}>
            <Box className={"static-head"}>Luxury facilities</Box>
            <Box className={"static-text"}>
              The advantage of hiring a workspace with us is that givees you
              comfortable service and all-around facilities.
            </Box>
            <NavLink className={"static-link"} to="/products">
              More Info
              <ArrowRightAltIcon />
            </NavLink>
          </Stack>

          <Divider height="64" width="2" bg="#1E1E1E" />

          <Stack className={"static-box"}>
            <Box className={"static-head"}>Affordable Price</Box>
            <Box className={"static-text"}>
              You can get a workspace of the highst quality at an affordable
              price and still enjoy the facilities that are oly here.
            </Box>
            <NavLink className={"static-link"} to="/products">
              More Info
              <ArrowRightAltIcon />
            </NavLink>
          </Stack>

          <Divider height="64" width="2" bg="#1E1E1E" />

          <Stack className={"static-box"}>
            <Box className={"static-head"}>Many Choices</Box>
            <Box className={"static-text"}>
              We provide many unique work space choices so that you can choose
              the workspace to your liking.
            </Box>
            <NavLink className={"static-link"} to="/products">
              More Info
              <ArrowRightAltIcon />
            </NavLink>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
