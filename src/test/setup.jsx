import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock next-themes since it's not needed in tests
vi.mock('next-themes', () => ({
  useTheme: () => ({
    resolvedTheme: 'light',
    setTheme: vi.fn(),
    forcedTheme: null
  }),
  ThemeProvider: ({ children }) => children
}))

// Mock react-router-dom to avoid testing router directly
vi.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => children,
  Routes: ({ children }) => children,
  Route: ({ element }) => element,
  Link: ({ children, to, ...props }) => (
    <a href={to} {...props}>{children}</a>
  )
}))
