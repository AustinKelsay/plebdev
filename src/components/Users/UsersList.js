import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Flex, Text, Spacer, Box } from "@chakra-ui/react";
import styles from "./styles.module.css";

const UsersList = ({ users }) => {
  return (
    <div>
      <Text fontSize={"3xl"} className={styles.componentTitle}>
        Users
      </Text>
      <Flex
        wrap="wrap"
        justifyContent="flex-start"
        className={styles.usersContainer}
      >
        {users.map((user) => (
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
                height="100%"
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
              <Text fontSize={"xs"}>Questions: 1</Text>
              <Text fontSize={"xs"}>Answers: 1</Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </div>
  );
};

export default UsersList;
