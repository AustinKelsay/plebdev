import React from "react";
import QuestionsList from "../src/components/Questions/QuestionsList/QuestionsList";

export default function Home({ questions }) {
  return <QuestionsList questions={questions} />;
}

export async function getServerSideProps() {
  const questionsRes = await fetch("http://localhost:3000/api/questions");
  const questions = await questionsRes.json();
  return {
    props: {
      questions,
    },
  };
}
