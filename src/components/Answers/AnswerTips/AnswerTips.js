import React, { useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import { tipAnswer } from "../../../redux/answersReducer";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.css";

const AnswerTips = ({ id }) => {
  const dispatch = useDispatch();

  const votes = useSelector(
    (state) => state.answers.answers.filter((a) => a.id === id)[0].votes
  );

  const [currentScore, setCurrentScore] = useState(votes);

  const loading = useSelector((state) => state.answers.loading);

  const handleTip = (tip) => {
    const requestObject = {
      id,
      tip,
    };
    dispatch(tipAnswer(requestObject))
      .unwrap()
      .then((res) => {
        setCurrentScore(res.votes);
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

export default AnswerTips;
