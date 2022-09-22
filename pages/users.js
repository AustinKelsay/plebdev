import React from "react";
import UsersList from "../src/components/Users/UsersList";

export default function Home({ users }) {
  return <UsersList users={users} />;
}

export async function getServerSideProps() {
  const usersRes = await fetch("http://localhost:3000/api/users");
  const users = await usersRes.json();
  return {
    props: {
      users,
    },
  };
}
