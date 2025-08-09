import { Box, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box p={4}>
      <Heading>Welcome to Our Store</Heading>
      <Text mt={2}>
        This is the homepage. Browse our products and enjoy your shopping!
      </Text>
    </Box>
  );
}
