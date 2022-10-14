import React, { useEffect } from "react";
import { Flex, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const handleSubmit = async () => {
    const user = await signIn();
  };

  return (
    <Flex w="80%" m="1% auto" flexDirection={"column"}>
      <Text
        paddingBottom={"2%"}
        align={"center"}
        borderBottom={"1px solid #e6e6e6"}
        m={"2% auto"}
      >
        No need to register just login using one of the below methods your
        account will be generated.
      </Text>
      <Button
        onClick={() => handleSubmit()}
        variant={"primary"}
        backgroundColor={"#343a40"}
        color={"#fff"}
        w="60%"
        m="2% auto"
      >
        Login with Github
      </Button>
    </Flex>
  );
};

export default Login;
