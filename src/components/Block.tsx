import React from "react";
import { styled } from "@mui/material/styles";
import { IBlocks } from "../types/Block";
import { Container } from "@mui/material";
import colors from "../constants/colors";

type Props = {
  block: IBlocks;
  online: boolean;
};

const BlockContainer = styled(Container)({
  background: "rgba(0, 0, 0, 0.12)",
  borderRadius: "2px",
  padding: "8px 8px 4px 8px !important",
  margin: "2px 0 !important",
});

const Header = styled(Container)({
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "700",
  fontSize: "10px",
  lineHeight: "16px",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  color: colors.blue,
  padding: "0 !important",
});

const Body = styled(Container)({
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "14px",
  lineHeight: "20px",
  letterSpacing: "0.25px",
  color: colors.text,
  padding: "0 !important",
});

const Block: React.FC<Props> = ({ block, online }) => {
  return (
    <>
      {online ? (
        <BlockContainer>
          <Header>{block.attributes.index}</Header>
          <Body>{block.attributes.data}</Body>
        </BlockContainer>
      ) : (
        <BlockContainer>
          <Body>The node is Offline</Body>
        </BlockContainer>
      )}
    </>
  );
};

export default Block;
