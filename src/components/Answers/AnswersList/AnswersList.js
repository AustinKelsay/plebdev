import React, { useEffect } from "react";
import Loading from "../../Loading/Loading";
import Answer from "../Answer/Answer";
import { Text, Box, Flex, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getAnswers } from "../../../redux/answersReducer";
import styles from "./styles.module.css";

const AnswersList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { slug } = router.query;

  useEffect(() => {
    dispatch(getAnswers(slug));
  }, [slug, dispatch]);

  const answers = useSelector((state) => state.answers.answers);

  if (answers.length === 0) {
    return <Text>No answers yet</Text>;
  }
  return (
    <Box>
      <Text className={styles.answerText} fontWeight={"bold"} fontSize={"2xl"}>
        {answers.length} Answers
      </Text>
      <Flex
        className={styles.answersContainer}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={"row"}
      ></Flex>
      {answers.length ? (
        answers.map((a) => <Answer key={a.id} {...a} />)
      ) : (
        <Loading />
      )}
    </Box>
  );
};

export default AnswersList;
