# Technical Context: Barangay Online Services

## Technology Stack

### Frontend Framework

- **Next.js 15.2.2** - React framework with App Router for server-side rendering, routing, and API functionality
- **React 19.0.0** - UI library for component-based development
- **TypeScript** - For type-safe code and improved developer experience

### Styling

- **Tailwind CSS 4.0.14** - Utility-first CSS framework
- **tailwindcss-animate** - Animation utilities for Tailwind
- **clsx & tailwind-merge** - For conditional class name composition
- **Geist** - Font family from Vercel for modern typography

### UI Components

- **ShadCN** - Component library (implied in project brief, not yet implemented in dependencies)
- **Lucide React** - Icon library
- **Sonner** - Toast notifications

### Development Tools

- **ESLint 9** - For code linting and enforcing code standards
- **TypeScript 5** - For static type checking
- **Turbopack** - For faster development builds (used with `--turbopack` flag)

## Development Environment

### Local Development

- **Development Server**: `npm run dev --turbopack`
- **Build**: `npm run build`
- **Production Start**: `npm run start`
- **Linting**: `npm run lint`

### Browser Support

- Modern browsers with support for ES6+ features
- Responsive design for mobile and desktop devices

## Technical Constraints

### Frontend-Only Scope

- This project is focused solely on frontend development
- Backend services are integrated through RESTful API endpoints
- JWT-based authentication for secure communication

### Performance Considerations

- Optimize for varying internet connectivity in the Philippines
- Consider low-end device performance for rural areas
- Implement lazy loading and code splitting for faster initial load times

### Accessibility Requirements

- Must be usable by residents with varying levels of technical proficiency
- Should follow WCAG guidelines for accessibility
- Support for screen readers and keyboard navigation

### Responsive Design

- Must work seamlessly on mobile devices, tablets, and desktops
- Consider offline capabilities or graceful degradation for areas with poor connectivity

## Dependencies

### Core Dependencies

```json
{
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "lucide-react": "^0.482.0",
  "next": "15.2.2",
  "postcss": "^8.5.3",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "tailwind-merge": "^3.0.2",
  "tailwindcss-animate": "^1.0.7",
  "zod": "^3.22.4",
  "sonner": "^1.4.3"
}
```

### Development Dependencies

```json
{
  "@eslint/eslintrc": "^3",
  "@tailwindcss/postcss": "^4.0.14",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "eslint": "^9",
  "eslint-config-next": "15.2.2",
  "tailwindcss": "^4.0.14",
  "typescript": "^5"
}
```

## Current Technical Considerations

### Authentication

- JWT-based authentication implemented with refresh token mechanism
- Custom useApiFetch hook for API integration
- Form validation using Zod schema
- Protected routes implementation in progress
- Role-based access control planned for user/admin interfaces
- Token storage and refresh handling

### Form Handling

- Using Zod for form validation and type safety
- Controlled form components with immediate validation
- Error handling with toast notifications
- Form submission with loading states

### Data Management

- Using React's built-in state management with hooks
- Custom hooks for API integration and data fetching
- Plan to implement React Context for global state if needed

### API Integration

- Custom useApiFetch hook for API requests
- Error handling and response parsing
- Loading states and optimistic updates
- Type-safe API responses

### Notifications

- Implemented toast notifications using Sonner
- Loading states for form submissions
- Error feedback for validation and API errors

## Development Practices

### Code Organization

- Feature-based folder structure
- Reusable components in shared directories
- Consistent naming conventions
- Type-safe code with TypeScript

### Performance Optimization

- Next.js Image component for optimized images
- Code splitting and lazy loading
- Minimizing client-side JavaScript
- Efficient form validation with Zod

### Testing Strategy

- Component testing with React Testing Library
- End-to-end testing with Cypress or Playwright
- Accessibility testing with axe-core

### Deployment Considerations

- Vercel deployment for Next.js applications
- Environment configuration for different deployment stages
- Continuous integration and deployment pipelines
