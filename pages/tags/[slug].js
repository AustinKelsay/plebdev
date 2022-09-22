import React from "react";
import TagInfo from "../../src/components/tags/TagInfo/TagInfo";
import { useRouter } from "next/router";

export default function Home({ tags }) {
  const { slug } = useRouter().query;

  const tag = tags.filter((tag) => tag.id === slug)[0];

  return <TagInfo tag={tag} />;
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
