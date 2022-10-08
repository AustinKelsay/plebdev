import React, { useState, useEffect } from "react";
import { Text, Flex, Tag } from "@chakra-ui/react";
import axios from "axios";
import styles from "./styles.module.css";

const QuestionsHeader = ({ count }) => {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      flexDirection={"row"}
      className={styles.questionsHeader}
    >
      <Text className={styles.questionCount} fontSize={"lg"}>
        {count} Questions
      </Text>
      <Flex
        flexDirection={"row"}
        justifyContent={"space-evenly"}
        className={styles.filtersContainer}
      >
        <Tag
          className={styles.tag}
          size={"lg"}
          variant={"subtle"}
          colorScheme={"gray"}
        >
          Newest
        </Tag>
        <Tag
          className={styles.tag}
          size={"lg"}
          variant={"subtle"}
          colorScheme={"gray"}
        >
          Votes
        </Tag>
        <Tag
          className={styles.tag}
          size={"lg"}
          variant={"subtle"}
          colorScheme={"gray"}
        >
          Bountied
        </Tag>
        <Tag
          className={styles.tag}
          size={"lg"}
          variant={"subtle"}
          colorScheme={"gray"}
        >
          Unanswered
        </Tag>
      </Flex>
    </Flex>
  );
};

export default QuestionsHeader;
