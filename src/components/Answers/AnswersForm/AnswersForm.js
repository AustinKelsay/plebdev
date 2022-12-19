import React, { useState } from "react";
import { Flex, FormControl, Button, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
  postAnswer,
  incrementAnswersCount,
} from "../../../redux/answersReducer";
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
    // Todo make sure answer is actually posted before incrementing
    dispatch(incrementAnswersCount(slug))
      .unwrap()
      .then((res) => {
        setText("");
        router.replace(router.asPath);
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  };

  const routeToLogin = (e) => {
    e.preventDefault();
    router.push("/login");
  };

  return (
    <Flex>
      <form
        className={styles.form}
        onSubmit={(e) =>
          status == "authenticated" ? handleSubmit(e) : routeToLogin(e)
        }
      >
        <FormControl>
          <MarkdownForm markdown={text} handleChange={(e) => setText(e)} />
        </FormControl>
        <Flex
          className={styles.buttonContainer}
          flexDirection={"row"}
          justifyContent={"flex-end"}
        >
          <Tooltip
            label={"Login to add an answer"}
            placement="bottom-start"
            aria-label="A tooltip"
            isDisabled={status == "authenticated"}
          >
            <Button type="submit">
              {status == "authenticated" ? "Submit" : "Login"}
            </Button>
          </Tooltip>
        </Flex>
      </form>
    </Flex>
  );
};

export default AnswersForm;
