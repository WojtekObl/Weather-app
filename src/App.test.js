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

    JSON.parse = jest.fn().mockImplementationOnce((x) => {
      const object = {
        'name': x
      }
      return object
    });
    render( < App / > );
    expect(screen.getByText('Weather Forecast')).toBeInTheDocument();

  });

  it('renders imput', () => {
    JSON.parse = jest.fn().mockImplementationOnce((x) => {
      const object = {
        'name': x
      }
      return object
    });
    render( < App / > );
    expect(screen.getByLabelText('Search City')).toBeInTheDocument();
    
  });

  it('renders forecast buton', () => {
    JSON.parse = jest.fn().mockImplementationOnce((x) => {
      const object = {
        'name': x
      }
      return object
    });
    render( < App / > );
    expect(screen.getByText('Forecast')).toBeInTheDocument()
  });

  it('render toggle unit butoon', () => {
    JSON.parse = jest.fn().mockImplementationOnce((x) => {
      const object = {
        'name': x
      }
      return object
    });
    render( < App / > );
    expect(screen.getByText('F°/C°: C°')).toBeInTheDocument();
  });

  it('render status', () => {
    JSON.parse = jest.fn().mockImplementationOnce((x) => {
      const object = {
        'name': x
      }
      return object
    });
    render( < App / > );
    expect(screen.getByTitle('status')).toBeInTheDocument();
  });
});