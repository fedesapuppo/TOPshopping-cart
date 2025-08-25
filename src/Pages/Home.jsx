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
  Input,
  Spinner
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import {
  FaShoppingCart,
  FaTruck,
  FaShieldAlt,
  FaHeadset,
  FaStar,
  FaHeart
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

export default function Home() {
  // Color mode values
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("gray.800", "white");
  const priceColor = useColorModeValue("blue.500", "blue.300");
  const inputBorderColor = useColorModeValue("gray.300", "gray.600");
  const inputFocusColor = useColorModeValue("blue.300", "blue.400");

  const { addToCart } = useCart();

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for quantity inputs
  const [quantities, setQuantities] = useState({});

  // Fetch featured products from FakeStore API
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products?limit=3');
        if (!response.ok) {
          throw new Error('Failed to fetch featured products');
        }
        const data = await response.json();

        // Initialize quantities for featured products
        const initialQuantities = data.reduce((acc, product) => {
          acc[product.id] = 1;
          return acc;
        }, {});

        setFeaturedProducts(data);
        setQuantities(initialQuantities);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

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

  // Get category color scheme
  const getCategoryColor = (category) => {
    const categoryColors = {
      "men's clothing": "blue",
      "women's clothing": "pink",
      "jewelery": "purple",
      "electronics": "green"
    };
    return categoryColors[category] || "gray";
  };

  if (loading) {
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" color="blue.500" />
        <Text mt={4} fontSize="lg">Loading featured products...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={20}>
        <Alert status="error" borderRadius="md" maxW="md" mx="auto">
          <AlertIcon />
          <Text>Error loading featured products: {error}</Text>
        </Alert>
      </Box>
    );
  }

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
            <Heading size="2xl" fontWeight="bold" color={useColorModeValue("black", "white")}>
              Welcome to TOP Shopping
            </Heading>
            <Text fontSize="xl" maxW="2xl" color={useColorModeValue("black", "white")}>
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
            <Heading textAlign="center" size="xl" color={headingColor}>
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
            <Heading textAlign="center" size="xl" color={headingColor}>
              Featured Products
            </Heading>
            {loading ? (
              <Box textAlign="center" py={10}>
                <Spinner size="lg" color="blue.500" />
                <Text mt={4}>Loading featured products...</Text>
              </Box>
            ) : error ? (
              <Box textAlign="center" py={10}>
                <Box
                  bg={useColorModeValue("red.100", "red.900")}
                  color={useColorModeValue("red.800", "red.200")}
                  p={4}
                  borderRadius="md"
                  maxW="md"
                  mx="auto"
                >
                  <Text fontWeight="bold">Error loading featured products:</Text>
                  <Text>{error}</Text>
                </Box>
              </Box>
            ) : (
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={8}>
                {featuredProducts.map((product) => (
                <Box key={product.id} bg={cardBg} borderRadius="lg" overflow="hidden" shadow="lg" _hover={{ transform: "translateY(-4px)", transition: "all 0.3s" }} display="flex" flexDirection="column">
                  <Image
                    src={product.image}
                    alt={product.title}
                    w="full"
                    h="48"
                    objectFit="contain"
                  />
                  <Box p={6} display="flex" flexDirection="column" flex="1">
                    <HStack justify="space-between" mb={2}>
                      <Badge colorScheme={getCategoryColor(product.category)}>
                        {product.category}
                      </Badge>
                      <Icon as={FaHeart} color="red.400" cursor="pointer" />
                    </HStack>
                    <Heading size="md" mb={2} color={headingColor}>{product.title}</Heading>
                    <HStack spacing={2} mb={3}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Icon key={star} as={FaStar} color="yellow.400" />
                      ))}
                    </HStack>
                    <Text color={textColor} mb={4}>{product.description}</Text>

                    <VStack spacing={3} align="stretch" mt="auto">
                      <Text fontSize="xl" fontWeight="bold" color={priceColor} textAlign="center">
                        ${product.price}
                      </Text>

                      <HStack spacing={2} justify="center">
                        <Input
                          type="number"
                          value={quantities[product.id]}
                          onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                          w="16"
                          textAlign="center"
                          size="sm"
                          borderRadius="md"
                          borderWidth="1px"
                          borderColor={inputBorderColor}
                          _focus={{ borderColor: inputFocusColor, boxShadow: `0 0 0 1px ${inputFocusColor}` }}
                        />
                      </HStack>

                      <Button
                        colorScheme="blue"
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                        w="full"
                      >
                        Add to Cart
                      </Button>
                    </VStack>
                  </Box>
                </Box>
              ))}
              </Grid>
            )}
          </VStack>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box py={10} bg={bgColor}>
        <Container maxW="container.xl">
          <VStack spacing={8} textAlign="center">
            <Heading size="xl" color={headingColor}>
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
