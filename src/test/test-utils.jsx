import { render } from '@testing-library/react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { CartProvider } from '../context/CartContext'

// Custom render function that includes providers
export function renderWithProviders(ui, options = {}) {
  const Wrapper = ({ children }) => (
    <ChakraProvider value={defaultSystem}>
      <CartProvider>
        {children}
      </CartProvider>
    </ChakraProvider>
  )

  return render(ui, { wrapper: Wrapper, ...options })
}

// Mock product data for testing
export const mockProducts = [
  {
    id: 1,
    title: "Test Product 1",
    price: 99.99,
    category: "electronics",
    description: "A test product for testing",
    image: "test-image-1.jpg",
    rating: { rate: 4.5, count: 100 }
  },
  {
    id: 2,
    title: "Test Product 2",
    price: 149.99,
    category: "clothing",
    description: "Another test product",
    image: "test-image-2.jpg",
    rating: { rate: 4.0, count: 50 }
  }
]
