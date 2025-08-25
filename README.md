# 🛒 TOP Shopping Cart

Yet another one of The Odin Project’s projects 😊

This time, an e-commerce shopping cart application built with React, Chakra UI, and Vite. Features dark/light mode interface, real-time cart management, and integration with the FakeStore API. Live and deployed on Vercel.

![React](https://img.shields.io/badge/React-18.0.0-blue.svg)
![Chakra UI](https://img.shields.io/badge/Chakra%20UI-3.0.0-purple.svg)
![Vite](https://img.shields.io/badge/Vite-5.0.0-yellow.svg)
![Testing](https://img.shields.io/badge/Testing-Vitest%20+%20RTL-green.svg)
![Live Demo](https://img.shields.io/badge/Live%20Demo-Online-brightgreen.svg)

## Quick Start
**Want to see it in action?** [View Live Demo](https://top-shopping-cart-alpha.vercel.app)

## Features

- **Modern UI/UX**: Responsive design with Chakra UI components
- **Dark/Light Mode**: Seamless theme switching with persistent preferences
- **Shopping Cart**: Cart functionality with quantity management
- **Responsive Design**: Mobile-first approach that works on all devices
- **Real-time Updates**: Live cart updates and product management
- **Fast Performance**: Built with Vite for optimal development experience
- **Comprehensive Testing**: Full test coverage with Vitest and React Testing Library
- **API Integration**: Fetches products from FakeStore API

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/TOPshopping-cart.git
cd TOPshopping-cart
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
TOPshopping-cart/
├── src/
│   ├── components/
│   │   └── ui/           # UI components (color mode, tooltips, etc.)
│   ├── context/          # React Context for cart state management
│   ├── pages/            # Main application pages
│   │   ├── Home.jsx      # Landing page with featured products
│   │   ├── Shop.jsx      # Full product catalog
│   │   └── Cart.jsx      # Shopping cart management
│   ├── test/             # Test utilities and setup
│   └── App.jsx           # Main application component
├── public/               # Static assets
└── package.json          # Project dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:ui` - Run tests with UI interface

## Key Components

### Home Page (`/`)
- Hero section with welcome message
- Feature highlights
- Featured products showcase
- Call-to-action section

### Shop Page (`/shop`)
- Complete product catalog
- Product cards with images, descriptions, and pricing
- Category badges and star ratings
- Quantity selection and add to cart functionality

### Cart Page (`/cart`)
- Shopping cart overview
- Product quantity management
- Remove items functionality
- Cart total calculation
- Checkout button

## UI Components

The application uses Chakra UI v3:

- **Navigation Bar**: Responsive navigation with cart display and theme toggle
- **Product Cards**: Interactive cards with hover effects and quantity controls
- **Color Mode**: Automatic theme switching with persistent storage
- **Responsive Grid**: Mobile-first grid system for optimal layout

## Testing

The project includes comprehensive testing setup:

- **Vitest**: Fast test runner for unit tests
- **React Testing Library**: User-centric testing utilities
- **Test Coverage**: 36 tests covering all major functionality
- **Mocked Dependencies**: Isolated testing with mocked API calls

Run tests with:
```bash
npm run test:run
```

## Configuration

### Vite Configuration
- React plugin with Fast Refresh
- Optimized build settings
- Development server configuration

### ESLint Configuration
- React-specific linting rules
- Code quality enforcement
- Consistent code style

## API Integration

The application integrates with the [FakeStore API](https://fakestoreapi.com/) to fetch:
- Product information (title, price, description, image)
- Product categories
- Product ratings

## Deployment

### Live Demo
**Live Application**: [TOP Shopping Cart](https://top-shopping-cart-alpha.vercel.app)

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel
This project is configured for easy deployment to Vercel:

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login and Deploy**:
   ```bash
   vercel login
   vercel --prod
   ```

3. **Automatic Deployments**: Once connected, every push to your main branch will automatically deploy to Vercel.

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.
