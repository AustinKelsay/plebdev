import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Grid, GridItem, Flex, Text, Box, Tag, Code } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import AnswerTips from "../AnswerTips/AnswerTips";

const Answer = ({ author, text, votes, views, created }) => {
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
    <Flex
      flexDirection={"row"}
      justifyContent={"space-between"}
      className={styles.answer}
    >
      <AnswerTips votes={votes} />
      <Flex w={"100%"} flexDirection={"column"}>
        <Flex
          className={styles.answerInfoRow}
          flexDirection={"row"}
          justifyContent={"flex-start"}
        >
          <Flex
            w={"100%"}
            flexDirection={"column"}
            justifyContent={"space-between"}
          >
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
            <Flex
              w={"100%"}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Text className={styles.answerCreated} fontSize={"xs"}>
                {created}
              </Text>
              {user ? (
                <Flex
                  className={styles.answerAuthorContainer}
                  flexDirection={"row"}
                  justifyContent={"space-evenly"}
                  onClick={() => router.push(`/profile/${user.username}`)}
                >
                  <Image
                    w={"15%"}
                    src={user.profilePhoto}
                    alt={user.username}
                  />
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
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Answer;
