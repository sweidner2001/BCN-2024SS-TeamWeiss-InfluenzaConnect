import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditableInputField from '../input/EditableInputField';

describe('EditableInputField component', () => {
  const handleChange = jest.fn();

  beforeEach(() => {
    render(
      <EditableInputField
        id="test-input"
        label="Test Input"
        type="text"
        value="initial value"
        disabled={false}
        onChange={handleChange}
      />
    );
  });

  test('renders input field with correct props', () => {
    const inputElement = screen.getByLabelText('Test Input') as HTMLInputElement;

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(inputElement).toHaveValue('initial value');
    expect(inputElement).not.toBeDisabled();
  });

  test('handles change event', () => {
    const inputElement = screen.getByLabelText('Test Input') as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: 'updated value' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    
  });

  test('disables input field', () => {
    render(
      <EditableInputField
        id="test-input"
        label="Test Input"
        type="text"
        value="initial value"
        disabled={true}
        onChange={handleChange}
      />
    );

    const inputElement = screen.getByLabelText('Test Input') as HTMLInputElement;

    expect(inputElement).toBeDisabled();
  });
});
