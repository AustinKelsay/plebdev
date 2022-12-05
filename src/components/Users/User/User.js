import React, { useEffect, useState } from "react";
import { Flex, Box, Spacer, Text, Image } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import styles from "./styles.module.css";

const User = ({ user }) => {
  const [userStats, setUserStats] = useState({
    questions: null,
    answers: null,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/users/${user.id}`)
      .then((res) => {
        setUserStats({
          questions: res.data.questionsCount,
          answers: res.data.answersCount,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Flex
      justifyContent={"space-evenly"}
      flexDirection={"row"}
      w={"fill"}
      className={styles.userCard}
      key={user.id}
    >
      <Box className={styles.userImage}>
        <Image
          width="100%"
          height="auto"
          quality={100}
          src={user.profilePhoto}
          alt={user.name}
        />
      </Box>
      <Spacer className={styles.spacer} />
      <Flex className={styles.userInfo} flexDirection={"column"}>
        <Link href={`/users/${user.id}`}>
          <Text className={styles.userName}>{user.username}</Text>
        </Link>
        <Text fontSize={"xs"}>Questions: {userStats.questions}</Text>
        <Text fontSize={"xs"}>Answers: {userStats.answers}</Text>
      </Flex>
    </Flex>
  );
};

export default User;
