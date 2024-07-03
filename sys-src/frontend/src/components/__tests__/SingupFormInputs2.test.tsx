import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignupFormInputs2, SignupSchema2, IFormInputs2 } from '../forms/SignupFormInputs2';
import userEvent from '@testing-library/user-event';
import {act} from 'react';

// Cleanup nach jedem Test
afterEach(cleanup);

const renderWithForm = (Component: React.FC<{ form2: UseFormReturn<any> }>) => {
    const Wrapper: React.FC = () => {
        const form2 = useForm<IFormInputs2>({
            resolver: yupResolver(SignupSchema2),
        });

        return <Component form2={form2} />;
    };

    return render(<Wrapper />);
};

test('renderstSignupFormInputs2 Komponente richtig', () => {
    renderWithForm(SignupFormInputs2);

    // Überprüfen der statischen Texte
    expect(screen.getByText('Persönliche Daten')).toBeInTheDocument();
    expect(screen.getByText('Diese Informationen sind öffentlich sichtbar. Seien Sie vorsichtig, was Sie teilen.')).toBeInTheDocument();

    // Überprüfen der Beschriftungen für die Eingabefelder
    expect(screen.getByLabelText('Anrede')).toBeInTheDocument();
    expect(screen.getByLabelText('Vorname')).toBeInTheDocument();
    expect(screen.getByLabelText('Nachname')).toBeInTheDocument();
    expect(screen.getByLabelText('In welchem Land leben Sie?')).toBeInTheDocument();
    expect(screen.getByLabelText('Telefonnummer')).toBeInTheDocument();

});



test('geht richtiig mit Input um', async () => {
    renderWithForm(SignupFormInputs2);

    const vornameInput = screen.getByLabelText('Vorname') as HTMLInputElement;
    fireEvent.change(vornameInput, { target: { value: 'Max' } });
    expect(vornameInput.value).toBe('Max');

    const nachnameInput = screen.getByLabelText('Nachname') as HTMLInputElement;
    fireEvent.change(nachnameInput, { target: { value: 'Mustermann' } });
    expect(nachnameInput.value).toBe('Mustermann');

    const telefonnrInput = screen.getByLabelText('Telefonnummer') as HTMLInputElement;
    fireEvent.change(telefonnrInput, { target: { value: '123456789' } });
    expect(telefonnrInput.value).toBe('123456789');
});

test('stimmt mit snapshot überein', () => {
    const { asFragment } = renderWithForm(SignupFormInputs2);
    expect(asFragment()).toMatchSnapshot();
});
