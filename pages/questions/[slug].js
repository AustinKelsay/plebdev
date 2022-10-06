import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Button, Tag } from "@chakra-ui/react";
import Loading from "../../src/components/Loading/Loading";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react";
import { deleteQuestion } from "../../src/redux/questionsReducer";
import { useDispatch } from "react-redux";
import QuestionFull from "../../src/components/Questions/QuestionFull/QuestionFull";

const Question = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const { slug } = useRouter().query;
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState(null);

  useEffect(() => {
    if (typeof slug !== 'undefined') {
      axios
      .get(`http://localhost:3000/api/questions/${slug}`)
      .then((res) => {
        setQuestion(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [slug]);

  useEffect(() => {
    if (typeof slug !== 'undefined') {
      axios
      .get(`http://localhost:3000/api/answers/${slug}`)
      .then((res) => {
        setAnswers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [slug]);

  return (
    <div>
      {question ? (
        <QuestionFull question={question} answers={answers} status={status} />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Question;
