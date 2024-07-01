import React from 'react';
import { shallow } from 'enzyme';
import Signup from '../pages/Signup';
import { BrowserRouter } from 'react-router-dom';

describe('Signup Component', () => {
  let wrapper: { find: (arg0: string) => { (): any; new(): any; exists: { (): any; new(): any; }; text: { (): any; new(): any; }; simulate: { (arg0: string, arg1: { target: { value: string; } | { value: string; } | { value: string; } | { value: string; } | { value: string; } | { value: string; } | { value: string; }; } | undefined): void; new(): any; }; }; };

  beforeEach(() => {
    wrapper = shallow(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
  });

  it('renders initial form and navigates through steps', () => {
    // Das erste Formular sollte gerendert werden
    expect(wrapper.find('Signup').exists()).toBeTruthy();
    expect(wrapper.find('h1').text()).toEqual('Registrierung InfluenzaConnect');

    // Simuliere das Ausfüllen des ersten Formulars und Klicken auf "Weiter"
    wrapper.find('input#firstName').simulate('change', { target: { value: 'Max' } });
    wrapper.find('input#lastName').simulate('change', { target: { value: 'Mustermann' } });
    wrapper.find('button#nextStepButton').simulate('click');

    // Überprüfe, ob das zweite Formular nach der Navigation gerendert wird
    expect(wrapper.find('h2').text()).toEqual('Weitere Informationen');

    // Simuliere das Ausfüllen des zweiten Formulars und Klicken auf "Weiter"
    wrapper.find('input#email').simulate('change', { target: { value: 'max.mustermann@example.com' } });
    wrapper.find('button#nextStepButton').simulate('click');

    // Überprüfe, ob das dritte Formular nach der Navigation gerendert wird
    expect(wrapper.find('h2').text()).toEqual('Passwort');

    // Simuliere das Ausfüllen des dritten Formulars und Klicken auf "Registrieren"
    wrapper.find('input#password').simulate('change', { target: { value: 'securePassword123' } });
    wrapper.find('button#registerButton').simulate('click');

    // Du kannst hier weitere Assertions hinzufügen, um die erfolgreiche Übermittlung oder ein anderes Verhalten zu überprüfen
    // Zum Beispiel kannst du eine Erfolgsmeldung überprüfen oder die Navigation zu einer anderen Seite
  });

  it('allows navigating back through steps', () => {
    // Simuliere die Navigation zum zweiten Formular
    wrapper.find('input#firstName').simulate('change', { target: { value: 'Max' } });
    wrapper.find('input#lastName').simulate('change', { target: { value: 'Mustermann' } });
    wrapper.find('button#nextStepButton').simulate('click');

    // Simuliere die Navigation zum dritten Formular
    wrapper.find('input#email').simulate('change', { target: { value: 'max.mustermann@example.com' } });
    wrapper.find('button#nextStepButton').simulate('click');

    // Simuliere das Zurückgehen zum zweiten Formular
    wrapper.find('button#backButton').simulate('click');

    // Überprüfe, ob wir wieder im zweiten Formular sind
    expect(wrapper.find('h2').text()).toEqual('Weitere Informationen');

    // Simuliere das Zurückgehen zum ersten Formular
    wrapper.find('button#backButton').simulate('click');

    // Überprüfe, ob wir wieder im ersten Formular sind
    expect(wrapper.find('h1').text()).toEqual('Registrierung InfluenzaConnect');
  });
});
