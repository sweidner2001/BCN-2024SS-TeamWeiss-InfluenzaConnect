import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import PublicDataCard from '../cards/PublicDataCard';

// Mock für onSave Funktion
const mockOnSave = jest.fn();

describe('PublicDataCard Component', () => {
  beforeEach(() => {
    // Mock für userData
    const userData = {
      title: 'Mr',
      first_name: 'John',
      last_name: 'Doe',
      instagram_username: 'johndoe',
      language: 'English',
      about_me: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    };

    render(<PublicDataCard userData={userData} onSave={mockOnSave} />);
  });

  it('renders PublicDataCard component correctly', () => {
    // Überprüfen, dass die Überschrift "Public Data" vorhanden ist
    expect(screen.getByText('Public Data')).toBeInTheDocument();

    // Überprüfen, dass die Labels und initialen Werte der Editierfelder korrekt sind
    expect(screen.getByLabelText('Title')).toHaveValue('Mr');
    expect(screen.getByLabelText('First Name')).toHaveValue('John');
    expect(screen.getByLabelText('Last Name')).toHaveValue('Doe');
    expect(screen.getByLabelText('Instagram Username')).toHaveValue('johndoe');
    expect(screen.getByLabelText('Language')).toHaveValue('English');
    expect(screen.getByLabelText('About Me')).toHaveValue('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  });

  it('allows editing when clicking Edit button', () => {
    // Klick auf den "Edit" Button
    fireEvent.click(screen.getByText('Edit'));

    // Überprüfen, dass die Editierfelder jetzt editierbar sind
    expect(screen.getByLabelText('Title')).toBeEnabled();
    expect(screen.getByLabelText('First Name')).toBeEnabled();
    expect(screen.getByLabelText('Last Name')).toBeEnabled();
    expect(screen.getByLabelText('Instagram Username')).toBeEnabled();
    expect(screen.getByLabelText('Language')).toBeEnabled();
    expect(screen.getByLabelText('About Me')).toBeEnabled();
  });

  it('disables editing when clicking Stop Editing button', () => {
    // Klick auf den "Edit" Button, um den Editiermodus zu aktivieren
    fireEvent.click(screen.getByText('Edit'));

    // Klick auf den "Stop Editing" Button
    fireEvent.click(screen.getByText('Stop Editing'));

    // Überprüfen, dass die Editierfelder jetzt deaktiviert sind
    expect(screen.getByLabelText('Title')).toBeDisabled();
    expect(screen.getByLabelText('First Name')).toBeDisabled();
    expect(screen.getByLabelText('Last Name')).toBeDisabled();
    expect(screen.getByLabelText('Instagram Username')).toBeDisabled();
    expect(screen.getByLabelText('Language')).toBeDisabled();
    expect(screen.getByLabelText('About Me')).toBeDisabled();
  });

  it('calls onSave function when Save button is clicked', () => {
    // Klick auf den "Edit" Button, um den Editiermodus zu aktivieren
    fireEvent.click(screen.getByText('Edit'));

    // Änderungen in den Editierfeldern vornehmen
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Mrs' } });
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Smith' } });
    fireEvent.change(screen.getByLabelText('Instagram Username'), { target: { value: 'janesmith' } });
    fireEvent.change(screen.getByLabelText('Language'), { target: { value: 'German' } });
    fireEvent.change(screen.getByLabelText('About Me'), { target: { value: 'Updated about me text.' } });

    // Klick auf den "Save" Button
    fireEvent.click(screen.getByText('Save'));

    // Überprüfen, dass onSave mit den aktualisierten Daten aufgerufen wurde
    expect(mockOnSave).toHaveBeenCalledWith({
      title: 'Mrs',
      first_name: 'Jane',
      last_name: 'Smith',
      instagram_username: 'janesmith',
      language: 'German',
      about_me: 'Updated about me text.',
    });

    // Überprüfen, dass der Editiermodus nach dem Speichern deaktiviert ist
    expect(screen.getByLabelText('Title')).toBeDisabled();
    expect(screen.getByLabelText('First Name')).toBeDisabled();
    expect(screen.getByLabelText('Last Name')).toBeDisabled();
    expect(screen.getByLabelText('Instagram Username')).toBeDisabled();
    expect(screen.getByLabelText('Language')).toBeDisabled();
    expect(screen.getByLabelText('About Me')).toBeDisabled();
  });
});
