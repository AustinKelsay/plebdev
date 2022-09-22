import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  FormHelperText,
  InputLeftAddon,
  TagCloseButton,
  Tag,
  Box,
  TagRightIcon,
  StylesProvider,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import styles from "./styles.module.css";

const TagsInput = ({ formData, setFormData, query, setQuery, filterState }) => {
  const [addTagUI, setAddTagUI] = useState(false);

  useEffect(() => {
    setAddTagUI(true);
  }, [query]);

  const addTag = (tag) => {
    if (!formData.tags.includes(tag)) {
      console.log(tag);
      setFormData({ ...formData, tags: [...formData.tags, tag] });
      setQuery("");
    }
    setAddTagUI(false);
  };

  const removeTag = (tag) => {
    const newTags = formData.tags.filter((t) => t !== tag);
    setFormData({ ...formData, tags: newTags });
  };
  return (
    <FormControl>
      <FormLabel>Tags</FormLabel>
      <FormHelperText className={styles.formHelperText}>
        Add up to 5 tags to label your question
      </FormHelperText>
      <InputGroup>
        {formData.tags.length ? (
          <InputLeftAddon className={styles.inputLeftAddon}>
            {formData.tags.map((tag) => {
              return (
                <Tag
                  className={styles.tag}
                  variant={"outline"}
                  colorScheme={"blue"}
                  key={tag}
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
          placeholder="Start typing to see existing tags"
          _placeholder={{ fontSize: "0.8rem", color: "silver" }}
          onChange={(e) => setQuery(e.target.value)}
        />
      </InputGroup>
      {query !== "" ? (
        <Box className={styles.tagResultsBox}>
          {filterState.map((tag) => (
            <Tag
              className={styles.tagResult}
              variant={"outline"}
              colorScheme={"blue"}
              key={tag.name}
              onClick={() => addTag(tag.name, true)}
            >
              {tag.name}
            </Tag>
          ))}
          {query.length && addTagUI === true && (
            <Tag
              className={styles.tagToAdd}
              variant={"outline"}
              colorScheme={"green"}
            >
              {query}
              <TagRightIcon
                className={styles.tagRightIcon}
                as={FaPlus}
                onClick={() => addTag(query)}
              />
            </Tag>
          )}
        </Box>
      ) : null}
    </FormControl>
  );
};

export default TagsInput;
