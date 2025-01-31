import { Container, Stack } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export default function Advertisement() {
  return (
    <Container>
      <div className={"ads-restaurant-frame"}>
        <Stack className="frame">
          <Stack className="image">
            <img src="/img/story1.png" alt="" />
          </Stack>
          <Stack className="info">
            <h3>EXPERIENCES</h3>
            <h2>We Provide You The Best Experience</h2>
            <p>
              You don't have to worry about the result because all of these
              interiors are made by people who are professionals in their fields
              with an elegant and luxurious style and with premium quality
              materials
            </p>
            <NavLink to={"/products"}>
              <span>More Info</span>
              <ArrowRightAltIcon />
            </NavLink>
          </Stack>
        </Stack>
      </div>{" "}
    </Container>
  );
}
