import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { SignupFormInputs2 } from '../forms/SignupFormInputs2'; // Stelle sicher, dass der Pfad korrekt ist

// Mocken des useForm Hooks
jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: jest.fn(),
}));

describe('SignupFormInputs2 Komponenten', () => {
  // Mocken des useForm Hooks mit einem Dummy-Wert
  const mockedForm = {
    register: jest.fn(),
    formState: {
      errors: {}, // Hier können ggf. Fehler simuliert werden, die getestet werden sollen
    },
  };

  beforeEach(() => {
    (useForm as any).mockReturnValue(mockedForm);

    // Rendern der Komponente
    render(<SignupFormInputs2 form2={mockedForm} />);
  });

  it('renders form inputs correctly', () => {
    // Assertions für die gerenderten Elemente
    expect(screen.getByText('Persönliche Daten')).toBeInTheDocument();
    expect(screen.getByLabelText('Anrede')).toBeInTheDocument();
    expect(screen.getByLabelText('Vorname')).toBeInTheDocument();
    expect(screen.getByLabelText('Nachname')).toBeInTheDocument();
    expect(screen.getByLabelText('Land')).toBeInTheDocument();
    expect(screen.getByLabelText('Bundesland')).toBeInTheDocument();
    expect(screen.getByLabelText('Telefonnummer')).toBeInTheDocument();
    expect(screen.getByLabelText('Sprache')).toBeInTheDocument();
    expect(screen.getByLabelText('Gesprochene Sprachen')).toBeInTheDocument();
    expect(screen.getByLabelText('Über mich')).toBeInTheDocument();
  });

  it('Vorname wird korrekt übergeben', () => {
    const inputVorname = screen.getByLabelText('Vorname');
    userEvent.type(inputVorname, 'Max');
    expect(inputVorname).toHaveValue('Max');
  });

  it('Auswahlinput wird korrekt übergeben', () => {
    const selectAnrede = screen.getByLabelText('Anrede');
    userEvent.selectOptions(selectAnrede, 'Herr');
    expect(selectAnrede).toHaveValue('Herr');
  });

  it('Textfeld wird korrekt übergeben', () => {
    const textareaUeberMich = screen.getByLabelText('Über mich');
    userEvent.type(textareaUeberMich, 'Ein paar Informationen über mich.');
    expect(textareaUeberMich).toHaveValue('Ein paar Informationen über mich.');
  });

  it('Auswahlinput wird korrekt übergeben', () => {
    const multiSelectSprachen = screen.getByLabelText('Gesprochene Sprachen');
    userEvent.type(multiSelectSprachen, 'deutsch, englisch'); 
    expect(multiSelectSprachen).toHaveValue('deutsch, englisch');
  
  });
});
