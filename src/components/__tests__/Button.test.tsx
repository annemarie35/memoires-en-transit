import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByTestId('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies primary variant styles by default', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByTestId('button');
    expect(button.className).toContain('bg-blue-100');
  });

  it('applies secondary variant styles when specified', () => {
    render(<Button variant="secondary">Click me</Button>);
    const button = screen.getByTestId('button');
    expect(button.className).toContain('bg-gray-50');
  });

  it('applies correct size styles', () => {
    render(<Button size="large">Click me</Button>);
    const button = screen.getByTestId('button');
    expect(button.className).toContain('text-lg');
  });

  it('disables the button when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByTestId('button')).toBeDisabled();
  });
}); 