import React from "react";
import { Box, Flex, Text, Tag, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { deleteQuestion } from "../../../redux/questionsReducer";
import { useRouter } from "next/router";
import MarkdownDisplay from "../../../lib/MarkdownDisplay";
import styles from "./styles.module.css";
import AnswersForm from "../../Answers/AnswersForm/AnswersForm";

const QuestionFull = ({ question, status }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleDelete = () => {
    dispatch(deleteQuestion(router.query.slug));
    router.push("/questions");
  };
  return (
    <Box m={"1%"}>
      <Flex flexDirection={"column"}>
        <Box borderBottom={"1px solid #e6e6e6"}>
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            {question.title}
          </Text>
          <Flex
            w="30%"
            marginTop={"2%"}
            justifyContent={"space-between"}
            flexDirection={"row"}
          >
            <Text fontSize={"xs"}>Created {question.created}</Text>
            <Text fontSize={"xs"}>Views {question.views}</Text>
            <Text fontSize={"xs"}>Votes {question.score}</Text>
          </Flex>
        </Box>
        {/* <Text mt={"2%"} mb={"2%"} fontSize={"md"}>
          {question.description}
        </Text> */}
        <MarkdownDisplay markdown={question.description} />
        <Flex
          className={styles.tagsContainer}
          flexDirection={"row"}
          justifyContent={"flex-start"}
        >
          {question.tags.map((tag) => (
            <Tag
              className={styles.tag}
              variant="outline"
              colorScheme="blue"
              key={tag}
            >
              {tag}
            </Tag>
          ))}
        </Flex>
      </Flex>
      {status === "authenticated" ? (
        <Flex
          className={styles.buttonContainer}
          flexDirection={"row"}
          justifyContent={"flex-start"}
        >
          <Button
            onClick={handleDelete}
            colorScheme={"red"}
            className={styles.button}
          >
            Delete
          </Button>
        </Flex>
      ) : null}
      <Text className={styles.answerText} fontWeight={"bold"} fontSize={"2xl"}>
        Your Answer
      </Text>
      <AnswersForm />
      <Text className={styles.answerText} fontWeight={"bold"} fontSize={"2xl"}>
        X Answers
      </Text>
    </Box>
  );
};

export default QuestionFull;
