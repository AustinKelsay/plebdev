import React from "react";
import { Text, Flex, Tag, Box } from "@chakra-ui/react";

const TagInfo = ({ tag }) => {
  return (
    <Box>
      <Text
        borderBottom={"1px solid #e6e6e6"}
        paddingLeft={"2%"}
        margin={"2% auto"}
        fontSize={"3xl"}
      >
        Tags
      </Text>
      <Tag
        m={"2% auto"}
        cursor={"pointer"}
        variant={"outline"}
        colorScheme={"blue"}
      >
        {tag.name}
      </Tag>
      <Flex m={"2% auto"} mt={"10%"} flexDirection={"column"}>
        <Text fontSize={"xs"}>questions: 1</Text>
        <Text fontSize={"xs"}>answers: 1</Text>
      </Flex>
    </Box>
  );
};

export default TagInfo;
