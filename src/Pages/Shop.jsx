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
} from "@chakra-ui/react";
import { FaStar, FaHeart, FaShoppingCart, FaPlus, FaMinus } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function Shop() {
  const { addToCart } = useCart();

  // Sample product data for the shop
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 199.99,
      category: "Electronics",
      description: "Premium quality wireless headphones",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      rating: 5
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 299.99,
      category: "Wearables",
      description: "Feature-rich smartwatch with health monitoring",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
      rating: 5
    },
    {
      id: 3,
      name: "Running Shoes",
      price: 129.99,
      category: "Sports",
      description: "Comfortable and durable running shoes for athletes",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
      rating: 5
    },
    {
      id: 4,
      name: "Laptop",
      price: 999.99,
      category: "Electronics",
      description: "High-performance laptop for work and gaming",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
      rating: 4
    },
    {
      id: 5,
      name: "Smartphone",
      price: 699.99,
      category: "Electronics",
      description: "Latest smartphone with advanced camera features",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
      rating: 5
    },
    {
      id: 6,
      name: "Fitness Tracker",
      price: 89.99,
      category: "Wearables",
      description: "Track your fitness goals with this advanced tracker",
      image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop",
      rating: 4
    }
  ];

  // State for quantity inputs - initialize all products with quantity 1
  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = 1;
      return acc;
    }, {})
  );

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
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Box textAlign="center" py={8}>
            <Heading size="2xl" mb={4}>Shop Our Products</Heading>
            <Text fontSize="lg" color="gray.600">
              Discover amazing products at unbeatable prices. Start adding them to your cart!
            </Text>
          </Box>

          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={8}>
            {products.map((product) => (
              <Box
                key={product.id}
                bg="white"
                borderRadius="lg"
                overflow="hidden"
                shadow="lg"
                _hover={{ transform: "translateY(-4px)", transition: "all 0.3s" }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  w="full"
                  h="48"
                  objectFit="cover"
                />
                <Box p={6}>
                  <HStack justify="space-between" mb={2}>
                    <Badge colorScheme={
                      product.category === "Electronics" ? "blue" :
                      product.category === "Wearables" ? "green" : "purple"
                    }>
                      {product.category}
                    </Badge>
                    <Icon as={FaHeart} color="red.400" cursor="pointer" />
                  </HStack>

                  <Heading size="md" mb={2}>{product.name}</Heading>

                  <HStack spacing={2} mb={3}>
                    {Array.from({ length: product.rating }).map((_, index) => (
                      <Icon key={index} as={FaStar} color="yellow.400" />
                    ))}
                  </HStack>

                  <Text color="gray.600" mb={4} noOfLines={2}>
                    {product.description}
                  </Text>

                  <VStack spacing={3} align="stretch">
                    <Text fontSize="xl" fontWeight="bold" color="blue.500" textAlign="center">
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
                        borderColor="gray.300"
                        _focus={{ borderColor: "blue.300", boxShadow: "0 0 0 1px blue.300" }}
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
