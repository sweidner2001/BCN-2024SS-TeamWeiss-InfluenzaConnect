import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginDropDownMenu from '../login/DropdownMenu';

describe('LoginDropDownMenu Komponente', () => {
  it('zeigt das Dropdown-Menü an und führt einen Login durch', async () => {
    const { getByText, getByPlaceholderText } = render(
      <LoginDropDownMenu name="Login">
        <div>Test Children</div>
      </LoginDropDownMenu>
    );

    // Dropdown-Button finden und darauf klicken, um das Dropdown-Menü zu öffnen
    const dropdownButton = getByText('Login');
    fireEvent.mouseEnter(dropdownButton);

    // Email- und Passwort-Felder finden
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    // Eingaben in die Felder setzen
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    // Login-Button finden und darauf klicken, um den Login-Vorgang zu starten
    const loginButton = getByText('Login');
    fireEvent.click(loginButton);

    // Auf die Rückmeldung warten (z.B. alert mit JSON.stringify(data))
    await waitFor(() => {
      const alertMessage = 'Anmeldung erfolgreich';
      expect(window.alert).toHaveBeenCalledWith(alertMessage);
    });
  });

  
});
