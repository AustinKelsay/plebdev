import React from "react";
import Loading from "../../Loading/Loading";
import dynamic from "next/dynamic";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import styles from "./styles.module.css";

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod),
  { ssr: false }
);

const MarkdownForm = ({ markdown, handleChange }) => {
  return (
    <div className={styles.markdownContainer}>
      {(
        <MarkdownEditor
          height={300}
          value={markdown}
          onChange={handleChange}
          name="description"
          type="markdown"
        />
      ) || <Loading />}
    </div>
  );
};

export default MarkdownForm;
