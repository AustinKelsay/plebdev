import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import styles from "./styles.module.css";

const AnswerTips = ({ votes }) => {
  return (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"space-evenly"}
      className={styles.votesContainer}
    >
      <FaArrowUp cursor={"pointer"} />
      <Text>{votes}</Text>
      <FaArrowDown cursor={"pointer"} />
    </Flex>
  );
};

export default AnswerTips;
