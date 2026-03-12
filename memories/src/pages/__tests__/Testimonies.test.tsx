import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Testimonies } from '../Testimonies';
import { getTestimonies } from '../../infrastructure/get-testimonies';

const makeTestimony = (i: number) => ({
  id: i,
  testimony: `Texte ${i}`,
  genre: 'F',
  testimonyDate: '2024-01-01',
  testimonyCity: `Ville ${i}`,
  date: '2024-01-01',
  testimonyLocation: [48.8566, 2.3522] as [number, number],
  testimonyDepartment: '75',
  birthDate: '1985',
  birthPlace: 'France',
  testifyingFor: '',
  testimonyConcern: '',
});

const SINGLE = [makeTestimony(1)];
const TWELVE = Array.from({ length: 12 }, (_, i) => makeTestimony(i + 1));

vi.mock('../../infrastructure/get-testimonies', () => ({
  getTestimonies: vi.fn(),
}));

const renderPage = () => render(<MemoryRouter><Testimonies /></MemoryRouter>);
const waitForList = () => waitFor(() => expect(screen.getByTestId('list')).toBeInTheDocument());

describe('Testimonies Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (getTestimonies as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(SINGLE);
  });

  it('shows loading then renders list with count', async () => {
    renderPage();
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    await waitForList();
    expect(screen.getByTestId('count')).toHaveTextContent('1 témoignage(s)');
    expect(screen.getByText('Ville 1')).toBeInTheDocument();
    expect(screen.getByText('Texte 1')).toBeInTheDocument();
  });

  it('shows error when service fails', async () => {
    (getTestimonies as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('fail')
    );
    renderPage();
    await waitFor(() => expect(screen.getByTestId('error')).toBeInTheDocument());
    expect(screen.getByTestId('error')).toHaveTextContent('Impossible de charger les témoignages');
  });

  describe('pagination', () => {
    beforeEach(() => {
      (getTestimonies as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(TWELVE);
    });

    it('shows only 10 items on first page by default', async () => {
      renderPage();
      await waitForList();
      expect(screen.getAllByText(/^Texte \d+$/).length).toBe(10);
      expect(screen.queryByText('Texte 11')).not.toBeInTheDocument();
    });

    it('shows pagination controls when there are more than 10 items', async () => {
      renderPage();
      await waitForList();
      expect(screen.getByText('Suivant')).toBeInTheDocument();
      expect(screen.getByText('Précédent')).toBeInTheDocument();
    });

    it('navigates to next page on Suivant click', async () => {
      renderPage();
      await waitForList();
      fireEvent.click(screen.getByText('Suivant'));
      expect(screen.getByText('Texte 11')).toBeInTheDocument();
      expect(screen.getByText('Texte 12')).toBeInTheDocument();
      expect(screen.queryByText('Texte 1')).not.toBeInTheDocument();
    });

    it('navigates back to previous page on Précédent click', async () => {
      renderPage();
      await waitForList();
      fireEvent.click(screen.getByText('Suivant'));
      fireEvent.click(screen.getByText('Précédent'));
      expect(screen.getByText('Texte 1')).toBeInTheDocument();
      expect(screen.queryByText('Texte 11')).not.toBeInTheDocument();
    });

    it('disables Précédent on first page', async () => {
      renderPage();
      await waitForList();
      expect(screen.getByText('Précédent')).toBeDisabled();
    });

    it('disables Suivant on last page', async () => {
      renderPage();
      await waitForList();
      fireEvent.click(screen.getByText('Suivant'));
      expect(screen.getByText('Suivant')).toBeDisabled();
    });

    it('navigates to a specific page by clicking its number', async () => {
      renderPage();
      await waitForList();
      fireEvent.click(screen.getByText('2'));
      expect(screen.getByText('Texte 11')).toBeInTheDocument();
    });

    it('shows all items when "Tous" is selected', async () => {
      renderPage();
      await waitForList();
      fireEvent.change(screen.getByLabelText('Afficher par page :'), { target: { value: 'all' } });
      expect(screen.getAllByText(/^Texte \d+$/).length).toBe(12);
      expect(screen.queryByText('Suivant')).not.toBeInTheDocument();
    });

    it('resets to page 1 when changing page size', async () => {
      renderPage();
      await waitForList();
      fireEvent.click(screen.getByText('Suivant'));
      fireEvent.change(screen.getByLabelText('Afficher par page :'), { target: { value: '25' } });
      expect(screen.getByText('Texte 1')).toBeInTheDocument();
    });
  });
});
