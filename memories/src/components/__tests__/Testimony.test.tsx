import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Testimony } from '../Testimony';

const baseMarker = {
  title: 'Paris (2)',
  testimonies: [],
};

describe('Testimony component', () => {
  it('renders title, text, genre and date', () => {
    const testimonies = [{ text: 'Un témoignage', genre: 'F', date: '2024-01-01' }];

    render(
      <Testimony
        marker={{ ...baseMarker, testimonies }}
        currentIdx={0}
        testimonies={testimonies}
        onPrev={vi.fn()}
        onNext={vi.fn()}
      />
    );

    expect(screen.getByText('Paris (2)')).toBeInTheDocument();
    expect(screen.getByText('Un témoignage')).toBeInTheDocument();
    expect(screen.getByText('F')).toBeInTheDocument();
    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
  });

  it('shows navigation buttons when multiple testimonies and updates on click', () => {
    const testimonies = [
      { text: 'Témoignage 1', genre: 'M', date: '2023-01-01' },
      { text: 'Témoignage 2', genre: 'F', date: '2024-02-02' },
    ];

    const onPrev = vi.fn();
    const onNext = vi.fn();

    render(
      <Testimony
        marker={{ ...baseMarker, testimonies }}
        currentIdx={0}
        testimonies={testimonies}
        onPrev={onPrev}
        onNext={onNext}
      />
    );

    const prevBtn = screen.getByRole('button', { name: 'Précédent' });
    const nextBtn = screen.getByRole('button', { name: 'Suivant' });
    expect(prevBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();

    fireEvent.click(nextBtn);
    expect(onNext).toHaveBeenCalledTimes(1);
    fireEvent.click(prevBtn);
    expect(onPrev).toHaveBeenCalledTimes(1);

    expect(screen.getByText('Témoignage 1 / 2')).toBeInTheDocument();
  });

  it('hides navigation when only one testimony', () => {
    const testimonies = [
      { text: 'Unique', genre: 'F', date: '2024-01-01', theme: ['theme 1', 'theme 2'] },
    ];

    render(
      <Testimony
        marker={{ ...baseMarker, testimonies }}
        currentIdx={0}
        testimonies={testimonies}
        onPrev={vi.fn()}
        onNext={vi.fn()}
      />
    );

    expect(screen.queryByRole('button', { name: 'Précédent' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Suivant' })).toBeNull();
  });

  it('renders themes list when provided', () => {
    const testimonies = [
      { text: 'Texte', genre: 'F', date: '2024-01-01', theme: ['emploi', 'papiers'] },
    ];

    render(
      <Testimony
        marker={{ ...baseMarker, testimonies }}
        currentIdx={0}
        testimonies={testimonies}
        onPrev={vi.fn()}
        onNext={vi.fn()}
      />
    );

    expect(screen.getByText('Le témoignage porte sur les thèmes suivants :')).toBeInTheDocument();
    expect(screen.getByText('emploi')).toBeInTheDocument();
    expect(screen.getByText('papiers')).toBeInTheDocument();
  });
});
