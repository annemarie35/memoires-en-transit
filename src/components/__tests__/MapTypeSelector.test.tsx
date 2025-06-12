import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MapTypeSelector } from '../MapTypeSelector';

describe('MapTypeSelector Component', () => {
  it('renders with current type selected', () => {
    render(
      <MapTypeSelector
        currentType="streets"
        onTypeChange={() => {}}
      />
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('streets');
  });

  it('calls onTypeChange when selection changes', () => {
    const handleChange = vi.fn();
    render(
      <MapTypeSelector
        currentType="streets"
        onTypeChange={handleChange}
      />
    );
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'satellite' } });
    
    expect(handleChange).toHaveBeenCalledWith('satellite');
  });

  it('displays all map type options', () => {
    render(
      <MapTypeSelector
        currentType="streets"
        onTypeChange={() => {}}
      />
    );
    
    expect(screen.getByText('Rues')).toBeInTheDocument();
    expect(screen.getByText('Satellite')).toBeInTheDocument();
    expect(screen.getByText('Terrain')).toBeInTheDocument();
  });
}); 