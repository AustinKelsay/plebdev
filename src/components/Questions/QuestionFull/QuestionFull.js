import React from "react";
import { Box, Flex, Text, Tag, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import styles from "./styles.module.css";

const QuestionFull = ({ question, status }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteQuestion(slug));
    router.push("/questions");
  };
  return (
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
        <Button onClick={handleDelete} colorScheme={"red"} mt={"2%"}>
          Delete
        </Button>
      ) : null}
    </Box>
  );
};

export default QuestionFull;
