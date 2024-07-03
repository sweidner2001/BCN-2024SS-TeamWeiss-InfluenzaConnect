import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from '../NavBar'; // Pfad zur NavBar-Komponente

describe('NavBar Komponente', () => {
  it('rendert korrekt und zeigt Login/Signup-Buttons, wenn Benutzer nicht eingeloggt ist', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getByText('InfluenzaConnect')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Influencer Finden')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('öffnet den LoginDialog, wenn der Login-Button geklickt wird', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Login'));
    expect(screen.getByText('Login Dialog')).toBeInTheDocument();
  });

  it('zeigt Begrüßung und Logout-Button, wenn handleLoginSuccess aufgerufen wird', async () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    // Simuliere den Benutzer Login durch das Triggern des Login-Dialogs
    fireEvent.click(screen.getByText('Login'));

    // Simuliere den erfolgreichen Login durch den LoginDialog
    const loginDialog = screen.getByText('Login Dialog').parentElement;
    fireEvent.submit(loginDialog!);

    // Warte auf das Update der NavBar
    await waitFor(() => {
      expect(screen.getByText('Welcome, John')).toBeInTheDocument();
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });
  });

  it('führt Logout durch und zeigt Login/Signup-Buttons, wenn der Logout-Button geklickt wird', async () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    // Simuliere den Benutzer Login durch das Triggern des Login-Dialogs
    fireEvent.click(screen.getByText('Login'));

    // Simuliere den erfolgreichen Login durch den LoginDialog
    const loginDialog = screen.getByText('Login Dialog').parentElement;
    fireEvent.submit(loginDialog!);

    // Warte auf das Update der NavBar
    await waitFor(() => {
      expect(screen.getByText('Welcome, John')).toBeInTheDocument();
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    // Klick auf den Logout-Button
    fireEvent.click(screen.getByText('Logout'));

    // Überprüfen, ob der Benutzer nach dem Logout nicht mehr eingeloggt ist
    await waitFor(() => {
      expect(screen.queryByText('Welcome, John')).not.toBeInTheDocument();
      expect(screen.queryByText('Logout')).not.toBeInTheDocument();
      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByText('Sign Up')).toBeInTheDocument();
    });
  });
});
