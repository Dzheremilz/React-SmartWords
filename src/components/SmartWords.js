import { useContext, useEffect, useState } from "react";
import { SmartWordsContext } from "../App";
import { Web3Context } from "web3-hooks";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Container,
  Link,
  SimpleGrid,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { ethers } from "ethers";

const SmartWords = () => {
  const smartWords = useContext(SmartWordsContext);
  const [web3State] = useContext(Web3Context);
  const [quote, setQuote] = useState("");
  const [hashedQuote, setHashedQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const [arrayNFT, setArrayNFT] = useState([]);
  const URI = "https://www.google.com/";
  const toast = useToast();

  useEffect(() => {
    if (smartWords) {
      // console.log(smartWords.symbol());
    }
  }, [smartWords]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // sanitize minimum, TODO improve
    const inputHashValue = ethers.utils.id(inputValue.trim().toUpperCase());
    setQuote(inputValue);
    setHashedQuote(inputHashValue);
  };

  const handleSend = async () => {
    try {
      setLoading(true);
      const tx = await smartWords.quote(hashedQuote, quote, URI);
      await tx.wait();
      toast({
        title: "Sent",
        description: (
          <Link href={`https://rinkeby.etherscan.io/tx/${tx.hash}`} isExternal>
            Rinkeby transaction hash <ExternalLinkIcon mx="2px" />
          </Link>
        ),
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: `${e.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGetNFT = async () => {
    let array3 = [];
    try {
      let balance = await smartWords.balanceOf(web3State.account);
      balance = Number(balance);
      let array2 = [];
      for (let i = 0; i < balance; i++) {
        let id = await smartWords.tokenOfOwnerByIndex(web3State.account, i);
        array2.push(Number(id));
      }
      console.log(array2);
      for await (let elem of array2) {
        console.log(elem);
        let newNFT = await smartWords.getQuoteById(elem);
        let nftURI = await smartWords.tokenURI(elem);
        console.log([...newNFT, nftURI]);
        array3.push([...newNFT, nftURI]);
      }
      setArrayNFT(array3);
    } catch (e) {
      <Alert status="error" variant="left-accent">
        <AlertIcon />
        {e.message}
      </Alert>;
    } finally {
    }
  };

  return (
    <>
      <Text mb="5">Accound: {web3State.account}</Text>
      <Text mb="3">Quote:</Text>
      <Textarea
        value={quote}
        onChange={handleInputChange}
        placeholder="Quote placeholder"
        size="sm"
        mb="5"
      />
      <Text mb="3">Quote Hash:</Text>
      <Textarea
        value={hashedQuote}
        onChange={handleInputChange}
        placeholder="Hash quote placeholder"
        size="sm"
        mb="5"
        isReadOnly
      />
      <Center mb="5">
        <Button
          colorScheme="teal"
          size="lg"
          isLoading={loading}
          loadingText="Sending"
          spinnerPlacement="end"
          onClick={handleSend}
        >
          Send
        </Button>
      </Center>
      <Center mb="5">
        <Button colorScheme="purple" size="lg" onClick={handleGetNFT}>
          Get my NFT
        </Button>
      </Center>
      <Container maxW="container.lg" p={0}>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="8">
          {arrayNFT.map((el, i) => (
            <Box
              bg="tomato"
              color="white"
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              key={i}
            >
              <Text>
                <Text as="span" color="black">
                  Author:
                </Text>{" "}
                {el[0]}
              </Text>
              <Text>
                <Text as="span" color="black">
                  Quote:
                </Text>{" "}
                {el[3]}
              </Text>
              <Text>
                <Text as="span" color="black">
                  Quote Hash:
                </Text>{" "}
                {el[1]}
              </Text>
              <Text>
                <Text as="span" color="black">
                  Timestamp:
                </Text>{" "}
                {el[2].toString()}
              </Text>
              <Text>
                <Text as="span" color="black">
                  URI:
                </Text>{" "}
                <Link color="pink.200" href={el[4]} isExternal>
                  {el[4]} <ExternalLinkIcon mx="2px" />
                </Link>
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
};

export default SmartWords;
