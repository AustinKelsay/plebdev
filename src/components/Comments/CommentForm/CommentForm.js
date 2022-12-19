import React, { useState } from "react";
import { Flex, FormControl, Button, Tooltip } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import MarkdownForm from "../../Markdown/MarkdownForm/MarkdownForm";
import styles from "./styles.module.css";

const CommentForm = ({ answerId }) => {
  const { data: session, status } = useSession();
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const comment = {
      author: session.user.id,
      text,
      answer_id: answerId,
    };
    console.log(comment);
    // dispatch(postAnswer(answer));

    // Todo make sure answer is actually posted before incrementing
    // dispatch(incrementAnswersCount(slug))
    //   .unwrap()
    //   .then((res) => {
    //     setText("");
    //     router.replace(router.asPath);
    //   })
    //   .catch((rejectedValueOrSerializedError) => {
    //     console.log(rejectedValueOrSerializedError);
    //   });
  };
  return (
    <Flex flexDirection={"column"}>
      <Button className={styles.button} onClick={() => setShow(!show)}>
        add comment
      </Button>
      {show && (
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
      )}
    </Flex>
  );
};

export default CommentForm;
