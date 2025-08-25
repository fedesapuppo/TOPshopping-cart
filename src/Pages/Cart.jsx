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
import { useColorModeValue } from "../components/ui/color-mode";
import { FaTrash, FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { useCart } from "../context/CartContext";
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
                display="flex"
                gap={6}
                alignItems="center"
              >
                {/* Product Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  w="24"
                  h="24"
                  objectFit="cover"
                  borderRadius="md"
                />

                {/* Product Details */}
                <VStack align="start" flex="1" spacing={2}>
                  <Heading size="md" color={headingColor} noOfLines={2}>
                    {item.title}
                  </Heading>
                  <Badge colorScheme="blue">{item.category}</Badge>
                  <Text color={textColor} noOfLines={2}>
                    {item.description}
                  </Text>
                </VStack>

                {/* Quantity Controls */}
                <VStack spacing={2} align="center">
                  <Text fontSize="sm" color={textColor}>Quantity</Text>
                  <HStack spacing={2}>
                    <Button
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      isDisabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    <Text fontWeight="bold" minW="8" textAlign="center">
                      {item.quantity}
                    </Text>
                    <Button
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </HStack>
                </VStack>

                {/* Price and Remove */}
                <VStack spacing={3} align="center">
                  <Text fontSize="xl" fontWeight="bold" color={priceColor}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                  <Text fontSize="sm" color={textColor}>
                    ${item.price} each
                  </Text>
                  <Button
                    size="sm"
                    colorScheme="red"
                    variant="outline"
                    leftIcon={<FaTrash />}
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </VStack>
              </Box>
            ))}
          </VStack>

          {/* Cart Summary */}
          <Box bg={cardBg} p={6} borderRadius="lg" shadow="md">
            <VStack spacing={4} align="stretch">
              <Box borderTop="1px" borderColor={useColorModeValue("gray.200", "gray.600")} />
              <Flex justify="space-between" align="center">
                <Text fontSize="lg" fontWeight="bold" color={headingColor}>
                  Total Items: {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color={priceColor}>
                  Total: ${getCartTotal().toFixed(2)}
                </Text>
              </Flex>

              <HStack spacing={4} justify="center">
                <Button
                  colorScheme="red"
                  variant="outline"
                  onClick={clearCart}
                  leftIcon={<FaTrash />}
                >
                  Clear Cart
                </Button>
                <Button
                  colorScheme="blue"
                  size="lg"
                  leftIcon={<FaShoppingCart />}
                >
                  Proceed to Checkout
                </Button>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
