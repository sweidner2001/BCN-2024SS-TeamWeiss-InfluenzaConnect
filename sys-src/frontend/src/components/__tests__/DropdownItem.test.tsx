import React from 'react';
import { render } from '@testing-library/react';
import { motion } from 'framer-motion';
import LoginDropdown from '../login/DropdownItem';

describe('LoginDropdown Komponente', () => {
  it('rendert die LoginDropdown Komponente korrekt', () => {
    const { getByText } = render(
      <LoginDropdown>
        <span>Login Link</span>
      </LoginDropdown>
    );

    // Überprüfen, ob der Text innerhalb der Dropdown-Komponente gerendert wird
    const loginLink = getByText('Login Link');
    expect(loginLink).toBeInTheDocument();

    // Überprüfen, ob die richtigen CSS-Klassen angewendet werden
    const dropdownDiv = getByText('Login Link').parentElement as HTMLDivElement;
    expect(dropdownDiv).toHaveClass('px-4 py-1 cursor-pointer transition ease-in duration-200');

    // Überprüfen, ob die Framer Motion motion.div-Komponente verwendet wird
    expect(dropdownDiv.tagName).toBe('DIV');
    expect(dropdownDiv).toHaveAttribute('data-testid', 'motion-div');

    // Überprüfen, ob die Variants korrekt angewendet werden
    expect(dropdownDiv).toHaveStyle({
      opacity: '0',
      y: '-10px'
    });
  });
});
