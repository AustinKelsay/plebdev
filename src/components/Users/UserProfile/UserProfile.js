import React, { useEffect, useState } from "react";
import { Flex, Text, Button, Image } from "@chakra-ui/react";
import Loading from "../../Loading/Loading";
import { useSession } from "next-auth/react";
import styles from "./styles.module.css";

const UserProfile = ({ user }) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

  const formattedDate =
    status === "authenticated"
      ? new Date(session.user.created).toLocaleDateString()
      : null;

  return status === "authenticated" ? (
    <Flex className={styles.userProfileContainer} flexDirection={"column"}>
      <Flex w={"100%"} flexDirection={"row"} justifyContent={"space-between"}>
        <Flex
          className={styles.userInfoContainer}
          flexDirection={"row"}
          justifyContent={"flex-start"}
        >
          <Image quality={100} alt={"avatar"} src={session.user.profilePhoto} />
          <Flex
            className={styles.userInfo}
            justifyContent={"flex-start"}
            flexDirection={"column"}
          >
            <Text fontSize={"xl"}>{session.user.username}</Text>
            <Text fontSize={"sm"}>Member since {formattedDate}</Text>
          </Flex>
        </Flex>
        <Flex
          justifySelf={"flex-end"}
          justifyContent={"flex-start"}
          flexDirection={"column"}
        >
          <Button fontWeight={"normal"} variant={"outline"}>
            Edit Profile
          </Button>
        </Flex>
      </Flex>
      <Text className={styles.statsText} fontSize={"2xl"}>
        Stats
      </Text>
      <Flex
        className={styles.statsContainer}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Flex flexDirection={"column"} justifyContent={"space-between"}>
          <Text fontWeight={"bold"} fontSize={"lg"}>
            1
          </Text>
          <Text fontSize={"sm"}>Sats earned</Text>
          <Text fontWeight={"bold"} fontSize={"lg"}>
            {user.answersCount}
          </Text>
          <Text fontSize={"sm"}>answers</Text>
        </Flex>
        <Flex flexDirection={"column"}>
          <Text fontWeight={"bold"} fontSize={"lg"}>
            {user.questionsCount}
          </Text>
          <Text fontSize={"sm"}>questions</Text>
          <Text fontWeight={"bold"} fontSize={"lg"}>
            {user.commentsCount}
          </Text>
          <Text fontSize={"sm"}>comments</Text>
        </Flex>
      </Flex>
    </Flex>
  ) : (
    <Loading />
  );
};

export default UserProfile;
