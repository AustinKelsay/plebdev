import React, { useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();
  const options = ["Questions", "Tags", "Users"];
  const [selected, setSelected] = useState("Questions");

  const handleClick = (option) => {
    setSelected(option);
    router.push(`/${option.toLowerCase()}`);
  };

  return (
    <Box>
      {options.map((option) => {
        return selected === option ? (
          <Button
            onClick={() => handleClick(option)}
            w="100%"
            variant={"ghost"}
            borderRadius={0}
            color={"black.500"}
            borderRight={"3px solid orange"}
            fontFamily={"Source Code Pro, monospace"}
            fontWeight={"bold"}
            backgroundColor={"#e6e6e6"}
            _hover={{ background: "#e6e6e6" }}
            key={option}
          >
            {option}
          </Button>
        ) : (
          <Button
            onClick={() => handleClick(option)}
            w="100%"
            borderRadius={0}
            variant="ghost"
            colorScheme="whiteAlpha"
            color={"gray.500"}
            fontFamily={"Source Code Pro, monospace"}
            fontWeight={"normal"}
            _hover={{ background: "#e6e6e6" }}
            key={option}
          >
            {option}
          </Button>
        );
      })}
    </Box>
  );
};

export default Sidebar;
