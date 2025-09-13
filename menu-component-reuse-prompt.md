# Reusable Navigation Menu Component Prompt

Create a modern, glassmorphic navigation menu component for a Next.js + TypeScript + Tailwind CSS project with the following features:

## Required Features
1. **Logo** - Brand logo on the left side
2. **Search** - Search functionality with input field
3. **Night Mode Toggle** - Dark/light theme switcher
4. **Sign-in Button** - Authentication sign-in button
5. **Register Button** - User registration button

## Component Specifications

### Technical Requirements
- **Framework**: Next.js 14+ with TypeScript
- **Styling**: Tailwind CSS with glassmorphic design
- **Icons**: Lucide React icons
- **Responsive**: Mobile-first design with hamburger menu
- **Theme**: Support for dark/light mode switching
- **State Management**: React hooks for local state

### Design Features
- **Glassmorphic Effect**: Semi-transparent background with backdrop blur
- **Fixed Position**: Stays at top of viewport with proper z-index
- **Rounded Corners**: Modern rounded design (rounded-2xl)
- **Smooth Animations**: Hover effects and transitions
- **Gradient Buttons**: Eye-catching gradient backgrounds for CTAs
- **Active States**: Visual feedback for current page/section

### Layout Structure
```
[Logo] [Search Input] [Nav Links] [Night Mode] [Sign-in] [Register] [Mobile Menu]
```

### Required Dependencies
Add these to your package.json:
```bash
npm install lucide-react next@latest react@latest react-dom@latest
npm install -D tailwindcss@latest typescript@latest @types/react@latest
```

### Tailwind Configuration
Extend your `tailwind.config.ts` with these custom colors and utilities:

```typescript
// Add to theme.extend.colors
colors: {
  'primary-blue': '#3B82F6',
  'success-green': '#10B981',
  'accent-purple': '#8B5CF6',
  'light-bg': '#F9FAFB',
  'dark-bg': '#0F172A',
}

// Add custom animations
animation: {
  'float': 'float 6s ease-in-out infinite',
  'glow': 'glow 2s ease-in-out infinite alternate',
}
```

### CSS Classes to Include
Add these custom CSS classes to your globals.css:

```css
/* Glass morphism effect */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark .glass {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Smooth pill animation for active states */
.nav-pill {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Component Interface

### Props Interface
```typescript
interface NavigationProps {
  logo?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  onSignIn?: () => void;
  onRegister?: () => void;
  navItems?: NavItem[];
  className?: string;
}

interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}
```

### State Management
The component should manage:
- `activeItem`: Currently active navigation item
- `isMenuOpen`: Mobile menu visibility
- `isDark`: Dark mode state
- `searchQuery`: Search input value
- `isSearchOpen`: Search input visibility (mobile)

### Key Functions
1. **Theme Toggle**: Switch between light/dark modes with localStorage persistence
2. **Search Handler**: Process search queries and trigger callback
3. **Navigation**: Handle internal/external link navigation with smooth scrolling
4. **Mobile Menu**: Toggle mobile menu visibility
5. **Authentication**: Trigger sign-in/register callbacks

## Implementation Details

### Logo Section
- Use Next.js Image component for optimization
- Responsive sizing (larger on desktop, smaller on mobile)
- Maintain aspect ratio with `object-contain`

### Search Functionality
- Expandable search input on desktop
- Full-width search in mobile menu
- Search icon with smooth transitions
- Debounced search for performance

### Theme Toggle
- Sun/Moon icons from Lucide React
- Gradient background with hover effects
- Persist theme preference in localStorage
- Apply theme to document element

### Authentication Buttons
- Distinct styling for Sign-in vs Register
- Sign-in: Subtle glass effect
- Register: Bold gradient background
- Responsive text (icons only on small screens)

### Mobile Responsiveness
- Hamburger menu for screens < 768px
- Collapsible navigation items
- Full-width search in mobile menu
- Stacked authentication buttons

### Accessibility
- Proper ARIA labels
- Keyboard navigation support
- Focus management
- Screen reader friendly

## Styling Guidelines

### Color Scheme
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)  
- **Accent**: Purple (#8B5CF6)
- **Light Mode**: White backgrounds with subtle borders
- **Dark Mode**: Dark backgrounds with light borders

### Typography
- **Font**: Inter for body text
- **Weights**: 400 (normal), 500 (medium), 600 (semibold)
- **Sizes**: Responsive scaling (sm:text-sm, md:text-base)

### Spacing
- **Container**: max-width of 4xl (56rem)
- **Padding**: px-6 py-4 for main container
- **Gaps**: space-x-4 for horizontal, space-y-2 for vertical

### Hover Effects
- **Scale**: transform hover:scale-105 for buttons
- **Shadow**: hover:shadow-xl for depth
- **Color**: Smooth color transitions
- **Background**: Subtle background color changes

## Usage Example

```typescript
<Navigation
  logo={{
    src: "/logo.png",
    alt: "Company Logo",
    width: 64,
    height: 64
  }}
  searchPlaceholder="Search..."
  onSearch={(query) => console.log('Searching:', query)}
  onSignIn={() => router.push('/signin')}
  onRegister={() => router.push('/register')}
  navItems={[
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' }
  ]}
/>
```

## Performance Considerations
- Use `useCallback` for event handlers
- Implement debounced search
- Lazy load search results
- Optimize images with Next.js Image component
- Use CSS transforms for animations (GPU acceleration)

## Browser Support
- Modern browsers supporting CSS backdrop-filter
- Graceful fallback for older browsers
- Mobile Safari optimizations
- Chrome, Firefox, Safari, Edge compatibility

This component provides a complete, production-ready navigation solution with modern design patterns and excellent user experience across all devices.
