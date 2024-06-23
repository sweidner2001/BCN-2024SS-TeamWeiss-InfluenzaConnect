import React from 'react';
import { render, screen , cleanup} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SignupFormInputs1 } from '../forms/SignupFormInputs1'; // Pfade anpassen, falls notwendig

afterEach(() => {
  cleanup();
});



// Definiere dein Formular-Schema und Typen
const SignupSchema1 = yup.object({
  email: yup.string().trim().email("Bitte geben Sie eine gültige Email-Adresse ein!").required('Bitte geben Sie eine Email an!').max(40, "Die Email darf maximal 40 Zeichen lang sein"),
  passwort: yup.string().required("Bitte geben Sie ein Passwort an!").min(10, "Das Passwort muss min. 10 Zeichen lang sein").max(25, "Das Passwort darf maximal 25 Zeichen lang sein"),
});

// Mock selectOptions für das Dropdown-Menü
const options: string[] = [
  'Deutsch',
  'Englisch',
  'Französisch',
  'Italienisch',
  'Spanisch',
];

const renderWithForm = (Component: React.FC<{ form1: UseFormReturn<any> }>): void => {
  const Wrapper: React.FC = () => {
    const form1 = useForm({
      resolver: yupResolver(SignupSchema1),
    });

    if (!form1) {
      throw new Error('Failed to initialize form');
    }

    return <Component form1={form1} />;
  };

  render(<Wrapper />);
};

test('renders SignupFormInputs1 component texts correctly', () => {
  renderWithForm(SignupFormInputs1);

  // Überprüfen der statischen Texte
  expect(screen.getByText('Anmeldeinformationen')).toBeInTheDocument();
  expect(screen.getByText('Die Anmeldeinformationen sind öffentlich nicht sichtbar!')).toBeInTheDocument();

  // Überprüfen der Beschriftungen für die Eingabefelder
  expect(screen.getByLabelText('Email')).toBeInTheDocument();
  expect(screen.getByLabelText('Passwort')).toBeInTheDocument();
  expect(screen.getByText('Gesprochene Sprachen')).toBeInTheDocument();
});


describe('SignupSchema1 validation', () => {
  it('should validate a correct email and password', async () => {
      const data = { email: 'test@example.com', passwort: 'abcdefghij' };
      await expect(SignupSchema1.validate(data)).resolves.toBeTruthy();
  });

  it('should fail validation with an invalid email', async () => {
      const data = { email: 'invalid-email', passwort: 'abcdefghij' };
      await expect(SignupSchema1.validate(data)).rejects.toThrow('Bitte geben Sie eine gültige Email-Adresse ein!');
  });

  it('should fail validation with a short password', async () => {
      const data = { email: 'test@example.com', passwort: 'short' };
      await expect(SignupSchema1.validate(data)).rejects.toThrow('Das Passwort muss min. 10 Zeichen lang sein');
  });

  it('should fail validation with a long email', async () => {
      const data = { email: 'a'.repeat(41) + '@example.com', passwort: 'abcdefghij' };
      await expect(SignupSchema1.validate(data)).rejects.toThrow('Die Email darf maximal 40 Zeichen lang sein');
  });

  it('should fail validation with a long password', async () => {
      const data = { email: 'test@example.com', passwort: 'a'.repeat(26) };
      await expect(SignupSchema1.validate(data)).rejects.toThrow('Das Passwort darf maximal 25 Zeichen lang sein');
  });
});
