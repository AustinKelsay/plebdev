import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Grid, GridItem, Flex, Text, Box, Tag, Code } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";

const Answer = ({ author, text, score, views, created }) => {
  const router = useRouter();
  const [user, setUser] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/users/${author}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Grid templateColumns={"15% 2fr"} className={styles.answer}>
      <GridItem className={styles.gridItemLeft} colSpan={1}>
        <Text>Votes {score}</Text>
        <Text>Answers 0</Text>
        <Text>Views {views}</Text>
      </GridItem>
      <Flex flexDirection={"column"}>
        <Flex className={styles.answerInfoRow} flexDirection={"row"}>
          <Flex flexDirection={"column"} justifyContent={"space-between"}>
            {text.includes("```") ? (
              // return everything not in the code block
              <Text className={styles.answerDescription}>
                {text.split("```")[0]}
              </Text>
            ) : (
              <Text noOfLines={4} className={styles.answerDescription}>
                {text}
              </Text>
            )}
            <Text className={styles.answerCreated} fontSize={"xs"}>
              {created}
            </Text>
          </Flex>
        </Flex>
        {user ? (
          <Flex
            w={"100%"}
            justifyContent={"flex-end"}
            alignSelf={"center"}
            flexDirection={"row"}
            onClick={() => router.push(`/profile/${user.username}`)}
          >
            <Image w={"3%"} src={user.profilePhoto} alt={user.username} />
            <Text
              className={styles.answerAuthorName}
              alignSelf={"center"}
              fontSize={"sm"}
            >
              {user.username}
            </Text>
          </Flex>
        ) : null}
      </Flex>
    </Grid>
  );
};

export default Answer;
