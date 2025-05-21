import React from 'react';
import { render, screen } from '@testing-library/react';
import Logo from '../Logo'; // Adjust the import path based on your actual Logo component location

// Mock next/link
jest.mock('next/link', () => {
    return ({children, href}) => {
        return <a href={href}>{children}</a>;
    }
});

// Mock useThemeSwitch hook if it's used in Logo or its children
jest.mock('@/components/Hooks/useThemeSwitch', () => ({
  __esModule: true,
  default: () => ({
    mode: 'light', // Provide a default mock value
    setMode: jest.fn(),
  }),
}));

// Mock next/image
 jest.mock('next/image', () => ({
     __esModule: true,
     default: (props) => {
         // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
         return <img {...props} />;
     },
 }));


describe('Logo Component', () => {
  it('renders the logo text', () => {
    render(<Logo />);
    // Adjust the expected text if your Logo component renders something different
    // This is a basic example, you might want to check for an image, link, etc.
       const logoElement = screen.getByText(/Bréval Le FLOCH/i); // Corrected text matcher
    expect(logoElement).toBeInTheDocument();
  });

  it('renders a link to the homepage', () => {
     render(<Logo />);
     const linkElement = screen.getByRole('link');
     expect(linkElement).toHaveAttribute('href', '/');
   });
});
