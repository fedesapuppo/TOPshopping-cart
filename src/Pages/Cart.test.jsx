import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { renderWithProviders } from '../test/test-utils'
import Cart from './Cart'

describe('Cart Page', () => {
  it('should render empty cart message when no items', () => {
    renderWithProviders(<Cart />)

    expect(screen.getByText('Your Cart is Empty')).toBeInTheDocument()
    expect(screen.getByText('Start Shopping')).toBeInTheDocument()
  })
})
