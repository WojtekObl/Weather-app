import React from 'react';
import {
    fireEvent,
    render,
    screen
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Controls from './Controls.js'


describe('Forecast Btn', () => {
    it('calls the handle forecast function', () => {
        const handleForecast = jest.fn();
        let city = { name: "test" }

        render(<Controls handleForecast={handleForecast} city={city} />);

        fireEvent.click(screen.getByText(/Forecast/));

        expect(handleForecast).toHaveBeenCalledTimes(1);


    });

});