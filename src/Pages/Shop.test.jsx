import { screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderWithProviders } from '../test/test-utils'
import Shop from './Shop'

// Mock the fetch API
global.fetch = vi.fn()

describe('Shop Page', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    fetch.mockClear()
  })

  it('should show loading state initially', () => {
    // Mock a delayed response
    fetch.mockImplementationOnce(() =>
      new Promise(resolve => setTimeout(() => resolve({
        ok: true,
        json: () => Promise.resolve([])
      }), 100))
    )

    renderWithProviders(<Shop />)

    expect(screen.getByText('Loading products...')).toBeInTheDocument()
  })

  it('should render products when API call succeeds', async () => {
    const mockProducts = [
      {
        id: 1,
        title: 'Test Product 1',
        price: 99.99,
        category: 'electronics',
        description: 'A test product',
        image: 'test-image-1.jpg',
        rating: { rate: 4.5, count: 100 }
      },
      {
        id: 2,
        title: 'Test Product 2',
        price: 149.99,
        category: 'clothing',
        description: 'Another test product',
        image: 'test-image-2.jpg',
        rating: { rate: 4.0, count: 50 }
      }
    ]

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProducts)
      })
    )

    renderWithProviders(<Shop />)

    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument()
      expect(screen.getByText('Test Product 2')).toBeInTheDocument()
      expect(screen.getByText('$99.99')).toBeInTheDocument()
      expect(screen.getByText('$149.99')).toBeInTheDocument()
    })
  })

  it('should show error state when API call fails', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false
      })
    )

    renderWithProviders(<Shop />)

    await waitFor(() => {
      expect(screen.getByText('Error loading products:')).toBeInTheDocument()
      expect(screen.getByText('Failed to fetch products')).toBeInTheDocument()
    })
  })

  it('should display product categories correctly', async () => {
    const mockProducts = [
      {
        id: 1,
        title: 'Test Product 1',
        price: 99.99,
        category: 'electronics',
        description: 'A test product',
        image: 'test-image-1.jpg',
        rating: { rate: 4.5, count: 100 }
      }
    ]

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProducts)
      })
    )

    renderWithProviders(<Shop />)

    await waitFor(() => {
      expect(screen.getByText('electronics')).toBeInTheDocument()
    })
  })

  it('should display product ratings', async () => {
    const mockProducts = [
      {
        id: 1,
        title: 'Test Product 1',
        price: 99.99,
        category: 'electronics',
        description: 'A test product',
        image: 'test-image-1.jpg',
        rating: { rate: 4.5, count: 100 }
      }
    ]

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProducts)
      })
    )

    renderWithProviders(<Shop />)

    await waitFor(() => {
      expect(screen.getByText('(100)')).toBeInTheDocument()
    })
  })

  it('should allow quantity input changes', async () => {
    const mockProducts = [
      {
        id: 1,
        title: 'Test Product 1',
        price: 99.99,
        category: 'electronics',
        description: 'A test product',
        image: 'test-image-1.jpg',
        rating: { rate: 4.5, count: 100 }
      }
    ]

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProducts)
      })
    )

    renderWithProviders(<Shop />)

    await waitFor(() => {
      const quantityInput = screen.getByDisplayValue('1')
      expect(quantityInput).toBeInTheDocument()

      fireEvent.change(quantityInput, { target: { value: '5' } })
      expect(quantityInput.value).toBe('5')
    })
  })

  it('should have add to cart buttons for all products', async () => {
    const mockProducts = [
      {
        id: 1,
        title: 'Test Product 1',
        price: 99.99,
        category: 'electronics',
        description: 'A test product',
        image: 'test-image-1.jpg',
        rating: { rate: 4.5, count: 100 }
      },
      {
        id: 2,
        title: 'Test Product 2',
        price: 149.99,
        category: 'clothing',
        description: 'Another test product',
        image: 'test-image-2.jpg',
        rating: { rate: 4.0, count: 50 }
      }
    ]

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProducts)
      })
    )

    renderWithProviders(<Shop />)

    await waitFor(() => {
      const addToCartButtons = screen.getAllByText('Add to Cart')
      expect(addToCartButtons).toHaveLength(2)
    })
  })

  it('should display product descriptions', async () => {
    const mockProducts = [
      {
        id: 1,
        title: 'Test Product 1',
        price: 99.99,
        category: 'electronics',
        description: 'A test product description',
        image: 'test-image-1.jpg',
        rating: { rate: 4.5, count: 100 }
      }
    ]

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProducts)
      })
    )

    renderWithProviders(<Shop />)

    await waitFor(() => {
      expect(screen.getByText('A test product description')).toBeInTheDocument()
    })
  })
})
