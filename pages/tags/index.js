import React from "react";
import TagsList from "../../src/components/Tags/TagsList/TagsList";

export default function Home({ tags }) {
  return <TagsList tags={tags} />;
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
