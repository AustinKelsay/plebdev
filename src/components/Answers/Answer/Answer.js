import React, { useEffect, useState } from "react";
import axios from "axios";
import { Flex, Text, Button } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import AnswerTips from "../AnswerTips/AnswerTips";
import MarkdownDisplay from "../../../lib/MarkdownDisplay";
import { decrementAnswersCount } from "../../../redux/answersReducer";

const Answer = ({ author, text, votes, views, created, id }) => {
  const router = useRouter();
  const [user, setUser] = useState();
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const handleDelete = () => {
    axios
      .delete(`/api/answers/${id}`)
      .then((res) => {
        dispatch(decrementAnswersCount(router.query.slug));
        router.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/users/${author}`)
      .then((res) => {
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
      {session?.user?.id === author && (
        <Button
          colorScheme={"red"}
          alignSelf={"center"}
          fontSize={"xs"}
          size={"xs"}
          onClick={handleDelete}
        >
          Delete
        </Button>
      )}
      <AnswerTips id={id} />
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
            <MarkdownDisplay markdown={text} />
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
