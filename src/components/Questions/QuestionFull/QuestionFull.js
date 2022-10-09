import React, { useEffect } from "react";
import { Box, Flex, Text, Tag, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuestion } from "../../../redux/questionsReducer";
import { getAnswers } from "../../../redux/answersReducer";
import { getQuestion } from "../../../redux/questionsReducer";
import { useRouter } from "next/router";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import MarkdownDisplay from "../../../lib/MarkdownDisplay";
import styles from "./styles.module.css";
import AnswersForm from "../../Answers/AnswersForm/AnswersForm";
import AnswersList from "../../Answers/AnswersList/AnswersList";
import QuestionTips from "../QuestionTips/QuestionTips";

const QuestionFull = ({ status }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { slug } = router.query;

  const handleDelete = () => {
    dispatch(deleteQuestion(router.query.slug));
    router.push("/questions");
  };

  useEffect(() => {
    if (typeof slug !== "undefined") {
      dispatch(getQuestion(slug));
      dispatch(getAnswers(slug));
    }
  }, [slug, dispatch]);

  const question = useSelector((state) => state.questions.question);

  const answers = useSelector((state) => state.answers.answers);

  return (
    <>
      {question?.tags && answers && (
        <Box className={styles.questionContainer}>
          <Flex flexDirection={"column"}>
            <Box className={styles.questionInfo}>
              <Flex flexDirection={"row"} justifyContent={"flex-start"}>
                <QuestionTips score={question.score} />
                <Text fontWeight={"bold"} fontSize={"2xl"}>
                  {question.title}
                </Text>
              </Flex>
              <Flex
                className={styles.questionInfoFlex}
                justifyContent={"space-between"}
                flexDirection={"row"}
              >
                <Text fontSize={"xs"}>Created {question.created}</Text>
                <Text fontSize={"xs"}>Views {question.views}</Text>
                <Text fontSize={"xs"}>Votes {question.score}</Text>
              </Flex>
            </Box>
            <Box className={styles.descriptionContainer}>
              <MarkdownDisplay markdown={question.description} />
            </Box>
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
          <Text
            className={styles.answerText}
            fontWeight={"bold"}
            fontSize={"2xl"}
          >
            Your Answer
          </Text>
          <AnswersForm />
          {answers ? (
            <Box>
              <Text
                className={styles.answerText}
                fontWeight={"bold"}
                fontSize={"2xl"}
              >
                {answers.length} Answers
              </Text>
              <AnswersList answers={answers} />
            </Box>
          ) : null}
        </Box>
      )}
    </>
  );
};

export default QuestionFull;
