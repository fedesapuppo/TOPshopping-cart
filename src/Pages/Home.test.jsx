import { renderWithProviders, mockProducts } from '../test/test-utils'
import { screen, fireEvent, waitFor, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import Home from './Home'

// Mock the cart context
vi.mock('../context/CartContext', () => ({
  useCart: () => ({
    addToCart: vi.fn()
  }),
  CartProvider: ({ children }) => children
}))

describe('Home Page', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    global.fetch = vi.fn()
  })

  describe('Hero Section', () => {
    it('should render hero section with welcome message', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts
      })

      renderWithProviders(<Home />)

      await waitFor(() => {
        expect(screen.getByText('Welcome to TOP Shopping')).toBeInTheDocument()
        expect(screen.getByText(/Discover amazing products/)).toBeInTheDocument()
      })
    })

    it('should render hero section buttons', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts
      })

      renderWithProviders(<Home />)

      await waitFor(() => {
        expect(screen.getByText('Shop Now')).toBeInTheDocument()
        expect(screen.getByText('Learn More')).toBeInTheDocument()
      })
    })
  })

  describe('Features Section', () => {
    it('should render features section with all four features', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts
      })

      renderWithProviders(<Home />)

      await waitFor(() => {
        expect(screen.getByText('Why Choose TOP Shopping?')).toBeInTheDocument()
        expect(screen.getByText('Easy Shopping')).toBeInTheDocument()
        expect(screen.getByText('Fast Delivery')).toBeInTheDocument()
        expect(screen.getByText('Secure Payment')).toBeInTheDocument()
        expect(screen.getByText('24/7 Support')).toBeInTheDocument()
      })
    })

    it('should render feature descriptions', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts
      })

      renderWithProviders(<Home />)

      await waitFor(() => {
        expect(screen.getByText('Simple and intuitive shopping experience')).toBeInTheDocument()
        expect(screen.getByText('Quick and reliable shipping worldwide')).toBeInTheDocument()
        expect(screen.getByText('Safe and encrypted payment methods')).toBeInTheDocument()
        expect(screen.getByText('Round the clock customer service')).toBeInTheDocument()
      })
    })
  })

  describe('Featured Products Section', () => {
    it('should render featured products section title', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts
      })

      renderWithProviders(<Home />)

      await waitFor(() => {
        expect(screen.getByText('Featured Products')).toBeInTheDocument()
      })
    })

    it('should render products with correct information', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts
      })

      renderWithProviders(<Home />)

      await waitFor(() => {
        expect(screen.getByText('Test Product 1')).toBeInTheDocument()
        expect(screen.getByText('Test Product 2')).toBeInTheDocument()
        expect(screen.getByText('$99.99')).toBeInTheDocument()
        expect(screen.getByText('$149.99')).toBeInTheDocument()
        expect(screen.getByText('A test product for testing')).toBeInTheDocument()
        expect(screen.getByText('Another test product')).toBeInTheDocument()
      })
    })

    it('should render category badges', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts
      })

      renderWithProviders(<Home />)

      await waitFor(() => {
        expect(screen.getByText('electronics')).toBeInTheDocument()
        expect(screen.getByText('clothing')).toBeInTheDocument()
      })
    })

    it('should render star ratings', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts
      })

      renderWithProviders(<Home />)

      await waitFor(() => {
        // Should render 5 stars for each product (2 products × 5 stars = 10 total)
        // Using getAllByRole to find all icons
        const stars = screen.getAllByRole('img', { hidden: true })
        expect(stars.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Call to Action Section', () => {
    it('should render call to action section', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts
      })

      renderWithProviders(<Home />)

      await waitFor(() => {
        expect(screen.getByText('Ready to Start Shopping?')).toBeInTheDocument()
        expect(screen.getByText(/Join thousands of satisfied customers/)).toBeInTheDocument()
        expect(screen.getByText('Browse All Products')).toBeInTheDocument()
      })
    })
  })

  describe('Loading State', () => {
    it('should show loading spinner initially', () => {
      // Don't resolve fetch immediately to test loading state
      global.fetch.mockImplementation(() => new Promise(() => {}))

      renderWithProviders(<Home />)

      expect(screen.getByText('Loading featured products...')).toBeInTheDocument()
    })
  })

  describe('Error State', () => {
    it('should show error message when API call fails', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network error'))

      renderWithProviders(<Home />)

      await waitFor(() => {
        expect(screen.getByText('Error loading featured products:')).toBeInTheDocument()
        expect(screen.getByText('Network error')).toBeInTheDocument()
      })
    })

    it('should show error message when API returns error response', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500
      })

      renderWithProviders(<Home />)

      await waitFor(() => {
        expect(screen.getByText('Error loading featured products:')).toBeInTheDocument()
        expect(screen.getByText('Failed to fetch featured products')).toBeInTheDocument()
      })
    })
  })

    describe('Product Interaction', () => {
    it('should allow quantity input changes', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts
      })

      renderWithProviders(<Home />)

      await waitFor(() => {
        const quantityInputs = screen.getAllByRole('spinbutton')
        expect(quantityInputs).toHaveLength(2)
      })

      const firstQuantityInput = screen.getAllByRole('spinbutton')[0]

      fireEvent.change(firstQuantityInput, { target: { value: '5' } })
      expect(firstQuantityInput.value).toBe('5')
    })

    it('should prevent quantity from going below 1', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts
      })

      renderWithProviders(<Home />)

      await waitFor(() => {
        const quantityInputs = screen.getAllByRole('spinbutton')
        expect(quantityInputs).toHaveLength(2)
      })

      const firstQuantityInput = screen.getAllByRole('spinbutton')[0]

      fireEvent.change(firstQuantityInput, { target: { value: '0' } })
      expect(firstQuantityInput.value).toBe('1')
    })

    it('should render add to cart buttons', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts
      })

      renderWithProviders(<Home />)

      await waitFor(() => {
        const addToCartButtons = screen.getAllByText('Add to Cart')
        expect(addToCartButtons).toHaveLength(2)
      })
    })

            it('should render product images', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts
      })

      renderWithProviders(<Home />)

      await waitFor(() => {
        const images = screen.getAllByRole('img')
        expect(images).toHaveLength(2) // 2 products with images
      })
    })
  })

  describe('API Integration', () => {
    it('should fetch products from FakeStore API', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts
      })

      await act(async () => {
        renderWithProviders(<Home />)
      })

      expect(global.fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products?limit=3')
    })

    it('should handle empty products array', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => []
      })

      await act(async () => {
        renderWithProviders(<Home />)
      })

      await waitFor(() => {
        expect(screen.getByText('Featured Products')).toBeInTheDocument()
        // Should not render any product cards
        expect(screen.queryByText('Add to Cart')).not.toBeInTheDocument()
      })
    })
  })
})
