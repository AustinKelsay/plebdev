import React, { useState } from "react";
import { Flex, Text, Tooltip, Box } from "@chakra-ui/react";
import { FaArrowUp, FaBolt } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import { tipAnswer } from "../../../redux/answersReducer";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.css";

const AnswerTips = ({ id }) => {
  const dispatch = useDispatch();

  const tipAmount = 1;

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
      justifyContent={"flex-start"}
      pt={2}
      alignItems={"center"}
    >
      <Tooltip
        label={`Tip ${tipAmount}`}
        placement="bottom-start"
        aria-label="A tooltip"
      >
        <Box onClick={() => handleTip(tipAmount)} cursor={"pointer"}>
          <FaArrowUp />
        </Box>
      </Tooltip>
      {loading ? (
        <ClipLoader size={17} color="orange" />
      ) : (
        <Flex flexDirection={"row"} alignItems={"center"}>
          <FaBolt color={"#fada5e"} size={12} />
          <Text>{currentScore}</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default AnswerTips;
