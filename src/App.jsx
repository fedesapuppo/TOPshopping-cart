import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Box, Flex, Button } from "@chakra-ui/react";
import Home from "./pages/Home";
import Shop from "./pages/Shop";

export default function App() {
  return (
    <Router>
      <Box>
        <Flex bg="teal.500" p={4} color="white" gap={4}>
          <Button as={Link} to="/" colorScheme="teal" variant="ghost">
            Home
          </Button>
          <Button as={Link} to="/shop" colorScheme="teal" variant="ghost">
            Shop
          </Button>
        </Flex>
        <Box p={4}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}
