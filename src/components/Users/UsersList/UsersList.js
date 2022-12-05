import React from "react";
import User from "../User/User";
import axios from "axios";
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
          <User user={user} key={user.id} />
        ))}
      </Flex>
    </div>
  );
};

export default UsersList;
