import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Box, Flex, Button, HStack, Text, Icon } from "@chakra-ui/react";
import { useColorModeValue } from "./components/ui/color-mode.jsx";
import { FaShoppingCart } from "react-icons/fa";
import { ColorModeButton } from "./components/ui/color-mode.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Cart from "./pages/Cart.jsx";
import { CartProvider, useCart } from "./context/CartContext.jsx";

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
      p={{ base: 2, md: 4 }}
      color={navbarColor}
      direction="row"
      justify="space-between"
      align="center"
      shadow="md"
      wrap="wrap"
    >
      {/* Left side buttons - Home and Shop */}
      <HStack spacing={{ base: 1, md: 4 }}>
        <Button
          as={Link}
          to="/"
          variant="outline"
          _hover={{ bg: buttonHoverBgColor }}
          color={buttonTextColor}
          bg={buttonBg}
          borderColor={buttonBorderColor}
          borderWidth="1px"
          size={{ base: "sm", md: "md" }}
          px={{ base: 2, md: 4 }}
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
          size={{ base: "sm", md: "md" }}
          px={{ base: 2, md: 4 }}
        >
          Shop
        </Button>
      </HStack>

      {/* Right side buttons - Cart and Color Mode */}
      <HStack spacing={{ base: 1, md: 4 }}>
        <Button
          as={Link}
          to="/cart"
          variant="ghost"
          bg={cartBg}
          px={{ base: 2, md: 3 }}
          py={{ base: 1, md: 2 }}
          borderRadius="md"
          shadow="sm"
          _hover={{ bg: useColorModeValue("gray.100", "gray.600") }}
          size={{ base: "sm", md: "md" }}
        >
          <HStack spacing={{ base: 1, md: 2 }}>
            <Icon as={FaShoppingCart} color={cartColor} />
            <Text color={cartColor} fontWeight="bold" fontSize={{ base: "xs", md: "sm" }}>
              Cart: {cartCount} items
            </Text>
          </HStack>
        </Button>
        <Button
          variant="outline"
          size={{ base: "sm", md: "md" }}
          color={buttonTextColor}
          borderColor={buttonBorderColor}
          _hover={{ bg: buttonHoverBgColor }}
          bg={buttonBg}
          borderWidth="1px"
          px={{ base: 3, md: 4 }}
          display={{ base: "none", md: "inline-flex" }}
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
          size={{ base: "sm", md: "md" }}
          px={{ base: 2, md: 4 }}
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
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </CartProvider>
  );
}
