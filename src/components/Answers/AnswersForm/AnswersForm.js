import React, { useState } from "react";
import { Flex, FormControl, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { postAnswer } from "../../../redux/answersReducer";
import { useDispatch } from "react-redux";
import styles from "./styles.module.css";
import MarkdownForm from "../../Markdown/MarkdownForm/MarkdownForm";

const AnswersForm = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { slug } = router.query;
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const answer = {
      author: session.user.id,
      text,
      question_id: slug,
    };
    dispatch(postAnswer(answer));
    setText("");
    router.replace(router.asPath);
  };

  return (
    <Flex>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <FormControl>
          <MarkdownForm markdown={text} handleChange={(e) => setText(e)} />
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
