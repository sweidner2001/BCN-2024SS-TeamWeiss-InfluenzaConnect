import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import PrivateDataCard from '../cards/PrivateDataCard';
import{act} from 'react';

// Mock für onSave Funktion
const mockOnSave = jest.fn();

describe('PrivateDataCard Component', () => {
  beforeEach(() => {
    // Mock für userData
    const userData = {
      phone: '123456789',
      email: 'test@example.com',
    };

    render(<PrivateDataCard userData={userData} onSave={mockOnSave} />);
  });

  it('renders PrivateDataCard component correctly', () => {
    // Überprüfen, dass die Überschrift "Private Data" vorhanden ist
    expect(screen.getByText('Private Data')).toBeInTheDocument();

    // Überprüfen, dass die Labels und initialen Werte der Editierfelder korrekt sind
    expect(screen.getByLabelText('Phone')).toHaveValue('123456789');
    expect(screen.getByLabelText('Email')).toHaveValue('test@example.com');
  });

  it('allows editing when clicking Edit button', () => {
    // Klick auf den "Edit" Button
    fireEvent.click(screen.getByText('Edit'));

    // Überprüfen, dass die Editierfelder jetzt editierbar sind
    expect(screen.getByLabelText('Phone')).toBeEnabled();
    expect(screen.getByLabelText('Email')).toBeEnabled();
  });

  it('disables editing when clicking Stop Editing button', () => {
    // Klick auf den "Edit" Button, um den Editiermodus zu aktivieren
    fireEvent.click(screen.getByText('Edit'));

    // Klick auf den "Stop Editing" Button
    fireEvent.click(screen.getByText('Stop Editing'));

    // Überprüfen, dass die Editierfelder jetzt deaktiviert sind
    expect(screen.getByLabelText('Phone')).toBeDisabled();
    expect(screen.getByLabelText('Email')).toBeDisabled();
  });

  it('calls onSave function when Save button is clicked', () => {
    // Klick auf den "Edit" Button, um den Editiermodus zu aktivieren
    fireEvent.click(screen.getByText('Edit'));

    // Änderungen in den Editierfeldern vornehmen
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '987654321' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'updated@example.com' } });

    // Klick auf den "Save" Button
    fireEvent.click(screen.getByText('Save'));

    // Überprüfen, dass onSave mit den aktualisierten Daten aufgerufen wurde
    expect(mockOnSave).toHaveBeenCalledWith({
      phone: '987654321',
      email: 'updated@example.com',
      password: '', // Password sollte nicht geändert worden sein
    });

    // Überprüfen, dass der Editiermodus nach dem Speichern deaktiviert ist
    expect(screen.getByLabelText('Phone')).toBeDisabled();
    expect(screen.getByLabelText('Email')).toBeDisabled();
  });

  it('opens PasswordChangeDialog when Change Password button is clicked', () => {
    // Klick auf den "Change Password" Button
    fireEvent.click(screen.getByText('Change Password'));

    // Überprüfen, dass der Passwortänderungsdialog geöffnet wird
    expect(screen.getByText('Change Password Dialog')).toBeInTheDocument(); // Annahme: Dialog hat einen eindeutigen Text

    // Hier könnten weitere Tests für den Passwortänderungsdialog durchgeführt werden
  });
});
