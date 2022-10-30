import React, { useEffect } from "react";
import { Text, Flex, Tag, Box } from "@chakra-ui/react";
import Link from "next/link";
import axios from "axios";
import styles from "./styles.module.css";

const ListedTag = ({ tag }) => {
  const [questionsCount, setQuestionsCount] = React.useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/tags/${tag.id}`)
      .then((res) => {
        setQuestionsCount(res.data.count);
      })
      .catch((err) => console.log(err));
  }, []);

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
