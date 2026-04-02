import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';

describe('Footer', () => {
  it('renders the project name', () => {
    render(<Footer />);
    expect(screen.getByText(/Mémoire\(s\) en transit/)).toBeInTheDocument();
  });

  it('renders a link to the source code', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: 'Code source' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://github.com/annemarie35/memoires-en-transit');
  });

  it('renders the current year', () => {
    render(<Footer />);
    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
  });
});
