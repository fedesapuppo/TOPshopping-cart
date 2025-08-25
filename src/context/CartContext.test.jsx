import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { CartProvider, useCart } from './CartContext'

// Test component to use the cart context
function TestComponent() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartCount,
    getCartTotal,
    clearCart
  } = useCart()

  return (
    <div>
      <div data-testid="cart-count">Count: {getCartCount()}</div>
      <div data-testid="cart-total">Total: ${getCartTotal()}</div>
      <div data-testid="cart-items">
        {cartItems.map(item => (
          <div key={item.id} data-testid={`item-${item.id}`}>
            {item.title} x{item.quantity}
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
          </div>
        ))}
      </div>
      <button onClick={() => addToCart({ id: 1, title: 'Test Product', price: 10 })}>
        Add Product
      </button>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  )
}

describe('CartContext', () => {
  beforeEach(() => {
    // Clear cart before each test
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
  })

  it('should initialize with empty cart', () => {
    expect(screen.getByTestId('cart-count')).toHaveTextContent('Count: 0')
    expect(screen.getByTestId('cart-total')).toHaveTextContent('Total: $0')
  })

  it('should add product to cart', () => {
    fireEvent.click(screen.getByText('Add Product'))

    expect(screen.getByTestId('cart-count')).toHaveTextContent('Count: 1')
    expect(screen.getByTestId('cart-total')).toHaveTextContent('Total: $10')
    expect(screen.getByTestId('item-1')).toBeInTheDocument()
  })

  it('should add multiple quantities of the same product', () => {
    fireEvent.click(screen.getByText('Add Product'))
    fireEvent.click(screen.getByText('Add Product'))

    expect(screen.getByTestId('cart-count')).toHaveTextContent('Count: 2')
    expect(screen.getByTestId('cart-total')).toHaveTextContent('Total: $20')
    expect(screen.getByTestId('item-1')).toHaveTextContent('Test Product x2')
  })

  it('should remove product from cart', () => {
    fireEvent.click(screen.getByText('Add Product'))
    expect(screen.getByTestId('cart-count')).toHaveTextContent('Count: 1')

    fireEvent.click(screen.getByText('Remove'))
    expect(screen.getByTestId('cart-count')).toHaveTextContent('Count: 0')
    expect(screen.getByTestId('cart-total')).toHaveTextContent('Total: $0')
  })

  it('should update product quantity', () => {
    fireEvent.click(screen.getByText('Add Product'))
    expect(screen.getByTestId('item-1')).toHaveTextContent('Test Product x1')

    fireEvent.click(screen.getByText('+'))
    expect(screen.getByTestId('item-1')).toHaveTextContent('Test Product x2')
    expect(screen.getByTestId('cart-count')).toHaveTextContent('Count: 2')

    fireEvent.click(screen.getByText('-'))
    expect(screen.getByTestId('item-1')).toHaveTextContent('Test Product x1')
    expect(screen.getByTestId('cart-count')).toHaveTextContent('Count: 1')
  })

  it('should remove product when quantity reaches 0', () => {
    fireEvent.click(screen.getByText('Add Product'))
    expect(screen.getByTestId('cart-count')).toHaveTextContent('Count: 1')

    fireEvent.click(screen.getByText('-'))
    expect(screen.getByTestId('cart-count')).toHaveTextContent('Count: 0')
    expect(screen.queryByTestId('item-1')).not.toBeInTheDocument()
  })

  it('should clear entire cart', () => {
    fireEvent.click(screen.getByText('Add Product'))
    fireEvent.click(screen.getByText('Add Product'))
    expect(screen.getByTestId('cart-count')).toHaveTextContent('Count: 2')

    fireEvent.click(screen.getByText('Clear Cart'))
    expect(screen.getByTestId('cart-count')).toHaveTextContent('Count: 0')
    expect(screen.getByTestId('cart-total')).toHaveTextContent('Total: $0')
  })
})
