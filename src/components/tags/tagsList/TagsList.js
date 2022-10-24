import React, { useState, useEffect } from "react";
import { Text, Flex, Tag, Box } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import styles from "./styles.module.css";
import ListedTag from "../ListedTag/ListedTag";

const TagsList = ({ tags }) => {
  return (
    <div>
      <Text className={styles.componentTitle} fontSize={"3xl"}>
        Tags
      </Text>
      <Flex flexDirection={"row"} flexWrap={"wrap"}>
        {tags.map((tag) => {
          return <ListedTag key={tag.id} tag={tag} />;
        })}
      </Flex>
    </div>
  );
};

export default TagsList;
