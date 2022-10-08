import React from "react";
import { Text, Flex, Tag, Box } from "@chakra-ui/react";
import styles from "./styles.module.css";
import TaggedQuestions from "../TaggedQuestions/TaggedQuestions";

const TagInfo = ({ tag }) => {
  return (
    <Box className={styles.tagInfoContainer}>
      <Text className={styles.componentTitle} fontSize={"3xl"}>
        Tags
      </Text>
      <Tag className={styles.tag} variant={"outline"} colorScheme={"blue"}>
        {tag.name}
      </Tag>
      <Text fontSize={"sm"}>
        {tag.description ||
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum"}
      </Text>
      <TaggedQuestions tag={tag} />
    </Box>
  );
};

export default TagInfo;
