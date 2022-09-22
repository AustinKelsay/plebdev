import React from "react";
import { Text, Flex, Tag } from "@chakra-ui/react";
import Link from "next/link";
import styles from "./styles.module.css";

const TagsList = ({ tags }) => {
  return (
    <div>
      <Text className={styles.componentTitle} fontSize={"3xl"}>
        Tags
      </Text>
      <Flex wrap="wrap" justifyContent="flex-start">
        <Flex
          className={styles.tagsContainer}
          justifyContent={"space-evenly"}
          flexDirection={"row"}
        >
          {tags.map((tag) => (
            <Link key={tag.id} href={`/tags/${tag.id}`}>
              <Flex className={styles.tagCard} flexDirection={"column"}>
                <Tag
                  className={styles.tag}
                  variant={"outline"}
                  colorScheme={"blue"}
                >
                  {tag.name}
                </Tag>
                <Flex className={styles.tagInfo} flexDirection={"column"}>
                  <Text fontSize={"xs"}>questions: 1</Text>
                  <Text fontSize={"xs"}>answers: 1</Text>
                </Flex>
              </Flex>
            </Link>
          ))}
        </Flex>
      </Flex>
    </div>
  );
};

export default TagsList;
