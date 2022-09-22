import React from "react";
import { Flex, Button, Box, Text, Grid, GridItem } from "@chakra-ui/react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "../../src/components/Loading/Loading";

const Profile = () => {
  const { data: session, status } = useSession();
  const formattedDate =
    status === "authenticated"
      ? new Date(session.user.created).toLocaleDateString()
      : null;
  return status === "authenticated" ? (
    <Flex m={"2%"} w={"100%"} flexDirection={"column"}>
      <Flex w={"100%"} flexDirection={"row"} justifyContent={"space-between"}>
        <Flex w={"70%"} flexDirection={"row"} justifyContent={"flex-start"}>
          <Image
            width="100%"
            height="100%"
            quality={100}
            alt={"avatar"}
            src={session.user.profilePhoto}
          />
          <Flex
            paddingLeft={"5%"}
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
      <Text paddingTop={"2%"} fontSize={"2xl"}>
        Stats
      </Text>
      <Flex
        marginTop={"2%"}
        w={"30%"}
        padding={"1%"}
        border={"1px solid black"}
        borderRadius={"5px"}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Flex flexDirection={"column"} justifyContent={"space-between"}>
          <Text fontWeight={"bold"} fontSize={"lg"}>
            637
          </Text>
          <Text fontSize={"sm"}>Sats earned</Text>
          <Text fontWeight={"bold"} fontSize={"lg"}>
            3
          </Text>
          <Text fontSize={"sm"}>answers</Text>
        </Flex>
        <Flex flexDirection={"column"}>
          <Text fontWeight={"bold"} fontSize={"lg"}>
            6
          </Text>
          <Text fontSize={"sm"}>questions</Text>
          <Text fontWeight={"bold"} fontSize={"lg"}>
            2
          </Text>
          <Text fontSize={"sm"}>comments</Text>
        </Flex>
      </Flex>
    </Flex>
  ) : (
    <Loading />
  );
};

export default Profile;
