import React, { useState, useEffect } from "react";
import {
  Flex,
  Textarea,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Tag,
  Text,
  InputGroup,
  InputLeftAddon,
  TagCloseButton,
  FormHelperText,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";

const QuestionForm = ({ tags }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [reveal, setReveal] = useState(false);
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

  const addTag = (tag) => {
    if (!formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
    }
    console.log(formData);
  };

  const removeTag = (tag) => {
    const newTags = formData.tags.filter((t) => t !== tag);
    setFormData({ ...formData, tags: newTags });
  };

  const handleSubmit = (e) => {
    console.log(formData);
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
      <form
        style={{ padding: "1%", width: "90%", margin: "0 auto" }}
        onSubmit={(e) => handleSubmit(e)}
      >
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            mb={"1%"}
            onChange={(e) => handleChange(e)}
            name="title"
            type="text"
          />
          <FormLabel>Description</FormLabel>
          <Textarea
            mb={"1%"}
            onChange={handleChange}
            name="description"
            type="text"
          />
          <FormLabel>Tags</FormLabel>
          <FormHelperText mb={"1%"}>
            Add up to 5 tags to label your question
          </FormHelperText>
          <InputGroup>
            {formData.tags.length ? (
              <InputLeftAddon borderRight={"none"} bg={"none"}>
                {formData.tags.map((tag) => {
                  return (
                    <Tag
                      m={"1%"}
                      key={tag}
                      variant={"outline"}
                      colorScheme={"blue"}
                    >
                      {tag}
                      <TagCloseButton onClick={() => removeTag(tag)} />
                    </Tag>
                  );
                })}
              </InputLeftAddon>
            ) : null}
            <Input
              name="tags"
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              onBlur={() => {
                query !== "" && addTag(query);
              }}
            />
          </InputGroup>
          {query !== "" ? (
            <Box
              w={"100%"}
              border={"2px solid #e6e6e6"}
              borderTop={"none"}
              borderBottomRadius={"5px"}
            >
              {filterState.map((tag) => (
                <Tag
                  variant={"outline"}
                  colorScheme={"blue"}
                  key={tag.name}
                  m={"1%"}
                  onClick={() => addTag(tag.name)}
                >
                  {tag.name}
                </Tag>
              ))}
            </Box>
          ) : null}
        </FormControl>
        <Flex
          mt={"2%"}
          w={"100%"}
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
