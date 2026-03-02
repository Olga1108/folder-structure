import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from './App';

const mockFileStructure = {
  root: {
    movies: {
      type: 'folder',
      children: {
        Avengers: { type: 'folder', children: { 'Infinity War': { type: 'file' } } },
        'Iron Man': { type: 'file' }
      }
    }
  }
};

function renderWithRouter(initialEntries = ['/']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AppRoutes />
    </MemoryRouter>
  );
}

describe('App routing and NotFound', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockFileStructure)
      })
    ));
  });

  it('shows NotFound for unknown route', async () => {
    renderWithRouter(['/unknown-page']);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to file structure/i })).toBeInTheDocument();
  });

  it('shows "Folder not found" for invalid folder path', async () => {
    renderWithRouter(['/browse/movies/nonexistent-folder']);

    expect(await screen.findByText('Folder not found')).toBeInTheDocument();
  });

  it('shows FileTree for valid /browse route', async () => {
    renderWithRouter(['/browse']);

    expect(await screen.findByText('movies')).toBeInTheDocument();
  });
});
