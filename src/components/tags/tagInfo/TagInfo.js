import React from "react";
import { Text, Flex, Tag, Box } from "@chakra-ui/react";

const TagInfo = ({ tag }) => {
  return (
    <Box>
      <Text className={styles.componentTitle} fontSize={"3xl"}>
        Tags
      </Text>
      <Tag className={styles.tag} variant={"outline"} colorScheme={"blue"}>
        {tag.name}
      </Tag>
      <Flex className={styles.TagInfo} flexDirection={"column"}>
        <Text fontSize={"xs"}>questions: 1</Text>
        <Text fontSize={"xs"}>answers: 1</Text>
      </Flex>
    </Box>
  );
};

export default TagInfo;
