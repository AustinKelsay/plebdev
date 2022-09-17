import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Flex, Text, Spacer, Box } from "@chakra-ui/react";

const UsersList = ({ users }) => {
  return (
    <div>
      <Text
        borderBottom={"1px solid #e6e6e6"}
        paddingLeft={"2%"}
        margin={"2% auto"}
        fontSize={"3xl"}
      >
        Users
      </Text>
      <Flex wrap="wrap" justifyContent="flex-start" marginLeft={"2%"}>
        {users.map((user) => (
          <Flex
            justifyContent={"space-evenly"}
            flexDirection={"row"}
            marginRight={"1%"}
            w="fill"
            key={user.id}
          >
            <Box h="100%" w="auto" marginRight={"2%"}>
              <Image
                width="100%"
                height="100%"
                quality={100}
                src={user.profilePhoto}
                alt={user.name}
              />
            </Box>
            <Spacer p="2%" />
            <Flex w="100%" h="100%" flexDirection={"column"}>
              <Link href={`/users/${user.id}`}>
                <Text marginRight={"3%"} cursor={"pointer"} color={"#0000EE"}>
                  {user.username}
                </Text>
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
