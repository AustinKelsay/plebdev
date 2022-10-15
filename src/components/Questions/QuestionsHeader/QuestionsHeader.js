import React, { useState, useEffect } from "react";
import { Text, Flex, Tag } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { setQuestionsFilter } from "../../../redux/questionsReducer";
import styles from "./styles.module.css";

const QuestionsHeader = ({ count }) => {
  const dispatch = useDispatch();

  const selected = useSelector((state) => state.questions.questionsFilter);

  const filters = ["newest", "score", "bountied", "unanswered"];

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
        {filters.map((filter) => (
          <Tag
            className={styles.tag}
            key={filter}
            size={"lg"}
            variant={selected === filter ? "solid" : "subtle"}
            colorScheme={"gray"}
            onClick={() => dispatch(setQuestionsFilter(filter))}
          >
            {filter}
          </Tag>
        ))}
      </Flex>
    </Flex>
  );
};

export default QuestionsHeader;
