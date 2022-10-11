import React, { useState } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { tipQuestion } from "../../../redux/questionsReducer";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import ClipLoader from "react-spinners/ClipLoader";
import styles from "./styles.module.css";

const QuestionTips = ({ score }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { slug } = router.query;

  const [currentScore, setCurrentScore] = useState(score);

  const loading = useSelector((state) => state.questions.loading);

  const handleTip = (tip) => {
    const requestObject = {
      slug,
      tip,
      score,
    };
    dispatch(tipQuestion(requestObject))
      .unwrap()
      .then((res) => {
        setCurrentScore(res.score);
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  };
  return (
    <Flex
      className={styles.votesContainer}
      flexDirection={"column"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
    >
      <FaArrowUp onClick={() => handleTip(1)} cursor={"pointer"} />
      {loading ? (
        <ClipLoader size={17} color="orange" />
      ) : (
        <Text>{currentScore}</Text>
      )}
      <FaArrowDown onClick={() => handleTip(-1)} cursor={"pointer"} />
    </Flex>
  );
};

export default QuestionTips;
