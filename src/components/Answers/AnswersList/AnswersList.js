import React from "react";
import Loading from "../../Loading/Loading";
import Answer from "../Answer/Answer";
import { Text, Box, Flex, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import styles from "./styles.module.css";

const AnswersList = ({ answers }) => {
  console.log(answers);
  return (
    <Box>
      <Flex
        className={styles.answersContainer}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={"row"}
      ></Flex>
      {answers.length ? (
        answers.map((q) => <Answer key={q.id} {...q} />)
      ) : (
        <Loading />
      )}
    </Box>
  );
};

export default AnswersList;
