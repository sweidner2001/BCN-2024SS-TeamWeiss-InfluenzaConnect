import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { FormularButton } from '..//buttons/FormularButton';

describe('FormularButton Komponente', () => {
  it('rendert den Button mit dem angegebenen Text und Typ', () => {
    render(
      <Router>
        <FormularButton text="Submit" type="submit" />
      </Router>
    );

    const button = screen.getByText('Submit');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('leitet zur angegebenen Route weiter, wenn linkTo prop gesetzt ist', () => {
    render(
      <Router>
        <FormularButton text="Go to Landing" type="button" linkTo="/landing" />
      </Router>
    );

    const button = screen.getByText('Go to Landing');
    fireEvent.click(button);

    expect(window.location.pathname).toBe('/landing');
  });

  it('ruft die onClick-Funktion auf, wenn der Button geklickt wird', () => {
    const handleClick = jest.fn();

    render(
      <Router>
        <FormularButton text="Click Me" type="button" onClick={handleClick} />
      </Router>
    );

    const button = screen.getByText('Click Me');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
