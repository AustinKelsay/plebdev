import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react";
import { deleteQuestion } from "../../src/redux/questionsReducer";
import { useDispatch } from "react-redux";

const Question = () => {
  const { data: session, status } = useSession();
  const { slug } = useRouter().query;
  const [question, setQuestion] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/questions/${slug}`)
      .then((res) => {
        setQuestion(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug, question]);

  const handleDelete = () => {
    dispatch(deleteQuestion(slug));
    router.push("/questions");
  };

  return (
    <div>
      {question ? (
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
            <Text mt={"2%"} mb={"2%"} fontSize={"md"}>
              {question.description}
            </Text>
          </Flex>
          {status === "authenticated" ? (
            <Button onClick={handleDelete} colorScheme={"red"} mt={"2%"}>
              Delete
            </Button>
          ) : null}
        </Box>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
};

export default Question;
