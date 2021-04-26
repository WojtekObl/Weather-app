import React from 'react';
import {
    render,
    screen
} from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';




describe('renders on first load', () => {
    it('renders header', () => {
        const mockGeolocation = {
            getCurrentPosition: jest.fn(),
            watchPosition: jest.fn()
        };

        global.navigator.geolocation = mockGeolocation;
        render(< App />);
        expect(screen.getByText('Weather Forecast')).toBeInTheDocument();

    });

    it('renders imput', () => {
        render(< App />);
        expect(screen.getByLabelText('Search City')).toBeInTheDocument();
    });

    it('renders forecast buton', () => {
        render(< App />);
        expect(screen.getByText('Forecast')).toBeInTheDocument()
    });

    it('render toggle unit butoon', () => {
        render(< App />);
        expect(screen.getByText('F°/C°: C°')).toBeInTheDocument();
    });

    it('render status', () => {
        render(< App />);
        expect(screen.getByTitle('status')).toBeInTheDocument();
    });
});


