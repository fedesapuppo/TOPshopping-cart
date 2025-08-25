import {
  Box,
  Heading,
  Text,
  Grid,
  VStack,
  HStack,
  Button,
  Image,
  Badge,
  Icon,
  Container,
  Input,
  Spinner
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode.jsx";
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext.jsx";
import { useState, useEffect } from "react";

export default function Shop() {
  const { addToCart } = useCart();

  // Color mode values
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("gray.800", "white");
  const priceColor = useColorModeValue("blue.500", "blue.300");
  const inputBorderColor = useColorModeValue("gray.300", "gray.600");
  const inputFocusColor = useColorModeValue("blue.300", "blue.400");
  const imageBg = useColorModeValue("gray.50", "gray.700");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for quantity inputs - will be populated when products load
  const [quantities, setQuantities] = useState({});

  // Fetch products from FakeStore API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();

        // Initialize quantities for all products
        const initialQuantities = data.reduce((acc, product) => {
          acc[product.id] = 1;
          return acc;
        }, {});

        setProducts(data);
        setQuantities(initialQuantities);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
        <Text mt={4} fontSize="lg">Loading products...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={20}>
        <Box
          bg={useColorModeValue("red.100", "red.900")}
          color={useColorModeValue("red.800", "red.200")}
          p={4}
          borderRadius="md"
          maxW="md"
          mx="auto"
        >
          <Text fontWeight="bold">Error loading products:</Text>
          <Text>{error}</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
                        <Box textAlign="center" py={8}>
                <Heading size="2xl" mb={4} color={headingColor}>Shop Our Products</Heading>
                <Text fontSize="lg" color={textColor}>
                  Discover amazing products from our curated collection. Start adding them to your cart!
                </Text>
              </Box>

          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={8}>
            {products.map((product) => (
              <Box
                key={product.id}
                bg={cardBg}
                borderRadius="lg"
                overflow="hidden"
                shadow="lg"
                _hover={{ transform: "translateY(-4px)", transition: "all 0.3s" }}
                display="flex"
                flexDirection="column"
              >
                                  <Image
                    src={product.image}
                    alt={product.title}
                    w="full"
                    h="48"
                    objectFit="contain"
                    bg={imageBg}
                    p={4}
                  />
                <Box p={6} display="flex" flexDirection="column" flex="1">
                  <HStack justify="space-between" mb={2}>
                    <Badge colorScheme={getCategoryColor(product.category)}>
                      {product.category}
                    </Badge>
                    <Icon as={FaHeart} color="red.400" cursor="pointer" />
                  </HStack>

                  <Heading size="md" mb={2} noOfLines={2} color={headingColor}>
                    {product.title}
                  </Heading>

                  <HStack spacing={2} mb={3}>
                    {Array.from({ length: Math.round(product.rating.rate) }).map((_, index) => (
                      <Icon key={index} as={FaStar} color="yellow.400" />
                    ))}
                    <Text fontSize="sm" color="gray.500">
                      ({product.rating.count})
                    </Text>
                  </HStack>

                  <Text color={textColor} mb={4} noOfLines={3}>
                    {product.description}
                  </Text>

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
                      leftIcon={<FaShoppingCart />}
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
        </VStack>
      </Container>
    </Box>
  );
}
