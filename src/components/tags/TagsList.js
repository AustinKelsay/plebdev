import React from "react";
import { Text, Flex, Tag, Spacer } from "@chakra-ui/react";
import Link from "next/link";

const TagsList = ({ tags }) => {
  return (
    <div>
      <Text
        borderBottom={"1px solid #e6e6e6"}
        paddingLeft={"2%"}
        margin={"2% auto"}
        fontSize={"3xl"}
      >
        Tags
      </Text>
      <Flex wrap="wrap" justifyContent="flex-start">
        <Flex justifyContent={"space-evenly"} flexDirection={"row"} w={"100%"}>
          {tags.map((tag) => (
            <Link key={tag.id} href={`/tags/${tag.id}`}>
              <Flex
                border={"2px solid #e6e6e6"}
                borderRadius={"5px"}
                flexDirection={"column"}
                m={"2% auto"}
                p={"1%"}
                pr={"5%"}
                _hover={{ cursor: "pointer", borderColor: "#3182ce" }}
              >
                <Tag
                  cursor={"pointer"}
                  variant={"outline"}
                  colorScheme={"blue"}
                >
                  {tag.name}
                </Tag>
                <Flex mt={"10%"} flexDirection={"column"}>
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
