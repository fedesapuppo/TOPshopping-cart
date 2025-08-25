import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { renderWithProviders } from './test/test-utils'
import App from './App'

describe('App Component', () => {
    it('should render navigation bar', () => {
    renderWithProviders(<App />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Shop')).toBeInTheDocument()
    expect(screen.getByText('Checkout')).toBeInTheDocument()
  })

  it('should display cart information', () => {
    renderWithProviders(<App />)

    expect(screen.getByText(/Cart:/)).toBeInTheDocument()
    expect(screen.getByText(/items/)).toBeInTheDocument()
  })
})
