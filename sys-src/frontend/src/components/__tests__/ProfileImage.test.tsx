import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfileImage from '../ProfileImage';

// Mock für imageUrl
const mockImageUrl = 'https://example.com/testimage.jpg';

describe('ProfileImage Komponente', () => {
  it('rendert das Standardbild korrekt, wenn keine imageUrl übergeben wird', () => {
    render(<ProfileImage />);
    
    // Überprüfen, ob das Standardbild gerendert wird
    const imgElement = screen.getByAltText('Profile');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', '/moneyboy.png');
  });

  it('rendert das übergebene Bild korrekt, wenn imageUrl übergeben wird', () => {
    render(<ProfileImage imageUrl={mockImageUrl} />);
    
    // Überprüfen, ob das übergebene Bild gerendert wird
    const imgElement = screen.getByAltText('Profile');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', mockImageUrl);
  });
});
