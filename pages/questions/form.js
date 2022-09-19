import React from "react";
import { Box } from "@chakra-ui/react";
import QuestionForm from "../../src/components/Questions/QuestionForm/QuestionForm";

export default function Form({ tags }) {
  return (
    <Box>
      <QuestionForm tags={tags} />
    </Box>
  );
}

export async function getServerSideProps() {
  const tagsRes = await fetch("http://localhost:3000/api/tags");
  const tags = await tagsRes.json();
  return {
    props: {
      tags,
    },
  };
}
