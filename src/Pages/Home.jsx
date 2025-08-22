import {
  Box,
  Heading,
  Text,
  Button,
  Image,
  Grid,
  VStack,
  HStack,
  Icon,
  Container,
  Badge,
  Input
} from "@chakra-ui/react";
import {
  FaShoppingCart,
  FaTruck,
  FaShieldAlt,
  FaHeadset,
  FaStar,
  FaHeart,
  FaPlus,
  FaMinus
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function Home() {
  const bgColor = "gray.50";
  const cardBg = "white";
  const textColor = "gray.600";
  const { addToCart } = useCart();

  // Sample product data
  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 199.99,
      category: "Electronics",
      description: "Premium quality wireless headphones",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 299.99,
      category: "Wearables",
      description: "Feature-rich smartwatch with health monitoring",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Running Shoes",
      price: 129.99,
      category: "Sports",
      description: "Comfortable and durable running shoes for athletes",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop"
    }
  ];

  // State for quantity inputs
  const [quantities, setQuantities] = useState({
    1: 1,
    2: 1,
    3: 1
  });

  const handleQuantityChange = (productId, value) => {
    const numValue = parseInt(value) || 1;
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, numValue)
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id];
    // Add the product multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        bgGradient="linear(to-r, blue.400, purple.500)"
        color="white"
        py={10}
        textAlign="center"
      >
        <Container maxW="container.xl">
          <VStack spacing={6}>
            <Heading size="2xl" fontWeight="bold" color="black">
              Welcome to TOP Shopping
            </Heading>
            <Text fontSize="xl" maxW="2xl" color="black">
              Discover amazing products at unbeatable prices. Shop the latest trends
              with confidence and enjoy fast, secure shopping experience.
            </Text>
            <HStack spacing={10}>
              <Button size="lg" colorScheme="white" variant="outline">
                Shop Now
              </Button>
              <Button size="lg" colorScheme="white" variant="ghost">
                Learn More
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={14} bg={bgColor}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <Heading textAlign="center" size="xl">
              Why Choose TOP Shopping?
            </Heading>
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={8}>
              <VStack spacing={4} textAlign="center">
                <Box p={4} bg="blue.500" borderRadius="full">
                  <Icon as={FaShoppingCart} boxSize={6} color="white" />
                </Box>
                <Heading size="md">Easy Shopping</Heading>
                <Text color={textColor}>Simple and intuitive shopping experience</Text>
              </VStack>

              <VStack spacing={4} textAlign="center">
                <Box p={4} bg="green.500" borderRadius="full">
                  <Icon as={FaTruck} boxSize={6} color="white" />
                </Box>
                <Heading size="md">Fast Delivery</Heading>
                <Text color={textColor}>Quick and reliable shipping worldwide</Text>
              </VStack>

              <VStack spacing={4} textAlign="center">
                <Box p={4} bg="purple.500" borderRadius="full">
                  <Icon as={FaShieldAlt} boxSize={6} color="white" />
                </Box>
                <Heading size="md">Secure Payment</Heading>
                <Text color={textColor}>Safe and encrypted payment methods</Text>
              </VStack>

              <VStack spacing={4} textAlign="center">
                <Box p={4} bg="orange.500" borderRadius="full">
                  <Icon as={FaHeadset} boxSize={6} color="white" />
                </Box>
                <Heading size="md">24/7 Support</Heading>
                <Text color={textColor}>Round the clock customer service</Text>
              </VStack>
            </Grid>
          </VStack>
        </Container>
      </Box>

      {/* Featured Products Section */}
      <Box py={16}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <Heading textAlign="center" size="xl">
              Featured Products
            </Heading>
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={8}>
              {/* Product Card 1 */}
              <Box bg={cardBg} borderRadius="lg" overflow="hidden" shadow="lg" _hover={{ transform: "translateY(-4px)", transition: "all 0.3s" }}>
                <Image
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
                  alt="Wireless Headphones"
                  w="full"
                  h="48"
                  objectFit="cover"
                />
                <Box p={6}>
                  <HStack justify="space-between" mb={2}>
                    <Badge colorScheme="blue">Electronics</Badge>
                    <Icon as={FaHeart} color="red.400" cursor="pointer" />
                  </HStack>
                  <Heading size="md" mb={2}>Wireless Headphones</Heading>
                  <HStack spacing={2} mb={3}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon key={star} as={FaStar} color="yellow.400" />
                    ))}
                  </HStack>
                  <Text color={textColor} mb={4}>
                    Premium quality wireless headphones with noise cancellation
                  </Text>
                  <VStack spacing={3} align="stretch">
                    <Text fontSize="xl" fontWeight="bold" color="blue.500" textAlign="center">
                      $199.99
                    </Text>

                    <HStack spacing={2} justify="center">
                      <Input
                        type="number"
                        value={quantities[1]}
                        onChange={(e) => handleQuantityChange(1, e.target.value)}
                        w="16"
                        textAlign="center"
                        size="sm"
                        borderRadius="md"
                        borderWidth="1px"
                        borderColor="gray.300"
                        _focus={{ borderColor: "blue.300", boxShadow: "0 0 0 1px blue.300" }}
                      />
                    </HStack>

                    <Button
                      colorScheme="blue"
                      size="sm"
                      onClick={() => handleAddToCart(featuredProducts[0])}
                      w="full"
                    >
                      Add to Cart
                    </Button>
                  </VStack>
                </Box>
              </Box>

              {/* Product Card 2 */}
              <Box bg={cardBg} borderRadius="lg" overflow="hidden" shadow="lg" _hover={{ transform: "translateY(-4px)", transition: "all 0.3s" }}>
                <Image
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"
                  alt="Smart Watch"
                  w="full"
                  h="48"
                  objectFit="cover"
                />
                <Box p={6}>
                  <HStack justify="space-between" mb={2}>
                    <Badge colorScheme="green">Wearables</Badge>
                    <Icon as={FaHeart} color="red.400" cursor="pointer" />
                  </HStack>
                  <Heading size="md" mb={2}>Smart Watch</Heading>
                  <HStack spacing={2} mb={3}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon key={star} as={FaStar} color="yellow.400" />
                    ))}
                  </HStack>
                  <Text color={textColor} mb={4}>
                    Feature-rich smartwatch with health monitoring
                  </Text>
                  <VStack spacing={3} align="stretch">
                    <Text fontSize="xl" fontWeight="bold" color="blue.500" textAlign="center">
                      $299.99
                    </Text>

                    <HStack spacing={2} justify="center">
                      <Input
                        type="number"
                        value={quantities[2]}
                        onChange={(e) => handleQuantityChange(2, e.target.value)}
                        w="16"
                        textAlign="center"
                        size="sm"
                        borderRadius="md"
                        borderWidth="1px"
                        borderColor="gray.300"
                        _focus={{ borderColor: "blue.300", boxShadow: "0 0 0 1px blue.300" }}
                      />
                    </HStack>

                    <Button
                      colorScheme="blue"
                      size="sm"
                      onClick={() => handleAddToCart(featuredProducts[1])}
                      w="full"
                    >
                      Add to Cart
                    </Button>
                  </VStack>
                </Box>
              </Box>

              {/* Product Card 3 */}
              <Box bg={cardBg} borderRadius="lg" overflow="hidden" shadow="lg" _hover={{ transform: "translateY(-4px)", transition: "all 0.3s" }}>
                <Image
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop"
                  alt="Running Shoes"
                  w="full"
                  h="48"
                  objectFit="cover"
                />
                <Box p={6}>
                  <HStack justify="space-between" mb={2}>
                    <Badge colorScheme="purple">Sports</Badge>
                    <Icon as={FaHeart} color="red.400" cursor="pointer" />
                  </HStack>
                  <Heading size="md" mb={2}>Running Shoes</Heading>
                  <HStack spacing={2} mb={3}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon key={star} as={FaStar} color="yellow.400" />
                    ))}
                  </HStack>
                  <Text color={textColor} mb={4}>
                    Comfortable and durable running shoes for athletes
                  </Text>
                  <VStack spacing={3} align="stretch">
                    <Text fontSize="xl" fontWeight="bold" color="blue.500" textAlign="center">
                      $129.99
                    </Text>

                    <HStack spacing={2} justify="center">
                      <Input
                        type="number"
                        value={quantities[3]}
                        onChange={(e) => handleQuantityChange(3, e.target.value)}
                        w="16"
                        textAlign="center"
                        size="sm"
                        borderRadius="md"
                        borderWidth="1px"
                        borderColor="gray.300"
                        _focus={{ borderColor: "blue.300", boxShadow: "0 0 0 1px blue.300" }}
                      />
                    </HStack>

                    <Button
                      colorScheme="blue"
                      size="sm"
                      onClick={() => handleAddToCart(featuredProducts[2])}
                      w="full"
                    >
                      Add to Cart
                    </Button>
                  </VStack>
                </Box>
              </Box>
            </Grid>
          </VStack>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box py={10} bg={bgColor}>
        <Container maxW="container.xl">
          <VStack spacing={8} textAlign="center">
            <Heading size="xl">
              Ready to Start Shopping?
            </Heading>
            <Text fontSize="lg" color={textColor} maxW="2xl">
              Join thousands of satisfied customers who trust TOP Shopping for their
              online shopping needs. Start exploring our vast collection today!
            </Text>
            <Button size="lg" colorScheme="blue">
              Browse All Products
            </Button>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}
