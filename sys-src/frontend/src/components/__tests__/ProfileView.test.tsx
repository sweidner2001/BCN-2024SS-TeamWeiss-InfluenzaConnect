import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import ProfileView from '../pages/ProfileView';

// Mock für fetch API
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('ProfileView Komponente', () => {
  beforeEach(() => {
    // Mock-Daten für fetch und sessionEmail setzen
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ email: 'test@example.com' }),
    }).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        title: 'Mr',
        first_name: 'John',
        last_name: 'Doe',
        instagram_username: 'johndoe',
        language: 'Englisch',
        about_me: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      }),
    });

    render(<ProfileView />);
  });

  it('rendert die ProfileView Komponente korrekt und lädt Daten', async () => {
    // Überprüfen, dass "Loading..." angezeigt wird, während Daten geladen werden
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Auf die Auflösung des Ladezustands warten
    await waitFor(() => {
      expect(screen.getByText('Public')).toBeInTheDocument(); // Annahme: Text "Public" erscheint nach dem Laden
    });

    // Überprüfen, dass die Daten korrekt geladen und angezeigt werden
    expect(screen.getByText('Mr')).toBeInTheDocument();
    expect(screen.getByLabelText('Vorname')).toHaveValue('John');
    expect(screen.getByLabelText('Nachname')).toHaveValue('Doe');
    expect(screen.getByLabelText('Instagram Benutzername')).toHaveValue('johndoe');
    expect(screen.getByLabelText('Sprache')).toHaveValue('Englisch');
    expect(screen.getByLabelText('Über mich')).toHaveValue('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  });

  it('ändert die Datenkarte beim Klicken auf die Tabs', async () => {
    // Klick auf den "Public" Tab
    fireEvent.click(screen.getByText('Public'));

    // Auf die Aktualisierung der Datenkarte warten
    await waitFor(() => {
      expect(screen.getByText('Public Data')).toBeInTheDocument();
    });

    // Klick auf den "Analytics" Tab
    fireEvent.click(screen.getByText('Analytics'));

    // Überprüfen, dass der Placeholder für die Analytics-Ansicht angezeigt wird
    expect(screen.getByText('Analytics View Placeholder')).toBeInTheDocument();
  });

  it('ruft die handleSave Funktion auf und aktualisiert die Daten', async () => {
    // Klick auf den "Edit" Button auf der PrivateDataCard, um den Editiermodus zu aktivieren
    fireEvent.click(screen.getByText('Bearbeiten'));

    // Änderungen in den Editierfeldern vornehmen
    fireEvent.change(screen.getByLabelText('Anrede'), { target: { value: 'Mrs' } });

    // Klick auf den "Speichern" Button
    fireEvent.click(screen.getByText('Speichern'));

    // Auf die Aktualisierung der Daten warten
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1); // Annahme: Ein API-Aufruf für die Aktualisierung der Daten
    });

    // Überprüfen, dass die aktualisierten Daten korrekt angezeigt werden
    expect(screen.getByText('Mrs')).toBeInTheDocument(); // Annahme: Anrede wurde auf "Mrs" geändert
  });
});
