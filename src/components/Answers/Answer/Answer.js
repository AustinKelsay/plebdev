import React, { useEffect, useState } from "react";
import axios from "axios";
import { Flex, Text, Button, FormControl, Tooltip } from "@chakra-ui/react";
import MarkdownForm from "../../Markdown/MarkdownForm/MarkdownForm";
import { Image } from "@chakra-ui/react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import AnswerTips from "../AnswerTips/AnswerTips";
import MarkdownDisplay from "../../../lib/MarkdownDisplay";
import { decrementAnswersCount } from "../../../redux/answersReducer";
import CommentsList from "../../Comments/CommentsList/CommentsList";

const Answer = ({ author, text, votes, views, created, id }) => {
  const router = useRouter();
  const [user, setUser] = useState();
  const [show, setShow] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  const handleDelete = () => {
    axios
      .delete(`/api/answers/${id}`)
      .then((res) => {
        dispatch(decrementAnswersCount(router.query.slug));
        router.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment === "") {
      return;
    }
    axios
      .post(`/api/comments`, {
        body: newComment,
        author: session.user.id,
        answer_id: id,
      })
      .then((res) => {
        console.log(res);
        router.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const routeToLogin = () => {
    router.push("/login");
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/users/${author}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Flex
      flexDirection={"row"}
      justifyContent={"space-between"}
      className={styles.answer}
    >
      {/* <Flex flexDirection={"column"} alignItems={"center"} p={"1%"} pt={0}> */}
      <AnswerTips id={id} />
      {/* </Flex> */}
      <Flex w={"100%"} flexDirection={"column"}>
        <Flex
          className={styles.answerInfoRow}
          flexDirection={"row"}
          justifyContent={"flex-start"}
        >
          <Flex
            w={"100%"}
            flexDirection={"column"}
            justifyContent={"space-between"}
          >
            <MarkdownDisplay markdown={text} />
            <Flex
              w={"100%"}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Text className={styles.answerCreated} fontSize={"xs"}>
                {created}
              </Text>
              {user ? (
                <Flex
                  className={styles.answerAuthorContainer}
                  flexDirection={"row"}
                  justifyContent={"space-evenly"}
                  onClick={() => router.push(`/profile/${user.username}`)}
                >
                  <Image
                    w={"15%"}
                    src={user.profilePhoto}
                    alt={user.username}
                  />
                  <Text
                    className={styles.answerAuthorName}
                    alignSelf={"center"}
                    fontSize={"sm"}
                  >
                    {user.username}
                  </Text>
                </Flex>
              ) : null}
            </Flex>
          </Flex>
        </Flex>
        {show && (
          <form
            className={styles.form}
            onSubmit={(e) =>
              status == "authenticated" ? handleAddComment(e) : routeToLogin(e)
            }
          >
            <FormControl>
              <MarkdownForm
                markdown={newComment}
                handleChange={(e) => setNewComment(e)}
              />
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
                <Button
                  className={styles.button}
                  type="submit"
                  colorScheme={"blue"}
                  alignSelf={"center"}
                >
                  {status == "authenticated" ? "Submit" : "Login"}
                </Button>
              </Tooltip>
            </Flex>
          </form>
        )}
        {session?.user?.id === author ? (
          <Button
            colorScheme={"red"}
            // alignSelf={"center"}
            fontSize={"xs"}
            size={"xs"}
            className={styles.button}
            onClick={handleDelete}
          >
            delete
          </Button>
        ) : (
          <Button
            className={styles.button}
            onClick={() => setShow(!show)}
            alignSelf={"start"}
            justifySelf={"start"}
            colorScheme={"green"}
            fontSize={"xs"}
            size={"xs"}
            leftIcon={show ? "-" : "+"}
          >
            comment
          </Button>
        )}
        <CommentsList answer_id={id} />
      </Flex>
    </Flex>
  );
};

export default Answer;
