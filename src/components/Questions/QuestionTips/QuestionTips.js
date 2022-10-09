import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import styles from "./styles.module.css";

const QuestionTips = ({ score }) => {
  return (
    <Flex
      className={styles.votesContainer}
      flexDirection={"column"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
    >
      <FaArrowUp cursor={"pointer"} />
      <Text>{score}</Text>
      <FaArrowDown cursor={"pointer"} />
    </Flex>
  );
};

export default QuestionTips;
