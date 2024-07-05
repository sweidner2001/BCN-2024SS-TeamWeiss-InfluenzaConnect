import React from 'react';
import { render, screen } from '@testing-library/react';
import InfluencerOverview from '../pages/InfluencerOverview';

describe('InfluencerOverview Component', () => {
  it('renders InfluencerOverview component correctly without API data', () => {
    render(<InfluencerOverview />);

    // Überprüfen, dass die Komponente ohne Daten korrekt gerendert wird
    expect(screen.getByText('Einträge: 0')).toBeInTheDocument(); // Überprüfen der Anzahl der Einträge (0, wenn keine Daten)

    // Weitere Überprüfungen je nach Ihren erwarteten Anzeigen oder Platzhaltern in der Komponente
    expect(screen.getByPlaceholderText('Search by name...')).toBeInTheDocument();
    expect(screen.getByText('Filter')).toBeInTheDocument();

    // Beispielhafte Überprüfung von Spaltenüberschriften
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Werbesparte')).toBeInTheDocument();
    expect(screen.getByText('Nationalität')).toBeInTheDocument();
    expect(screen.getByText('Sprache')).toBeInTheDocument();
    expect(screen.getByText('Instagram-Account')).toBeInTheDocument();
    expect(screen.getByText('Instagram-Follower')).toBeInTheDocument();
    expect(screen.getByText('\u00D8 Kommentare')).toBeInTheDocument();
    expect(screen.getByText('\u00D8 Likes')).toBeInTheDocument();
    expect(screen.getByText('Score')).toBeInTheDocument();
    expect(screen.getByText('letzter Post')).toBeInTheDocument();
    expect(screen.getByText('Über mich')).toBeInTheDocument();

    // Beispielhafte Überprüfung, dass keine Daten gerendert wurden (z.B. Name, Benutzername usw.)
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.queryByText('johndoe')).not.toBeInTheDocument();
    expect(screen.queryByText('English')).not.toBeInTheDocument();
    expect(screen.queryByText('USA')).not.toBeInTheDocument();
  });

  // Weitere Testfälle könnten das Filtern nach Suchbegriffen und das Auswählen von Spalten umfassen
});
