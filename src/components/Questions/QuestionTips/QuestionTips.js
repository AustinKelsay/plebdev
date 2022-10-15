import React, { useState } from "react";
import { Flex, Text, Tooltip, Box } from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown, FaBolt } from "react-icons/fa";
// import FontAwesomeIcon from "react-icons/fa";
import { tipQuestion } from "../../../redux/questionsReducer";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import ClipLoader from "react-spinners/ClipLoader";
import styles from "./styles.module.css";

const QuestionTips = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { slug } = router.query;

  const tipAmount = 1;

  const score = useSelector((state) => state.questions.question.score);

  const [currentScore, setCurrentScore] = useState(score);

  const loading = useSelector((state) => state.questions.loading);

  const handleTip = (tip) => {
    const requestObject = {
      slug,
      tip,
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

export default QuestionTips;
