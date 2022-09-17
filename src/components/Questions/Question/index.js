import React from "react";
import Link from "next/link";
import { Grid, GridItem, Flex, Text, Box, Tag } from "@chakra-ui/react";
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
    <Grid
      borderBottom={"1px solid #e6e6e6"}
      borderTop={"1px solid #e6e6e6"}
      templateColumns={"15% 2fr"}
      className={styles.question}
    >
      <GridItem className={styles.gridItemLeft} colSpan={1}>
        <Text>Votes {score}</Text>
        <Text>Answers 0</Text>
        <Text>Views {views}</Text>
      </GridItem>
      <Flex flexDirection={"column"}>
        <Flex flexDirection={"row"} w={"100%"}>
          <Flex flexDirection={"column"} justifyContent={"space-evenly"}>
            <Text mt={"1%"} fontSize={"1xl"}>
              <Link href={`/questions/${id}`} passHref>
                {title}
              </Link>
            </Text>
            <Text mt={"1%"} fontWeight={"normal"} fontSize={"sm"}>
              {description}
            </Text>
            <Text
              mt={"1%"}
              fontWeight={"normal"}
              color={"grey"}
              fontSize={"xs"}
            >
              {created}
            </Text>
          </Flex>
        </Flex>
        <Flex
          w={"100%"}
          whiteSpace={"nowrap"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Box w={"60%"}>
            {tags.map((tag) => (
              <Tag
                variant="outline"
                colorScheme="blue"
                cursor={"pointer"}
                margin={"1%"}
                paddingTop={"1%"}
                paddingBottom={"1%"}
                marginLeft={0}
                key={tag}
              >
                {tag}
              </Tag>
            ))}
          </Box>
          <Flex
            justifyContent={"flex-end"}
            alignSelf={"center"}
            flexDirection={"row"}
            w={"fill"}
          >
            <Image w={"10%"} src={author.profilePhoto} alt={author.username} />
            <Text
              alignSelf={"center"}
              fontWeight={"normal"}
              color={"grey"}
              fontSize={"sm"}
              marginLeft={"3%"}
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
