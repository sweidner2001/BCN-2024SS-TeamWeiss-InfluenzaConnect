import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/Landing';
import { act } from 'react'; 
describe('LandingPage Component', () => {
  beforeEach(() => {
    act(() => {
      render(
        <BrowserRouter>
          <LandingPage />
        </BrowserRouter>
      );
    });
  });

  it('renders LandingPage component correctly', () => {
    // Überprüfen der statischen Texte
    expect(screen.getByText('InfluenzaConnect')).toBeInTheDocument();
    expect(screen.getByText('Welcome to InfluenzaConnect')).toBeInTheDocument();
    expect(screen.getByText('Your strategic partner in influencer marketing. Connecting brands with the right influencers seamlessly.')).toBeInTheDocument();

    // Überprüfen der Beschriftungen für die Buttons
    expect(screen.getByText('Spectator')).toBeInTheDocument();
    expect(screen.getByText('Influencer')).toBeInTheDocument();
  });

  it('buttons and links have correct behavior', async () => {
    // Klick auf Spectator card
    await act(async () => {
      userEvent.click(screen.getByText('Spectator').closest('a')!);
    });
    expect(window.location.pathname).toBe('/homepage'); 

    // Klick auf Influencer card
    await act(async () => {
      userEvent.click(screen.getByText('Influencer').closest('a')!);
    });
    expect(window.location.pathname).toBe('/signup'); 
  });
});
