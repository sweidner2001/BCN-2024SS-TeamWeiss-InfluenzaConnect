import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Signup from '../pages/Signup';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
//ich konnte den Fehler nicht
//  console.error
//Warning: `ReactDOMTestUtils.act` is deprecated in favor of `React.act`. Import `act` from `react` instead of `react-dom/test-utils`. See https://react.dev/warnings/react-dom-test-utils for more info.

// Wrapper-Komponente für den Routing-Kontext
const RouterWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

describe('Signup Component', () => {
  it('renders initial form and navigates through steps', async () => {
    await act(async () => {
      render(<Signup />, { wrapper: RouterWrapper });
    });

    // Das erste Formular sollte gerendert werden
    const headingElement = screen.getByText(/Registrierung InfluenzaConnect/i);
    expect(headingElement).toBeInTheDocument();

    // Simuliere das Ausfüllen des ersten Formulars und Klicken auf "Weiter"
    fireEvent.change(screen.getByLabelText(/Vorname/i), { target: { value: 'Max' } });
    fireEvent.change(screen.getByLabelText(/Nachname/i), { target: { value: 'Mustermann' } });
    fireEvent.click(screen.getByText('Weiter'));

    // Überprüfe, ob das zweite Formular nach der Navigation gerendert wird
    const secondFormHeading = await screen.findByText(/Weitere Informationen/i);
    expect(secondFormHeading).toBeInTheDocument();

    // Simuliere das Ausfüllen des zweiten Formulars und Klicken auf "Weiter"
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'max.mustermann@example.com' } });
    fireEvent.click(screen.getByText('Weiter'));

    // Überprüfe, ob das dritte Formular nach der Navigation gerendert wird
    const thirdFormHeading = await screen.findByText(/Passwort/i);
    expect(thirdFormHeading).toBeInTheDocument();

    // Simuliere das Ausfüllen des dritten Formulars und Klicken auf "Registrieren"
    fireEvent.change(screen.getByLabelText(/Passwort/i), { target: { value: 'securePassword123' } });
    fireEvent.click(screen.getByText('Registrieren'));

    // Du kannst hier weitere Assertions hinzufügen, um die erfolgreiche Übermittlung oder ein anderes Verhalten zu überprüfen
    // Zum Beispiel kannst du eine Erfolgsmeldung überprüfen oder die Navigation zu einer anderen Seite
  });

  it('allows navigating back through steps', async () => {
    await act(async () => {
      render(<Signup />, { wrapper: RouterWrapper });
    });

    // Simuliere die Navigation zum zweiten Formular
    fireEvent.change(screen.getByLabelText(/Vorname/i), { target: { value: 'Max' } });
    fireEvent.change(screen.getByLabelText(/Nachname/i), { target: { value: 'Mustermann' } });
    fireEvent.click(screen.getByText('Weiter'));

    // Simuliere die Navigation zum dritten Formular
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'max.mustermann@example.com' } });
    fireEvent.click(screen.getByText('Weiter'));

    // Simuliere das Zurückgehen zum zweiten Formular
    fireEvent.click(screen.getByText('Zurück'));

    // Überprüfe, ob wir wieder im zweiten Formular sind
    const secondFormHeading = await screen.findByText(/Weitere Informationen/i);
    expect(secondFormHeading).toBeInTheDocument();

    // Simuliere das Zurückgehen zum ersten Formular
    fireEvent.click(screen.getByText('Zurück'));

    // Überprüfe, ob wir wieder im ersten Formular sind
    const firstFormHeading = await screen.findByText(/Registrierung InfluenzaConnect/i);
    expect(firstFormHeading).toBeInTheDocument();
  });
});
