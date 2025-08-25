import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Image,
  Badge,
  Icon,
  Container,
  Flex
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode.jsx";
import { FaTrash, FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { useCart } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  // Color mode values
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("gray.800", "white");
  const priceColor = useColorModeValue("blue.500", "blue.300");

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Box bg={bgColor} minH="100vh" py={20}>
        <Container maxW="container.xl">
          <VStack spacing={8} textAlign="center">
            <Icon as={FaShoppingCart} boxSize={20} color="gray.400" />
            <Heading size="xl" color={headingColor}>Your Cart is Empty</Heading>
            <Text fontSize="lg" color={textColor}>
              Looks like you haven't added any products to your cart yet.
            </Text>
            <Button as={Link} to="/shop" colorScheme="blue" size="lg">
              Start Shopping
            </Button>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <Box bg={bgColor} minH="100vh" py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <Flex justify="space-between" align="center">
            <Heading size="xl" color={headingColor}>Shopping Cart</Heading>
            <Button as={Link} to="/shop" leftIcon={<FaArrowLeft />} variant="outline">
              Continue Shopping
            </Button>
          </Flex>

          {/* Cart Items */}
          <VStack spacing={4} align="stretch">
            {cartItems.map((item) => (
              <Box
                key={item.id}
                bg={cardBg}
                p={6}
                borderRadius="lg"
                shadow="md"
              >
                {/* Product Image - Centered */}
                <VStack align="center" mb={4}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    w="32"
                    h="32"
                    objectFit="cover"
                    borderRadius="md"
                  />
                </VStack>

                {/* Product Details - Centered */}
                <VStack align="center" spacing={3} mb={4}>
                  <Heading size="md" color={headingColor} noOfLines={2} textAlign="center">
                    {item.title}
                  </Heading>
                  <Badge colorScheme="blue">{item.category}</Badge>
                  <Text color={textColor} noOfLines={3} textAlign="center">
                    {item.description}
                  </Text>
                </VStack>

                {/* Quantity Controls - Centered */}
                <VStack spacing={3} align="center" mb={4}>
                  <Text fontSize="sm" color={textColor} fontWeight="medium">Quantity</Text>
                  <HStack spacing={3}>
                    <Button
                      size="md"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      isDisabled={item.quantity <= 1}
                      colorScheme="blue"
                      variant="outline"
                    >
                      -
                    </Button>
                    <Text fontWeight="bold" fontSize="lg" minW="10" textAlign="center">
                      {item.quantity}
                    </Text>
                    <Button
                      size="md"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      colorScheme="blue"
                      variant="outline"
                    >
                      +
                    </Button>
                  </HStack>
                </VStack>

                {/* Price and Remove - Centered */}
                <VStack spacing={3} align="center">
                  <Text fontSize="2xl" fontWeight="bold" color={priceColor}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                  <Text fontSize="sm" color={textColor}>
                    ${item.price} each
                  </Text>
                  <Button
                    size="md"
                    colorScheme="red"
                    variant="outline"
                    leftIcon={<FaTrash />}
                    onClick={() => removeFromCart(item.id)}
                    w="full"
                  >
                    Remove
                  </Button>
                </VStack>
              </Box>
            ))}
          </VStack>

          {/* Cart Summary */}
          <Box bg={cardBg} p={6} borderRadius="lg" shadow="md">
            <VStack spacing={6} align="center">
              <Box borderTop="1px" borderColor={useColorModeValue("gray.200", "gray.600")} w="full" />

              {/* Total Items - Centered */}
              <VStack spacing={2} align="center">
                <Text fontSize="lg" fontWeight="bold" color={headingColor}>
                  Total Items: {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </Text>
                <Text fontSize="3xl" fontWeight="bold" color={priceColor}>
                  Total: ${getCartTotal().toFixed(2)}
                </Text>
              </VStack>

              {/* Action Buttons - Vertically Stacked */}
              <VStack spacing={3} align="stretch" w="full">
                <Button
                  colorScheme="red"
                  variant="outline"
                  onClick={clearCart}
                  leftIcon={<FaTrash />}
                  size="lg"
                  w="full"
                >
                  Clear Cart
                </Button>
                <Button
                  colorScheme="blue"
                  size="lg"
                  leftIcon={<FaShoppingCart />}
                  w="full"
                >
                  Proceed to Checkout
                </Button>
              </VStack>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
