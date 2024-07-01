import React from 'react';
import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { SignupFormInputs3 } from '../forms/SignupFormInputs3';

// Mocken des useForm Hooks
jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: jest.fn(),
}));

describe('SignupFormInputs3 Komponente', () => {
  // Mocken des useForm Hooks mit Dummy-Werten
  const mockedForm = {
    register: jest.fn(),
    formState: {
      errors: {}, // Dummy-Werte
    },
  };

  beforeEach(() => {
    (useForm as jest.Mock).mockReturnValue(mockedForm);

    // Komponente rendern
    render(<SignupFormInputs3 form3={mockedForm} />);
  });

  it('rendert die Formulareingaben korrekt', () => {
    // Assertions für die gerenderten Elemente
    expect(screen.getByText('Verknüpfung Socail-Media Accounts')).toBeInTheDocument();
    expect(screen.getByText('Diese Informationen dienen dazu, Sie als Influencer zu vermarkten und sind öffentlich sichtbar.')).toBeInTheDocument();
    expect(screen.getByLabelText('Instagram Username')).toBeInTheDocument();
    expect(screen.getByText('instagram.com/')).toBeInTheDocument();
  });
});
