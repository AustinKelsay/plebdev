import React from "react";
import Question from "../Question";
import { Text, Box, Flex, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const QuestionsList = ({ questions }) => {
  const router = useRouter();
  return (
    <Box>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={"row"}
        m={"2%"}
      >
        <Text fontSize={"3xl"}>Public questions</Text>
        <Button
          onClick={() => router.push("/questions/form")}
          size={"sm"}
          colorScheme="blue"
        >
          Ask a question
        </Button>
      </Flex>
      {questions.length ? (
        questions.map((q) => <Question key={q.id} {...q} />)
      ) : (
        <p>loading</p>
      )}
    </Box>
  );
};

export default QuestionsList;
