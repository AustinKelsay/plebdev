import React from "react";
import { useRouter } from "next/router";
import { FaLaptopCode } from "react-icons/fa";
import { Flex, Button, Text, Box } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./styles.module.css";
import Image from "next/image";

const Header = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <Flex
      flexDirection={"row"}
      justifyContent={"space-between"}
      className={styles.header}
    >
      <Flex
        flexDirection={"row"}
        alignItems={"flex-end"}
        _hover={{ opacity: 0.7, cursor: "pointer" }}
        onClick={() => router.push("/")}
      >
        <FaLaptopCode size={35} color={"orange"} />
        <Text ml={"3%"} alignSelf={"center"} fontSize={"xl"}>
          plebdevs
        </Text>
      </Flex>
      {status === "authenticated" ? (
        <Flex
          alignItems={"center"}
          alignContent={"center"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          w={"25%"}
        >
          <Flex
            _hover={{ border: "1px solid #e6e6e6", cursor: "pointer" }}
            onClick={() => router.push(`/profile/${session.user.username}`)}
            justifyContent={"flex-start"}
            flexDirection={"row"}
            padding={"2%"}
            border={"1px solid transparent"}
            borderRadius={"5px"}
          >
            <Image
              width="40%"
              height="40%"
              quality={100}
              alt={"avatar"}
              src={session.user.profilePhoto}
            />
            <Text marginLeft={"3%"} alignSelf={"center"} fontWeight={"normal"}>
              {session.user.username}
            </Text>
          </Flex>
          <Button
            onClick={() => signOut()}
            fontWeight={"normal"}
            variant={"outline"}
          >
            Logout
          </Button>
        </Flex>
      ) : (
        <Flex flexDirection={"row"} justifyContent={"space-evenly"} w={"20%"}>
          <Button
            onClick={() => router.push("/login")}
            fontWeight={"normal"}
            variant={"outline"}
          >
            Login
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Header;
