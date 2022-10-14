import React from "react";
import Loading from "../../src/components/Loading/Loading";
import { useSession } from "next-auth/react";
import QuestionFull from "../../src/components/Questions/QuestionFull/QuestionFull";

const Question = () => {
  const { status } = useSession();

  return <div>{status ? <QuestionFull status={status} /> : <Loading />}</div>;
};

export default Question;
