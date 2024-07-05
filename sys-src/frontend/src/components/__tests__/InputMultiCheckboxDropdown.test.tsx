import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import InputMultiSelectCheckboxDropdown from '../input/InputMultiCheckboxDropdown';

// Mock für die onChange Funktion
const mockOnChange = jest.fn();

describe('InputMultiSelectCheckboxDropdown Komponente', () => {
  const selectOptions = {
    option1: 'Option 1',
    option2: 'Option 2',
    option3: 'Option 3',
  };

  beforeEach(() => {
    render(<InputMultiSelectCheckboxDropdown selectOptions={selectOptions} label="Optionen auswählen" onChange={mockOnChange} />);
  });

  it('rendert Dropdown-Button und Label korrekt', () => {
    expect(screen.getByText('Optionen auswählen')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Optionen auswählen' })).toBeInTheDocument();
  });

  it('öffnet das Dropdown-Menü beim Klicken auf den Button', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Optionen auswählen' }));
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('schließt das Dropdown-Menü beim erneuten Klicken auf den Button', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Optionen auswählen' }));
    fireEvent.click(screen.getByRole('button', { name: 'Optionen auswählen' }));
    expect(screen.queryByText('Option 1')).toBeNull();
    expect(screen.queryByText('Option 2')).toBeNull();
    expect(screen.queryByText('Option 3')).toBeNull();
  });

  it('wählt Optionen korrekt aus und ab', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Optionen auswählen' }));

    // Option 1 auswählen
    fireEvent.click(screen.getByText('Option 1'));
    expect(mockOnChange).toHaveBeenCalledWith(['option1']);

    // Option 2 auswählen
    fireEvent.click(screen.getByText('Option 2'));
    expect(mockOnChange).toHaveBeenCalledWith(['option1', 'option2']);

    // Option 1 abwählen
    fireEvent.click(screen.getByText('Option 1'));
    expect(mockOnChange).toHaveBeenCalledWith(['option2']);

    // Option 2 abwählen
    fireEvent.click(screen.getByText('Option 2'));
    expect(mockOnChange).toHaveBeenCalledWith([]);
  });

  it('ruft onChange mit den ausgewählten Optionen auf', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Optionen auswählen' }));

    // Option 1 und Option 2 auswählen
    fireEvent.click(screen.getByText('Option 1'));
    fireEvent.click(screen.getByText('Option 2'));
    expect(mockOnChange).toHaveBeenLastCalledWith(['option1', 'option2']);

    // Option 2 abwählen
    fireEvent.click(screen.getByText('Option 2'));
    expect(mockOnChange).toHaveBeenLastCalledWith(['option1']);

    // Option 1 abwählen
    fireEvent.click(screen.getByText('Option 1'));
    expect(mockOnChange).toHaveBeenLastCalledWith([]);
  });

  it('schließt das Dropdown-Menü nicht beim Klicken auf Optionen', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Optionen auswählen' }));
    fireEvent.click(screen.getByText('Option 1'));
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });
});
