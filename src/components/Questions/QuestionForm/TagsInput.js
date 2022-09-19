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
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

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
              onClick={() => addTag(tag.name, true)}
            >
              {tag.name}
            </Tag>
          ))}
          {query.length && addTagUI === true && (
            <Tag m={"1%"} variant={"outline"} colorScheme={"green"}>
              {query}
              <FaPlus
                ml={"5%"}
                cursor={"pointer"}
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
