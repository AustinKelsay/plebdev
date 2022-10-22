import React from "react";
import { Text, Flex, Tag, Box } from "@chakra-ui/react";
import Link from "next/link";
import styles from "./styles.module.css";

const TagsList = ({ tags }) => {
  return (
    <div>
      <Text className={styles.componentTitle} fontSize={"3xl"}>
        Tags
      </Text>
      <Flex flexDirection={"row"} flexWrap={"wrap"}>
        {tags.map((tag) => (
          <Link key={tag.id} href={`/tags/${tag.id}`}>
            <Flex
              flexDirection={"column"}
              justifyContent={"space-between"}
              className={styles.tagCard}
            >
              <Tag
                className={styles.tag}
                variant={"outline"}
                colorScheme={"blue"}
              >
                {tag.name}
              </Tag>
              <Text className={styles.tagDescription} fontSize={"xs"}>
                {tag.description ||
                  "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum"}
              </Text>
              <Flex flexDirection={"column"}>
                <Text className={styles.tagStat} fontSize={"xs"}>
                  questions: 1
                </Text>
                <Text className={styles.tagStat} fontSize={"xs"}>
                  answers: 1
                </Text>
              </Flex>
            </Flex>
          </Link>
        ))}
      </Flex>
    </div>
  );
};

export default TagsList;
