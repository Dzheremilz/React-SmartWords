import { useContext } from "react";
import { Web3Context } from "web3-hooks";
import { Button, Center, Text } from "@chakra-ui/react";

const Login = ({ children }) => {
  const [web3State, login] = useContext(Web3Context);
  return (
    <>
      {!web3State.isLogged ? (
        <Center>
          <Button colorScheme="teal" size="lg" type="button" onClick={login}>
            login
          </Button>
        </Center>
      ) : (
        <>
          {web3State.chainId !== 4 ? (
            <Text>You need to be on rinkeby</Text>
          ) : (
            <>{children}</>
          )}
        </>
      )}
    </>
  );
};

export default Login;
