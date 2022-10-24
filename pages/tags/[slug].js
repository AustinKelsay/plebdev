import React from "react";
import TagFull from "../../src/components/Tags/TagFull/TagFull";
import { useRouter } from "next/router";

export default function Home({ tags }) {
  const { slug } = useRouter().query;

  const tag = tags.filter((tag) => tag.id === slug)[0];

  return <TagFull tag={tag} />;
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
