import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ChangePasswordDialog from '../ChangePasswordDialog';

// Mock-Funktion für den onSubmit Prop
const mockOnSubmit = jest.fn();

describe('ChangePasswordDialog Komponente', () => {
  beforeEach(() => {
    render(<ChangePasswordDialog isOpen={true} onClose={() => {}} onSubmit={mockOnSubmit} />);
  });

  it('rendert Dialog-Titel und Eingabefelder korrekt', () => {
    expect(screen.getByText('Change Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Current Password')).toBeInTheDocument();
    expect(screen.getByLabelText('New Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm New Password')).toBeInTheDocument();
  });

  it('validiert, dass neue Passwörter übereinstimmen', () => {
    fireEvent.input(screen.getByLabelText('New Password'), { target: { value: 'newpass' } });
    fireEvent.input(screen.getByLabelText('Confirm New Password'), { target: { value: 'differentpass' } });

    fireEvent.submit(screen.getByRole('button', { name: 'Change Password' }));

    expect(screen.getByText('New passwords do not match')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('ruft onSubmit mit den eingegebenen Daten auf', () => {
    fireEvent.input(screen.getByLabelText('Current Password'), { target: { value: 'currentpass' } });
    fireEvent.input(screen.getByLabelText('New Password'), { target: { value: 'newpass' } });
    fireEvent.input(screen.getByLabelText('Confirm New Password'), { target: { value: 'newpass' } });

    fireEvent.submit(screen.getByRole('button', { name: 'Change Password' }));

    expect(mockOnSubmit).toHaveBeenCalledWith('currentpass', 'newpass');
  });

  it('setzt die Formularfelder nach dem Absenden zurück', () => {
    fireEvent.input(screen.getByLabelText('Current Password'), { target: { value: 'currentpass' } });
    fireEvent.input(screen.getByLabelText('New Password'), { target: { value: 'newpass' } });
    fireEvent.input(screen.getByLabelText('Confirm New Password'), { target: { value: 'newpass' } });

    fireEvent.submit(screen.getByRole('button', { name: 'Change Password' }));

    expect(screen.getByLabelText('Current Password')).toHaveValue('');
    expect(screen.getByLabelText('New Password')).toHaveValue('');
    expect(screen.getByLabelText('Confirm New Password')).toHaveValue('');
  });

  it('schließt den Dialog bei Klick auf Abbrechen', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
