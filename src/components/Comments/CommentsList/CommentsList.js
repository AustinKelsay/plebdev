import React, { useState, useEffect } from "react";
import axios from "axios";
import Comment from "../Comment/Comment";
import Loading from "../../Loading/Loading";

const CommentsList = ({ answer_id }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/answers/${answer_id}/comments`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {comments.length
        ? comments.map((comment) => <Comment key={comment.id} {...comment} />)
        : // <Loading />
          null}
    </div>
  );
};

export default CommentsList;
