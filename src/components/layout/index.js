import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

export default function Layout({ children }) {
  return (
    <Grid
      templateAreas={`"header header"
                        "nav main"
                        "nav footer"`}
      gridTemplateRows={"10% 1fr 10%"}
      gridTemplateColumns={"200px 1fr"}
      h="100vh"
      color="blackAlpha.700"
    >
      <GridItem borderBottom={"1px solid #e6e6e6"} area={"header"}>
        <Header />
      </GridItem>
      <GridItem borderRight={"1px solid #e6e6e6"} area={"nav"}>
        <Sidebar />
      </GridItem>
      <GridItem borderRight={"1px solid #e6e6e6"} w={"90%"} area={"main"}>
        {children}
      </GridItem>
      <GridItem
        borderRight={"1px solid #e6e6e6"}
        borderTop={"1px solid #e6e6e6"}
        w={"90%"}
        area={"footer"}
      >
        <Footer />
      </GridItem>
    </Grid>
  );
}
