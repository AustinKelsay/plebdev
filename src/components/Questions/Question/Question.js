import React, { useEffect } from "react";
import Link from "next/link";
import { Grid, GridItem, Flex, Text, Box, Tag, Code } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import axios from "axios";
import MarkdownDisplay from "../../../lib/MarkdownDisplay";
import styles from "./styles.module.css";

const Question = ({
  author,
  title,
  description,
  tags,
  answersCount,
  score,
  views,
  created,
  id,
}) => {
  return (
    <Grid
      templateColumns={"20% 2fr"}
      overflowX={"clip"}
      className={styles.question}
    >
      <GridItem className={styles.gridItemLeft} colSpan={1}>
        <Text>Votes {score}</Text>
        <Text>Answers {answersCount}</Text>
        <Text>Views {views}</Text>
      </GridItem>
      <Flex flexDirection={"column"} justifyContent={"space-evenly"}>
        <Flex className={styles.questionInfoRow} flexDirection={"row"}>
          <Flex flexDirection={"column"} justifyContent={"space-evenly"}>
            <Text className={styles.questionTitle} fontSize={"1xl"}>
              <Link href={`/questions/${id}`} passHref>
                {title}
              </Link>
            </Text>
            {description.includes("```") ? (
              <Box
                className={styles.questionDescription}
                height={"150px"}
                overflow={"clip"}
              >
                <MarkdownDisplay markdown={description} />
              </Box>
            ) : (
              <Text noOfLines={4} className={styles.questionDescription}>
                {description}
              </Text>
            )}
            <Text className={styles.questionCreated} fontSize={"xs"}>
              {created}
            </Text>
          </Flex>
        </Flex>
        <Flex
          className={styles.questionTags}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Box w={"60%"}>
            {tags.map((tag) => (
              <Tag
                className={styles.tag}
                variant="outline"
                colorScheme="blue"
                key={tag}
              >
                {tag}
              </Tag>
            ))}
          </Box>
          <Flex
            w={"fill"}
            justifyContent={"flex-end"}
            alignSelf={"center"}
            flexDirection={"row"}
          >
            <Image w={"15%"} src={author.profilePhoto} alt={author.username} />
            <Text
              className={styles.questionAuthorName}
              alignSelf={"center"}
              fontSize={"sm"}
            >
              {author.username}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Grid>
  );
};

export default Question;
