import React, { useState, useEffect } from "react";
import { Flex, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import TagsInput from "./TagsInput";
import dynamic from "next/dynamic";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

// get the code command in the dynamic import
const MarkdownEditor = dynamic(
  // get code toolbar
  () => import("@uiw/react-markdown-editor").then((mod) => mod),
  { ssr: false }
);

// const code = {
//   name: "code",
//   keyCommand: "code",
//   buttonProps: { "aria-label": "Insert code" },
//   icon: (
//     <svg
//       viewBox="0 0 14 16"
//       version="1.1"
//       width="14"
//       height="16"
//       aria-hidden="true"
//     >
//       <path
//         fillRule="evenodd"
//         d="M13 1H1c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zM1 2h12v10H1V2zm3 3h1v1H4V5zm0 2h1v1H4V7zm0 2h1v1H4v-1zm2-4h1v1H6V5zm0 2h1v1H6V7zm0 2h1v1H6v-1zm2-4h1v1H8V5zm0 2h1v1H8V7zm0 2h1v1H8v-1z"
//       ></path>
//     </svg>
//   ),
//   execute: ({ state, view }) => {
//     // will wrap the current text selection with the code block
//     const mark = "```\n";
//     const matchMark = lineInfo.text.match(/^```/);
//     if (matchMark && matchMark[0]) {
//       const txt = matchMark[0];
//       if (txt.length < 6) {
//         mark = txt + "\n";
//       }
//     }
//     if (mark.length > 6) {
//       mark = "#";
//     }
//     const title = lineInfo.text.replace(/^#+\s/, "");
//     view.dispatch({
//       changes: {
//         from: lineInfo.from,
//         to: lineInfo.to,
//         insert: `${mark}${title}`,
//       },
//       // selection: EditorSelection.range(lineInfo.from + mark.length, lineInfo.to),
//       selection: { anchor: lineInfo.from + mark.length },
//     });
//   },
// };

const QuestionForm = ({ tags }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [filterState, setFilterState] = useState(tags);
  const [query, setQuery] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: [],
  });

  useEffect(() => {
    if (query.length > 0) {
      const filtered = tags.filter((tag) => {
        return tag.name.toLowerCase().includes(query.toLowerCase());
      });
      setFilterState(filtered);
    }
  }, [query, tags]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMarkdownChange = (char) => {
    setFormData({ ...formData, description: char });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (status === "authenticated") {
      const userData = {
        username: session.user.username,
        profilePhoto: session.user.profilePhoto,
      };

      axios
        .post("/api/questions", { ...formData, author: userData })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    router.push("/questions");
  };

  return (
    <Flex>
      <form
        style={{ padding: "1%", width: "90%", margin: "0 auto" }}
        onSubmit={(e) => handleSubmit(e)}
      >
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            mb={"1%"}
            onChange={(e) => handleChange(e)}
            name="title"
            type="text"
          />
          <FormLabel>Description</FormLabel>
          <div style={{ marginBottom: "1%" }} data-color-mode="light">
            <MarkdownEditor
              height={300}
              value={formData.description}
              onChange={handleMarkdownChange}
              // toolbars={[code]}
              name="description"
              type="markdown"
            />
          </div>
          <TagsInput
            formData={formData}
            setFormData={setFormData}
            query={query}
            setQuery={setQuery}
            filterState={filterState}
          />
        </FormControl>
        <Flex
          mt={"2%"}
          w={"100%"}
          flexDirection={"row"}
          justifyContent={"flex-end"}
        >
          <Button type="submit">Submit</Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default QuestionForm;
