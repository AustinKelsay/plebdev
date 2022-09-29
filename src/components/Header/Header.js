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
        className={styles.titleContainer}
        flexDirection={"row"}
        alignItems={"flex-end"}
        onClick={() => router.push("/")}
      >
        <FaLaptopCode size={35} color={"orange"} />
        <Text className={styles.headerText} fontSize={"xl"}>
          plebdev
        </Text>
      </Flex>
      {status === "authenticated" ? (
        <Flex
          className={styles.rightContainer}
          alignItems={"center"}
          alignContent={"center"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Flex
            className={
              router.pathname.includes("/profile")
                ? styles.userContainerActive
                : styles.userContainer
            }
            onClick={() => router.push(`/profile/${session.user.username}`)}
            justifyContent={"flex-start"}
            flexDirection={"row"}
          >
            <Image
              width="40%"
              height="40%"
              quality={100}
              alt={"avatar"}
              src={session.user.profilePhoto}
            />
            <Text className={styles.username}>{session.user.username}</Text>
          </Flex>
          <Button
            onClick={() => signOut()}
            className={styles.signOutButton}
            variant={"outline"}
          >
            Logout
          </Button>
        </Flex>
      ) : (
        <Flex
          className={styles.signIn}
          flexDirection={"row"}
          justifyContent={"space-evenly"}
        >
          <Button
            onClick={() => router.push("/login")}
            className={styles.signInButton}
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
