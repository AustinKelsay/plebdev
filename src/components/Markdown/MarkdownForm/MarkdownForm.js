import React from "react";
import Loading from "../../Loading/Loading";
import dynamic from "next/dynamic";
import { EditorSelection } from "@codemirror/state";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import styles from "./styles.module.css";

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod),
  { ssr: false }
);

export const codeBlock = {
  name: "codeBlock",
  keyCommand: "codeBlock",
  button: { "aria-label": "Insert Code Block" },
  icon: (
    <svg viewBox="0 0 48 48" fill="none" height="15" width="15">
      <path
        d="M16 13 4 25.432 16 37m16-24 12 12.432L32 37"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m28 4-7 40"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  ),
  execute: ({ state, view }) => {
    if (!state || !view) return;
    const main = view.state.selection.main;
    const txt = view.state.sliceDoc(
      view.state.selection.main.from,
      view.state.selection.main.to
    );
    view.dispatch({
      changes: {
        from: main.from,
        to: main.to,
        insert: `\`\`\`js\n${txt}\n\`\`\``,
      },
      selection: EditorSelection.range(main.from + 3, main.from + 5),
    });
  },
};

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
          toolbars={[
            "bold",
            "italic",
            "strikethrough",
            "heading",
            "quote",
            "olist",
            "ulist",
            codeBlock,
          ]}
        />
      ) || <Loading />}
    </div>
  );
};

export default MarkdownForm;
