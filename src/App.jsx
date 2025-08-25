import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Box, Flex, Button, HStack, Text, Icon } from "@chakra-ui/react";
import { useColorModeValue } from "./components/ui/color-mode";
import { FaShoppingCart } from "react-icons/fa";
import { ColorModeButton } from "./components/ui/color-mode";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import { CartProvider, useCart } from "./context/CartContext";

function NavigationBar() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  // Color mode values for navbar
  const navbarBg = useColorModeValue("blue.700", "blue.900");
  const navbarColor = useColorModeValue("white", "gray.100");
  const cartBg = useColorModeValue("white", "gray.700");
  const cartColor = useColorModeValue("gray.800", "gray.300");

  // Button styling for different modes
  const buttonBg = useColorModeValue("gray.200", "gray.800");
  const buttonTextColor = useColorModeValue("gray.800", "white");
  const buttonBorderColor = useColorModeValue("transparent", "gray.500");
  const buttonHoverBgColor = useColorModeValue("gray.400", "gray.700");

  return (
    <Flex
      bg={navbarBg}
      p={4}
      color={navbarColor}
      justify="space-between"
      align="center"
      shadow="md"
    >
      <HStack spacing={4}>
        <Button
          as={Link}
          to="/"
          variant="outline"
          _hover={{ bg: buttonHoverBgColor }}
          color={buttonTextColor}
          bg={buttonBg}
          borderColor={buttonBorderColor}
          borderWidth="1px"
        >
          Home
        </Button>
        <Button
          as={Link}
          to="/shop"
          variant="outline"
          _hover={{ bg: buttonHoverBgColor }}
          color={buttonTextColor}
          bg={buttonBg}
          borderColor={buttonBorderColor}
          borderWidth="1px"
        >
          Shop
        </Button>
      </HStack>

      <HStack spacing={4}>
        <HStack spacing={2} bg={cartBg} px={3} py={2} borderRadius="md" shadow="sm">
          <Icon as={FaShoppingCart} color={cartColor} />
          <Text color={cartColor} fontWeight="bold">
            Cart: {cartCount} items
          </Text>
        </HStack>
        <Button
          variant="outline"
          size="md"
          color={buttonTextColor}
          borderColor={buttonBorderColor}
          _hover={{ bg: buttonHoverBgColor }}
          bg={buttonBg}
          borderWidth="1px"
        >
          Checkout
        </Button>
        <ColorModeButton
          variant="outline"
          color={buttonTextColor}
          borderColor={buttonBorderColor}
          _hover={{ bg: buttonHoverBgColor }}
          bg={buttonBg}
          borderWidth="1px"
        />
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
