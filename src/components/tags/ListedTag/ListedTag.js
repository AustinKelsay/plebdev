import React, { useEffect } from "react";
import { Text, Flex, Tag, Box } from "@chakra-ui/react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionsCount } from "../../../redux/tagsReducer";
import styles from "./styles.module.css";

const ListedTag = ({ tag }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestionsCount(tag.id));
  }, []);

  const questionsCount = useSelector(
    (state) => state.tags.taggedQuestionsCount
  );

  return (
    <Link key={tag.id} href={`/tags/${tag.id}`}>
      <Flex
        flexDirection={"column"}
        justifyContent={"space-between"}
        className={styles.tagCard}
      >
        <Tag className={styles.tag} variant={"outline"} colorScheme={"blue"}>
          {tag.name}
        </Tag>
        <Text className={styles.tagDescription} fontSize={"xs"}>
          {tag.description ||
            "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum"}
        </Text>
        <Flex flexDirection={"column"}>
          <Text className={styles.tagStat} fontSize={"xs"}>
            questions: {questionsCount}
          </Text>
        </Flex>
      </Flex>
    </Link>
  );
};

export default ListedTag;
