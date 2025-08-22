import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Box, Flex, Button, HStack, Text, Badge, Icon } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import { CartProvider, useCart } from "./context/CartContext";

function NavigationBar() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <Flex bg="teal.500" p={4} color="white" justify="space-between" align="center">
      <HStack spacing={4}>
        <Button as={Link} to="/" colorScheme="teal" variant="ghost">
          Home
        </Button>
        <Button as={Link} to="/shop" colorScheme="teal" variant="ghost">
          Shop
        </Button>
      </HStack>

      <HStack spacing={4}>
        <HStack spacing={2} bg="white" px={3} py={2} borderRadius="md">
          <Icon as={FaShoppingCart} color="teal.500" />
          <Text color="teal.500" fontWeight="bold">
            Cart: {cartCount} items
          </Text>
        </HStack>
        <Button colorScheme="white" variant="outline" size="md">
          Checkout
        </Button>
      </HStack>
    </Flex>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Box>
          <NavigationBar />
          <Box p={4}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </CartProvider>
  );
}
