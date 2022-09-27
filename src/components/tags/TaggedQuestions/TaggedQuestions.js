import React, { useEffect, useState } from "react";
import axios from "axios";
import Question from "../../Questions/Question/Question";

const TaggedQuestions = ({ tag }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/tags/${tag.id}`)
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!questions.length) {
    return <div>No questions found</div>;
  }

  return (
    <div>
      {questions.map((question) => {
        return (
          <Question
            key={question.id}
            author={question.author}
            title={question.title}
            description={question.description}
            tags={question.tags}
            score={question.score}
            views={question.views}
            created={question.created}
            id={question.id}
          />
        );
      })}
    </div>
  );
};

export default TaggedQuestions;
