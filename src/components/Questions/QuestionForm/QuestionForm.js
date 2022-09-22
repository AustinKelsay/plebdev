import React, { useState, useEffect } from "react";
import { Flex, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import TagsInput from "./TagsInput/TagsInput";
import dynamic from "next/dynamic";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import styles from "./styles.module.css";

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod),
  { ssr: false }
);

const QuestionForm = ({ tags }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [filterState, setFilterState] = useState(tags);
  const [query, setQuery] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: [],
  });

  useEffect(() => {
    if (query.length > 0) {
      const filtered = tags.filter((tag) => {
        return tag.name.toLowerCase().includes(query.toLowerCase());
      });
      setFilterState(filtered);
    }
  }, [query, tags]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMarkdownChange = (char) => {
    setFormData({ ...formData, description: char });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (status === "authenticated") {
      const userData = {
        username: session.user.username,
        profilePhoto: session.user.profilePhoto,
      };

      axios
        .post("/api/questions", { ...formData, author: userData })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    router.push("/questions");
  };

  return (
    <Flex>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            className={styles.input}
            onChange={(e) => handleChange(e)}
            name="title"
            type="text"
          />
          <FormLabel>Description</FormLabel>
          <div className={styles.markdownContainer}>
            {(
              <MarkdownEditor
                height={300}
                value={formData.description}
                onChange={handleMarkdownChange}
                name="description"
                type="markdown"
              />
            ) || <p>loading</p>}
          </div>
          <TagsInput
            formData={formData}
            setFormData={setFormData}
            query={query}
            setQuery={setQuery}
            filterState={filterState}
          />
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

export default QuestionForm;
