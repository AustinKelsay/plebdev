import React from "react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import styles from "./styles.module.css";

const Footer = () => {
  return (
    <Flex
      className={styles.footer}
      justifyContent={"space-evenly"}
      flexDirection={"column"}
    >
      <Text className={styles.footerText} fontSize={"sm"}>
        Contribute / Connect
      </Text>

      <Flex
        alignContent={"flex-end"}
        justifyContent={"space-evenly"}
        flexDirection={"row"}
      >
        <Link href={"https://github.com/austinkelsay/satsoverflow"} passHref>
          <a target={"_blank"} rel={"noopener"}>
            <FaGithub cursor={"pointer"} size={25} />
          </a>
        </Link>
        <Link href={"https://twitter.com/bitcoinplebdev"}>
          <a target={"_blank"} rel={"noopener"}>
            <FaTwitter cursor={"pointer"} size={25} color={"#1DA1F2"} />
          </a>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Footer;
