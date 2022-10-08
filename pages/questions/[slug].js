import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Button, Tag } from "@chakra-ui/react";
import Loading from "../../src/components/Loading/Loading";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { deleteQuestion, getQuestion } from "../../src/redux/questionsReducer";
import { deleteAnswer, getAnswer } from "../../src/redux/answersReducer";
import { useDispatch, useSelector } from "react-redux";
import QuestionFull from "../../src/components/Questions/QuestionFull/QuestionFull";

const Question = () => {
  const { status } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const { slug } = router.query;

  return <div>{status ? <QuestionFull status={status} /> : <Loading />}</div>;
};

export default Question;
