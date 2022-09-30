import React, { useState } from "react";
import { Flex, FormControl, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import styles from "./styles.module.css";
import MarkdownForm from "../../Markdown/MarkdownForm/MarkdownForm";
import axios from "axios";

const AnswersForm = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [answer, setAnswer] = useState("");

  const handleMarkdownChange = (char) => {
    setAnswer({ ...answer, char });
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:3000/api/answers", {
        author: session.user.id,
        text: answer,
        question_id: router.query.slug,
      })
      .then(() => {
        router.push(`/questions/${router.query.slug}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Flex>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <FormControl>
          <MarkdownForm markdown={answer} handleChange={handleMarkdownChange} />
        </FormControl>
        <Flex
          className={styles.buttonContainer}
          flexDirection={"row"}
          justifyContent={"flex-end"}
        >
          <Button type="submit">Submit</Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default AnswersForm;
