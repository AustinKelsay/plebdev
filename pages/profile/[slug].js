import React from "react";
import UserProfile from "../../src/components/Users/UserProfile/UserProfile";

export default function Profile({ user }) {
  return <UserProfile user={user} />;
}

export async function getServerSideProps({ params }) {
  const userRes = await fetch(`http://localhost:3000/api/users/${params.slug}`);
  const user = await userRes.json();
  return {
    props: {
      user,
    },
  };
}
