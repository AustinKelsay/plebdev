import React from "react";
import Link from "next/link";
import { Grid, GridItem, Flex, Text, Box, Tag, Code } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import styles from "./styles.module.css";

const Question = ({
  author,
  title,
  description,
  tags,
  score,
  views,
  created,
  id,
}) => {
  return (
    <Grid templateColumns={"15% 2fr"} className={styles.question}>
      <GridItem className={styles.gridItemLeft} colSpan={1}>
        <Text>Votes {score}</Text>
        <Text>Answers 0</Text>
        <Text>Views {views}</Text>
      </GridItem>
      <Flex flexDirection={"column"}>
        <Flex className={styles.questionInfoRow} flexDirection={"row"}>
          <Flex flexDirection={"column"} justifyContent={"space-evenly"}>
            <Text className={styles.questionTitle} fontSize={"1xl"}>
              <Link href={`/questions/${id}`} passHref>
                {title}
              </Link>
            </Text>
            {/* If the description is wrapped in markdown code block then we return code component */}
            {description.includes("```") ? (
              // iterate over the description and split it by the markdown code block
              description.split("```").map((item, index) => {
                // if the index is even then we return the text
                if (index % 2 === 0) {
                  return (
                    <Text className={styles.questionDescription}>{item}</Text>
                  );
                } else {
                  // get rid of the 'js' from the code block and remove the new line at the top where the code block starts
                  const code = item.replace("js", "").replace("\n", "");
                  return (
                    <Box overflow={"hidden"}>
                      <Code className={styles.codeBlock} noOfLines={4}>
                        {code}
                      </Code>
                    </Box>
                  );
                }
              })
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
            <Image w={"10%"} src={author.profilePhoto} alt={author.username} />
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
