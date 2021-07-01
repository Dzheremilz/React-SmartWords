import { Box } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="gray.800"
      color="white"
      p="4"
      textAlign="center"
      position="fixed"
      bottom="0"
      w="100%"
    >
      Built with Chakra UI
    </Box>
  );
};

export default Footer;
