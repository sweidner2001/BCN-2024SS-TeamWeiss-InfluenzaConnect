import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Signup from '../pages/Signup';

// Jest-Mock für die fetch API
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Jest-Mock für useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Anmeldeprozess', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sollte den Anmeldeprozess erfolgreich abschließen', async () => {
    // Mocken der fetch-Antworten
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    }).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });

    render(<Signup />);

    // Schritt 1: Formular 1 ausfüllen
    fireEvent.change(screen.getByLabelText(/Vorname/i), { target: { value: 'Max' } });
    fireEvent.change(screen.getByLabelText(/Nachname/i), { target: { value: 'Mustermann' } });
    fireEvent.change(screen.getByLabelText(/E-Mail/i), { target: { value: 'max.mustermann@example.com' } });
    fireEvent.change(screen.getByLabelText(/Passwort/i), { target: { value: 'pass1234' } });
    fireEvent.click(screen.getByText(/Weiter/i));

    // Header nach Formular 1 überprüfen
    await waitFor(() => {
      expect(screen.getByText(/InfluenzaConnect/i)).toBeInTheDocument();
    });

    // Schritt 2: Formular 2 ausfüllen
    fireEvent.change(screen.getByLabelText(/Geburtsdatum/i), { target: { value: '1990-01-01' } });
    fireEvent.change(screen.getByLabelText(/Wohnort/i), { target: { value: 'Berlin' } });
    fireEvent.change(screen.getByLabelText(/Telefonnummer/i), { target: { value: '+49123456789' } });
    fireEvent.click(screen.getByText(/Weiter/i));

    // Header nach Formular 2 überprüfen
    await waitFor(() => {
      expect(screen.getByText(/Fast fertig!/i)).toBeInTheDocument();
    });

    // Schritt 3: Formular 3 ausfüllen und absenden
    fireEvent.change(screen.getByLabelText(/Interessen/i), { target: { value: 'Sport, Musik' } });
    fireEvent.click(screen.getByText(/Registrieren/i));

    // Überprüfen, ob der API-Aufruf und die Weiterleitung korrekt erfolgen
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(2); // Annahme: 2 fetch-Aufrufe: signup und set_session
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:5001/signup', expect.any(Object));
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:5001/set_session', expect.any(Object));
    });

    // Navigation zur Profilansicht überprüfen
    expect(screen.getByText(/Profilansicht/i)).toBeInTheDocument();
  });
});
