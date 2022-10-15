import React from "react";
import Question from "../Question/Question";
import Loading from "../../Loading/Loading";
import { Text, Box, Flex, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import QuestionsHeader from "../QuestionsHeader/QuestionsHeader";

const QuestionsList = ({ questions }) => {
  const questionsFilter = useSelector(
    (state) => state.questions.questionsFilter
  );

  let filteredQuestions;

  switch (questionsFilter) {
    case "newest":
      filteredQuestions = questions.sort((a, b) => {
        return new Date(b.created) - new Date(a.created);
      });
      break;
    case "score":
      filteredQuestions = questions.sort((a, b) => {
        return b.score - a.score;
      });
    default:
      filteredQuestions = questions;
  }

  const router = useRouter();
  return (
    <Box>
      <Flex
        className={styles.questionsContainer}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={"row"}
      >
        <Text fontSize={"3xl"}>Public questions</Text>
        <Button
          onClick={() => router.push("/questions/form")}
          size={"sm"}
          colorScheme="blue"
        >
          Ask a question
        </Button>
      </Flex>
      <QuestionsHeader count={questions.length} />
      {questions.length ? (
        filteredQuestions.map((q) => <Question key={q.id} {...q} />)
      ) : (
        <Loading />
      )}
    </Box>
  );
};

export default QuestionsList;
