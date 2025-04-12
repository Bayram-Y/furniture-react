import { Container, Box, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";
import { NavLink } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

/** REDUX  SELECTOR  **/
const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

export default function Materials() {
  const { topUsers } = useSelector(topUsersRetriever);
  return (
    <div className={"story-frame"}>
      <Container>
        <Stack className={"story-container"}>
          <Stack className={"story-left"}>
            <h3>MATERIALS</h3>
            <h2>Very Serious Materials For Making Furniture</h2>
            <span>
              Because panto was very serious about designing furniture for our
              environment, using a very expensive and famous capital but at a
              relatively low price
            </span>
            <NavLink className={"static-link"} to="/products">
              More Info
              <ArrowRightAltIcon />
            </NavLink>
          </Stack>
          <Stack className={"story-right"}>
            <Stack className={"img1"}>
              <img src="/img/material1.png" alt="iamge" className="image1" />
              <img src="/img/material2.png" alt="iamge" />
            </Stack>
            <Stack className={"img2"}>
              <img src="/img/material3.png" alt="iamge" />
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
