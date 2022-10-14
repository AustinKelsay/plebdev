import React, { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import styles from "./styles.module.css";

const Sidebar = () => {
  const router = useRouter();
  const options = ["Questions", "Tags", "Users"];
  const [selected, setSelected] = useState("Questions");

  // Get the first endpoint of the url
  const currentPath = router.pathname.split("/")[1];

  useEffect(() => {
    if (currentPath === "") {
      setSelected(options[0].toLowerCase());
    } else setSelected(currentPath);
  }, [currentPath]);

  const handleClick = (option) => {
    setSelected(option.toLowerCase());
    router.push(`/${option.toLowerCase()}`);
  };

  return (
    <Box>
      {options.map((option) => {
        return selected === option.toLowerCase() ? (
          <Button
            onClick={() => handleClick(option)}
            className={styles.buttonSelected}
            variant={"ghost"}
            color={"black.500"}
            key={option}
          >
            {option}
          </Button>
        ) : (
          <Button
            onClick={() => handleClick(option)}
            className={styles.button}
            variant="ghost"
            colorScheme="whiteAlpha"
            color={"gray.500"}
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
