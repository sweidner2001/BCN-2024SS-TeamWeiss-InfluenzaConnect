import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SignupFormInputs1 } from '../forms/SignupFormInputs1';
import renderer from 'react-test-renderer';
import { act } from 'react';

afterEach(cleanup);

// Definiere dein Formular-Schema und Typen
const SignupSchema1 = yup.object({
  email: yup.string().trim().email("Bitte geben Sie eine gültige Email-Adresse ein!").required('Bitte geben Sie eine Email an!').max(40, "Die Email darf maximal 40 Zeichen lang sein"),
  passwort: yup.string().required("Bitte geben Sie ein Passwort an!").min(10, "Das Passwort muss min. 10 Zeichen lang sein").max(25, "Das Passwort darf maximal 25 Zeichen lang sein"),
});

const renderWithForm = (Component: React.FC<{ form1: UseFormReturn<any> }>): void => {
  const Wrapper: React.FC = () => {
    const form1 = useForm({
      resolver: yupResolver(SignupSchema1),
    });

    return <Component form1={form1} />;
  };

  render(<Wrapper />);
};

describe('Komponente SignupFormInputs1', () => {
  test('rendert die statischen Texte der SignupFormInputs1-Komponente korrekt', () => {
    renderWithForm(SignupFormInputs1);

    // Überprüfen der statischen Texte
    expect(screen.getByText('Anmeldeinformationen')).toBeInTheDocument();
    expect(screen.getByText('Die Anmeldeinformationen sind öffentlich nicht sichtbar!')).toBeInTheDocument();

    // Überprüfen der Beschriftungen für die Eingabefelder
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Passwort')).toBeInTheDocument();
  });

  test('verarbeitet Eingabeänderungen', async () => {
    renderWithForm(SignupFormInputs1);

    await act(async () => {
      userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
      userEvent.type(screen.getByLabelText('Passwort'), 'abcdefghij');
    });

    // Es ist schwer, direkt auf Änderungen im form state zu testen, deshalb stellen wir sicher, dass register aufgerufen wurde
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Passwort') as HTMLInputElement;
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('abcdefghij');
  });

  test('stimmt mit dem Snapshot überein', () => {
    const tree = renderer.create(
      <SignupFormInputs1 form1={{ register: jest.fn(), formState: { errors: {} }, control: jest.fn() }} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('SignupSchema1 Validierung', () => {
  it('sollte eine korrekte Email und Passwort validieren', async () => {
    const data = { email: 'test@example.com', passwort: 'abcdefghij' };
    await expect(SignupSchema1.validate(data)).resolves.toBeTruthy();
  });

  it('sollte die Validierung mit einer ungültigen Email fehlschlagen lassen', async () => {
    const data = { email: 'invalid-email', passwort: 'abcdefghij' };
    await expect(SignupSchema1.validate(data)).rejects.toThrow('Bitte geben Sie eine gültige Email-Adresse ein!');
  });

  it('sollte die Validierung mit einem zu kurzen Passwort fehlschlagen lassen', async () => {
    const data = { email: 'test@example.com', passwort: 'short' };
    await expect(SignupSchema1.validate(data)).rejects.toThrow('Das Passwort muss min. 10 Zeichen lang sein');
  });

  it('sollte die Validierung mit einer zu langen Email fehlschlagen lassen', async () => {
    const data = { email: 'a'.repeat(41) + '@example.com', passwort: 'abcdefghij' };
    await expect(SignupSchema1.validate(data)).rejects.toThrow('Die Email darf maximal 40 Zeichen lang sein');
  });

  it('sollte die Validierung mit einem zu langen Passwort fehlschlagen lassen', async () => {
    const data = { email: 'test@example.com', passwort: 'a'.repeat(26) };
    await expect(SignupSchema1.validate(data)).rejects.toThrow('Das Passwort darf maximal 25 Zeichen lang sein');
  });
});
