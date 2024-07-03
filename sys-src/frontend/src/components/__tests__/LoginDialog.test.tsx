import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginDialog from '../login/LoginDialog';

describe('LoginDialog Komponente', () => {
  it('führt einen Login-Vorgang durch und ruft onLoginSuccess auf', async () => {
    // Mock-Funktion für onLoginSuccess
    const mockOnLoginSuccess = jest.fn();

    // rendern der LoginDialog Komponente mit erforderlichen Props
    const { getByText, getByPlaceholderText } = render(
      <LoginDialog isOpen={true} onClose={() => {}} onLoginSuccess={mockOnLoginSuccess} />
    );

    // Email- und Passwort-Felder finden und Eingaben setzen
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    // Login-Button finden und klicken
    const loginButton = getByText('Login');
    fireEvent.click(loginButton);

    // Auf erfolgreiche Anmeldung warten
    await waitFor(() => {
      expect(mockOnLoginSuccess).toHaveBeenCalled();
    });
  });

  it('zeigt Fehlermeldung an, wenn Email und/oder Passwort fehlen', async () => {
    // Mock-Funktion für onLoginSuccess
    const mockOnLoginSuccess = jest.fn();

    // rendern der LoginDialog Komponente mit erforderlichen Props
    const { getByText, getByPlaceholderText, findByText } = render(
      <LoginDialog isOpen={true} onClose={() => {}} onLoginSuccess={mockOnLoginSuccess} />
    );

    // Login-Button finden und klicken ohne Eingaben
    const loginButton = getByText('Login');
    fireEvent.click(loginButton);

    // Fehlermeldungen für Email und Passwort finden
    const emailError = await findByText('Email is required');
    const passwordError = await findByText('Password is required');

    // Sicherstellen, dass Fehlermeldungen angezeigt werden
    expect(emailError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });
});
