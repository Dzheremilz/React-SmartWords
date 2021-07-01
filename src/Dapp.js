import { Container } from "@chakra-ui/react";
// import { SmartWordsContext } from "./App";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import SmartWords from "./components/SmartWords";

function Dapp() {
  return (
    <>
      <Header />
      <Container as="main" maxW="container.lg" py="10">
        <Login>
          <SmartWords />
        </Login>
      </Container>
      <Footer />
    </>
  );
}

export default Dapp;
